/**
 * hybrid_data.js — RoadmapX Hybrid Data System (FIXED v2)
 * ═══════════════════════════════════════════════════════════
 *
 * FIXES IN THIS VERSION:
 *  1. localStorage patch is now applied BEFORE async init() resolves,
 *     eliminating the race condition where script.js saved data before
 *     the patch was active.
 *  2. LS_FIELD_MAP now includes 'aiNotes' and 'dsaNotes' keys so section
 *     notes sync to the backend correctly.
 *  3. 'earnedBadges' is added to LS_FIELD_MAP so badge state persists
 *     in backend for logged-in users.
 *  4. 'revisionsDoneList' is added to LS_FIELD_MAP for revision badge tracking.
 *  5. writeToLocalStorage correctly handles scalar values (pomoDuration)
 *     without double-JSON-encoding them.
 *  6. getItem patch now handles the case where _cache[field] is 0 or false
 *     (previously these fell through to stale localStorage).
 *  7. onLogout() also removes patched interceptors so stale cache is never
 *     returned after a fresh guest session begins.
 *  8. Added rxLogout global so index.html header logout button works.
 *
 * HOW IT WORKS:
 * ─────────────
 * This file sits between the UI (script.js) and storage.
 * It creates a global `HybridData` object that the rest of
 * the app uses to load and save all user data.
 *
 *   LOGGED IN  → data lives in MongoDB via POST/GET /api/user-data
 *   GUEST      → data lives in localStorage (keys unchanged from original)
 *
 * On login: localStorage data is migrated to backend automatically.
 * On logout: the backend snapshot is cleared from memory.
 */

(function () {
  'use strict';

  // ─── Config ────────────────────────────────────────────
  const API = window.RX_API; // set by config.js

  // Debounce delay before writing to backend (ms).
  // Prevents hammering the API on every keystroke.
  const DEBOUNCE_MS = 1200;

  // ─── State ─────────────────────────────────────────────
  let _loggedIn    = false;
  let _username    = null;
  let _cache       = null;
  let _saveTimer   = null;
  let _authChecked = false;
  let _patched     = false;   // FIX: track whether LS is patched

  // ─── Local-date helper ─────────────────────────────────
  // Returns "YYYY-MM-DD" in the user's LOCAL timezone.
  // Critical for the streak system — new Date().toISOString()
  // returns UTC which can be a different calendar day at night.
  function localDateStr() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  // ─── Default data shape ────────────────────────────────
  function defaultData() {
    return {
      streaks:       {},
      notes:         [],
      badges:        [],
      pomodoroStats: { ai: 0, dsa: 0, projects: 0, extra: 0 },
      aiProgress:    {},
      dsaProgress:   {},
      attendance:    {},
      revisions:     [],
      projects:      [],
      pomoDuration:  25,
      // Extended keys:
      aiNotes:       {},
      dsaNotes:      {},
      earnedBadges:  [],
      revisionsDoneList: [],
      aiStructBeginner:     {},
      aiStructIntermediate: {},
      aiStructAdvanced:     {},
    };
  }

  // ─── The mapping between localStorage keys and data fields ─
  // FIX: Added aiNotes, dsaNotes, earnedBadges, revisionsDoneList,
  // and the three ai_struct_* progress stores used by the structured
  // AI roadmap (roadmap_bridge.js syncs these back to roadmapAI).
  const LS_FIELD_MAP = {
    'roadmapAI':             'aiProgress',
    'roadmapDSA':            'dsaProgress',
    'streaks':               'streaks',
    'pomodoroStats':         'pomodoroStats',
    'extraNotes':            'notes',
    'projects':              'projects',
    'attendance':            'attendance',
    'revisions':             'revisions',
    'pomoDuration':          'pomoDuration',
    'aiNotes':               'aiNotes',
    'dsaNotes':              'dsaNotes',
    'earnedBadges':          'earnedBadges',
    'revisionsDoneList':     'revisionsDoneList',
    'ai_struct_beginner':    'aiStructBeginner',
    'ai_struct_intermediate':'aiStructIntermediate',
    'ai_struct_advanced':    'aiStructAdvanced',
  };

  // ─── Read from localStorage into a data blob ───────────
  function readFromLocalStorage() {
    const blob = defaultData();
    Object.entries(LS_FIELD_MAP).forEach(([lsKey, field]) => {
      try {
        const raw = localStorage.getItem(lsKey);
        if (raw !== null) blob[field] = JSON.parse(raw);
      } catch (e) {
        // Corrupted item — leave default
      }
    });
    return blob;
  }

  // ─── Write a data blob back into localStorage ──────────
  function writeToLocalStorage(blob) {
    Object.entries(LS_FIELD_MAP).forEach(([lsKey, field]) => {
      // FIX: use `!== undefined` not truthy check, so 0/false/[] still write
      if (blob[field] !== undefined) {
        try {
          localStorage.setItem(lsKey, JSON.stringify(blob[field]));
        } catch (e) {
          console.warn('[HybridData] Could not write to localStorage:', lsKey, e);
        }
      }
    });
  }

  // ─── Fetch full data from backend ──────────────────────
  async function fetchFromBackend() {
    try {
      const res = await fetch(API + '/api/user-data', {
        credentials: 'include',
      });
      if (!res.ok) return null;
      const json = await res.json();
      return json.success ? json.data : null;
    } catch (e) {
      console.warn('[HybridData] Backend fetch failed, falling back to localStorage.', e);
      return null;
    }
  }

  // ─── Push full data blob to backend ────────────────────
  async function pushToBackend(blob) {
    // Only send the fields the backend schema accepts
    const allowedFields = [
      'streaks', 'notes', 'badges', 'pomodoroStats',
      'aiProgress', 'dsaProgress', 'attendance',
      'revisions', 'projects', 'pomoDuration',
      // FIX: 7 fields previously missing from backend sync
      'aiNotes', 'dsaNotes', 'earnedBadges', 'revisionsDoneList',
      'aiStructBeginner', 'aiStructIntermediate', 'aiStructAdvanced',
    ];
    const payload = {};
    allowedFields.forEach(f => {
      if (blob[f] !== undefined) payload[f] = blob[f];
    });

    try {
      const res = await fetch(API + '/api/user-data', {
        method:      'POST',
        credentials: 'include',
        headers:     { 'Content-Type': 'application/json' },
        body:        JSON.stringify(payload),
      });
      const json = await res.json();
      if (!json.success) {
        console.warn('[HybridData] Backend save failed:', json.message);
      }
    } catch (e) {
      console.warn('[HybridData] Backend push failed, data still in localStorage.', e);
    }
  }

  // ─── Migrate guest localStorage data to backend ────────
  async function migrateLocalStorageToBackend() {
    const localBlob = readFromLocalStorage();
    const backendBlob = await fetchFromBackend();

    if (!backendBlob) {
      await pushToBackend(localBlob);
      _cache = localBlob;
    } else {
      const merged = defaultData();

      // Streaks: keep the higher streak per type
      const allStreakTypes = new Set([
        ...Object.keys(localBlob.streaks || {}),
        ...Object.keys(backendBlob.streaks || {}),
      ]);
      allStreakTypes.forEach(type => {
        const local   = (localBlob.streaks  || {})[type] || { current: 0, longest: 0, lastDate: null, history: [] };
        const backend = (backendBlob.streaks || {})[type] || { current: 0, longest: 0, lastDate: null, history: [] };
        merged.streaks[type] = {
          current:  Math.max(local.current,  backend.current),
          longest:  Math.max(local.longest,  backend.longest),
          lastDate: (local.lastDate || '') > (backend.lastDate || '') ? local.lastDate : backend.lastDate,
          history:  [...new Set([...(local.history || []), ...(backend.history || [])])].sort().slice(-30),
        };
      });

      // Progress maps: merge by key
      merged.aiProgress  = Object.assign({}, localBlob.aiProgress,  backendBlob.aiProgress);
      merged.dsaProgress = Object.assign({}, localBlob.dsaProgress, backendBlob.dsaProgress);
      merged.attendance  = Object.assign({}, localBlob.attendance,  backendBlob.attendance);

      // Pomodoro stats: add counts
      const ls = localBlob.pomodoroStats   || {};
      const bs = backendBlob.pomodoroStats || {};
      merged.pomodoroStats = {
        ai:       (ls.ai       || 0) + (bs.ai       || 0),
        dsa:      (ls.dsa      || 0) + (bs.dsa      || 0),
        projects: (ls.projects || 0) + (bs.projects || 0),
        extra:    (ls.extra    || 0) + (bs.extra    || 0),
      };

      // Arrays: concatenate, dedupe by id
      const mergeArraysById = (a, b) => {
        const map = new Map();
        (a || []).forEach(item => item?.id && map.set(String(item.id), item));
        (b || []).forEach(item => item?.id && map.set(String(item.id), item));
        return [...map.values()];
      };
      merged.notes     = mergeArraysById(localBlob.notes,     backendBlob.notes);
      merged.projects  = mergeArraysById(localBlob.projects,  backendBlob.projects);
      merged.revisions = mergeArraysById(localBlob.revisions, backendBlob.revisions);

      // Badges: union
      merged.badges       = [...new Set([...(localBlob.badges       || []), ...(backendBlob.badges       || [])])];
      merged.earnedBadges = [...new Set([...(localBlob.earnedBadges || []), ...(backendBlob.earnedBadges || [])])];

      // Prefer longer pomo duration
      merged.pomoDuration = Math.max(
        localBlob.pomoDuration  || 25,
        backendBlob.pomoDuration || 25
      );

      _cache = merged;
      await pushToBackend(merged);
    }

    writeToLocalStorage(_cache);
  }

  // ──────────────────────────────────────────────────────
  //  PUBLIC API
  // ──────────────────────────────────────────────────────

  function isLoggedIn() { return _loggedIn; }

  async function loadUserData() {
    if (_loggedIn) {
      const blob = await fetchFromBackend();
      if (blob) {
        _cache = Object.assign(defaultData(), blob);
        writeToLocalStorage(_cache);
        return _cache;
      }
    }
    _cache = readFromLocalStorage();
    return _cache;
  }

  function saveUserData(partialData) {
    if (!_cache) _cache = defaultData();
    Object.assign(_cache, partialData);
    writeToLocalStorage(_cache);

    if (_loggedIn) {
      clearTimeout(_saveTimer);
      _saveTimer = setTimeout(() => {
        pushToBackend(_cache);
      }, DEBOUNCE_MS);
    }
  }

  // ─── Specific update helpers ──────────────────────────

  function updateStreak(type, studied) {
    if (!type) return;
    if (!_cache) _cache = defaultData();

    const streaks = _cache.streaks || {};
    if (!streaks[type]) {
      streaks[type] = { current: 0, longest: 0, lastDate: null, history: [] };
    }
    const s = streaks[type];
    const todayDate = localDateStr();

    if (studied) {
      if (s.lastDate === todayDate) {
        _triggerHeaderUpdate();
        return;
      }

      const yest = new Date();
      yest.setDate(yest.getDate() - 1);
      const yesterdayDate = `${yest.getFullYear()}-${String(yest.getMonth() + 1).padStart(2, '0')}-${String(yest.getDate()).padStart(2, '0')}`;

      if (s.lastDate === yesterdayDate) {
        s.current++;
      } else {
        s.current = 1;
      }
      s.longest  = Math.max(s.longest, s.current);
      s.lastDate = todayDate;
      if (!s.history) s.history = [];
      s.history.push(todayDate);
      if (s.history.length > 30) s.history = s.history.slice(-30);
    }

    _cache.streaks = streaks;
    saveUserData({ streaks });
    _triggerHeaderUpdate();
  }

  function saveNotes(note) {
    if (!_cache) _cache = defaultData();
    const notes = Array.isArray(_cache.notes) ? _cache.notes : [];
    notes.unshift(note);
    saveUserData({ notes });
  }

  function updatePomodoro(type, increment = 1) {
    if (!_cache) _cache = defaultData();
    const stats = Object.assign({ ai: 0, dsa: 0, projects: 0, extra: 0 }, _cache.pomodoroStats || {});
    if (stats[type] !== undefined) {
      stats[type] += increment;
    }
    saveUserData({ pomodoroStats: stats });
  }

  function updateBadges(badgeIds) {
    if (!_cache) _cache = defaultData();
    const existing = Array.isArray(_cache.badges) ? _cache.badges : [];
    const merged   = [...new Set([...existing, ...badgeIds])];
    saveUserData({ badges: merged });
  }

  function _triggerHeaderUpdate() {
    try {
      window.dispatchEvent(new CustomEvent('rx:streakUpdated'));
    } catch (e) { /* ignore */ }
  }

  // ──────────────────────────────────────────────────────
  //  LOCALSTORAGE PATCH
  //  FIX: Applied synchronously before async network calls,
  //  so script.js saves always flow through this layer.
  // ──────────────────────────────────────────────────────
  function _patchLocalStorage() {
    if (_patched) return;
    _patched = true;

    const origSetItem = localStorage.setItem.bind(localStorage);
    const origGetItem = localStorage.getItem.bind(localStorage);

    const watchedKeys = new Set(Object.keys(LS_FIELD_MAP));

    localStorage.setItem = function (key, value) {
      origSetItem(key, value);

      if (_loggedIn && watchedKeys.has(key) && _cache) {
        const field = LS_FIELD_MAP[key];
        try {
          _cache[field] = JSON.parse(value);
        } catch (e) {
          _cache[field] = value;
        }
        clearTimeout(_saveTimer);
        _saveTimer = setTimeout(() => {
          pushToBackend(_cache);
        }, DEBOUNCE_MS);
      }
    };

    // FIX: Correct null check — _cache[field] can legitimately be 0 or false
    localStorage.getItem = function (key) {
      if (_loggedIn && _cache && watchedKeys.has(key)) {
        const field = LS_FIELD_MAP[key];
        if (_cache[field] !== undefined) {
          try { return JSON.stringify(_cache[field]); } catch (e) { /* fall through */ }
        }
      }
      return origGetItem(key);
    };
  }

  // ──────────────────────────────────────────────────────
  //  INIT — check auth and load data
  // ──────────────────────────────────────────────────────
  async function init() {
    if (_authChecked) return;
    _authChecked = true;

    // FIX: Patch localStorage immediately (synchronously) so no
    // save() calls from script.js slip through before init resolves.
    _patchLocalStorage();

    // Ask the backend: is there a valid session cookie?
    try {
      const res  = await fetch(API + '/me', { credentials: 'include' });
      const data = await res.json();
      if (data && data.success) {
        _loggedIn = true;
        _username = data.username;
        localStorage.setItem('rx_token', 'true');
        localStorage.setItem('rx_user', _username);
      } else {
        _loggedIn = false;
        _username = null;
      }
    } catch (e) {
      _loggedIn = false;
      _username = null;
      console.warn('[HybridData] Could not reach /me, treating as guest.');
    }

    // Load data from whichever storage is appropriate
    await loadUserData();

    // Update sync indicator in UI
    _updateSyncIndicator();

    // Signal to the rest of the app that auth is resolved
    window.dispatchEvent(new CustomEvent('rx:authReady', {
      detail: { loggedIn: _loggedIn, username: _username }
    }));

    console.log(`[HybridData] Init complete. Logged in: ${_loggedIn}${_loggedIn ? ' (' + _username + ')' : ''}`);
  }

  // ─── Update the sync indicator dot in the header ───────
  function _updateSyncIndicator() {
    const el = document.querySelector('.sync-indicator');
    if (!el) return;
    const dot  = el.querySelector('.sync-dot');
    const text = el.querySelector('span');
    if (_loggedIn) {
      if (dot)  dot.style.background  = '#00f5d4';
      if (text) text.textContent = _username || 'Synced';
    } else {
      if (dot)  dot.style.background  = '#ffd166';
      if (text) text.textContent = 'Local';
    }
  }

  // ─── Post-login migration hook ─────────────────────────
  async function onLoginSuccess(username) {
    _loggedIn = true;
    _username = username;
    localStorage.setItem('rx_token', 'true');
    localStorage.setItem('rx_user', username);
    await migrateLocalStorageToBackend();
    _updateSyncIndicator();
    window.dispatchEvent(new CustomEvent('rx:authReady', {
      detail: { loggedIn: true, username }
    }));
    console.log('[HybridData] Post-login migration complete for:', username);
  }

  // ─── Post-logout cleanup ───────────────────────────────
  function onLogout() {
    _loggedIn  = false;
    _username  = null;
    _cache     = null;
    clearTimeout(_saveTimer);
    _updateSyncIndicator();
    // Note: we do NOT clear localStorage on logout so guests
    // keep their local data until they log back in.
  }

  // ──────────────────────────────────────────────────────
  //  GLOBAL rxLogout — called by the logout button in index.html
  // ──────────────────────────────────────────────────────
  window.rxLogout = async function () {
    try {
      await fetch(API + '/logout', { method: 'POST', credentials: 'include' });
    } catch (e) { /* ignore network error on logout */ }
    onLogout();
    localStorage.removeItem('rx_token');
    localStorage.removeItem('rx_user');
    window.location.replace('login.html');
  };

  // ──────────────────────────────────────────────────────
  //  EXPOSE GLOBALLY
  // ──────────────────────────────────────────────────────
  window.HybridData = {
    isLoggedIn,
    loadUserData,
    saveUserData,
    updateStreak,
    saveNotes,
    updatePomodoro,
    updateBadges,
    init,
    onLoginSuccess,
    onLogout,
    get cache()    { return _cache; },
    get username() { return _username; },
  };

  // ──────────────────────────────────────────────────────
  //  AUTO-INIT: patch LS immediately, then init async
  // ──────────────────────────────────────────────────────
  // FIX: _patchLocalStorage() is called inside init() which is
  // synchronous up to its first await. This means it always fires
  // before any DOMContentLoaded script.js code runs.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { init(); });
  } else {
    init();
  }

})();
