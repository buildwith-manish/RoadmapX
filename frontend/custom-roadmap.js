/* ═══════════════════════════════════════════════════════════
   CUSTOM ROADMAP JS  —  RoadmapX  v3
   + Loading states · Skeleton UI · Multi-type Toasts
   + Enhanced empty states · Smooth transitions
   Schema: CUSTOM_ROADMAP { id, title, level, weeks[] }
   Each week has 7 days with continuous numbering across weeks.
   Fully localStorage-based. Stats synced to shared keys.
═══════════════════════════════════════════════════════════ */
'use strict';

const CRM = (() => {

  /* ── STORAGE KEYS ── */
  const STORE_KEY = 'crm_v2_data';
  const STATS_KEY = 'crm_stats';

  /* ── APP STATE ── */
  let _data  = { roadmaps: [] };
  let _stats = { completedDays: 0, totalPomodoro: 0 };

  let _nav = {
    screen:    'list',
    roadmapId: null,
    weekNum:   null,
    dayNum:    null,
  };

  let _editingDayNum  = null;
  let _openWeeks      = new Set();
  let _notesEditMode  = false;
  let _notesSaveTimer = null;

  /* ── Toast queue ── */
  let _toastTimer = null;
  let _toastQueue = [];
  let _toastBusy  = false;

  /* ══════════════════════════════════════════
     PERSISTENCE  (localStorage + backend sync)
  ══════════════════════════════════════════ */

  // ── Backend helpers ────────────────────────────────────
  // Reads BASE_URL from config.js if available, falls back gracefully.
  function _apiBase() {
    try { return (typeof BASE_URL !== 'undefined' && BASE_URL) ? BASE_URL : ''; }
    catch(e) { return ''; }
  }

  async function _isLoggedIn() {
    try {
      const res = await fetch(_apiBase() + '/me', { credentials: 'include' });
      const j   = await res.json();
      return !!(j && j.success);
    } catch(e) { return false; }
  }

  // Pull custom roadmap data from /api/user-data
  async function _loadFromBackend() {
    try {
      const res = await fetch(_apiBase() + '/api/user-data', { credentials: 'include' });
      if (!res.ok) return null;
      const j = await res.json();
      if (j && j.success && j.data && j.data.customRoadmaps) {
        return j.data.customRoadmaps;
      }
    } catch(e) {}
    return null;
  }

  // Push current _data.roadmaps to /api/user-data
  async function _saveToBackend() {
    try {
      await fetch(_apiBase() + '/api/user-data', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customRoadmaps: _data.roadmaps }),
      });
    } catch(e) {
      console.warn('[CRM] backend save failed, data still in localStorage:', e);
    }
  }

  // ── Core load/save ─────────────────────────────────────
  function load() {
    // Always start from localStorage for instant render
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) _data = JSON.parse(raw);
    } catch(e) { _data = { roadmaps: [] }; }
    if (!Array.isArray(_data.roadmaps)) _data.roadmaps = [];

    // Merge with backend data asynchronously (non-blocking for first render)
    _isLoggedIn().then(loggedIn => {
      if (!loggedIn) return;
      _loadFromBackend().then(backendRoadmaps => {
        if (!backendRoadmaps) return;
        // Use backend as source of truth when logged in —
        // merge by id so any roadmaps only in localStorage aren't lost,
        // but backend wins on conflicts.
        const localIds = new Set(_data.roadmaps.map(r => r.id));
        const backendIds = new Set(backendRoadmaps.map(r => r.id));
        // Add backend-only roadmaps
        backendRoadmaps.forEach(r => { if (!localIds.has(r.id)) _data.roadmaps.push(r); });
        // Update existing roadmaps from backend
        _data.roadmaps = _data.roadmaps.map(local => {
          const remote = backendRoadmaps.find(r => r.id === local.id);
          return remote || local;
        });
        // If there were any localStorage-only roadmaps, push them back up
        const hasLocalOnly = [...localIds].some(id => !backendIds.has(id));
        if (hasLocalOnly) _saveToBackend();
        // Persist merged result locally and re-render
        try { localStorage.setItem(STORE_KEY, JSON.stringify(_data)); } catch(e) {}
        recomputeStats();
        renderRoadmapList();
      });
    });

    try {
      const sr = localStorage.getItem(STATS_KEY);
      if (sr) _stats = { ..._stats, ...JSON.parse(sr) };
    } catch(e) {}
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(_data)); } catch(e) {}
    // Sync to backend asynchronously — fire-and-forget, localStorage is the fallback
    _isLoggedIn().then(loggedIn => { if (loggedIn) _saveToBackend(); });
  }

  function saveStats() {
    try { localStorage.setItem(STATS_KEY, JSON.stringify(_stats)); } catch(e) {}
  }

  function recomputeStats() {
    let completedDays = 0, totalPomodoro = 0;
    _data.roadmaps.forEach(rm => {
      (rm.weeks || []).forEach(wk => {
        (wk.days || []).forEach(d => {
          if (d.completed) completedDays++;
          totalPomodoro += (d.pomodoroCount || 0);
        });
      });
    });
    _stats = { completedDays, totalPomodoro };
    saveStats();
  }

  /* ══════════════════════════════════════════
     FACTORY
  ══════════════════════════════════════════ */
  function buildRoadmap(title, level, numWeeks) {
    const weeks = [];
    for (let w = 1; w <= numWeeks; w++) {
      const days = [];
      for (let d = 1; d <= 7; d++) {
        days.push(makeDayObj((w - 1) * 7 + d));
      }
      weeks.push({ week: w, days });
    }
    const emojiMap = { Beginner: '🟢', Intermediate: '🟡', Advanced: '🔴' };
    return {
      id:        uid(),
      title,
      level:     level || null,
      emoji:     emojiMap[level] || '📚',
      createdAt: Date.now(),
      weeks,
    };
  }

  function makeDayObj(dayNum) {
    return {
      day:           dayNum,
      tasks:         [],
      completed:     false,
      notes:         '',
      pomodoroCount: 0,
      revisionDates: [],
    };
  }

  /* ══════════════════════════════════════════
     HELPERS
  ══════════════════════════════════════════ */
  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function escH(str) {
    return String(str || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function _todayStr() {
    return new Date().toLocaleDateString('en-CA');
  }

  function _nextDayStr() {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toLocaleDateString('en-CA');
  }

  /* ── Finders ── */
  function getRoadmap(id)         { return _data.roadmaps.find(r => r.id === id); }
  function getWeekByNum(rm, wNum) { return (rm?.weeks || []).find(w => w.week === wNum); }
  function getDayByNum(wk, dNum)  { return (wk?.days  || []).find(d => d.day  === dNum); }
  function getCurrentDay() {
    const rm = getRoadmap(_nav.roadmapId);
    const wk = rm ? getWeekByNum(rm, _nav.weekNum) : null;
    return wk ? getDayByNum(wk, _nav.dayNum) : null;
  }

  /* ── Progress ── */
  function getRoadmapProgress(rm) {
    let done = 0, total = 0;
    (rm.weeks || []).forEach(wk =>
      (wk.days || []).forEach(d => { total++; if (d.completed) done++; })
    );
    return { done, total, pct: total > 0 ? Math.round(done / total * 100) : 0 };
  }

  function getWeekProgress(wk) {
    const total = (wk.days || []).length;
    const done  = (wk.days || []).filter(d => d.completed).length;
    return { done, total, pct: total > 0 ? Math.round(done / total * 100) : 0 };
  }

  function getDayTaskProgress(d) {
    const tasks = d.tasks || [];
    const total = tasks.length;
    const done  = tasks.filter(t => t.done).length;
    return { done, total, pct: total > 0 ? Math.round(done / total * 100) : 0 };
  }

  /* ── Header ── */
  function updateHeader() {
    const rm  = getRoadmap(_nav.roadmapId);
    const tEl = document.getElementById('crm-hdr-title');
    const sEl = document.getElementById('crm-hdr-sub');

    let title = 'My Roadmaps';
    let sub   = 'Your custom learning paths';

    if (_nav.screen === 'roadmap' && rm) {
      title = `${rm.emoji || '📚'} ${rm.title}`;
      sub   = rm.level
        ? `${rm.level} · ${(rm.weeks || []).length} weeks`
        : `${(rm?.weeks || []).length} weeks`;
    } else if (_nav.screen === 'day-detail' && rm) {
      title = `Day ${_nav.dayNum}`;
      const wk = getWeekByNum(rm, _nav.weekNum);
      sub = wk ? `Week ${wk.week} · ${rm.title}` : 'Day Detail';
    }

    if (tEl) tEl.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg> ${escH(title)}`;
    if (sEl) sEl.textContent = sub;
  }

  /* ══════════════════════════════════════════
     TOAST SYSTEM — multi-type with queue
  ══════════════════════════════════════════ */
  const TOAST_ICONS = {
    success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    error:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    info:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    warn:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  };

  /**
   * Show a toast message.
   * @param {string} msg      — message text
   * @param {string} [type]   — 'success' | 'error' | 'info' | 'warn' (default: auto-detect)
   * @param {number} [dur]    — duration in ms (default 2600)
   */
  function toast(msg, type, dur = 2600) {
    // Auto-detect type from emoji if not given
    if (!type) {
      if (msg.startsWith('✓') || msg.includes('🎉') || msg.includes('done') || msg.includes('saved') || msg.includes('created') || msg.includes('ready')) type = 'success';
      else if (msg.includes('❌') || msg.includes('Error') || msg.includes('required') || msg.includes('failed')) type = 'error';
      else if (msg.includes('⚠') || msg.includes('Warning') || msg.includes('auto-generated')) type = 'warn';
      else type = 'info';
    }

    const el = document.getElementById('crm-toast');
    if (!el) return;

    clearTimeout(_toastTimer);
    el.className = `crm-toast toast-${type}`;
    el.innerHTML = `
      <span class="crm-toast-icon">${TOAST_ICONS[type] || ''}</span>
      <span class="crm-toast-text">${escH(msg)}</span>
    `;
    el.classList.add('show');
    _toastTimer = setTimeout(() => el.classList.remove('show'), dur);
  }

  /* ══════════════════════════════════════════
     LOADING STATES
  ══════════════════════════════════════════ */

  /* Skeleton card for list screen */
  function _skeletonCard() {
    return `
    <div class="crm-skeleton-card">
      <div class="crm-skeleton crm-skeleton-emoji"></div>
      <div class="crm-skeleton-info">
        <div class="crm-skeleton crm-skeleton-line-a"></div>
        <div class="crm-skeleton crm-skeleton-line-b"></div>
        <div class="crm-skeleton crm-skeleton-line-c"></div>
      </div>
    </div>`;
  }

  /* Skeleton week card for roadmap screen */
  function _skeletonWeek() {
    return `
    <div class="crm-skeleton-week">
      <div class="crm-skeleton crm-skeleton-wk-num"></div>
      <div class="crm-skeleton-wk-info">
        <div class="crm-skeleton crm-skeleton-line-a"></div>
        <div class="crm-skeleton crm-skeleton-line-b"></div>
      </div>
    </div>`;
  }

  /* Show skeleton in container */
  function _showSkeleton(containerId, builderFn, count = 3) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = Array(count).fill(null).map(builderFn).join('');
  }

  /* Global loading overlay */
  function showLoadingOverlay(label = 'LOADING…') {
    let overlay = document.getElementById('crm-loading-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'crm-loading-overlay';
      overlay.className = 'crm-loading-overlay';
      overlay.innerHTML = `
        <div class="crm-spinner"></div>
        <div class="crm-loading-label">${escH(label)}</div>
      `;
      document.getElementById('crm-screens')?.appendChild(overlay);
    } else {
      overlay.querySelector('.crm-loading-label').textContent = label;
      overlay.classList.remove('hidden');
    }
  }

  function hideLoadingOverlay() {
    const overlay = document.getElementById('crm-loading-overlay');
    if (!overlay) return;
    overlay.classList.add('hidden');
    setTimeout(() => overlay.remove(), 300);
  }

  /* ══════════════════════════════════════════
     SCREEN NAVIGATION — with direction support
  ══════════════════════════════════════════ */
  const SCREEN_ORDER = ['list', 'roadmap', 'day-detail'];

  function showScreen(name, direction) {
    const currentIndex = SCREEN_ORDER.indexOf(_nav.screen);
    const nextIndex    = SCREEN_ORDER.indexOf(name);
    const goingBack    = direction === 'back' || (direction == null && nextIndex < currentIndex);

    document.querySelectorAll('.crm-screen').forEach(s => s.classList.remove('active', 'slide-back'));
    const target = document.getElementById(`crm-screen-${name}`);
    if (target) {
      void target.offsetWidth; // reflow
      if (goingBack) target.classList.add('slide-back');
      target.classList.add('active');
    }
    _nav.screen = name;
    updateHeader();
  }

  function goBack() {
    if (_nav.screen === 'day-detail') {
      pomodoro.pause();
      _notesEditMode = false;
      _nav.dayNum = null;
      showScreen('roadmap', 'back');
      renderRoadmap();
    } else if (_nav.screen === 'roadmap') {
      _nav.roadmapId = null;
      _openWeeks.clear();
      showScreen('list', 'back');
      renderRoadmapList();
    } else {
      showScreen('list', 'back');
      renderRoadmapList();
    }
  }

  function goToRoadmapList() {
    pomodoro.pause();
    _notesEditMode = false;
    _nav = { screen: 'list', roadmapId: null, weekNum: null, dayNum: null };
    _openWeeks.clear();
    showScreen('list', 'back');
    renderRoadmapList();
  }

  /* ══════════════════════════════════════════
     SCREEN: ROADMAP LIST
  ══════════════════════════════════════════ */
  function renderRoadmapList() {
    const list  = document.getElementById('crm-roadmaps-list');
    const empty = document.getElementById('crm-list-empty');
    if (!list) return;

    const rms = _data.roadmaps;

    if (!rms.length) {
      list.innerHTML = '';
      if (empty) {
        empty.style.display = 'flex';
        // Enhanced empty state
        const ico  = empty.querySelector('.crm-empty-ico');
        const title = empty.querySelector('.crm-empty-title');
        const sub   = empty.querySelector('.crm-empty-sub');
        let cta = empty.querySelector('.crm-empty-cta');

        if (ico) ico.classList.add('crm-empty-ico-glow');
        if (title) title.textContent = 'No roadmaps yet';
        if (sub)   sub.textContent   = 'Build your first custom learning path and start tracking your progress';
        if (!cta) {
          cta = document.createElement('button');
          cta.className = 'crm-empty-cta';
          cta.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Create Roadmap`;
          cta.onclick = () => openCreateRoadmap();
          empty.appendChild(cta);
        }
      }
      return;
    }

    if (empty) {
      empty.style.display = 'none';
      // Remove CTA if added
      empty.querySelector('.crm-empty-cta')?.remove();
    }

    list.innerHTML = rms.map((rm, i) => {
      const { done, total, pct } = getRoadmapProgress(rm);
      const levelBadge = rm.level
        ? `<span class="crm-rm-tag" style="color:var(--c2)">${escH(rm.level).toUpperCase()}</span>`
        : '';
      return `
      <div class="crm-roadmap-card" onclick="CRM.openRoadmap('${rm.id}')" style="animation-delay:${i * 0.05}s">
        <div class="crm-rm-card-body">
          <div class="crm-rm-emoji">${escH(rm.emoji || '📚')}</div>
          <div class="crm-rm-info">
            <div class="crm-rm-name">${escH(rm.title)}</div>
            <div class="crm-rm-meta">
              ${levelBadge}
              <span class="crm-rm-tag">${(rm.weeks || []).length} WEEKS</span>
              <span class="crm-rm-tag">${total} DAYS</span>
              <span class="crm-rm-tag" style="color:var(--c5)">${done} DONE</span>
            </div>
          </div>
          <button class="crm-rm-delete-btn"
            onclick="event.stopPropagation(); CRM.deleteRoadmap('${rm.id}')"
            title="Delete roadmap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
          </button>
          <div class="crm-rm-arrow">›</div>
        </div>
        <div class="crm-rm-prog-row">
          <div class="crm-rm-prog-bar">
            <div class="crm-rm-prog-fill" style="width:${pct}%"></div>
          </div>
          <span class="crm-rm-prog-pct">${pct}%</span>
        </div>
      </div>`;
    }).join('');
  }

  function openRoadmap(id) {
    _nav.roadmapId = id;
    _nav.weekNum   = null;
    _nav.dayNum    = null;
    _openWeeks.clear();
    showScreen('roadmap');
    // Show skeleton briefly for perceived performance
    _showSkeleton('crm-week-cards-list', _skeletonWeek, 4);
    setTimeout(() => renderRoadmap(), 80);
  }

  /* ══════════════════════════════════════════
     SCREEN: ROADMAP (Week Cards + Expandable Days)
  ══════════════════════════════════════════ */
  function renderRoadmap() {
    const rm = getRoadmap(_nav.roadmapId);
    if (!rm) { goBack(); return; }

    const { done, total, pct } = getRoadmapProgress(rm);
    const fill  = document.getElementById('crm-roadmap-prog-fill');
    const label = document.getElementById('crm-roadmap-prog-label');
    const pctEl = document.getElementById('crm-roadmap-prog-pct');
    if (fill)  fill.style.width  = `${pct}%`;
    if (label) label.textContent = `${done} / ${total} days done`;
    if (pctEl) pctEl.textContent = `${pct}%`;

    const strip = document.getElementById('crm-roadmap-info-strip');
    if (strip) {
      const levelColor = { Beginner: 'var(--c5)', Intermediate: 'var(--c4)', Advanced: 'var(--c3)' }[rm.level] || 'var(--c1)';
      strip.innerHTML = `
        <div class="crm-rm-strip-title">${escH(rm.emoji || '📚')} ${escH(rm.title)}</div>
        <div class="crm-rm-strip-meta">
          ${rm.level ? `<span class="crm-rm-strip-badge" style="color:${levelColor};border-color:${levelColor}22;background:${levelColor}11">${escH(rm.level)}</span>` : ''}
          <span class="crm-rm-strip-badge">${(rm.weeks || []).length} WEEKS</span>
          <span class="crm-rm-strip-badge">${total} DAYS</span>
        </div>`;
    }

    const container = document.getElementById('crm-week-cards-list');
    const empty     = document.getElementById('crm-roadmap-empty');
    const weeks     = rm.weeks || [];

    if (!weeks.length) {
      if (container) container.innerHTML = '';
      if (empty) {
        empty.style.display = 'flex';
        // Enhanced inline empty
        const ico = empty.querySelector('.crm-empty-ico');
        if (ico) ico.classList.add('crm-empty-ico-glow');
      }
      return;
    }
    if (empty) empty.style.display = 'none';

    if (container) {
      container.innerHTML = weeks.map((wk, i) => _buildWeekCard(wk, rm, i)).join('');
      _openWeeks.forEach(wNum => {
        const card = document.getElementById(`crm-wk-card-${wNum}`);
        if (card) card.classList.add('open');
      });
    }
  }

  function _buildWeekCard(wk, rm, idx = 0) {
    const { done, total, pct } = getWeekProgress(wk);
    const isComplete = done === total && total > 0;
    const isOpen     = _openWeeks.has(wk.week);
    const firstDay   = (wk.week - 1) * 7 + 1;
    const lastDay    = wk.week * 7;

    const daysHtml = (wk.days || []).map(d => {
      const isDone = d.completed;
      const { done: tDone, total: tTotal } = getDayTaskProgress(d);
      const preview = d.notes
        ? escH(d.notes.split('\n')[0].slice(0, 44)) + (d.notes.length > 44 ? '…' : '')
        : '<span style="color:var(--t3);font-style:italic;font-size:11px;">Tap to add notes</span>';

      const pomoBadge = d.pomodoroCount > 0
        ? `<span class="crm-day-meta-pill crm-day-meta-pomo">🍅 ${d.pomodoroCount}</span>` : '';
      const taskBadge = tTotal > 0
        ? `<span class="crm-day-meta-pill">📋 ${tDone}/${tTotal}</span>` : '';
      const doneBadge = isDone
        ? `<span class="crm-day-meta-pill crm-day-meta-done">✓ DONE</span>` : '';

      return `
      <div class="crm-ai-day-item ${isDone ? 'crm-ai-day-done' : ''}" onclick="CRM.openDay(${d.day}, ${wk.week})">
        <div class="crm-ai-day-num-box">
          <div class="crm-ai-day-lbl">DAY</div>
          <div class="crm-ai-day-val">${d.day}</div>
        </div>
        <div class="crm-ai-day-info">
          <div class="crm-ai-day-preview">${preview}</div>
          <div class="crm-ai-day-meta-row">${pomoBadge}${taskBadge}${doneBadge}</div>
        </div>
        <div class="crm-ai-day-check ${isDone ? 'crm-ai-day-check-done' : ''}"
          onclick="event.stopPropagation(); CRM.quickToggleDay(${d.day}, ${wk.week})">
          ${isDone ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>` : ''}
        </div>
      </div>`;
    }).join('');

    return `
    <div class="crm-ai-week-card ${isComplete ? 'crm-ai-week-complete' : ''} ${isOpen ? 'open' : ''}"
      id="crm-wk-card-${wk.week}"
      style="animation-delay:${idx * 0.06}s">
      <div class="crm-ai-week-header" onclick="CRM.toggleWeek(${wk.week})">
        <div class="crm-ai-week-num ${isComplete ? 'crm-ai-week-num-done' : ''}">
          <div class="crm-ai-week-num-lbl">WK</div>
          <div class="crm-ai-week-num-val">${wk.week}</div>
        </div>
        <div class="crm-ai-week-info">
          <div class="crm-ai-week-title">Week ${wk.week}</div>
          <div class="crm-ai-week-sub">Day ${firstDay} – Day ${lastDay}</div>
          <span class="crm-ai-week-time-badge">${done}/${total} days done</span>
        </div>
        <div class="crm-ai-week-right">
          <div class="crm-ai-week-prog-txt">${pct}%</div>
          <div class="crm-ai-week-mini-prog">
            <div class="crm-ai-week-mini-fill" style="width:${pct}%"></div>
          </div>
          <div class="crm-ai-week-expand">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </div>
      </div>
      <div class="crm-ai-week-body">
        <div class="crm-ai-week-body-inner">
          ${daysHtml}
        </div>
      </div>
    </div>`;
  }

  function toggleWeek(weekNum) {
    const card = document.getElementById(`crm-wk-card-${weekNum}`);
    if (!card) return;
    const isOpen = card.classList.contains('open');
    if (isOpen) {
      card.classList.remove('open');
      _openWeeks.delete(weekNum);
    } else {
      card.classList.add('open');
      _openWeeks.add(weekNum);
    }
    _nav.weekNum = isOpen ? null : weekNum;
  }

  /* ══════════════════════════════════════════
     DAY OPERATIONS
  ══════════════════════════════════════════ */
  function openDay(dayNum, weekNum) {
    _nav.dayNum  = dayNum;
    _nav.weekNum = weekNum;
    _notesEditMode = false;
    pomodoro.bindDay(dayNum, weekNum);
    showScreen('day-detail');
    renderDayDetail();
  }

  function quickToggleDay(dayNum, weekNum) {
    const rm = getRoadmap(_nav.roadmapId);
    const wk = rm ? getWeekByNum(rm, weekNum) : null;
    const d  = wk ? getDayByNum(wk, dayNum) : null;
    if (!d) return;
    _toggleDayCompleted(d);
    save();
    recomputeStats();
    renderRoadmap();
    if (d.completed) {
      toast(`✓ Day ${dayNum} marked complete!`, 'success');
    } else {
      toast(`Day ${dayNum} marked as pending`, 'info');
    }
  }

  function _toggleDayCompleted(d) {
    d.completed = !d.completed;
    if (d.completed) {
      const nextDay = _nextDayStr();
      if (!d.revisionDates.includes(nextDay)) {
        d.revisionDates.push(nextDay);
      }
    }
  }

  /* ══════════════════════════════════════════
     SCREEN: DAY DETAIL
  ══════════════════════════════════════════ */
  function renderDayDetail() {
    const rm = getRoadmap(_nav.roadmapId);
    const wk = rm ? getWeekByNum(rm, _nav.weekNum) : null;
    const d  = wk ? getDayByNum(wk, _nav.dayNum) : null;
    if (!d) { goBack(); return; }

    /* Badge + title */
    const badge = document.getElementById('crm-day-num-badge');
    const title = document.getElementById('crm-day-detail-title');
    if (badge) badge.textContent = `DAY ${d.day}`;
    if (title) {
      const firstLine = d.notes ? d.notes.split('\n')[0].trim().slice(0, 60) : '';
      title.textContent = firstLine || `Day ${d.day}`;
    }

    /* Meta */
    const metaEl = document.getElementById('crm-day-detail-meta');
    if (metaEl) {
      const { done: tDone, total: tTotal } = getDayTaskProgress(d);
      const parts = [
        `Week ${_nav.weekNum}`,
        d.pomodoroCount > 0 ? `🍅 ${d.pomodoroCount}` : null,
        tTotal > 0 ? `📋 ${tDone}/${tTotal} tasks` : null,
      ].filter(Boolean);
      metaEl.innerHTML = parts.map(p => `<span>${escH(p)}</span>`).join('');
    }

    _renderTaskProgress(d);
    _renderNotes(d);
    _renderTaskList(d);

    /* Revision dates */
    const revBlock = document.getElementById('crm-day-notes-block');
    const revText  = document.getElementById('crm-day-notes-text');
    if (d.revisionDates && d.revisionDates.length) {
      if (revBlock) revBlock.style.display = '';
      if (revText)  revText.innerHTML = d.revisionDates
        .map(dt => `<span class="crm-rev-badge">${escH(dt)}</span>`)
        .join(' ');
    } else {
      if (revBlock) revBlock.style.display = 'none';
    }

    /* Pomodoro count */
    const pomoCountEl = document.getElementById('crm-pomo-count');
    if (pomoCountEl) pomoCountEl.textContent = d.pomodoroCount || 0;

    /* Completion */
    const btn    = document.getElementById('crm-complete-btn');
    const label  = document.getElementById('crm-complete-btn-label');
    const status = document.getElementById('crm-complete-status');
    if (d.completed) {
      if (btn)   btn.className    = 'crm-complete-btn crm-done-btn';
      if (label) label.textContent = '✓ Completed';
      const lastDate = d.revisionDates.length ? d.revisionDates[d.revisionDates.length - 1] : '';
      if (status) status.textContent = lastDate ? `Revision: ${lastDate}` : 'Completed';
    } else {
      if (btn)   btn.className    = 'crm-complete-btn';
      if (label) label.textContent = 'Mark as Done';
      if (status) status.textContent = '';
    }

    updateHeader();
  }

  /* ── Progress render ── */
  function _renderTaskProgress(d) {
    const { done, total, pct } = getDayTaskProgress(d);
    const block = document.getElementById('crm-day-progress-block');
    const label = document.getElementById('crm-day-prog-label');
    const pctEl = document.getElementById('crm-day-prog-pct');
    const fill  = document.getElementById('crm-day-prog-fill');

    if (block) block.style.display = '';
    if (label) label.textContent   = total > 0 ? `${done} / ${total} tasks` : 'No tasks yet';
    if (pctEl) {
      pctEl.textContent  = `${pct}%`;
      pctEl.style.color  = pct === 100 ? 'var(--c5)' : 'var(--c1)';
    }
    if (fill) fill.style.width = `${pct}%`;
  }

  /* ── Notes render ── */
  function _renderNotes(d) {
    const textEl   = document.getElementById('crm-day-goal-text');
    const textarea = document.getElementById('crm-day-notes-inline');
    const saveRow  = document.getElementById('crm-notes-save-row');

    if (!_notesEditMode) {
      if (textEl) {
        textEl.style.display = '';
        if (d.notes) {
          textEl.textContent = d.notes;
        } else {
          textEl.innerHTML = `
            <div class="crm-empty-inline">
              <div class="crm-empty-inline-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </div>
              No notes yet — tap ✎ to add
            </div>`;
        }
      }
      if (textarea) textarea.style.display = 'none';
      if (saveRow)  saveRow.style.display  = 'none';
    } else {
      if (textEl)   textEl.style.display   = 'none';
      if (textarea) { textarea.style.display = ''; textarea.value = d.notes || ''; textarea.focus(); }
      if (saveRow)  saveRow.style.display  = '';
    }
  }

  /* ── Task list render ── */
  function _renderTaskList(d) {
    const container = document.getElementById('crm-task-list-inner');
    if (!container) return;

    const tasks = d.tasks || [];
    if (!tasks.length) {
      container.innerHTML = `
        <div class="crm-empty-inline">
          <div class="crm-empty-inline-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
          </div>
          No tasks yet — add one below
        </div>`;
      return;
    }

    container.innerHTML = tasks.map(t => `
      <div class="crm-task-row ${t.done ? 'crm-task-done' : ''}" id="crm-task-${t.id}">
        <div class="crm-task-check ${t.done ? 'crm-task-check-done' : ''}"
          onclick="CRM.toggleTask('${t.id}')">
          ${t.done ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>` : ''}
        </div>
        <div class="crm-task-text">${escH(t.text)}</div>
        <button class="crm-task-delete-btn" onclick="CRM.deleteTask('${t.id}')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>`).join('');
  }

  /* ══════════════════════════════════════════
     TASK CRUD
  ══════════════════════════════════════════ */
  function addTask() {
    const input = document.getElementById('crm-add-task-input');
    if (!input) return;
    const text = input.value.trim();
    if (!text) {
      toast('Please type a task first', 'warn');
      input.focus();
      return;
    }
    const d = getCurrentDay();
    if (!d) return;

    const task = { id: uid(), text, done: false };
    d.tasks.push(task);
    save();
    input.value = '';

    // Animate new task
    _renderTaskList(d);
    _renderTaskProgress(d);
    const newRow = document.getElementById(`crm-task-${task.id}`);
    if (newRow) newRow.classList.add('crm-task-new');

    toast(`Task added`, 'success', 1800);
    input.focus();
  }

  function toggleTask(taskId) {
    const d = getCurrentDay();
    if (!d) return;
    const task = d.tasks.find(t => t.id === taskId);
    if (!task) return;
    task.done = !task.done;
    save();
    _renderTaskList(d);
    _renderTaskProgress(d);
    if (task.done) {
      toast(`✓ Task done!`, 'success', 1600);
    }
  }

  function deleteTask(taskId) {
    const d = getCurrentDay();
    if (!d) return;
    const row = document.getElementById(`crm-task-${taskId}`);
    if (row) {
      row.classList.add('crm-task-removing');
      setTimeout(() => {
        d.tasks = d.tasks.filter(t => t.id !== taskId);
        save();
        _renderTaskList(d);
        _renderTaskProgress(d);
      }, 200);
    } else {
      d.tasks = d.tasks.filter(t => t.id !== taskId);
      save();
      _renderTaskList(d);
      _renderTaskProgress(d);
    }
    toast('Task removed', 'info', 1600);
  }

  /* ══════════════════════════════════════════
     NOTES INLINE
  ══════════════════════════════════════════ */
  function toggleNotesEdit() {
    _notesEditMode = !_notesEditMode;
    const d = getCurrentDay();
    if (d) _renderNotes(d);
  }

  function autoSaveNotes() {
    clearTimeout(_notesSaveTimer);
    _notesSaveTimer = setTimeout(() => saveNotesInline(true), 2200);
  }

  function saveNotesInline(silent = false) {
    clearTimeout(_notesSaveTimer);
    const d = getCurrentDay();
    if (!d) return;
    const textarea = document.getElementById('crm-day-notes-inline');
    if (!textarea) return;
    d.notes = textarea.value.trim();
    save();
    _notesEditMode = false;
    _renderNotes(d);
    // Update day title
    const title = document.getElementById('crm-day-detail-title');
    if (title) {
      const firstLine = d.notes ? d.notes.split('\n')[0].trim().slice(0, 60) : '';
      title.textContent = firstLine || `Day ${d.day}`;
    }
    if (!silent) toast('✓ Notes saved', 'success', 1800);
  }

  /* ══════════════════════════════════════════
     COMPLETE DAY
  ══════════════════════════════════════════ */
  function toggleDayComplete() {
    const rm = getRoadmap(_nav.roadmapId);
    const wk = rm ? getWeekByNum(rm, _nav.weekNum) : null;
    const d  = wk ? getDayByNum(wk, _nav.dayNum) : null;
    if (!d) return;
    _toggleDayCompleted(d);
    save();
    recomputeStats();
    renderDayDetail();
    if (d.completed) {
      _scheduleRevisions(_nav.roadmapId, _nav.dayNum, new Date().toISOString().slice(0, 10));
      toast('🎉 Day completed! Revisions scheduled.', 'success', 3000);
    } else {
      toast('Marked as not done', 'info');
    }
  }

  /* ══════════════════════════════════════════
     DAY MODAL (Edit Day fields)
  ══════════════════════════════════════════ */
  function openAddDay()  {}
  function openEditDay(dayNum, weekNum) {
    const rm = getRoadmap(_nav.roadmapId);
    const wk = rm ? getWeekByNum(rm, weekNum || _nav.weekNum) : null;
    const d  = wk ? getDayByNum(wk, dayNum || _nav.dayNum) : null;
    if (!d) return;

    _editingDayNum = d.day;
    const goalEl      = document.getElementById('crm-inp-day-goal');
    const notesEl     = document.getElementById('crm-inp-day-notes');
    const taskEl      = document.getElementById('crm-inp-day-task');
    const resourcesEl = document.getElementById('crm-inp-day-resources');
    const titleModal  = document.getElementById('crm-modal-day-title');

    if (goalEl)      goalEl.value      = d.notes || '';
    if (notesEl)     notesEl.value     = (d.tasks || []).map(t => t.text).join('\n');
    if (taskEl)      taskEl.value      = d.pomodoroCount || 0;
    if (resourcesEl) resourcesEl.value = (d.revisionDates || []).join(', ');
    if (titleModal)  titleModal.textContent = `Edit Day ${d.day}`;

    openModal('crm-modal-day');
  }

  function closeAddDay() { closeModal('crm-modal-day'); }

  function saveDay() {
    const rm = getRoadmap(_nav.roadmapId);
    const wk = rm ? getWeekByNum(rm, _nav.weekNum) : null;
    const d  = wk ? getDayByNum(wk, _editingDayNum || _nav.dayNum) : null;
    if (!d) return;

    const goalEl      = document.getElementById('crm-inp-day-goal');
    const notesEl     = document.getElementById('crm-inp-day-notes');
    const taskEl      = document.getElementById('crm-inp-day-task');
    const resourcesEl = document.getElementById('crm-inp-day-resources');

    if (goalEl)  d.notes = goalEl.value.trim();
    if (notesEl) {
      const lines = notesEl.value.split('\n').map(l => l.trim()).filter(Boolean);
      d.tasks = lines.map(text => ({ id: uid(), text, done: false }));
    }
    if (taskEl)      d.pomodoroCount = Math.max(0, parseInt(taskEl.value) || 0);
    if (resourcesEl) {
      d.revisionDates = resourcesEl.value
        .split(',').map(s => s.trim()).filter(Boolean);
    }

    save();
    closeAddDay();
    renderDayDetail();
    toast('✓ Day updated', 'success');
  }

  /* ══════════════════════════════════════════
     POMODORO TIMER
  ══════════════════════════════════════════ */
  const pomodoro = (() => {
    let _dayNum  = null;
    let _weekNum = null;
    let _timer   = null;
    let _seconds = 25 * 60;
    let _total   = 25 * 60;
    let _running = false;
    let _mode    = 'FOCUS';
    let _alarmInterval = null;
    let _alarmCtx      = null;
    let _alarmRinging  = false;
    const DURATIONS = { 25: 25 * 60, 15: 15 * 60, 5: 5 * 60 };

    function bindDay(dayNum, weekNum) {
      _dayNum  = dayNum;
      _weekNum = weekNum;
    }

    function _fmt(s) {
      const m = Math.floor(s / 60), sec = s % 60;
      return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    }

    function _updateUI() {
      const timeEl   = document.getElementById('crm-pomo-time');
      const modeEl   = document.getElementById('crm-pomo-mode');
      const playEl   = document.getElementById('crm-pomo-play');
      const progress = document.getElementById('crm-pomo-progress');

      if (timeEl) timeEl.textContent = _fmt(_seconds);
      if (modeEl) modeEl.textContent = _mode;

      if (progress) {
        const r    = 52;
        const circ = 2 * Math.PI * r;
        const pct  = _seconds / _total;
        progress.style.strokeDasharray  = circ;
        progress.style.strokeDashoffset = circ * (1 - pct);
        progress.style.stroke = pct > 0.5 ? 'var(--c1)' : pct > 0.2 ? 'var(--c4)' : 'var(--c3)';
      }

      if (playEl) {
        playEl.innerHTML = _running
          ? `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`
          : `<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
      }
    }

    function toggle() {
      _running = !_running;
      if (_running) {
        _timer = setInterval(() => {
          _seconds--;
          if (_seconds <= 0) {
            clearInterval(_timer);
            _running = false;
            _onComplete();
            return;
          }
          _updateUI();
        }, 1000);
      } else {
        clearInterval(_timer);
      }
      _updateUI();
    }

    function pause() {
      if (!_running) return;
      _running = false;
      clearInterval(_timer);
      _updateUI();
    }

    function reset() {
      pause();
      _seconds = _total;
      _updateUI();
    }

    function setDuration(mins) {
      const secs = DURATIONS[mins] || 25 * 60;
      pause();
      _total = secs;
      _seconds = secs;
      _updateUI();
      document.querySelectorAll('.crm-pomo-dur-btn').forEach(b => {
        b.classList.toggle('active', parseInt(b.dataset.dur) === mins);
      });
    }

    function _onComplete() {
      _mode    = _mode === 'FOCUS' ? 'BREAK' : 'FOCUS';
      _total   = _mode === 'FOCUS' ? 25 * 60 : 5 * 60;
      _seconds = _total;

      if (_mode === 'BREAK') {
        // Save pomodoro
        const rm = getRoadmap(_nav.roadmapId);
        const wk = rm ? getWeekByNum(rm, _weekNum) : null;
        const d  = wk ? getDayByNum(wk, _dayNum) : null;
        if (d) {
          d.pomodoroCount = (d.pomodoroCount || 0) + 1;
          save();
          recomputeStats();
          const countEl = document.getElementById('crm-pomo-count');
          if (countEl) countEl.textContent = d.pomodoroCount;
          toast(`🍅 Pomodoro #${d.pomodoroCount} done! Take a break.`, 'success', 3500);
        }
      } else {
        toast('Break over! Time to focus 🎯', 'info', 2600);
      }
      _updateUI();
    }

    function setCustomDuration() {
      const inp = document.getElementById('crm-pomo-dur-input');
      const mins = Math.max(1, Math.min(180, parseInt(inp?.value) || 25));
      if (inp) inp.value = mins;
      _syncSliderEl(mins);
      setDuration(mins);
      toast(`⏱️ Focus set to ${mins} min`, 'success', 1800);
    }

    function syncSlider() {
      const inp = document.getElementById('crm-pomo-dur-input');
      const val = Math.max(1, Math.min(180, parseInt(inp?.value) || 25));
      _syncSliderEl(val);
    }

    function syncFromSlider() {
      const slider = document.getElementById('crm-pomo-slider');
      const val = parseInt(slider?.value) || 25;
      const inp = document.getElementById('crm-pomo-dur-input');
      if (inp) inp.value = val;
      _clearPresets();
      const match = document.querySelector(`.crm-pomo-preset[data-dur="${val}"]`);
      if (match) match.classList.add('active');
    }

    function setPreset(btn) {
      const val = parseInt(btn.dataset.dur);
      const inp = document.getElementById('crm-pomo-dur-input');
      if (inp) inp.value = val;
      _syncSliderEl(val);
      setDuration(val);
      _clearPresets();
      btn.classList.add('active');
      toast(`⏱️ ${val}m focus set`, 'success', 1600);
    }

    function _syncSliderEl(val) {
      const slider = document.getElementById('crm-pomo-slider');
      if (slider) slider.value = val;
    }

    function _clearPresets() {
      document.querySelectorAll('.crm-pomo-preset').forEach(b => b.classList.remove('active'));
    }

    function stopAlarm() {
      try {
        if (_alarmInterval) { clearInterval(_alarmInterval); _alarmInterval = null; }
        if (_alarmCtx) { _alarmCtx.close(); _alarmCtx = null; }
      } catch(e) {}
      _alarmRinging = false;
      const stopBtn = document.getElementById('crm-pomo-alarm-stop');
      if (stopBtn) stopBtn.style.display = 'none';
      const modeEl = document.getElementById('crm-pomo-mode');
      if (modeEl && modeEl.textContent.includes('DONE')) modeEl.textContent = 'BREAK';
    }

    function init() {
      _updateUI();
      document.querySelectorAll('.crm-pomo-dur-btn').forEach(b => {
        if (parseInt(b.dataset.dur) === 25) b.classList.add('active');
      });
    }

    return { bindDay, toggle, pause, reset, setDuration, setCustomDuration, syncSlider, syncFromSlider, setPreset, stopAlarm, init };
  })();

  /* ══════════════════════════════════════════
     WIZARD — CREATE ROADMAP
  ══════════════════════════════════════════ */
  let _wiz = { step: 1, title: '', level: null, weeks: null };

  function openCreateRoadmap() {
    _wiz = { step: 1, title: '', level: null, weeks: null };
    const inp = document.getElementById('crm-wiz-inp-title');
    if (inp) inp.value = '';
    const cnt = document.getElementById('crm-wiz-title-count');
    if (cnt) cnt.textContent = '0 / 80';
    openModal('crm-modal-create-roadmap');
    _wizGoToStep(1, false);
  }

  function closeCreateRoadmap() {
    closeModal('crm-modal-create-roadmap');
  }

  function _wizGoToStep(step, goingBack) {
    _wiz.step = step;
    document.querySelectorAll('.crm-wizard-step').forEach((el, i) => {
      el.classList.remove('active', 'back-anim');
      if (i + 1 === step) {
        el.classList.add('active');
        if (goingBack) el.classList.add('back-anim');
      }
    });
    document.querySelectorAll('.crm-dot').forEach(dot => {
      const s = parseInt(dot.dataset.step);
      dot.classList.toggle('active', s === step);
      dot.classList.toggle('done',   s <  step);
    });
    const lbl = document.getElementById('crm-wizard-step-label');
    if (lbl) lbl.textContent = `Step ${step} of 4`;
    const backBtn = document.getElementById('crm-wiz-back-btn');
    if (backBtn) backBtn.style.display = step > 1 ? 'flex' : 'none';
    const nextBtn = document.getElementById('crm-wiz-next-btn');
    if (nextBtn) {
      if (step === 4) {
        nextBtn.classList.add('crm-wiz-create-btn');
        nextBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Create Roadmap`;
        nextBtn.disabled = false;
      } else {
        nextBtn.classList.remove('crm-wiz-create-btn');
        nextBtn.innerHTML = `Continue <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;
        nextBtn.disabled = !_wizStepValid(step);
      }
    }
    if (step === 4) _wizPopulateSummary();
  }

  function _wizStepValid(step) {
    if (step === 1) return (_wiz.title || document.getElementById('crm-wiz-inp-title')?.value.trim() || '').length > 0;
    if (step === 2) return true;
    if (step === 3) return _wiz.weeks !== null;
    return true;
  }

  function wizUpdateNext() {
    const inp = document.getElementById('crm-wiz-inp-title');
    if (inp) {
      _wiz.title = inp.value.trim();
      const cnt = document.getElementById('crm-wiz-title-count');
      if (cnt) cnt.textContent = `${inp.value.length} / 80`;
    }
    const nextBtn = document.getElementById('crm-wiz-next-btn');
    if (nextBtn && _wiz.step !== 4) nextBtn.disabled = !_wizStepValid(_wiz.step);
  }

  function wizSelectLevel(btn) {
    document.querySelectorAll('.crm-wiz-option-card').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    _wiz.level = btn.dataset.value || null;
    document.getElementById('crm-wiz-next-btn').disabled = false;
    setTimeout(() => { if (_wiz.step === 2) wizNext(); }, 220);
  }

  function wizSelectWeeks(btn) {
    document.querySelectorAll('.crm-wiz-week-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    _wiz.weeks = parseInt(btn.dataset.value);
    // Hide custom input row
    const customRow = document.getElementById('crm-wiz-custom-week-row');
    if (customRow) customRow.style.display = 'none';
    const preview     = document.getElementById('crm-wiz-weeks-preview');
    const previewText = document.getElementById('crm-wiz-weeks-preview-text');
    if (preview && previewText) {
      const totalDays = _wiz.weeks * 7;
      previewText.textContent = `${_wiz.weeks} week${_wiz.weeks !== 1 ? 's' : ''} · ${totalDays} days (auto-generated)`;
      preview.style.display = 'flex';
    }
    document.getElementById('crm-wiz-next-btn').disabled = false;
    setTimeout(() => { if (_wiz.step === 3) wizNext(); }, 220);
  }

  function wizSelectWeeksCustom(btn) {
    document.querySelectorAll('.crm-wiz-week-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    _wiz.weeks = null;
    // Show custom input
    const customRow = document.getElementById('crm-wiz-custom-week-row');
    if (customRow) customRow.style.display = 'flex';
    const inp = document.getElementById('crm-wiz-custom-week-inp');
    if (inp) { inp.value = ''; inp.focus(); }
    // Hide preview until user types
    const preview = document.getElementById('crm-wiz-weeks-preview');
    if (preview) preview.style.display = 'none';
    document.getElementById('crm-wiz-next-btn').disabled = true;
  }

  function wizCustomWeekInput() {
    const inp = document.getElementById('crm-wiz-custom-week-inp');
    if (!inp) return;
    const val = parseInt(inp.value);
    const preview     = document.getElementById('crm-wiz-weeks-preview');
    const previewText = document.getElementById('crm-wiz-weeks-preview-text');
    if (val && val >= 1 && val <= 520) {
      _wiz.weeks = val;
      if (preview && previewText) {
        previewText.textContent = `${val} week${val !== 1 ? 's' : ''} · ${val * 7} days (auto-generated)`;
        preview.style.display = 'flex';
      }
      document.getElementById('crm-wiz-next-btn').disabled = false;
    } else {
      _wiz.weeks = null;
      if (preview) preview.style.display = 'none';
      document.getElementById('crm-wiz-next-btn').disabled = true;
    }
  }

  function _wizPopulateSummary() {
    const title    = _wiz.title || document.getElementById('crm-wiz-inp-title')?.value.trim() || '—';
    const level    = _wiz.level || 'Skipped';
    const numWeeks = _wiz.weeks || 0;
    const g = id => document.getElementById(id);
    if (g('crm-sum-title')) g('crm-sum-title').textContent = title;
    if (g('crm-sum-level')) g('crm-sum-level').textContent = level;
    if (g('crm-sum-weeks')) g('crm-sum-weeks').textContent = `${numWeeks} week${numWeeks !== 1 ? 's' : ''}`;
    if (g('crm-sum-days'))  g('crm-sum-days').textContent  = `${numWeeks * 7} days (${numWeeks} × 7)`;
  }

  function wizNext() {
    if (_wiz.step === 1) {
      const inp  = document.getElementById('crm-wiz-inp-title');
      _wiz.title = inp ? inp.value.trim() : '';
      if (!_wiz.title) { toast('Please enter a roadmap title.', 'warn'); return; }
    }
    if (_wiz.step < 4) {
      _wizGoToStep(_wiz.step + 1, false);
    } else {
      wizFinish();
    }
  }

  function wizBack() {
    if (_wiz.step > 1) _wizGoToStep(_wiz.step - 1, true);
  }

  function wizFinish() {
    const title = _wiz.title || document.getElementById('crm-wiz-inp-title')?.value.trim() || '';
    if (!title) { toast('Roadmap title is required.', 'error'); return; }
    const numWeeks = _wiz.weeks || 4;

    // Button loading state
    const nextBtn = document.getElementById('crm-wiz-next-btn');
    if (nextBtn) {
      nextBtn.classList.add('crm-btn-loading');
      nextBtn.disabled = true;
    }

    setTimeout(() => {
      const rm = buildRoadmap(title, _wiz.level, numWeeks);
      _data.roadmaps.push(rm);
      save();
      recomputeStats();

      if (nextBtn) {
        nextBtn.classList.remove('crm-btn-loading');
        nextBtn.classList.add('crm-wiz-success-pulse');
        setTimeout(() => nextBtn.classList.remove('crm-wiz-success-pulse'), 700);
      }

      closeCreateRoadmap();
      toast(`🎉 Roadmap created! ${numWeeks} weeks · ${numWeeks * 7} days`, 'success', 3200);

      _nav.roadmapId = rm.id;
      _nav.weekNum   = null;
      _nav.dayNum    = null;
      _openWeeks.clear();
      showScreen('roadmap');
      _showSkeleton('crm-week-cards-list', _skeletonWeek, 4);
      setTimeout(() => renderRoadmap(), 100);
    }, 320);
  }

  function saveRoadmap() { wizFinish(); }

  function deleteRoadmap(id) {
    const rm = getRoadmap(id);
    if (!rm) return;
    if (!confirm(`Delete "${rm.title}"? This cannot be undone.`)) return;
    _data.roadmaps = _data.roadmaps.filter(r => r.id !== id);
    save();
    recomputeStats();
    renderRoadmapList();
    toast(`Roadmap deleted`, 'info');
  }

  /* ══════════════════════════════════════════
     STUBS — keep HTML onclick references alive
  ══════════════════════════════════════════ */
  function openAddLevel()     {}
  function openEditLevel()    {}
  function closeAddLevel()    { closeModal('crm-modal-level'); }
  function selectLevelColor() {}
  function saveLevel()        {}
  function deleteLevel()      {}
  function openLevel()        {}

  function openAddWeek()  { toast('Weeks are auto-generated during roadmap creation.', 'info'); }
  function openEditWeek() {}
  function closeAddWeek() { closeModal('crm-modal-week'); }
  function saveWeek()     {}
  function deleteWeek()   {}
  function openWeek()     {}

  function openWeekScreen(weekNum) { toggleWeek(weekNum); }

  /* ══════════════════════════════════════════
     MODAL HELPERS
  ══════════════════════════════════════════ */
  function openModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('open');
  }
  function closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('open');
  }

  /* ══════════════════════════════════════════
     KEYBOARD SHORTCUTS
  ══════════════════════════════════════════ */
  function setupKeyboard() {
    document.getElementById('crm-wiz-inp-title')?.addEventListener('keydown', e => {
      if (e.key === 'Enter') wizNext();
    });
    document.getElementById('crm-add-task-input')?.addEventListener('keydown', e => {
      if (e.key === 'Enter') addTask();
    });
    document.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      ['crm-modal-create-roadmap', 'crm-modal-level', 'crm-modal-week', 'crm-modal-day']
        .forEach(id => closeModal(id));
    });
  }

  /* ══════════════════════════════════════════
     DAY SUBTAB SWITCHING
  ══════════════════════════════════════════ */
  function switchDaySub(name, btn) {
    // Switch subtab buttons
    document.querySelectorAll('.crm-subtab').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    // Switch sub panels
    document.querySelectorAll('.crm-day-sub').forEach(p => p.classList.remove('active'));
    const panel = document.getElementById('crm-day-sub-' + name);
    if (panel) panel.classList.add('active');
    // Render content on switch
    if (name === 'revision') _renderRevisionSub();
    if (name === 'notes')    _renderNotesSub();
    if (name === 'pomo')     _renderPomoFocusHours();
    if (name === 'projects') _renderProjectsSub();
  }

  /* ── Revision sub ── */
  const REVISION_INTERVALS = [1, 3, 7, 14, 30];

  function _getRevisions() {
    try { return JSON.parse(localStorage.getItem('crm_revisions') || '[]'); } catch(e) { return []; }
  }
  function _saveRevisions(list) {
    try { localStorage.setItem('crm_revisions', JSON.stringify(list)); } catch(e) {}
  }

  function _scheduleRevisions(roadmapId, dayNum, completedDate) {
    let list = _getRevisions().filter(r => !(r.roadmapId === roadmapId && r.dayNum === dayNum));
    REVISION_INTERVALS.forEach((days, idx) => {
      const d = new Date(completedDate);
      d.setDate(d.getDate() + days);
      list.push({
        id: uid(), roadmapId, dayNum,
        date: d.toISOString().slice(0, 10),
        interval: days, idx, done: false,
      });
    });
    _saveRevisions(list);
  }

  function _renderRevisionSub() {
    const rm = getRoadmap(_nav.roadmapId);
    const listEl = document.getElementById('crm-revision-list');
    const emptyEl = document.getElementById('crm-revision-empty');
    if (!listEl) return;
    const revs = _getRevisions().filter(r => r.roadmapId === _nav.roadmapId && r.dayNum === _nav.dayNum);
    if (!revs.length) {
      if (emptyEl) emptyEl.style.display = '';
      listEl.innerHTML = '';
      return;
    }
    if (emptyEl) emptyEl.style.display = 'none';
    const today = new Date().toISOString().slice(0, 10);
    listEl.innerHTML = revs.map(r => {
      const isDue = r.date <= today && !r.done;
      const isOverdue = r.date < today && !r.done;
      const statusClass = r.done ? 'crm-rev-done' : isDue ? 'crm-rev-due' : 'crm-rev-upcoming';
      const statusLabel = r.done ? '✅ Done' : isOverdue ? '⚠️ Overdue' : isDue ? '🔔 Due Today' : `📅 ${r.date}`;
      return `<div class="crm-rev-row ${statusClass}">
        <div class="crm-rev-info">
          <div class="crm-rev-interval">+${r.interval} day${r.interval !== 1 ? 's' : ''} revision</div>
          <div class="crm-rev-date">${statusLabel}</div>
        </div>
        ${!r.done ? `<button class="crm-rev-done-btn" onclick="CRM.markRevisionDone('${r.id}')">Done</button>` : ''}
      </div>`;
    }).join('');
  }

  function markRevisionDone(id) {
    const list = _getRevisions();
    const rev = list.find(r => r.id === id);
    if (rev) { rev.done = true; _saveRevisions(list); _renderRevisionSub(); toast('✅ Revision marked done!', 'success'); }
  }

  /* ── Notes entries sub ── */
  function _getNoteEntries(roadmapId, dayNum) {
    try { return JSON.parse(localStorage.getItem(`crm_notes_${roadmapId}_${dayNum}`) || '[]'); } catch(e) { return []; }
  }
  function _saveNoteEntries(roadmapId, dayNum, entries) {
    try { localStorage.setItem(`crm_notes_${roadmapId}_${dayNum}`, JSON.stringify(entries)); } catch(e) {}
  }

  function saveNotesInline(silent = false) {
    const textarea = document.getElementById('crm-day-notes-inline');
    const textEl   = document.getElementById('crm-day-goal-text');
    if (!textarea) return;
    const val = textarea.value.trim();

    // Update day notes field
    const rm = getRoadmap(_nav.roadmapId);
    const wk = rm ? getWeekByNum(rm, _nav.weekNum) : null;
    const d  = wk ? getDayByNum(wk, _nav.dayNum)  : null;
    if (d) { d.notes = val; save(); }

    // Save as a dated entry if non-empty
    if (val) {
      const entries = _getNoteEntries(_nav.roadmapId, _nav.dayNum);
      entries.unshift({ id: uid(), text: val, date: new Date().toLocaleDateString() });
      _saveNoteEntries(_nav.roadmapId, _nav.dayNum, entries.slice(0, 20));
    }

    if (textEl) {
      textEl.textContent = val || '';
      textEl.style.display = val ? '' : 'none';
    }
    textarea.style.display = 'none';
    const saveRow = document.getElementById('crm-notes-save-row');
    if (saveRow) saveRow.style.display = 'none';
    _notesEditMode = false;
    if (!silent) toast('Notes saved ✓', 'success', 1800);
    _renderNotesSub();
  }

  function _renderNotesSub() {
    const entries = _getNoteEntries(_nav.roadmapId, _nav.dayNum);
    const listEl = document.getElementById('crm-notes-entries-list');
    if (!listEl) return;
    if (!entries.length) {
      listEl.innerHTML = '<div class="crm-empty-inline">No saved entries yet — write notes and save them above.</div>';
      return;
    }
    listEl.innerHTML = entries.map(e => `
      <div class="crm-notes-entry-card">
        <div class="crm-notes-entry-date">${escH(e.date)}</div>
        <div class="crm-notes-entry-text">${escH(e.text)}</div>
      </div>`).join('');
  }

  /* ── Pomo focus hours ── */
  function _renderPomoFocusHours() {
    const count = (() => {
      const rm = getRoadmap(_nav.roadmapId);
      const wk = rm ? getWeekByNum(rm, _nav.weekNum) : null;
      const d  = wk ? getDayByNum(wk, _nav.dayNum)  : null;
      return d ? (d.pomodoroCount || 0) : 0;
    })();
    const dur = parseInt(document.getElementById('crm-pomo-dur-input')?.value) || 25;
    const hrs = ((count * dur) / 60).toFixed(1);
    const el = document.getElementById('crm-pomo-focus-hours');
    if (el) el.textContent = hrs;
    const countEl = document.getElementById('crm-pomo-count');
    if (countEl) countEl.textContent = count;
  }

  /* ── Projects sub ── */
  function _getProjects(roadmapId, dayNum) {
    try { return JSON.parse(localStorage.getItem(`crm_projects_${roadmapId}_${dayNum}`) || '[]'); } catch(e) { return []; }
  }
  function _saveProjects(roadmapId, dayNum, projects) {
    try { localStorage.setItem(`crm_projects_${roadmapId}_${dayNum}`, JSON.stringify(projects)); } catch(e) {}
  }

  function openAddProject() {
    const name = prompt('Project name:');
    if (!name || !name.trim()) return;
    const projects = _getProjects(_nav.roadmapId, _nav.dayNum);
    projects.push({ id: uid(), name: name.trim(), done: false, date: new Date().toLocaleDateString() });
    _saveProjects(_nav.roadmapId, _nav.dayNum, projects);
    _renderProjectsSub();
    toast('Project added! 🚀', 'success');
  }

  function toggleProject(pid) {
    const projects = _getProjects(_nav.roadmapId, _nav.dayNum);
    const p = projects.find(x => x.id === pid);
    if (p) { p.done = !p.done; _saveProjects(_nav.roadmapId, _nav.dayNum, projects); _renderProjectsSub(); }
  }

  function deleteProject(pid) {
    const projects = _getProjects(_nav.roadmapId, _nav.dayNum).filter(x => x.id !== pid);
    _saveProjects(_nav.roadmapId, _nav.dayNum, projects);
    _renderProjectsSub();
    toast('Project removed', 'info', 1600);
  }

  function _renderProjectsSub() {
    const projects = _getProjects(_nav.roadmapId, _nav.dayNum);
    const listEl = document.getElementById('crm-projects-list');
    if (!listEl) return;
    if (!projects.length) {
      listEl.innerHTML = '<div class="crm-empty-inline">No projects yet — add one to track your builds.</div>';
      return;
    }
    listEl.innerHTML = projects.map(p => `
      <div class="crm-project-row ${p.done ? 'crm-project-done' : ''}">
        <div class="crm-task-check ${p.done ? 'crm-task-check-done' : ''}" onclick="CRM.toggleProject('${p.id}')">
          ${p.done ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>` : ''}
        </div>
        <div class="crm-project-info">
          <div class="crm-project-name">${escH(p.name)}</div>
          <div class="crm-project-date">${escH(p.date)}</div>
        </div>
        <button class="crm-task-delete-btn" onclick="CRM.deleteProject('${p.id}')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>`).join('');
  }

  /* ══════════════════════════════════════════
     INIT
  ══════════════════════════════════════════ */
  function init() {
    load();

    // Show skeleton briefly for initial load
    _showSkeleton('crm-roadmaps-list', _skeletonCard, 3);
    showScreen('list');

    setTimeout(() => {
      renderRoadmapList();
      pomodoro.init();
      setupKeyboard();
    }, 120);
  }

  document.addEventListener('DOMContentLoaded', init);

  /* ── PUBLIC API ── */
  return {
    goBack,
    goToRoadmapList,
    openRoadmap,
    openWeekScreen,
    toggleWeek,
    openDay,
    openLevel,
    openWeek,

    openCreateRoadmap,
    closeCreateRoadmap,
    saveRoadmap,
    deleteRoadmap,

    wizNext,
    wizBack,
    wizUpdateNext,
    wizSelectLevel,
    wizSelectWeeks,
    wizSelectWeeksCustom,
    wizCustomWeekInput,
    wizFinish,

    openAddLevel,
    openEditLevel,
    closeAddLevel,
    selectLevelColor,
    saveLevel,
    deleteLevel,

    openAddWeek,
    openEditWeek,
    closeAddWeek,
    saveWeek,
    deleteWeek,

    openAddDay,
    openEditDay,
    closeAddDay,
    saveDay,
    quickToggleDay,
    toggleDayComplete,

    addTask,
    toggleTask,
    deleteTask,

    toggleNotesEdit,
    autoSaveNotes,
    saveNotesInline,

    switchDaySub,
    markRevisionDone,
    openAddProject,
    toggleProject,
    deleteProject,

    pomodoro,
    getStats: () => ({ ..._stats }),
    toast,
  };

})();
