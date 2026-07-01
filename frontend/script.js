
// ═══════════════════════════════════════════════════════
//  APP CORE — Storage, State, Utilities
// ═══════════════════════════════════════════════════════
const APP = (function() {
  'use strict';

  // ── PWA deferred install prompt (must be declared here for strict mode) ──
  let deferredPrompt = null;

  // ── Storage Keys ──
  const KEYS = {
    AI_PROGRESS:  'roadmapAI',
    DSA_PROGRESS: 'roadmapDSA',
    REVISIONS:    'revisions',
    POMO_STATS:   'pomodoroStats',
    STREAKS:      'streaks',
    PROJECTS:     'projects',
    NOTES:        'extraNotes',
    AI_NOTES:     'aiNotes',
    DSA_NOTES:    'dsaNotes',
    FILES:        'fileStorage',
    LAST_TAB:     'lastTab',
    ATTENDANCE:   'attendance',
    POMO_DURATION:'pomoDuration',
  };

  // ── Storage helpers ──
  function load(key, def = {}) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; }
    catch(e) { return def; }
  }
  function save(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) { console.error('Storage error:', e); }
  }

  // ── Date helpers ──
  function today() {
    // FIX: Build YYYY-MM-DD purely from local date parts.
    // The original used new Date(y,m,d).toISOString() which converts to UTC
    // and can return the previous calendar day in UTC+ timezones at midnight.
    const now = new Date();
    const y  = now.getFullYear();
    const m  = String(now.getMonth() + 1).padStart(2, '0');
    const d  = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  function dateStr(y, m, d) {
    return `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
  }
  function addDays(dateStr, n) {
    // FIX: Parse as local midnight, add days, return local YYYY-MM-DD.
    // Avoids DST edge-case and UTC shift from toISOString().
    const d = new Date(dateStr + 'T00:00:00');
    d.setDate(d.getDate() + n);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
  function daysDiff(a, b) {
    const da = new Date(a + 'T00:00:00'), db = new Date(b + 'T00:00:00');
    return Math.round((db - da) / 86400000);
  }
  function fmtDate(d) {
    if (!d) return '—';
    const [y, m, day] = d.split('-');
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${parseInt(day)} ${months[parseInt(m)-1]} ${y}`;
  }

  // ── UI helpers ──
  let toastTimer;
  function toast(msg, type='info') {
    const el = document.getElementById('toast');
    el.textContent = msg; el.className = `show ${type}`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.className = '', 2800);
  }
  function esc(s) {
    return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
  function openModal(id) { document.getElementById(id).classList.add('show'); }
  function closeModal(id) { document.getElementById(id).classList.remove('show'); }

  // ── State ──
  let state = {
    currentTab: 'ai',
    aiFilter: 'all',
    dsaFilter: 'all',
    revFilter: 'all',
    aiSearch: '',
    dsaSearch: '',
    pomoType: 'ai',
    pomoRunning: false,
    pomoBreak: false,
    pomoAlarmRinging: false,
    pomoSeconds: 25 * 60,
    pomoInterval: null,
    pomoDuration: 25,
    alarmAudio: null,
    alarmInterval: null,
    editProjectId: null,
    editProjectSource: null,
    notesTimer: null,
  };

  // ═══════════════════════════════════════════════════════
  //  HOME SCREEN
  // ═══════════════════════════════════════════════════════
  function renderHome() {
    // Progress bars
    const aiProg  = load(KEYS.AI_PROGRESS,  {});
    const dsaProg = load(KEYS.DSA_PROGRESS, {});
    const pomStats = load(KEYS.POMO_STATS, {ai:0,dsa:0,projects:0,extra:0});
    const streaks  = load(KEYS.STREAKS, {});

    const aiDone  = Object.values(aiProg).filter(v => v.done).length;
    // DSA now uses 't1','t2'... keys matching DSA_WEEK_DATA topic ids
    const dsaAllTopics = typeof DSA_WEEK_DATA !== 'undefined' ? DSA_WEEK_DATA.reduce((a,w)=>a.concat(w.topics),[]) : [];
    const dsaDone = dsaAllTopics.filter(t => dsaProg['t'+t.id]?.done).length;

    // AI uses actual roadmap data length, DSA uses week topic count
    const aiTotal  = typeof AI_ROADMAP_DATA  !== 'undefined' ? AI_ROADMAP_DATA.length  : 0;
    const dsaTotal = dsaAllTopics.length || 20;

    const aiPct  = aiTotal  ? Math.round(aiDone  / aiTotal  * 100) : 0;
    const dsaPct = dsaTotal ? Math.round(dsaDone / dsaTotal * 100) : 0;

    const el = (id) => document.getElementById(id);

    // Progress bars
    const aiFill = el('home-ai-prog');
    if (aiFill) aiFill.style.width = aiPct + '%';
    const dsaFill = el('home-dsa-prog');
    if (dsaFill) dsaFill.style.width = dsaPct + '%';

    // FE progress bar (driven by frontend-roadmap.js updateFEProgress, also update here)
    try {
      if (typeof updateFEProgress === 'function') updateFEProgress();
    } catch(e) {}

    // Stats strip
    const globalStreak = streaks.global?.current || 0;
    const revisions = load(KEYS.REVISIONS, []);
    const revDue = revisions.filter(r => !r.done && r.date <= today()).length;
    if (el('home-stat-ai'))     el('home-stat-ai').textContent     = aiDone;
    if (el('home-stat-dsa'))    el('home-stat-dsa').textContent    = dsaDone;
    if (el('home-stat-streak')) el('home-stat-streak').textContent = globalStreak + '🔥';
    if (el('home-stat-rev'))    el('home-stat-rev').textContent    = revDue;

    // Continue last session button
    const lastTab = load(KEYS.LAST_TAB, null);
    // ai/dsa are now home-only; only offer continue for other tabs
    const validTabs = ['revision','pomo','streak','projects','extra','files','profile'];
    const contBtn   = el('home-continue-btn');
    const contLabel = el('home-continue-label');
    if (contBtn && lastTab && validTabs.includes(lastTab)) {
      const tabNames = {
        revision:'Revision', pomo:'Pomodoro', streak:'Streaks',
        projects:'Projects', extra:'Notes', files:'Files',
        profile:'Profile'
      };
      if (contLabel) contLabel.textContent = `Continue → ${tabNames[lastTab] || lastTab}`;
      contBtn.style.display = 'flex';
    } else if (contBtn) {
      contBtn.style.display = 'none';
    }
  }

  function continueLastSession() {
    const lastTab = load(KEYS.LAST_TAB, null);
    const validTabs = ['revision','pomo','streak','projects','extra','files','profile'];
    switchTab(validTabs.includes(lastTab) ? lastTab : 'home');
  }

  // ═══════════════════════════════════════════════════════
  //  TAB NAVIGATION
  // ═══════════════════════════════════════════════════════
  function switchTab(name) {
    // Deactivate all
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    // Activate new
    document.getElementById('tab-' + name)?.classList.add('active');
    // Nav button is optional (ai/dsa have no nav buttons) — safe fallback
    const navEl = document.getElementById('nav-' + name);
    if (navEl) {
      navEl.classList.add('active');
      navEl.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});
    } else if (name === 'ai' || name === 'dsa') {
      // Highlight Home as "active" in nav when on a roadmap tab
      document.getElementById('nav-home')?.classList.add('active');
    }
    state.currentTab = name;
    // Only persist non-home, non-roadmap tabs as "last tab"
    if (name !== 'home' && name !== 'ai' && name !== 'dsa') save(KEYS.LAST_TAB, name);
    // Tab-specific refresh
    if (name === 'home')       renderHome();
    if (name === 'dsa')        renderDSAWeeks();
    if (name === 'revision')   renderRevisions();
    if (name === 'streak')     renderStreaks();
    if (name === 'projects')   renderProjects();
    if (name === 'profile')    { renderProfile(); }
    if (name === 'files')      renderFiles();
    if (name === 'extra')      renderExtraNotes();
    if (name === 'pomo')       renderPomoStats();
  }

  // ═══════════════════════════════════════════════════════
  //  HOURS HELPERS
  // ═══════════════════════════════════════════════════════
  function getTopicHours(d) {
    // Each day has an estimated time. Project days = 3hrs, else 2hrs default.
    return d.isProject ? 3 : (d.hours || 2);
  }

  // ═══════════════════════════════════════════════════════
  //  SMART PROGRESSION
  // ═══════════════════════════════════════════════════════
  function renderNextTopic(type, progress, data) {
    if (type !== 'ai') return;
    const el = document.getElementById('ai-next-topic');
    if (!el) return;
    const doneDays = Object.keys(progress).filter(k => progress[k]?.done).map(Number).sort((a,b)=>a-b);
    const lastDone = doneDays[doneDays.length - 1] || 0;
    const nextDay = data.find(d => !progress[d.day]?.done);
    if (!nextDay) { el.innerHTML = `<div class="next-topic-card"><div class="next-topic-label">🎉 All Done!</div><div class="next-topic-title">You've completed the entire roadmap!</div></div>`; return; }

    // Detect skipped days
    let skippedCount = 0;
    for (let i = 1; i < lastDone; i++) {
      if (!progress[i]?.done) skippedCount++;
    }

    let html = `<div class="next-topic-card">
      <div class="next-topic-label">🎯 Next Best Topic</div>
      <div class="next-topic-title">${esc(nextDay.isProject ? '🚀 ' + nextDay.title : nextDay.title)}</div>
      <div class="next-topic-sub">Day ${nextDay.day} · ${esc(nextDay.phase)} · ~${getTopicHours(nextDay)}h</div>
    </div>`;
    if (skippedCount > 0) {
      html += `<div class="recovery-card">
        <div style="font-size:10px;font-weight:700;color:var(--c3);letter-spacing:.8px;text-transform:uppercase;font-family:var(--font-mono)">⚠️ Recovery Plan</div>
        <div style="font-size:12px;color:var(--t1);margin-top:4px">You have ${skippedCount} skipped day${skippedCount>1?'s':''}. Try to complete them before moving ahead to strengthen your foundation.</div>
      </div>`;
    }
    el.innerHTML = html;
  }

  // ═══════════════════════════════════════════════════════
  //  INLINE REVISION PANEL (shown inside AI/DSA roadmaps)
  // ═══════════════════════════════════════════════════════
  function renderInlineRevisions(containerId, source) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const revs = load(KEYS.REVISIONS, []);
    const todayStr = today();

    // Only show due/overdue revisions for this source
    const relevant = revs.filter(r => {
      if (r.source !== source) return false;
      return !r.done && r.date <= todayStr;
    }).sort((a, b) => a.date.localeCompare(b.date));

    if (!relevant.length) {
      el.innerHTML = '';
      return;
    }

    const panelId = containerId + '-panel';
    const bodyId  = containerId + '-body';

    el.innerHTML = `
    <div class="inline-rev-panel" id="${panelId}">
      <div class="inline-rev-toggle" onclick="
        var p=document.getElementById('${panelId}');
        p.classList.toggle('open');
      ">
        <div class="inline-rev-toggle-left">
          <span style="font-size:14px">🔁</span>
          <span class="inline-rev-label">REVISIONS DUE</span>
          <span class="inline-rev-count">${relevant.length}</span>
        </div>
        <span class="inline-rev-arrow">▾</span>
      </div>
      <div class="inline-rev-body" id="${bodyId}">
        <div class="inline-rev-body-inner">
          ${relevant.map(r => {
            const overdue = r.date < todayStr;
            const dueColor = overdue ? 'var(--c3)' : 'var(--c4)';
            const dueText  = overdue ? `⚠️ ${daysDiff(r.date, todayStr)}d overdue` : '📌 Due today';
            return `
            <div class="inline-rev-item" id="irev-${r.id}">
              <div class="inline-rev-day">${r.topicDay}</div>
              <div class="inline-rev-info">
                <div class="inline-rev-topic">${esc(r.topicTitle)}</div>
                <div class="inline-rev-due" style="color:${dueColor}">${dueText}</div>
              </div>
              <button class="inline-rev-done-btn ${r.done?'done':''}"
                onclick="APP.markInlineRevDone('${r.id}','${containerId}','${source}')">
                ${r.done ? '✓' : 'Done'}
              </button>
            </div>`;
          }).join('')}
        </div>
      </div>
    </div>`;
  }

  function markInlineRevDone(id, containerId, source) {
    const revs = load(KEYS.REVISIONS, []);
    const idx = revs.findIndex(r => r.id === id);
    if (idx < 0) return;
    revs[idx].done = !revs[idx].done;
    revs[idx].doneDate = revs[idx].done ? today() : null;
    save(KEYS.REVISIONS, revs);
    renderInlineRevisions(containerId, source);
    // Also refresh the dedicated section revision sub-tab if visible
    const secRevEl = document.getElementById(source + '-revision-list');
    if (secRevEl) renderSectionRevisions(source);
    updateHeader();
    toast(revs[idx].done ? '✅ Revision marked complete!' : '↩️ Revision unmarked', 'success');
  }

  // ═══════════════════════════════════════════════════════
  //  STRUCTURED AI ROADMAP — LEVEL / WEEK / DAY NAVIGATION
  // ═══════════════════════════════════════════════════════
  let aiCurrentLevel = null;
  let aiCurrentWeek = null;

  function showScreen(screenId) {
    ['ai-screen-levels','ai-screen-weeks','ai-screen-days'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
    const target = document.getElementById(screenId);
    if (target) target.style.display = 'block';
  }



  // ═══════════════════════════════════════════════════════
  //  DSA WEEK-WISE RENDER SYSTEM
  // ═══════════════════════════════════════════════════════
  function showDSAScreen(id) {
    ['dsa-screen-weeks','dsa-screen-detail'].forEach(sid => {
      const el = document.getElementById(sid);
      if (el) el.style.display = sid === id ? 'block' : 'none';
    });
  }

  function renderDSAWeeks() {
    const prog = load(KEYS.DSA_PROGRESS, {});
    // Overall stats
    const allTopics = DSA_WEEK_DATA.reduce((a, w) => a.concat(w.topics), []);
    const totalHrs = allTopics.length * 2;
    const doneCount = allTopics.filter(t => prog['t' + t.id]?.done).length;
    const doneHrs = doneCount * 2;
    const remHrs = totalHrs - doneHrs;
    const pct = allTopics.length ? Math.round(doneCount / allTopics.length * 100) : 0;

    const totalEl = document.getElementById('dsa-hrs-total');
    const doneEl  = document.getElementById('dsa-hrs-done');
    const remEl   = document.getElementById('dsa-hrs-rem');
    const fillEl  = document.getElementById('dsa-prog-fill');
    const textEl  = document.getElementById('dsa-prog-text');
    const pctEl   = document.getElementById('dsa-prog-pct');
    if (totalEl) totalEl.textContent = totalHrs;
    if (doneEl)  doneEl.textContent  = doneHrs;
    if (remEl)   remEl.textContent   = remHrs;
    if (fillEl)  fillEl.style.width  = pct + '%';
    if (textEl)  textEl.textContent  = doneCount + '/' + allTopics.length + ' topics';
    if (pctEl)   pctEl.textContent   = pct + '%';

    const listEl = document.getElementById('dsa-weeks-list');
    if (!listEl) return;

    let html = '';
    DSA_WEEK_DATA.forEach(week => {
      const total = week.topics.length;
      const done  = week.topics.filter(t => prog['t' + t.id]?.done).length;
      const wpct  = total ? Math.round(done / total * 100) : 0;
      const complete = done === total;

      // Project status
      const projStatus = week.project ? (prog['proj_' + week.project.id] || 'not-started') : null;
      const projStatusClass = projStatus === 'completed' ? 'proj-status-completed' : projStatus === 'in-progress' ? 'proj-status-in-progress' : '';
      const projStatusPillClass = projStatus === 'completed' ? 'status-completed' : projStatus === 'in-progress' ? 'status-in-progress' : 'status-not-started';
      const projStatusLabel = projStatus === 'completed' ? '✓ Completed' : projStatus === 'in-progress' ? '⚡ In Progress' : '○ Not Started';

      html += `<div class="dsa-week-card ${complete ? 'dsa-week-complete' : ''}" id="dsa-wk-${week.week}">
        <div class="dsa-week-header" onclick="APP.toggleDSAWeek(${week.week})">
          <div class="dsa-wk-num">
            <div class="dsa-wk-lbl">WK</div>
            <div class="dsa-wk-val">${week.week}</div>
          </div>
          <div class="dsa-wk-info">
            <div class="dsa-wk-title">${esc(week.title)}</div>
            <div class="dsa-wk-meta">${total} topics · ⏱️ ${esc(week.timeRange)}</div>
            <div class="dsa-wk-phase">${esc(week.phase)}</div>
          </div>
          <div class="dsa-wk-right">
            <div class="dsa-wk-prog-txt">${done}/${total}</div>
            <div class="dsa-wk-mini-prog"><div class="dsa-wk-mini-fill" style="width:${wpct}%"></div></div>
            <div class="dsa-wk-chevron">▾</div>
          </div>
        </div>
        <div class="dsa-week-body">
          <div class="dsa-week-body-inner">
            <!-- Week progress bar -->
            <div class="dsa-wk-full-prog">
              <div class="dsa-wk-full-track"><div class="dsa-wk-full-fill" id="dsa-wk-fill-${week.week}" style="width:${wpct}%"></div></div>
              <div class="dsa-wk-prog-row"><span>${done} of ${total} topics done</span><span>${wpct}%</span></div>
            </div>
            <!-- Topics -->
            <div class="dsa-topic-section">
              <div class="dsa-topic-section-title">📚 Topics</div>
              ${week.topics.map(t => {
                const isDone = !!(prog['t' + t.id]?.done);
                const revs = load(KEYS.REVISIONS, []);
                const todayRevStr = today();
                const topicRevs = revs.filter(r => r.source === 'dsa' && r.topicDay === t.id && !r.done);
                const hasDueRev = topicRevs.some(r => r.date <= todayRevStr);
                const hasUpcomingRev = !hasDueRev && topicRevs.length > 0;
                const revBadge = hasDueRev ? `<span class="topic-rev-badge rev-due">🔁 Revision Due</span>` : hasUpcomingRev ? `<span class="topic-rev-badge rev-upcoming">⏳ Upcoming</span>` : '';
                const resHtml = (t.resources||[]).map(r => {
                  const ico = r.type === 'yt' ? '▶' : '🌐';
                  const bg  = r.type === 'yt' ? 'rgba(255,0,0,.15)' : 'rgba(0,245,212,.1)';
                  return `<a class="resource-link" href="${esc(r.url)}" target="_blank" rel="noopener"><div class="resource-icon" style="background:${bg}">${ico}</div><span>${esc(r.label)}</span></a>`;
                }).join('');
                return `<div class="dsa-topic-item ${isDone ? 'dsa-topic-done' : ''} ${hasDueRev ? 'topic-rev-due' : ''}" id="dsa-t-${t.id}">
                  <div class="dsa-topic-header" onclick="APP.toggleDSATopic(${t.id})">
                    <div class="dsa-topic-dot"></div>
                    <div class="dsa-topic-info">
                      <div class="dsa-topic-name">${esc(t.title)}</div>
                      ${revBadge ? `<div style="margin-top:3px">${revBadge}</div>` : ''}
                    </div>
                    <div class="dsa-topic-cb ${isDone ? 'checked' : ''}" onclick="event.stopPropagation();APP.toggleDSATopicDone(${week.week},${t.id})">${isDone ? '✓' : ''}</div>
                    <div class="dsa-topic-expand">▾</div>
                  </div>
                  <div class="dsa-topic-body">
                    <div class="dsa-topic-body-inner">
                      <div class="dsa-t-section">
                        <div class="dsa-t-section-title">📖 Explanation</div>
                        <div class="dsa-t-text">${esc(t.exp)}</div>
                      </div>
                      ${resHtml ? `<div class="dsa-t-section"><div class="dsa-t-section-title">📺 Resources</div>${resHtml}</div>` : ''}
                      <div class="dsa-t-section">
                        <div class="dsa-t-section-title">💻 Practice</div>
                        <div class="dsa-t-practice">${esc(t.practice)}</div>
                      </div>
                      <div class="dsa-t-section">
                        <div class="dsa-t-section-title">🚀 Task</div>
                        <div class="dsa-t-task">${esc(t.task)}</div>
                      </div>
                    </div>
                  </div>
                </div>`;
              }).join('')}
            </div>

            ${week.project ? `
            <!-- ── WEEK PROJECT ── -->
            <div class="dsa-proj-divider">
              <div class="dsa-proj-divider-line"></div>
              <div class="dsa-proj-divider-label">🏗️ Week ${week.week} Project</div>
              <div class="dsa-proj-divider-line right"></div>
            </div>
            <div class="dsa-proj-card ${projStatusClass}" id="dsa-proj-${week.project.id}">
              <div class="dsa-proj-header" onclick="APP.toggleDSAProject('${week.project.id}')">
                <div class="dsa-proj-icon">🏗️</div>
                <div class="dsa-proj-info">
                  <div class="dsa-proj-badge">⚡ Week Project</div>
                  <div class="dsa-proj-title">${esc(week.project.title)}</div>
                  <div class="dsa-proj-meta">Applies all Week ${week.week} concepts</div>
                </div>
                <div class="dsa-proj-status-pill">
                  <div class="dsa-proj-status ${projStatusPillClass}" id="dsa-proj-status-pill-${week.project.id}">${projStatusLabel}</div>
                  <div class="dsa-proj-chevron" id="dsa-proj-chev-${week.project.id}">▾</div>
                </div>
              </div>
              <div class="dsa-proj-body" id="dsa-proj-body-${week.project.id}">
                <div class="dsa-proj-body-inner">
                  <div class="dsa-proj-desc-box">
                    <div class="dsa-proj-desc-label">📋 Project Description</div>
                    <div class="dsa-proj-desc-text">${esc(week.project.desc)}</div>
                  </div>
                  <div class="dsa-proj-status-label" style="margin-bottom:8px">Update Status:</div>
                  <div class="dsa-proj-status-row">
                    <button class="dsa-proj-status-btn spb-not-started ${projStatus === 'not-started' ? 'active' : ''}"
                      onclick="event.stopPropagation();APP.setDSAProjectStatus('${week.project.id}',${week.week},'not-started')">○ Not Started</button>
                    <button class="dsa-proj-status-btn spb-in-progress ${projStatus === 'in-progress' ? 'active' : ''}"
                      onclick="event.stopPropagation();APP.setDSAProjectStatus('${week.project.id}',${week.week},'in-progress')">⚡ In Progress</button>
                    <button class="dsa-proj-status-btn spb-completed ${projStatus === 'completed' ? 'active' : ''}"
                      onclick="event.stopPropagation();APP.setDSAProjectStatus('${week.project.id}',${week.week},'completed')">✓ Completed</button>
                  </div>
                </div>
              </div>
            </div>` : ''}

          </div>
        </div>
      </div>`;
    });
    listEl.innerHTML = html;
    showDSAScreen('dsa-screen-weeks');
    renderInlineRevisions('dsa-inline-rev-overview', 'dsa');
  }

  function toggleDSAProject(projId) {
    const card = document.getElementById('dsa-proj-' + projId);
    const body = document.getElementById('dsa-proj-body-' + projId);
    const chev = document.getElementById('dsa-proj-chev-' + projId);
    if (!card || !body) return;
    const isOpen = card.classList.contains('dsa-proj-open');
    card.classList.toggle('dsa-proj-open', !isOpen);
    if (chev) chev.style.transform = isOpen ? '' : 'rotate(180deg)';
  }

  function setDSAProjectStatus(projId, weekNum, status) {
    const prog = load(KEYS.DSA_PROGRESS, {});
    prog['proj_' + projId] = status;
    save(KEYS.DSA_PROGRESS, prog);

    // Update card class
    const card = document.getElementById('dsa-proj-' + projId);
    if (card) {
      card.classList.remove('proj-status-completed', 'proj-status-in-progress');
      if (status === 'completed')   card.classList.add('proj-status-completed');
      if (status === 'in-progress') card.classList.add('proj-status-in-progress');
    }

    // Update pill text + class
    const pill = document.getElementById('dsa-proj-status-pill-' + projId);
    if (pill) {
      pill.className = 'dsa-proj-status ' + (status === 'completed' ? 'status-completed' : status === 'in-progress' ? 'status-in-progress' : 'status-not-started');
      pill.textContent = status === 'completed' ? '✓ Completed' : status === 'in-progress' ? '⚡ In Progress' : '○ Not Started';
    }

    // Update status buttons active state
    const body = document.getElementById('dsa-proj-body-' + projId);
    if (body) {
      body.querySelectorAll('.dsa-proj-status-btn').forEach(btn => {
        const s = btn.classList.contains('spb-not-started') ? 'not-started'
                : btn.classList.contains('spb-in-progress') ? 'in-progress' : 'completed';
        btn.classList.toggle('active', s === status);
      });
    }

    const labels = {'not-started':'marked Not Started','in-progress':'started! Keep building 🔨','completed':'completed! Great work! 🎉'};
    toast(`🏗️ Project ${labels[status] || 'updated'}`, status === 'completed' ? 'success' : 'info');
    if (status === 'completed') updateStreak('dsa', true);
  }

  function toggleDSAWeek(weekNum) {
    const card = document.getElementById('dsa-wk-' + weekNum);
    if (!card) return;
    card.classList.toggle('dsa-wk-open');
    // Smooth fill animation on open
    if (card.classList.contains('dsa-wk-open')) {
      const prog = load(KEYS.DSA_PROGRESS, {});
      const week = DSA_WEEK_DATA.find(w => w.week === weekNum);
      if (week) {
        const done = week.topics.filter(t => prog['t' + t.id]?.done).length;
        const pct  = week.topics.length ? Math.round(done / week.topics.length * 100) : 0;
        requestAnimationFrame(() => {
          const fill = document.getElementById('dsa-wk-fill-' + weekNum);
          if (fill) fill.style.width = pct + '%';
        });
      }
    }
  }

  function toggleDSATopic(topicId) {
    const el = document.getElementById('dsa-t-' + topicId);
    if (el) el.classList.toggle('dsa-t-open');
  }

  function toggleDSATopicDone(weekNum, topicId) {
    const prog = load(KEYS.DSA_PROGRESS, {});
    const key = 't' + topicId;
    if (!prog[key]) prog[key] = {};
    prog[key].done = !prog[key].done;
    // Store completion date when first marked done
    if (prog[key].done && !prog[key].completedDate) {
      prog[key].completedDate = today();
    }
    save(KEYS.DSA_PROGRESS, prog);

    // Update UI without full re-render
    const item = document.getElementById('dsa-t-' + topicId);
    const isDone = prog[key].done;
    if (item) {
      item.classList.toggle('dsa-topic-done', isDone);
      const cb = item.querySelector('.dsa-topic-cb');
      if (cb) { cb.classList.toggle('checked', isDone); cb.textContent = isDone ? '✓' : ''; }
      const dot = item.querySelector('.dsa-topic-dot');
      if (dot) dot.style.cssText = isDone ? 'background:var(--c5);border-color:var(--c5);box-shadow:0 0 8px rgba(6,214,160,.4)' : '';
      const name = item.querySelector('.dsa-topic-name');
      if (name) name.style.cssText = isDone ? 'color:var(--t2);text-decoration:line-through' : '';
    }

    // Update week card stats
    const week = DSA_WEEK_DATA.find(w => w.week === weekNum);
    if (week) {
      const done = week.topics.filter(t => prog['t' + t.id]?.done).length;
      const pct  = week.topics.length ? Math.round(done / week.topics.length * 100) : 0;
      const complete = done === week.topics.length;
      const card = document.getElementById('dsa-wk-' + weekNum);
      if (card) {
        card.classList.toggle('dsa-week-complete', complete);
        const ptxt = card.querySelector('.dsa-wk-prog-txt');
        if (ptxt) { ptxt.textContent = done + '/' + week.topics.length; }
        const miniF = card.querySelector('.dsa-wk-mini-fill');
        if (miniF) miniF.style.width = pct + '%';
        const fullF = document.getElementById('dsa-wk-fill-' + weekNum);
        if (fullF) fullF.style.width = pct + '%';
        const progRow = card.querySelector('.dsa-wk-prog-row');
        if (progRow) progRow.innerHTML = `<span>${done} of ${week.topics.length} topics done</span><span>${pct}%</span>`;
      }
    }

    // Update overall header stats
    const allTopics = DSA_WEEK_DATA.reduce((a, w) => a.concat(w.topics), []);
    const doneCount = allTopics.filter(t => prog['t' + t.id]?.done).length;
    const pct2 = allTopics.length ? Math.round(doneCount / allTopics.length * 100) : 0;
    const totalHrs = allTopics.length * 2;
    const doneHrs  = doneCount * 2;
    const totalEl = document.getElementById('dsa-hrs-total');
    const doneEl  = document.getElementById('dsa-hrs-done');
    const remEl   = document.getElementById('dsa-hrs-rem');
    const fillEl  = document.getElementById('dsa-prog-fill');
    const textEl  = document.getElementById('dsa-prog-text');
    const pctEl   = document.getElementById('dsa-prog-pct');
    if (totalEl) totalEl.textContent = totalHrs;
    if (doneEl)  doneEl.textContent  = doneHrs;
    if (remEl)   remEl.textContent   = totalHrs - doneHrs;
    if (fillEl)  fillEl.style.width  = pct2 + '%';
    if (textEl)  textEl.textContent  = doneCount + '/' + allTopics.length + ' topics';
    if (pctEl)   pctEl.textContent   = pct2 + '%';

    updateHeader();
    if (isDone) {
      // Schedule spaced repetition revisions for DSA topic
      const allTopicsFlat = DSA_WEEK_DATA.reduce((a, w) => a.concat(w.topics), []);
      const topicData = allTopicsFlat.find(t => t.id === topicId);
      const topicTitle = topicData ? (topicData.title || topicData.name) : ('Topic ' + topicId);
      if (!prog[key].completedDate) {
        prog[key].completedDate = today();
        save(KEYS.DSA_PROGRESS, prog);
      }
      scheduleRevisions('dsa', topicId, prog[key].completedDate, topicTitle);
      // Refresh DSA section revision sub-tab if loaded
      const dsaRevEl = document.getElementById('dsa-revision-list');
      if (dsaRevEl) renderSectionRevisions('dsa');
      // Refresh inline revision panels
      renderInlineRevisions('dsa-inline-rev-overview', 'dsa');
      renderInlineRevisions('dsa-inline-rev', 'dsa');
      toast('✅ Topic completed! Keep going! 🚀', 'success');
      updateStreak('dsa', true);
    } else {
      toast('↩️ Topic marked incomplete', 'info');
    }
  }

  function dsaBackToWeeks() {
    showDSAScreen('dsa-screen-weeks');
  }

  // ═══════════════════════════════════════════════════════
  //  AI ROADMAP RENDERING
  // ═══════════════════════════════════════════════════════
  function renderRoadmap(type) {
    const data = type === 'ai' ? AI_ROADMAP_DATA : DSA_ROADMAP_DATA;
    const progress = load(type === 'ai' ? KEYS.AI_PROGRESS : KEYS.DSA_PROGRESS, {});
    const search = (type === 'ai' ? state.aiSearch : state.dsaSearch).toLowerCase();
    const filter = type === 'ai' ? state.aiFilter : state.dsaFilter;
    const todayStr = today();
    const revisions = load(KEYS.REVISIONS, []);
    const listEl = document.getElementById(type + '-days-list');
    if (!listEl) return;

    // Smart next topic
    if (type === 'ai') renderNextTopic(type, progress, data);

    let filtered = data.filter(d => {
      const matchSearch = !search || d.title.toLowerCase().includes(search) || (d.phase||'').toLowerCase().includes(search);
      const done = progress[d.day]?.done;
      const dueRev = revisions.some(r => r.source === type && r.topicDay === d.day && r.date <= todayStr && !r.done);
      if (filter === 'completed' && !done) return false;
      if (filter === 'pending' && done) return false;
      if (filter === 'revision' && !dueRev) return false;
      return matchSearch;
    });

    // Hours tracking
    const totalHrs = data.reduce((s, d) => s + getTopicHours(d), 0);
    const doneHrs = data.filter(d => progress[d.day]?.done).reduce((s, d) => s + getTopicHours(d), 0);
    const remHrs = totalHrs - doneHrs;
    const totalEl = document.getElementById(type + '-hrs-total');
    const doneEl = document.getElementById(type + '-hrs-done');
    const remEl = document.getElementById(type + '-hrs-rem');
    if (totalEl) totalEl.textContent = totalHrs;
    if (doneEl) doneEl.textContent = doneHrs;
    if (remEl) remEl.textContent = remHrs;

    // Progress update
    const done = data.filter(d => progress[d.day]?.done).length;
    const pct = Math.round(done / data.length * 100);
    const fillEl = document.getElementById(type + '-prog-fill');
    const textEl = document.getElementById(type + '-prog-text');
    const pctEl = document.getElementById(type + '-prog-pct');
    if (fillEl) fillEl.style.width = pct + '%';
    if (textEl) textEl.textContent = `${done}/${data.length} days`;
    if (pctEl) pctEl.textContent = pct + '%';

    if (!filtered.length) {
      listEl.innerHTML = `<div class="empty-state"><div class="empty-ico">${filter==='completed'?'🎯':filter==='revision'?'🔁':'🔍'}</div><div class="empty-title">No topics found</div><div class="empty-sub">Try changing filters or search terms</div></div>`;
      return;
    }

    // Lazy render: build HTML in chunks to avoid DOM freeze
    let html = '';
    let lastPhase = '';
    filtered.forEach(d => {
      const prog = progress[d.day] || {};
      const isDone = !!prog.done;
      const dueRev = revisions.some(r => r.source === type && r.topicDay === d.day && r.date <= todayStr && !r.done);
      const isProject = !!d.isProject;
      let cardClass = 'day-card';
      if (isDone) cardClass += ' completed';
      else if (dueRev) cardClass += ' revision-due';
      if (isProject) cardClass += ' project-day';

      if (d.phase !== lastPhase) {
        html += `<div style="font-size:10px;font-weight:700;color:var(--c2);letter-spacing:.8px;text-transform:uppercase;padding:10px 2px 4px;font-family:var(--font-mono)">— ${esc(d.phase)} —</div>`;
        lastPhase = d.phase;
      }

      const ytLinks = (d.youtube||[]).map(u => `<a class="resource-link" href="${esc(u)}" target="_blank" rel="noopener"><div class="resource-icon" style="background:rgba(255,0,0,.15)">▶</div><span>${esc(u.length > 50 ? u.slice(0,50)+'...' : u)}</span></a>`).join('');
      const webLinks = (d.websites||[]).map(u => `<a class="resource-link" href="${esc(u)}" target="_blank" rel="noopener"><div class="resource-icon" style="background:rgba(0,245,212,.1)">🌐</div><span>${esc(u.replace('https://','').slice(0,45))}</span></a>`).join('');

      const dp = prog.completedDate || '';
      const [cy,cm,cday] = dp ? dp.split('-') : ['','',''];
      const hrs = getTopicHours(d);
      const projBadge = isProject ? `<span class="project-tag">🚀 Project</span>` : '';
      const revBadge = dueRev && !isDone ? `<span style="font-size:9px;padding:2px 6px;border-radius:var(--rfull);background:rgba(255,107,107,.1);border:1px solid rgba(255,107,107,.25);color:var(--c3);font-weight:700">🔁 Rev Due</span>` : '';

      html += `
      <div class="${cardClass}" id="${type}-day-${d.day}">
        <div class="day-card-header" onclick="APP.toggleDayCard('${type}',${d.day})">
          <div class="day-num"><div class="day-num-label">DAY</div><div class="day-num-val">${d.day}</div></div>
          <div class="day-info">
            <div class="day-title">${esc(d.title)}</div>
            <div class="day-meta" style="display:flex;align-items:center;gap:4px;flex-wrap:wrap;margin-top:3px">
              ${projBadge}${revBadge}
              <span style="color:var(--t2);font-size:10px">${esc(d.phase)} · ⏱️ ${hrs}h${isDone && dp ? ' · ✓ ' + fmtDate(dp) : ''}</span>
            </div>
          </div>
          <div class="day-right">
            <div class="cb ${isDone?'checked':''}" onclick="event.stopPropagation();APP.toggleDone('${type}',${d.day})">${isDone?'✓':''}</div>
            <div class="expand-btn">▾</div>
          </div>
        </div>
        <div class="day-card-body">
          <div class="day-body-inner">
            <div class="body-section">
              <div class="body-section-title">📘 Explanation</div>
              <div class="body-text">${esc(d.explanation)}</div>
            </div>
            ${ytLinks ? `<div class="body-section"><div class="body-section-title">▶ YouTube Resources</div>${ytLinks}</div>` : ''}
            ${webLinks ? `<div class="body-section"><div class="body-section-title">🌐 Website Resources</div>${webLinks}</div>` : ''}
            <div class="body-section">
              <div class="body-section-title">📅 Completion Date</div>
              <div class="date-picker-wrap">
                <div class="date-picker">
                  <div>
                    <select class="dp-select" id="${type}-dp-d-${d.day}">${getDayOptions(cday)}</select>
                    <div class="dp-label">Day</div>
                  </div>
                  <div>
                    <select class="dp-select" id="${type}-dp-m-${d.day}">${getMonthOptions(cm)}</select>
                    <div class="dp-label">Month</div>
                  </div>
                  <div>
                    <select class="dp-select" id="${type}-dp-y-${d.day}">${getYearOptions(cy)}</select>
                    <div class="dp-label">Year</div>
                  </div>
                </div>
                <button class="save-date-btn" onclick="APP.saveDate('${type}',${d.day})">💾 Save Completion Date</button>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    });
    listEl.innerHTML = html;
  }

  function getDayOptions(sel) {
    let h = '<option value="">--</option>';
    for (let i=1;i<=31;i++) h += `<option value="${i}" ${String(sel)===String(i)?'selected':''}>${i}</option>`;
    return h;
  }
  function getMonthOptions(sel) {
    const m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let h = '<option value="">--</option>';
    m.forEach((n,i) => h += `<option value="${i+1}" ${String(sel)===String(i+1)?'selected':''}>${n}</option>`);
    return h;
  }
  function getYearOptions(sel) {
    let h = '<option value="">--</option>';
    const cur = new Date().getFullYear();
    for (let y=cur;y>=cur-3;y--) h += `<option value="${y}" ${String(sel)===String(y)?'selected':''}>${y}</option>`;
    return h;
  }

  function toggleDayCard(type, day) {
    const el = document.getElementById(type + '-day-' + day);
    el?.classList.toggle('open');
  }

  function toggleDone(type, day) {
    const key = type === 'ai' ? KEYS.AI_PROGRESS : KEYS.DSA_PROGRESS;
    const prog = load(key, {});
    const wasDone = !!prog[day]?.done;
    if (!prog[day]) prog[day] = {};
    prog[day].done = !wasDone;
    if (!wasDone) {
      prog[day].completedDate = prog[day].completedDate || today();
      scheduleRevisions(type, day, prog[day].completedDate);
      updateStreak(type, true);
      toast('✅ Day ' + day + ' completed! Revisions scheduled.', 'success');
    } else {
      toast('↩️ Day ' + day + ' marked incomplete', 'info');
    }
    save(key, prog);
    renderRoadmap(type);
    updateHeader();
  }

  function saveDate(type, day) {
    const d = document.getElementById(type + '-dp-d-' + day)?.value;
    const m = document.getElementById(type + '-dp-m-' + day)?.value;
    const y = document.getElementById(type + '-dp-y-' + day)?.value;
    if (!d || !m || !y) { toast('⚠️ Select day, month, and year', 'error'); return; }
    const key = type === 'ai' ? KEYS.AI_PROGRESS : KEYS.DSA_PROGRESS;
    const prog = load(key, {});
    if (!prog[day]) prog[day] = {};
    prog[day].completedDate = dateStr(y, m, d);
    save(key, prog);
    toast('📅 Date saved: ' + fmtDate(prog[day].completedDate), 'success');
    renderRoadmap(type);
  }

  function filterRoadmap(type) {
    if (type === 'ai') state.aiSearch = document.getElementById('ai-search').value;
    else state.dsaSearch = document.getElementById('dsa-search').value;
    renderRoadmap(type);
  }

  function setFilter(type, filter, btn) {
    if (type === 'ai') state.aiFilter = filter;
    else state.dsaFilter = filter;
    const container = document.getElementById(type + '-filters');
    container?.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    btn?.classList.add('active');
    renderRoadmap(type);
  }

  // ═══════════════════════════════════════════════════════
  //  SPACED REVISION SYSTEM
  // ═══════════════════════════════════════════════════════
  const REVISION_INTERVALS = [1, 3, 7, 14, 30];

  // Generate all 5 spaced-repetition revision dates from a completion date
  // Intervals: +1 (Day 2), +3 (Day 4), +7 (Day 8), +14 (Day 15), +30 (Day 31)
  function generateRevisionDates(completedDate) {
    return REVISION_INTERVALS.map(n => addDays(completedDate, n));
  }

  // Returns the human-readable day label for a revision interval
  // e.g. interval=1 → "Day 2", interval=3 → "Day 4", etc.
  function getRevisionDayLabel(interval) {
    return 'Day ' + (interval + 1);
  }

  function scheduleRevisions(source, topicDay, completedDate, topicTitleOverride) {
    const revs = load(KEYS.REVISIONS, []);
    // Remove old revisions for this topic (re-schedule if re-completed)
    const filtered = revs.filter(r => !(r.source === source && r.topicDay === topicDay));

    // Resolve topic title — use override (from structured AI roadmap) or look up from flat data
    var topicTitle = topicTitleOverride;
    if (!topicTitle) {
      // Try structured AI roadmap first
      if (source === 'ai' && typeof STRUCTURED_AI_ROADMAP !== 'undefined') {
        const levels = Object.values(STRUCTURED_AI_ROADMAP);
        for (const level of levels) {
          if (!level || !level.weeks) continue;
          for (const week of level.weeks) {
            const dayData = week.days.find(d => d.day === topicDay);
            if (dayData) { topicTitle = dayData.title; break; }
          }
          if (topicTitle) break;
        }
      }
      // Fallback to flat roadmap data
      if (!topicTitle) {
        const data = source === 'ai' ? AI_ROADMAP_DATA : DSA_ROADMAP_DATA;
        const topic = data ? data.find(d => d.day === topicDay) : null;
        if (!topic && source === 'dsa') {
          // Try DSA week data topic id lookup
          if (typeof DSA_WEEK_DATA !== 'undefined') {
            const allTopics = DSA_WEEK_DATA.reduce((a, w) => a.concat(w.topics), []);
            const t = allTopics.find(t => t.id === topicDay);
            if (t) topicTitle = t.name;
          }
        } else if (topic) {
          topicTitle = topic.title;
        }
      }
      if (!topicTitle) topicTitle = 'Day ' + topicDay;
    }

    // Schedule all 5 spaced-repetition intervals: +1, +3, +7, +14, +30 days
    const revisionDates = generateRevisionDates(completedDate);
    REVISION_INTERVALS.forEach((interval, idx) => {
      filtered.push({
        id: source + '_' + topicDay + '_' + interval,
        source,
        topicDay,
        topicTitle: topicTitle,
        completedDate,
        date: revisionDates[idx],
        interval,
        done: false,
        doneDate: null,
      });
    });
    save(KEYS.REVISIONS, filtered);
  }

  function renderRevisions() {
    const revs = load(KEYS.REVISIONS, []);
    const todayStr = today();
    const listEl = document.getElementById('revision-list');
    if (!listEl) return;
    const f = state.revFilter;

    // Filter — revisions are always at least +1 day from completion, so no same-day check needed
    let filtered = revs.filter(r => {
      if (f === 'ai') return r.source === 'ai';
      if (f === 'dsa') return r.source === 'dsa';
      if (f === 'due') return r.date === todayStr && !r.done;
      if (f === 'overdue') return r.date < todayStr && !r.done;
      if (f === 'pending') return !r.done;
      if (f === 'done') return r.done;
      return true;
    });

    filtered.sort((a,b) => {
      // Overdue first, then due today, then future, then done
      if (!a.done && !b.done) return a.date.localeCompare(b.date);
      if (!a.done) return -1;
      if (!b.done) return 1;
      return b.doneDate?.localeCompare(a.doneDate || '') || 0;
    });

    if (!filtered.length) {
      listEl.innerHTML = `<div class="empty-state"><div class="empty-ico">🔁</div><div class="empty-title">No revisions here</div><div class="empty-sub">Complete topics in the roadmap to auto-schedule revisions</div></div>`;
      return;
    }

    listEl.innerHTML = filtered.map(r => {
      const overdue = r.date < todayStr && !r.done;
      const dueToday = r.date === todayStr && !r.done;
      const future = r.date > todayStr && !r.done;

      // Status badge
      let statusText = future ? `📅 Due ${fmtDate(r.date)}` : dueToday ? '📌 Due Today' : overdue ? `⚠️ ${daysDiff(r.date, todayStr)}d Overdue` : '✅ Done';
      let statusColor = future ? 'var(--t2)' : dueToday ? 'var(--c4)' : overdue ? 'var(--c3)' : 'var(--c5)';

      // Quick notes preview — pull from AI/DSA roadmap explanation
      const data = r.source === 'ai' ? AI_ROADMAP_DATA : DSA_ROADMAP_DATA;
      const topic = data.find(d => d.day === r.topicDay);
      const preview = topic?.explanation ? topic.explanation.slice(0, 120) + '…' : '';

      return `
      <div class="rev-card" id="revc-${r.id}" style="${r.done?'opacity:.55':''}${overdue?';border-color:rgba(255,107,107,.3)':''}${dueToday?';border-color:rgba(255,209,102,.3)':''}">
        <div class="rev-header">
          <div class="rev-date-badge" style="${dueToday?'background:rgba(255,209,102,.1);color:var(--c4)':overdue?'background:rgba(255,107,107,.1);color:var(--c3)':''}">
            ${getRevisionDayLabel(r.interval)}
          </div>
          <div class="rev-info">
            <div class="rev-topic">${esc(r.topicTitle)}</div>
            <div class="rev-source" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:3px">
              <span style="padding:1px 6px;border-radius:var(--rfull);font-size:9px;font-weight:700;background:${r.source==='ai'?'rgba(0,245,212,.1)':'rgba(123,47,255,.1)'};color:${r.source==='ai'?'var(--c1)':'var(--c2)'};border:1px solid ${r.source==='ai'?'rgba(0,245,212,.2)':'rgba(123,47,255,.2)'}">${r.source.toUpperCase()}</span>
              <span style="font-size:10px;color:${statusColor};font-weight:600">${statusText}</span>
              <span style="font-size:10px;color:var(--t2)">Day ${r.topicDay}</span>
            </div>
            ${preview ? `<button class="rev-expand-btn" onclick="APP.toggleRevNotes('${r.id}')">📝 Quick Notes ▾</button>` : ''}
          </div>
          <div class="rev-status">
            <button class="rev-done-btn ${r.done?'completed':''}" onclick="APP.markRevisionDone('${r.id}')">
              ${r.done ? '✓' : 'Done'}
            </button>
          </div>
        </div>
        ${preview ? `<div class="rev-notes-preview" id="rnp-${r.id}"><div style="font-size:10px;font-weight:700;color:var(--c2);margin-bottom:4px;font-family:var(--font-mono)">QUICK NOTES</div>${esc(preview)}</div>` : ''}
      </div>`;
    }).join('');
  }

  function toggleRevNotes(id) {
    const card = document.getElementById('revc-' + id);
    const preview = document.getElementById('rnp-' + id);
    if (!card || !preview) return;
    const isOpen = preview.style.display === 'block';
    preview.style.display = isOpen ? 'none' : 'block';
    // Update button text
    const btn = card.querySelector('.rev-expand-btn');
    if (btn) btn.textContent = isOpen ? '📝 Quick Notes ▾' : '📝 Quick Notes ▴';
  }

  function markRevisionDone(id) {
    const revs = load(KEYS.REVISIONS, []);
    const idx = revs.findIndex(r => r.id === id);
    if (idx < 0) return;
    revs[idx].done = !revs[idx].done;
    revs[idx].doneDate = revs[idx].done ? today() : null;
    save(KEYS.REVISIONS, revs);
    renderRevisions();
    toast(revs[idx].done ? '✅ Revision marked complete!' : '↩️ Revision unmarked', 'success');
  }

  function setRevFilter(f, btn) {
    state.revFilter = f;
    document.querySelector('#tab-revision .filter-row')?.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    renderRevisions();
  }

  // ═══════════════════════════════════════════════════════
  //  POMODORO TIMER
  // ═══════════════════════════════════════════════════════
  const BREAK_DURATION = 5 * 60;

  function getPomoDuration() {
    return (load(KEYS.POMO_DURATION, 25) || 25) * 60;
  }

  function setCustomDuration() {
    const input = document.getElementById('pomo-dur-input');
    const mins = parseInt(input?.value) || 25;
    const clamped = Math.max(1, Math.min(120, mins));
    save(KEYS.POMO_DURATION, clamped);
    state.pomoDuration = clamped;
    if (!state.pomoRunning && !state.pomoBreak) {
      state.pomoSeconds = clamped * 60;
      updatePomoDisplay();
    }
    toast(`⏱️ Focus duration set to ${clamped} min`, 'success');
  }

  function playAlarm() {
    stopAlarm(); // clear any existing
    // Beep alarm using Web Audio API — no CORS, works offline
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const beep = () => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'square';
        osc.frequency.value = 880;
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.4);
      };
      beep();
      state.alarmAudio = ctx;
      state.alarmInterval = setInterval(beep, 600);
      const stopBtn = document.getElementById('pomo-alarm-stop');
      if (stopBtn) stopBtn.style.display = 'inline-flex';
    } catch(e) { console.log('Audio error:', e); }
  }

  function stopAlarm() {
    const wasRinging = state.pomoAlarmRinging;
    try {
      if (state.alarmInterval) { clearInterval(state.alarmInterval); state.alarmInterval = null; }
      if (state.alarmAudio) { state.alarmAudio.close(); state.alarmAudio = null; }
    } catch(e) {}
    const stopBtn = document.getElementById('pomo-alarm-stop');
    if (stopBtn) stopBtn.style.display = 'none';
    // Remove alarm-ringing class from ring
    const ring = document.getElementById('pomo-ring');
    if (ring) ring.classList.remove('alarm-ringing');
    state.pomoAlarmRinging = false;
    // If alarm was ringing after a focus session → auto-start break
    if (wasRinging) {
      state.pomoBreak = true;
      state.pomoSeconds = BREAK_DURATION;
      const modeEl  = document.getElementById('pomo-mode');
      const startBtn = document.getElementById('pomo-start-btn');
      if (modeEl)  modeEl.textContent  = 'BREAK';
      if (startBtn) startBtn.textContent = '⏸ Pause';
      updatePomoDisplay();
      toast('☕ Break started! Relax for a bit.', 'info');
      // Auto-run the break countdown
      state.pomoRunning = true;
      state.pomoInterval = setInterval(() => {
        state.pomoSeconds--;
        updatePomoDisplay();
        if (state.pomoSeconds <= 0) {
          clearInterval(state.pomoInterval);
          state.pomoRunning = false;
          state.pomoBreak = false;
          state.pomoSeconds = getPomoDuration();
          const me = document.getElementById('pomo-mode');
          const sb = document.getElementById('pomo-start-btn');
          if (me) me.textContent = 'FOCUS';
          if (sb) sb.textContent = '▶ Start';
          updatePomoDisplay();
          toast('💪 Break over! Ready to focus again?', 'info');
        }
      }, 1000);
    }
  }

  function selectPomoType(type, btn) {
    state.pomoType = type;
    document.querySelectorAll('.pomo-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    renderPomoStats();
  }

  function pomodoroToggle() {
    // If alarm is ringing, treat toggle as stop-alarm
    if (state.pomoAlarmRinging) {
      stopAlarm();
      return;
    }
    if (state.pomoRunning) {
      clearInterval(state.pomoInterval);
      state.pomoRunning = false;
      const btn = document.getElementById('pomo-start-btn');
      if (btn) btn.textContent = '▶ Resume';
    } else {
      state.pomoRunning = true;
      const btn = document.getElementById('pomo-start-btn');
      if (btn) btn.textContent = '⏸ Pause';
      state.pomoInterval = setInterval(() => {
        state.pomoSeconds--;
        updatePomoDisplay();
        if (state.pomoSeconds <= 0) {
          clearInterval(state.pomoInterval);
          state.pomoRunning = false;
          if (!state.pomoBreak) {
            // Focus session complete — save stats, play alarm, WAIT for user to stop
            const stats = load(KEYS.POMO_STATS, {ai:0,dsa:0,projects:0,extra:0});
            stats[state.pomoType] = (stats[state.pomoType] || 0) + 1;
            save(KEYS.POMO_STATS, stats);
            updateStreak(state.pomoType === 'ai' ? 'ai' : state.pomoType === 'dsa' ? 'dsa' : state.pomoType === 'projects' ? 'proj' : null, true);
            renderPomoStats();
            // Log to history for analytics
            try { if (typeof PomoEnhancer !== 'undefined') PomoEnhancer.logSession(state.pomoType, state.pomoDuration); } catch(e) {}
            // Play alarm continuously — user must click STOP
            state.pomoAlarmRinging = true;
            playAlarm();
            // Flash the ring red
            const ring = document.getElementById('pomo-ring');
            if (ring) ring.classList.add('alarm-ringing');
            // Update UI
            const modeEl = document.getElementById('pomo-mode');
            const startBtn = document.getElementById('pomo-start-btn');
            if (modeEl) modeEl.textContent = '⏰ DONE!';
            if (startBtn) startBtn.textContent = '🔔 Stop Alarm';
            toast('⏰ Time\'s up! Click Stop Alarm to start your break.', 'success');
          } else {
            // Break over
            stopAlarm();
            state.pomoBreak = false;
            state.pomoSeconds = getPomoDuration();
            const modeEl = document.getElementById('pomo-mode');
            const startBtn = document.getElementById('pomo-start-btn');
            if (modeEl) modeEl.textContent = 'FOCUS';
            if (startBtn) startBtn.textContent = '▶ Start';
            toast('☕ Break over! Ready to focus?', 'info');
          }
          updatePomoDisplay();
        }
      }, 1000);
    }
  }

  function pomodoroReset() {
    clearInterval(state.pomoInterval);
    stopAlarm();
    state.pomoRunning = false;
    state.pomoBreak = false;
    state.pomoSeconds = getPomoDuration();
    const btn = document.getElementById('pomo-start-btn');
    const mode = document.getElementById('pomo-mode');
    if (btn) btn.textContent = '▶ Start';
    if (mode) mode.textContent = 'FOCUS';
    updatePomoDisplay();
  }

  function pomodoroSkip() {
    clearInterval(state.pomoInterval);
    stopAlarm();
    state.pomoRunning = false;
    state.pomoBreak = !state.pomoBreak;
    state.pomoSeconds = state.pomoBreak ? BREAK_DURATION : getPomoDuration();
    const mode = document.getElementById('pomo-mode');
    const btn = document.getElementById('pomo-start-btn');
    if (mode) mode.textContent = state.pomoBreak ? 'BREAK' : 'FOCUS';
    if (btn) btn.textContent = '▶ Start';
    updatePomoDisplay();
  }

  function updatePomoDisplay() {
    const m = Math.floor(state.pomoSeconds / 60);
    const s = state.pomoSeconds % 60;
    const timeEl = document.getElementById('pomo-time');
    if (timeEl) timeEl.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    const pomoDur = getPomoDuration();
    const total = state.pomoBreak ? BREAK_DURATION : pomoDur;
    const progress = ((total - state.pomoSeconds) / total) * 360;
    const color = state.pomoBreak ? 'var(--c5)' : 'var(--c1)';
    const ring = document.getElementById('pomo-ring');
    if (ring) {
      ring.style.background = `conic-gradient(${color} ${progress}deg, var(--bg3) ${progress}deg)`;
      ring.style.boxShadow = `0 0 40px rgba(${state.pomoBreak ? '6,214,160' : '0,245,212'},.15)`;
    }
  }

  function renderPomoStats() {
    const stats = load(KEYS.POMO_STATS, {ai:0,dsa:0,projects:0,extra:0});
    ['ai','dsa','projects','extra'].forEach(k => {
      const el = document.getElementById('ps-' + k);
      if (el) el.textContent = stats[k] || 0;
    });
    const dotsEl = document.getElementById('pomo-dots');
    if (dotsEl) {
      const current = stats[state.pomoType] || 0;
      const dots = current % 4 || (current > 0 ? 4 : 0);
      dotsEl.innerHTML = Array(4).fill(0).map((_,i) => `<div class="pomo-dot ${i < dots ? 'filled' : ''}"></div>`).join('');
    }
    // Total focus hours
    const pomoDurMins = load(KEYS.POMO_DURATION, 25) || 25;
    const totalSessions = (stats.ai||0) + (stats.dsa||0) + (stats.projects||0) + (stats.extra||0);
    const focusHrs = ((totalSessions * pomoDurMins) / 60).toFixed(1);
    const fhEl = document.getElementById('pomo-focus-hours');
    if (fhEl) fhEl.textContent = focusHrs;
  }

  // ═══════════════════════════════════════════════════════
  //  STREAK SYSTEM — single global streak, part-by-part
  // ═══════════════════════════════════════════════════════

  // Each call to updateStreak (from any roadmap / pomo / project)
  // records one "part" for today in the global streak.
  // A new calendar day with ≥1 part extends the streak by 1.
  // If the user missed a day (lastDate is before yesterday) the
  // streak resets to 1 — this is the correct behaviour.
  function updateStreak(type, studied) {
    // type is kept as a parameter for backwards-compat but is no longer used
    // to split the streak — everything feeds one global streak.
    if (!studied) return;
    const streaks = load(KEYS.STREAKS, {});

    // ── Migrate legacy per-type streaks on first run ──────────
    if (!streaks.global) {
      const legacy = Math.max(
        streaks.ai?.current   || 0,
        streaks.dsa?.current  || 0,
        streaks.proj?.current || 0
      );
      const legacyLong = Math.max(
        streaks.ai?.longest   || 0,
        streaks.dsa?.longest  || 0,
        streaks.proj?.longest || 0
      );
      // Merge all per-type history arrays, deduplicate, keep sorted
      const legacyHistory = [
        ...(streaks.ai?.history   || []),
        ...(streaks.dsa?.history  || []),
        ...(streaks.proj?.history || []),
      ].filter((d, i, a) => d && a.indexOf(d) === i).sort();

      // Pick the most-recent lastDate across legacy types
      const legacyLastDate = [
        streaks.ai?.lastDate,
        streaks.dsa?.lastDate,
        streaks.proj?.lastDate,
      ].filter(Boolean).sort().pop() || null;

      streaks.global = {
        current:  legacy,
        longest:  legacyLong,
        lastDate: legacyLastDate,
        history:  legacyHistory,
        parts:    {},  // date → count of study actions that day
      };
    }

    const s = streaks.global;
    const todayStr = today();

    // Ensure sub-objects exist (guard against corrupt storage)
    if (!s.parts)   s.parts   = {};
    if (!s.history) s.history = [];

    // ── 1. Record a "part" for today ──────────────────────────
    s.parts[todayStr] = (s.parts[todayStr] || 0) + 1;

    // Trim parts older than 60 days to keep storage small
    const cutoff = addDays(todayStr, -60);
    Object.keys(s.parts).forEach(d => { if (d < cutoff) delete s.parts[d]; });

    // ── 2. Update streak counter — only once per calendar day ─
    if (s.lastDate !== todayStr) {
      const yesterday = addDays(todayStr, -1);

      if (s.lastDate === yesterday) {
        // Studied yesterday → extend streak
        s.current = (s.current || 0) + 1;
      } else if (!s.lastDate) {
        // First ever study session
        s.current = 1;
      } else {
        // Missed one or more days → streak resets to 1
        s.current = 1;
      }

      // Update longest streak record
      s.longest = Math.max(s.longest || 0, s.current);

      // Record today in the history array (deduplicated)
      if (!s.history.includes(todayStr)) {
        s.history.push(todayStr);
        s.history.sort();                          // keep chronological
      }
      // Cap history at 365 days to avoid unbounded growth
      if (s.history.length > 365) {
        s.history = s.history.slice(-365);
      }

      s.lastDate = todayStr;
    }

    save(KEYS.STREAKS, streaks);
    updateHeader();
  }

  function renderStreaks() {
    const streaks = load(KEYS.STREAKS, {});
    const container = document.getElementById('streak-cards');
    if (!container) return;
    const todayStr = today();

    // Ensure global exists (lazy-init for users who haven't studied yet)
    const s = streaks.global || {current:0, longest:0, lastDate:null, history:[], parts:{}};
    const parts = s.parts || {};
    const isActiveToday = s.lastDate === todayStr;

    // Build last-14-days part grid
    const last14 = Array(14).fill(0).map((_,i) => addDays(todayStr, -(13-i)));
    const partDots = last14.map(d => {
      const count = parts[d] || 0;
      const isToday = d === todayStr;
      const intensity = count === 0 ? '' : count < 3 ? 'done-low' : count < 6 ? 'done-mid' : 'done-high';
      const label = d.slice(5); // MM-DD
      return `<div class="week-dot ${intensity} ${isToday?'today':''}" title="${label}: ${count} part${count!==1?'s':''}"></div>`;
    }).join('');

    // Parts completed today
    const todayParts = parts[todayStr] || 0;

    // Deduplicate history before counting total days (guards against legacy duplicate entries)
    const uniqueHistoryDays = [...new Set(s.history || [])].length;

    // ── Streak health warning ──────────────────────────────────
    // If the user studied before but not today AND not yesterday, streak is broken.
    const yesterday = addDays(todayStr, -1);
    const streakBroken = s.lastDate && s.lastDate < yesterday && !isActiveToday;

    container.innerHTML = `
    <div class="streak-card" style="border-color:${isActiveToday?'rgba(0,245,212,.2)':streakBroken?'rgba(244,63,94,.2)':''}">
      <div class="streak-top">
        <div>
          <div class="streak-name" style="color:var(--c1)">🔥 Study Streak</div>
          <div style="font-size:10px;color:var(--t2);margin-top:2px">
            ${isActiveToday
              ? `✅ Studied today! (${todayParts} part${todayParts!==1?'s':''} completed)`
              : streakBroken
                ? `💔 Streak lost — last studied ${fmtDate(s.lastDate)}. Start fresh today!`
                : '⚠️ Study any part today to keep your streak!'}
          </div>
        </div>
        <div class="streak-flame" style="${s.current > 0 ? '' : 'opacity:.3'}">
          ${s.current > 6 ? '🔥' : s.current > 2 ? '🔥' : '💤'}
        </div>
      </div>

      <div class="streak-nums">
        <div class="streak-num">
          <div class="streak-num-val" style="color:var(--c1)">${s.current}</div>
          <div class="streak-num-lbl">Current</div>
        </div>
        <div class="streak-num">
          <div class="streak-num-val" style="color:var(--c4)">${s.longest}</div>
          <div class="streak-num-lbl">Longest</div>
        </div>
        <div class="streak-num">
          <div class="streak-num-val" style="color:var(--c5)">${uniqueHistoryDays}</div>
          <div class="streak-num-lbl">Total Days</div>
        </div>
        <div class="streak-num">
          <div class="streak-num-val" style="color:var(--c2)">${todayParts}</div>
          <div class="streak-num-lbl">Parts Today</div>
        </div>
      </div>

      <div class="week-dots" style="grid-template-columns:repeat(14,1fr)">${partDots}</div>
      <div style="font-size:9px;color:var(--t3c);margin-top:4px;text-align:center">Last 14 days · darker = more parts studied</div>

      <div style="margin-top:14px">
        <div style="font-size:11px;color:var(--t2);margin-bottom:8px;font-weight:600">📚 Parts that count toward your streak</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:11px;color:var(--t2)">
          <div>🤖 AI Roadmap topics</div>
          <div>💻 DSA topics</div>
          <div>🖥️ Frontend topics</div>
          <div>⚙️ Backend topics</div>
          <div>🍅 Pomodoro sessions</div>
          <div>🚀 Project milestones</div>
        </div>
      </div>

      ${!isActiveToday
        ? `<button class="streak-action" style="margin-top:12px" onclick="APP.markStudiedToday()">✅ Mark Today as Studied</button>`
        : '<div style="margin-top:12px;text-align:center;font-size:12px;color:var(--c5);font-weight:600">🎯 Keep it up!</div>'}
    </div>`;
  }

  function markStudiedToday() {
    updateStreak('manual', true);
    renderStreaks();
    toast('🔥 Streak updated! Keep going!', 'success');
  }

  // ═══════════════════════════════════════════════════════
  //  PROJECTS
  // ═══════════════════════════════════════════════════════
  function openProjectModal(idOrSource) {
    // idOrSource can be: project id (string like "1234567890"),
    //   source tag ('ai' or 'dsa'), or undefined for general
    let id = null, source = '';
    if (idOrSource === 'ai' || idOrSource === 'dsa') {
      source = idOrSource;
    } else if (idOrSource) {
      id = idOrSource;
    }
    state.editProjectId = id;
    state.editProjectSource = source || null;
    const srcEl = document.getElementById('proj-source');
    if (srcEl) srcEl.value = source;
    const titleEl = document.getElementById('proj-modal-title');
    if (id) {
      const projects = load(KEYS.PROJECTS, []);
      const p = projects.find(x => x.id === id);
      if (p) {
        const setVal = (elId, val) => { const el = document.getElementById(elId); if (el) el.value = val; };
        setVal('proj-name', p.name);
        setVal('proj-files', p.filesCount);
        setVal('proj-notes', p.notes);
        setVal('proj-tags', p.tags || '');
        setVal('proj-progress', p.progressPct || 0);
        if (srcEl) srcEl.value = p.source || '';
        if (titleEl) titleEl.textContent = 'Edit Project';
      }
    } else {
      ['proj-name','proj-files','proj-notes','proj-tags','proj-progress'].forEach(fid => {
        const el = document.getElementById(fid); if (el) el.value = '';
      });
      const label = source === 'ai' ? '🤖 Add AI Project' : source === 'dsa' ? '💻 Add DSA Project' : 'Add Project';
      if (titleEl) titleEl.textContent = label;
    }
    openModal('modal-project');
  }

  function saveProject() {
    const name = document.getElementById('proj-name')?.value.trim();
    if (!name) { toast('⚠️ Project name is required', 'error'); return; }
    const projects = load(KEYS.PROJECTS, []);
    const existing = state.editProjectId ? projects.find(x=>x.id===state.editProjectId) : null;
    const srcEl = document.getElementById('proj-source');
    const source = srcEl ? srcEl.value : (state.editProjectSource || existing?.source || '');
    const p = {
      id: state.editProjectId || Date.now().toString(),
      name,
      source,
      filesCount: parseInt(document.getElementById('proj-files')?.value) || 0,
      notes: document.getElementById('proj-notes')?.value.trim() || '',
      tags: document.getElementById('proj-tags')?.value.trim() || '',
      progressPct: parseInt(document.getElementById('proj-progress')?.value) || (existing?.progressPct || 0),
      pomoSessions: existing?.pomoSessions || 0,
      streak: existing?.streak || 0,
      lastPomoDate: existing?.lastPomoDate || null,
      createdAt: existing?.createdAt || today(),
      updatedAt: today(),
    };
    if (state.editProjectId) {
      const idx = projects.findIndex(x => x.id === state.editProjectId);
      if (idx >= 0) projects[idx] = p; else projects.push(p);
    } else {
      projects.push(p);
    }
    save(KEYS.PROJECTS, projects);
    closeModal('modal-project');
    renderProjects();
    renderSectionProjects('ai');
    renderSectionProjects('dsa');
    toast(state.editProjectId ? '✏️ Project updated!' : '🚀 Project added!', 'success');
    updateStreak('proj', true);
  }

  function renderProjects() {
    const projects = load(KEYS.PROJECTS, []);
    const pomStats = load(KEYS.POMO_STATS, {});
    const listEl = document.getElementById('projects-list');
    if (!listEl) return;
    if (!projects.length) {
      listEl.innerHTML = `<div class="empty-state"><div class="empty-ico">🚀</div><div class="empty-title">No projects yet</div><div class="empty-sub">Add your AI engineering projects to track progress</div></div>`;
      return;
    }
    listEl.innerHTML = projects.map(p => {
      const progressPct = Math.min(100, Math.round((p.progressPct || 0)));
      const projPomos = p.pomoSessions || 0;
      return `
      <div class="proj-card">
        <div class="flex items-center gap6" style="margin-bottom:6px">
          <div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,rgba(0,245,212,.1),rgba(123,47,255,.1));border:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0">🚀</div>
          <div style="flex:1;min-width:0">
            <div class="proj-name">${esc(p.name)}</div>
            <div class="proj-meta">📁 ${p.filesCount} files · Created ${fmtDate(p.createdAt)}</div>
          </div>
        </div>
        ${p.tags ? `<div style="font-size:10px;color:var(--c1);font-family:var(--font-mono);margin-bottom:6px">${esc(p.tags)}</div>` : ''}
        ${p.notes ? `<div style="font-size:11px;color:var(--t2);line-height:1.6;background:var(--bg3);padding:8px;border-radius:var(--r8);border:1px solid rgba(255,255,255,.05);margin-bottom:8px">${esc(p.notes)}</div>` : ''}
        <div class="proj-progress-label"><span>Progress</span><span>${progressPct}%</span></div>
        <div class="proj-progress-bar"><div class="proj-progress-fill" style="width:${progressPct}%"></div></div>
        <div class="proj-sessions">🍅 ${projPomos} Pomodoro sessions · 🔥 Streak: ${p.streak||0} days</div>
        <div class="proj-actions">
          <button class="proj-btn" onclick="APP.openProjectModal('${p.id}')">✏️ Edit</button>
          <button class="proj-btn" onclick="APP.logPomoToProject('${p.id}')">🍅 +Pomo</button>
          <button class="proj-btn del" onclick="APP.deleteProject('${p.id}')">🗑️</button>
        </div>
      </div>`;
    }).join('');
  }

  function logPomoToProject(id) {
    const projects = load(KEYS.PROJECTS, []);
    const idx = projects.findIndex(p => p.id === id);
    if (idx < 0) return;
    projects[idx].pomoSessions = (projects[idx].pomoSessions || 0) + 1;
    // Update project-level streak
    const todayStr = today();
    if (projects[idx].lastPomoDate !== todayStr) {
      const yesterday = addDays(todayStr, -1);
      if (projects[idx].lastPomoDate === yesterday) {
        // Consecutive day — extend streak
        projects[idx].streak = (projects[idx].streak || 0) + 1;
      } else {
        // Missed a day (or first session) — reset to 1
        projects[idx].streak = 1;
      }
      projects[idx].lastPomoDate = todayStr;
    }
    save(KEYS.PROJECTS, projects);
    renderProjects();
    toast('🍅 Pomodoro logged to project!', 'success');
  }

  function deleteProject(id) {
    confirmAction('Delete Project?', 'This will permanently remove the project and cannot be undone.', () => {
      const projects = load(KEYS.PROJECTS, []);
      save(KEYS.PROJECTS, projects.filter(p => p.id !== id));
      renderProjects();
      toast('🗑️ Project deleted', 'info');
    });
  }

  // ═══════════════════════════════════════════════════════
  //  EXTRA NOTES
  // ═══════════════════════════════════════════════════════
  let notesAutoSaveTimer;

  function autoSaveNotes() {
    const ta = document.getElementById('extra-notes-ta');
    if (!ta) return;
    const text = ta.value.trim();
    const wc = text ? text.split(/\s+/).filter(Boolean).length : 0;
    const wcEl = document.getElementById('notes-wc');
    if (wcEl) wcEl.textContent = wc + ' words';
    clearTimeout(notesAutoSaveTimer);
    notesAutoSaveTimer = setTimeout(saveNotes, 2500);
  }

  function saveNotes() {
    const ta = document.getElementById('extra-notes-ta');
    if (!ta) return;
    const content = ta.value.trim();
    if (!content) { toast('⚠️ Nothing to save', 'error'); return; }
    const notes = load(KEYS.NOTES, []);
    const todayStr = today();
    const stats = load(KEYS.POMO_STATS, {});
    const wc = content.split(/\s+/).filter(Boolean).length;
    const ts = new Date().toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'});
    const todayIdx = notes.findIndex(n => n.date === todayStr);
    const entry = {
      id: todayIdx >= 0 ? notes[todayIdx].id : Date.now().toString(),
      date: todayStr,
      content,
      wordCount: wc,
      lastSaved: ts,
      pomosToday: stats.extra || 0,
    };
    if (todayIdx >= 0) notes[todayIdx] = entry; else notes.unshift(entry);
    save(KEYS.NOTES, notes);
    toast('💾 Notes saved!', 'success');
    renderExtraNotes();
  }

  function renderExtraNotes() {
    const notes = load(KEYS.NOTES, []);
    const stats = load(KEYS.POMO_STATS, {});
    const badgeEl = document.getElementById('extra-pomo-badge');
    if (badgeEl) badgeEl.textContent = '🍅 ' + (stats.extra || 0);
    const ta = document.getElementById('extra-notes-ta');
    const todayNote = notes.find(n => n.date === today());
    if (todayNote && ta && !ta.value) {
      ta.value = todayNote.content;
      const wcEl = document.getElementById('notes-wc');
      if (wcEl) wcEl.textContent = (todayNote.wordCount || 0) + ' words';
    }
    const listEl = document.getElementById('extra-notes-list');
    if (!listEl) return;
    if (!notes.length) {
      listEl.innerHTML = `<div class="empty-state"><div class="empty-ico">📝</div><div class="empty-title">No notes yet</div><div class="empty-sub">Start writing to track your daily study sessions</div></div>`;
      return;
    }
    listEl.innerHTML = notes.slice(0,20).map(n => `
      <div class="card" style="margin-bottom:8px">
        <div class="card-header">
          <div style="display:flex;flex-direction:column;gap:2px">
            <span style="font-size:12px;font-weight:700;color:var(--c1);font-family:var(--font-mono)">${fmtDate(n.date)}</span>
            <span style="font-size:9px;color:var(--t2)">${n.wordCount||0} words · Saved ${n.lastSaved||'—'}</span>
          </div>
          <div style="display:flex;gap:6px;align-items:center">
            <span class="card-badge badge-done">🍅 ${n.pomosToday||0}</span>
            <button onclick="APP.deleteNote('${n.id}')" style="font-size:12px;color:var(--c3);padding:2px 6px;border-radius:6px;background:rgba(255,107,107,.1);border:1px solid rgba(255,107,107,.2)">✕</button>
          </div>
        </div>
        <div style="font-size:12px;color:var(--t2);line-height:1.7;white-space:pre-wrap">${esc(n.content.slice(0,200))}${n.content.length>200?'<span style="color:var(--t3c)"> …</span>':''}</div>
      </div>
    `).join('');
  }

  function deleteNote(id) {
    const notes = load(KEYS.NOTES, []);
    save(KEYS.NOTES, notes.filter(n => n.id !== id));
    renderExtraNotes();
    toast('🗑️ Note deleted', 'info');
  }

  // ═══════════════════════════════════════════════════════
  //  FILE STORAGE
  // ═══════════════════════════════════════════════════════
  function handleFileUpload(event) {
    const files = Array.from(event.target.files);
    if (!files.length) return;
    const fileData = load(KEYS.FILES, []);
    let count = 0;
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        fileData.unshift({
          id: Date.now().toString() + Math.random().toString(36).slice(2),
          name: file.name,
          size: file.size,
          type: file.type,
          data: e.target.result,
          date: today(),
        });
        count++;
        if (count === files.length) {
          save(KEYS.FILES, fileData);
          renderFiles();
          toast(`📎 ${count} file(s) uploaded!`, 'success');
        }
      };
      reader.readAsDataURL(file);
    });
    event.target.value = '';
  }

  function renderFiles() {
    const files = load(KEYS.FILES, []);
    const listEl = document.getElementById('files-list');
    if (!files.length) {
      listEl.innerHTML = `<div class="empty-state"><div class="empty-ico">📂</div><div class="empty-title">No files stored</div><div class="empty-sub">Upload PDFs and documents to access them offline</div></div>`;
      return;
    }
    function fmt(bytes) {
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1048576) return (bytes/1024).toFixed(1) + ' KB';
      return (bytes/1048576).toFixed(1) + ' MB';
    }
    listEl.innerHTML = files.map(f => {
      const ext = f.name.split('.').pop().toUpperCase();
      const icons = {PDF:'📄',PNG:'🖼️',JPG:'🖼️',JPEG:'🖼️',TXT:'📝',DOC:'📃',DOCX:'📃'};
      return `
      <div class="file-item">
        <div class="file-icon">${icons[ext] || '📎'}</div>
        <div class="file-info">
          <div class="file-name">${esc(f.name)}</div>
          <div class="file-meta">${fmt(f.size)} · ${fmtDate(f.date)}</div>
        </div>
        <button class="file-dl-btn" onclick="APP.downloadFile('${f.id}')">⬇ Open</button>
        <button class="file-del-btn" onclick="APP.deleteFile('${f.id}')">✕</button>
      </div>`;
    }).join('');
  }

  function downloadFile(id) {
    const files = load(KEYS.FILES, []);
    const f = files.find(x => x.id === id);
    if (!f) return;
    const a = document.createElement('a');
    a.href = f.data;
    a.download = f.name;
    a.click();
    toast('⬇️ Downloading ' + f.name, 'info');
  }

  function deleteFile(id) {
    confirmAction('Delete File?', 'This will remove the file from storage. This cannot be undone.', () => {
      const files = load(KEYS.FILES, []);
      save(KEYS.FILES, files.filter(f => f.id !== id));
      renderFiles();
      toast('🗑️ File removed', 'info');
    });
  }

  // ═══════════════════════════════════════════════════════
  //  PROFILE
  // ═══════════════════════════════════════════════════════
  function renderProfile() {
    const aiProg = load(KEYS.AI_PROGRESS, {});
    const dsaProg = load(KEYS.DSA_PROGRESS, {});
    const streaks = load(KEYS.STREAKS, {});
    const pomStats = load(KEYS.POMO_STATS, {ai:0,dsa:0,projects:0,extra:0});
    const projects = load(KEYS.PROJECTS, []);
    const notes = load(KEYS.NOTES, []);
    const pomoDurMins = load(KEYS.POMO_DURATION, 25) || 25;

    const aiDone = Object.values(aiProg).filter(v => v.done).length;
    const dsaAllTopics2 = typeof DSA_WEEK_DATA !== 'undefined' ? DSA_WEEK_DATA.reduce((a,w)=>a.concat(w.topics),[]) : [];
    const dsaDone = dsaAllTopics2.filter(t => dsaProg['t'+t.id]?.done).length;
    const globalStreak = streaks.global?.current || 0;
    const total = (pomStats.ai||0) + (pomStats.dsa||0) + (pomStats.projects||0) + (pomStats.extra||0);
    const focusHrs = ((total * pomoDurMins) / 60).toFixed(1);

    const startDate = Object.values(aiProg).filter(v=>v.completedDate).map(v=>v.completedDate).sort()[0];
    const subEl = document.getElementById('profile-sub');
    if (subEl) subEl.textContent = startDate ? `Started ${fmtDate(startDate)}` : 'Start your journey today!';

    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('p-ai-done', aiDone);
    set('p-dsa-done', dsaDone);
    set('p-proj-count', projects.length);
    set('p-notes-count', notes.length);
    set('p-ai-streak', globalStreak);
    set('p-dsa-streak', globalStreak);
    set('p-pom-ai', pomStats.ai || 0);
    set('p-pom-dsa', pomStats.dsa || 0);
    set('p-pom-proj', pomStats.projects || 0);
    set('p-pom-extra', pomStats.extra || 0);
    set('p-pom-total', total);
    set('p-focus-hours', focusHrs);

    // Hours tracking
    const aiTotalHrs = AI_ROADMAP_DATA.reduce((s, d) => s + getTopicHours(d), 0);
    const aiDoneHrs = AI_ROADMAP_DATA.filter(d => aiProg[d.day]?.done).reduce((s, d) => s + getTopicHours(d), 0);
    set('p-hrs-total', aiTotalHrs);
    set('p-hrs-done', aiDoneHrs);
    set('p-hrs-rem', aiTotalHrs - aiDoneHrs);

    // Render graphs after a tick (so DOM is ready)
    setTimeout(() => {
      renderGraphs(aiProg, pomStats, streaks);
    }, 50);
  }

  // ═══════════════════════════════════════════════════════
  //  MINI CANVAS GRAPHS (pure JS, no libraries)
  // ═══════════════════════════════════════════════════════
  function drawMiniChart(canvasId, labels, values, color, fillColor) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.offsetWidth || 300;
    const H = 80;
    canvas.width = W * window.devicePixelRatio;
    canvas.height = H * window.devicePixelRatio;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const max = Math.max(...values, 1);
    const pad = { top: 8, right: 8, bottom: 20, left: 28 };
    const cw = W - pad.left - pad.right;
    const ch = H - pad.top - pad.bottom;
    const step = values.length > 1 ? cw / (values.length - 1) : cw;

    ctx.clearRect(0, 0, W, H);

    // Grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    [0, 0.5, 1].forEach(r => {
      const y = pad.top + ch * (1 - r);
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke();
    });

    // Fill area
    if (values.length > 1) {
      ctx.beginPath();
      ctx.moveTo(pad.left, pad.top + ch);
      values.forEach((v, i) => {
        const x = pad.left + i * step;
        const y = pad.top + ch - (v / max) * ch;
        i === 0 ? ctx.lineTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.lineTo(pad.left + (values.length - 1) * step, pad.top + ch);
      ctx.closePath();
      ctx.fillStyle = fillColor;
      ctx.fill();
    }

    // Line
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    values.forEach((v, i) => {
      const x = pad.left + i * step;
      const y = pad.top + ch - (v / max) * ch;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Dots
    values.forEach((v, i) => {
      const x = pad.left + i * step;
      const y = pad.top + ch - (v / max) * ch;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    });

    // X labels (every other)
    ctx.fillStyle = 'rgba(144,144,184,0.7)';
    ctx.font = `${9 * window.devicePixelRatio / window.devicePixelRatio}px system-ui`;
    ctx.textAlign = 'center';
    labels.forEach((l, i) => {
      if (i % Math.ceil(labels.length / 6) === 0) {
        ctx.fillText(l, pad.left + i * step, H - 4);
      }
    });

    // Y axis label
    ctx.textAlign = 'right';
    ctx.fillText(max, pad.left - 2, pad.top + 8);
  }

  function drawBarChart(canvasId, labels, values, colors) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.offsetWidth || 300;
    const H = 80;
    canvas.width = W * window.devicePixelRatio;
    canvas.height = H * window.devicePixelRatio;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const max = Math.max(...values, 1);
    const pad = { top: 8, right: 8, bottom: 20, left: 28 };
    const cw = W - pad.left - pad.right;
    const ch = H - pad.top - pad.bottom;
    const barW = (cw / values.length) * 0.65;
    const gap = (cw / values.length) * 0.35;
    ctx.clearRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 1;
    [0, 0.5, 1].forEach(r => {
      const y = pad.top + ch * (1 - r);
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke();
    });

    values.forEach((v, i) => {
      const x = pad.left + i * (barW + gap) + gap / 2;
      const barH = (v / max) * ch;
      const y = pad.top + ch - barH;
      ctx.fillStyle = colors[i % colors.length];
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(x, y, barW, barH, [3, 3, 0, 0]) : ctx.rect(x, y, barW, barH);
      ctx.fill();
      ctx.fillStyle = 'rgba(144,144,184,0.7)';
      ctx.font = '9px system-ui'; ctx.textAlign = 'center';
      ctx.fillText(labels[i], x + barW / 2, H - 4);
    });

    ctx.textAlign = 'right';
    ctx.fillText(max, pad.left - 2, pad.top + 8);
  }

  function renderGraphs(aiProg, pomStats, streaks) {
    const todayStr = today();

    // Graph 1: Daily study consistency (last 14 days)
    const last14 = Array(14).fill(0).map((_,i) => addDays(todayStr, -(13-i)));
    const aiHistory = (streaks.global?.history) || [];
    const parts = streaks.global?.parts || {};
    const consistencyVals = last14.map(d => parts[d] || (aiHistory.includes(d) ? 1 : 0));
    const consistencyLabels = last14.map(d => { const parts = d.split('-'); return parts[2]; });
    drawMiniChart('chart-consistency', consistencyLabels, consistencyVals, '#00f5d4', 'rgba(0,245,212,0.08)');

    // Graph 2: Pomodoro by category (bar chart)
    drawBarChart('chart-pomo',
      ['AI', 'DSA', 'Proj', 'Extra'],
      [pomStats.ai||0, pomStats.dsa||0, pomStats.projects||0, pomStats.extra||0],
      ['#00f5d4','#7b2fff','#ffd166','#ff6b6b']
    );

    // Graph 3: Progress over time (completion dates)
    const completedWithDates = Object.values(aiProg)
      .filter(v => v.done && v.completedDate)
      .sort((a,b) => a.completedDate.localeCompare(b.completedDate));

    if (completedWithDates.length >= 2) {
      const first = completedWithDates[0].completedDate;
      const last = completedWithDates[completedWithDates.length-1].completedDate;
      const totalDays = Math.max(daysDiff(first, last), 1);
      const points = 10;
      const progLabels = [], progVals = [];
      for (let i = 0; i <= points; i++) {
        const checkDate = addDays(first, Math.round(i * totalDays / points));
        const cnt = completedWithDates.filter(v => v.completedDate <= checkDate).length;
        progLabels.push(checkDate.slice(5));
        progVals.push(cnt);
      }
      drawMiniChart('chart-progress', progLabels, progVals, '#7b2fff', 'rgba(123,47,255,0.08)');
    } else {
      drawMiniChart('chart-progress', ['No data yet'], [0], '#7b2fff', 'rgba(123,47,255,0.08)');
    }
  }

  // ═══════════════════════════════════════════════════════
  //  HEADER UPDATE
  // ═══════════════════════════════════════════════════════
  function updateHeader() {
    const aiProg = load(KEYS.AI_PROGRESS, {});
    const done = Object.values(aiProg).filter(v => v.done).length;
    const hdrSub = document.getElementById('hdr-sub');
    if (hdrSub) hdrSub.textContent = ``;
    const streaks = load(KEYS.STREAKS, {});
    const globalStreak = streaks.global?.current || 0;
    const hdrStreak = document.getElementById('hdr-streak');
    if (hdrStreak) hdrStreak.textContent = '🔥 ' + globalStreak;

    // Revision due badge removed (revision is now inline in roadmaps)
  }

  // Theme is permanently dark — toggleTheme removed

  // ═══════════════════════════════════════════════════════
  //  DATA MANAGEMENT
  // ═══════════════════════════════════════════════════════
  function exportData() {
    const data = {};
    Object.values(KEYS).forEach(k => {
      try { const v = localStorage.getItem(k); if (v) data[k] = JSON.parse(v); } catch(e){}
    });
    const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'roadmapx-backup-' + today() + '.json';
    a.click();
    URL.revokeObjectURL(url);
    toast('💾 Data exported successfully!', 'success');
  }

  function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      confirmAction('Import Data?', 'This will OVERWRITE all existing data with the backup. Continue?', () => {
        try {
          const data = JSON.parse(e.target.result);
          Object.entries(data).forEach(([k,v]) => localStorage.setItem(k, JSON.stringify(v)));
          location.reload();
        } catch(err) {
          toast('⚠️ Invalid backup file!', 'error');
        }
      });
    };
    reader.readAsText(file);
    event.target.value = '';
  }

  function resetAllData() {
    confirmAction('⚠️ Reset ALL Data?', 'This will permanently delete ALL your progress, streaks, notes, and projects. This CANNOT be undone!', () => {
      Object.values(KEYS).forEach(k => localStorage.removeItem(k));
      location.reload();
    });
  }

  // ═══════════════════════════════════════════════════════
  //  ATTENDANCE SYSTEM
  // ═══════════════════════════════════════════════════════
  // Returns sorted array of dates the user was active (marked 'present').
  function getAttendance() {
    const att = load(KEYS.ATTENDANCE, {});
    return Object.keys(att)
      .filter(d => att[d] === 'present')
      .sort();
  }

  function markAttendance(status) {
    const att = load(KEYS.ATTENDANCE, {});
    const todayStr = today();
    att[todayStr] = status;
    save(KEYS.ATTENDANCE, att);
    renderAttendance();
    toast(status === 'present' ? '✅ Marked Present!' : '❌ Marked Absent', status === 'present' ? 'success' : 'info');
  }

  // Renders the Attendance section inside the Profile tab.
  function renderAttendance() {
    const list = document.getElementById("attendance-list");
    if (!list) return;
    const totalEl = document.getElementById('attendance-total');
    const emptyEl = document.getElementById('attendance-empty');

    const dates = getAttendance();

    list.innerHTML = '';
    dates.slice().reverse().forEach(date => {
      const li = document.createElement('li');
      li.textContent = fmtDate(date);
      li.style.cssText =
        'padding:10px 14px;margin:4px 0;border-radius:8px;' +
        'background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);' +
        'font-family:var(--font-mono);font-size:13px;color:var(--t1);';
      list.appendChild(li);
    });

    if (totalEl) totalEl.textContent = String(dates.length);
    if (emptyEl) emptyEl.style.display = dates.length === 0 ? 'block' : 'none';
  }

  // ═══════════════════════════════════════════════════════
  //  CONFIRM DIALOG
  // ═══════════════════════════════════════════════════════
  let confirmCallback = null;

  function confirmAction(title, text, cb) {
    const titleEl = document.getElementById('confirm-title');
    const textEl  = document.getElementById('confirm-text');
    const okBtn   = document.getElementById('confirm-ok');
    if (!titleEl || !textEl || !okBtn) {
      // Modal not present on this page — fall back to native confirm
      if (window.confirm(title + '\n' + text)) cb();
      return;
    }
    titleEl.textContent = title;
    textEl.textContent  = text;
    confirmCallback = cb;
    okBtn.onclick = () => {
      closeModal('modal-confirm');
      if (confirmCallback) confirmCallback();
    };
    openModal('modal-confirm');
  }

  // ═══════════════════════════════════════════════════════
  //  INIT
  // ═══════════════════════════════════════════════════════
  function init() {
    // App always runs in dark mode — no theme toggle

    // Restore custom pomo duration
    const savedDur = load(KEYS.POMO_DURATION, 25) || 25;
    state.pomoDuration = savedDur;
    state.pomoSeconds = savedDur * 60;
    const durInput = document.getElementById('pomo-dur-input');
    if (durInput) durInput.value = savedDur;
    updatePomoDisplay();

    // Render roadmaps
    try { renderRoadmap('ai'); } catch(e) { console.error('AI roadmap error:', e); }
    // DSA now uses week-wise render (called when tab opens)

    // Always start on Home screen
    switchTab('home');

    // Update header
    updateHeader();

    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('show'); });
    });

    // Daily reminder check
    const todayStr = today();
    const lastVisit = localStorage.getItem('lastVisit');
    if (lastVisit && lastVisit !== todayStr) {
      setTimeout(() => toast('👋 Welcome back! Ready to study?', 'info'), 1000);
    }
    localStorage.setItem('lastVisit', todayStr);

    // Register service worker (inline blob)
    if ('serviceWorker' in navigator) {
      const swCode = `
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(clients.claim()); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.open('roadmapx-v3').then(cache =>
      cache.match(e.request).then(cached => {
        const networkFetch = fetch(e.request).then(resp => {
          if (resp.ok) cache.put(e.request, resp.clone());
          return resp;
        }).catch(() => cached);
        return cached || networkFetch;
      })
    )
  );
});`.trim();
      try {
        const blob = new Blob([swCode], {type:'text/javascript'});
        navigator.serviceWorker.register(URL.createObjectURL(blob)).catch(()=>{});
      } catch(e) {}
    }

    console.log('✅ RoadmapX v2 initialized');
  }

  // ═══════════════════════════════════════════════════════
  //  UNIFIED ROADMAP SUB-TAB SWITCHING
  //  One function handles ai / dsa / frontend / backend.
  //  HTML calls: APP.switchRoadmapSub('ai','notes',this)
  //  Legacy shims keep old onclick="APP.switchAISub(...)" working.
  // ═══════════════════════════════════════════════════════

  // Each roadmap section can have its own notes timer in state
  // (avoids a separate variable per roadmap)
  if (!state._notesTimers) state._notesTimers = {};

  function switchRoadmapSub(roadmap, sub, btn) {
    const subs = ['roadmap','revision','pomo','notes','projects'];
    subs.forEach(s => {
      const el = document.getElementById(roadmap + '-sub-' + s);
      if (el) el.style.display = s === sub ? '' : 'none';
    });
    // Active class — subtab bar uses id="${roadmap}-subtab-bar"
    const bar = document.getElementById(roadmap + '-subtab-bar');
    if (bar) bar.querySelectorAll('.section-subtab').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    else {
      const b = document.getElementById(roadmap + '-subtab-' + sub);
      if (b) b.classList.add('active');
    }
    // Per-sub refresh
    if (sub === 'notes')    { renderSectionNotes(roadmap); }
    if (sub === 'projects') { renderSectionProjects(roadmap); }
    if (sub === 'pomo')     { updateSectionPomoDisplay(roadmap); renderSectionPomoStats(roadmap); }
    if (sub === 'revision') { renderSectionRevisions(roadmap); }
  }

  // Legacy shims — keep old HTML onclick attributes working without any HTML edits
  function switchDSASub(sub, btn)      { switchRoadmapSub('dsa',      sub, btn); }
  function switchAISub(sub, btn)       { switchRoadmapSub('ai',       sub, btn); }
  function switchFrontendSub(sub, btn) { switchRoadmapSub('frontend', sub, btn); }
  function switchBackendSub(sub, btn)  { switchRoadmapSub('backend',  sub, btn); }

  // ═══════════════════════════════════════════════════════
  //  UNIFIED SECTION NOTES  (ai / dsa / frontend / backend)
  //  Storage key map — add new roadmaps here only.
  // ═══════════════════════════════════════════════════════

  const SECTION_NOTES_KEY = {
    ai:       'aiNotes',
    dsa:      'dsaNotes',
    frontend: 'feNotes',
    backend:  'beNotes',
  };

  const SECTION_POMO_KEY = {
    ai:       'ai',
    dsa:      'dsa',
    frontend: 'extra',   // maps into the existing pomodoroStats bucket
    backend:  'extra',
  };

  const SECTION_LABEL = {
    ai:       'AI',
    dsa:      'DSA',
    frontend: 'Frontend',
    backend:  'Backend',
  };

  const SECTION_PLACEHOLDER = {
    ai:       'Write what you studied in AI today...\n\n• Concepts learned\n• Model results\n• Code snippets\n• Papers to revisit',
    dsa:      'Write what you practiced in DSA today...\n\n• Problems solved\n• Patterns recognized\n• Time complexity notes\n• Edge cases to remember',
    frontend: 'Write what you built in Frontend today...\n\n• Components made\n• CSS tricks\n• Browser quirks\n• Frameworks explored',
    backend:  'Write what you built in Backend today...\n\n• APIs designed\n• DB queries\n• Auth flows\n• Performance notes',
  };

  function sectionNotesAutoSave(roadmap) {
    const key = SECTION_NOTES_KEY[roadmap];
    if (!key) return;
    const ta = document.getElementById(roadmap + '-notes-ta');
    if (!ta) return;
    const wc = ta.value.trim().split(/\s+/).filter(Boolean).length;
    const wcEl = document.getElementById(roadmap + '-notes-wc');
    if (wcEl) wcEl.textContent = wc + ' words';
    clearTimeout(state._notesTimers[roadmap]);
    state._notesTimers[roadmap] = setTimeout(() => {
      const draft = load(key, {});
      draft._draft = ta.value;
      save(key, draft);
    }, 800);
  }

  function sectionNotesSave(roadmap) {
    const key = SECTION_NOTES_KEY[roadmap];
    if (!key) return;
    const label = SECTION_LABEL[roadmap] || roadmap.toUpperCase();
    const ta = document.getElementById(roadmap + '-notes-ta');
    if (!ta || !ta.value.trim()) { toast('⚠️ Nothing to save', 'error'); return; }
    const data = load(key, {});
    if (!data.entries) data.entries = [];
    const pomKey = SECTION_POMO_KEY[roadmap] || roadmap;
    const pomStats = load(KEYS.POMO_STATS, {});
    data.entries.unshift({
      id: Date.now().toString(),
      text: ta.value.trim(),
      date: today(),
      pomoCount: pomStats[pomKey] || 0,
    });
    if (data.entries.length > 100) data.entries = data.entries.slice(0,100);
    data._draft = '';
    save(key, data);
    ta.value = '';
    const wcEl = document.getElementById(roadmap + '-notes-wc');
    if (wcEl) wcEl.textContent = '0 words';
    renderSectionNotes(roadmap);
    toast(`📝 ${label} note saved!`, 'success');
  }

  function renderSectionNotes(roadmap) {
    const key = SECTION_NOTES_KEY[roadmap];
    if (!key) return;
    const label = SECTION_LABEL[roadmap] || roadmap.toUpperCase();
    const data = load(key, {});
    const ta = document.getElementById(roadmap + '-notes-ta');
    if (ta) {
      if (data._draft && !ta.value) ta.value = data._draft;
      // Set placeholder if not already set
      if (!ta.placeholder && SECTION_PLACEHOLDER[roadmap]) {
        ta.placeholder = SECTION_PLACEHOLDER[roadmap];
      }
    }
    const listEl = document.getElementById(roadmap + '-notes-list');
    if (!listEl) return;
    const entries = data.entries || [];
    if (!entries.length) {
      listEl.innerHTML = `<div class="empty-state"><div class="empty-ico">📝</div><div class="empty-title">No ${label} notes yet</div><div class="empty-sub">Save your first ${label} study note above</div></div>`;
      return;
    }
    listEl.innerHTML = entries.slice(0,30).map(e => `
      <div class="card" style="margin-bottom:8px">
        <div class="card-header">
          <div style="display:flex;flex-direction:column;gap:2px">
            <span style="font-size:12px;font-weight:700;color:var(--c2);font-family:var(--font-mono)">${fmtDate(e.date)}</span>
          </div>
          <div style="display:flex;gap:6px;align-items:center">
            <span class="card-badge badge-done">🍅 ${e.pomoCount||0}</span>
            <button onclick="APP.deleteSectionNote('${roadmap}','${e.id}')" style="font-size:12px;color:var(--c3);padding:2px 6px;border-radius:6px;background:rgba(255,107,107,.1);border:1px solid rgba(255,107,107,.2)">✕</button>
          </div>
        </div>
        <div style="font-size:12px;color:var(--t2);line-height:1.7;white-space:pre-wrap">${esc(e.text.slice(0,200))}${e.text.length>200?'<span style="color:var(--t3c)"> …</span>':''}</div>
      </div>`).join('');
  }

  function deleteSectionNote(roadmap, id) {
    const key = SECTION_NOTES_KEY[roadmap];
    if (!key) return;
    const label = SECTION_LABEL[roadmap] || roadmap.toUpperCase();
    const data = load(key, {});
    data.entries = (data.entries || []).filter(e => e.id !== id);
    save(key, data);
    renderSectionNotes(roadmap);
    toast(`🗑️ ${label} note deleted`, 'info');
  }

  // Legacy shims for old HTML onclicks — map to unified functions
  function dsaAutoSaveNotes()  { sectionNotesAutoSave('dsa'); }
  function dsaSaveNotes()      { sectionNotesSave('dsa'); }
  function renderDSANotes()    { renderSectionNotes('dsa'); }
  function deleteDSANote(id)   { deleteSectionNote('dsa', id); }
  function aiAutoSaveNotes()   { sectionNotesAutoSave('ai'); }
  function aiSaveNotes()       { sectionNotesSave('ai'); }
  function renderAINotes()     { renderSectionNotes('ai'); }
  function deleteAINote(id)    { deleteSectionNote('ai', id); }

  // ═══════════════════════════════════════════════════════
  //  SECTION REVISION SYSTEM (all roadmaps)
  // ═══════════════════════════════════════════════════════
  const _sectionRevState = { ai: 'all', dsa: 'all', frontend: 'all', backend: 'all' };

  function renderSectionRevisions(source) {
    const listEl = document.getElementById(source + '-revision-list');
    if (!listEl) return;
    const revs = load(KEYS.REVISIONS, []);
    const todayStr = today();
    const f = _sectionRevState[source] || 'all';

    // Filter to this source only
    let filtered = revs.filter(r => {
      if (r.source !== source) return false;
      if (f === 'due')     return r.date === todayStr && !r.done;
      if (f === 'overdue') return r.date < todayStr && !r.done;
      if (f === 'pending') return r.date > todayStr && !r.done;
      if (f === 'done')    return r.done;
      return true; // 'all'
    });

    filtered.sort((a, b) => {
      if (!a.done && !b.done) return a.date.localeCompare(b.date);
      if (!a.done) return -1;
      if (!b.done) return 1;
      return (b.doneDate || '').localeCompare(a.doneDate || '');
    });

    if (!filtered.length) {
      const emptyMsg = f === 'all'
        ? 'No revisions yet. Complete topics in the roadmap to auto-schedule revisions.'
        : 'No revisions in this category.';
      listEl.innerHTML = `<div class="empty-state"><div class="empty-ico">🔁</div><div class="empty-title">Nothing here</div><div class="empty-sub">${emptyMsg}</div></div>`;
      return;
    }

    listEl.innerHTML = filtered.map(r => {
      const overdue  = r.date < todayStr && !r.done;
      const dueToday = r.date === todayStr && !r.done;
      const future   = r.date > todayStr && !r.done;

      let statusText, statusColor, statusBg;
      if (r.done) {
        statusText  = '✅ Done';
        statusColor = 'var(--c5)';
        statusBg    = 'rgba(6,214,160,.08)';
      } else if (overdue) {
        const daysOver = daysDiff(r.date, todayStr);
        statusText  = `⚠️ ${daysOver}d Overdue`;
        statusColor = 'var(--c3)';
        statusBg    = 'rgba(255,107,107,.06)';
      } else if (dueToday) {
        statusText  = '📌 Due Today';
        statusColor = 'var(--c4)';
        statusBg    = 'rgba(255,209,102,.06)';
      } else {
        statusText  = `📅 ${fmtDate(r.date)}`;
        statusColor = 'var(--t2)';
        statusBg    = '';
      }

      const intervalLabel = getRevisionDayLabel(r.interval);
      const sourceColor = source === 'ai' ? 'var(--c1)' : 'var(--c2)';
      const sourceBorder = source === 'ai' ? 'rgba(0,245,212,.2)' : 'rgba(123,47,255,.2)';
      const sourceBg = source === 'ai' ? 'rgba(0,245,212,.08)' : 'rgba(123,47,255,.08)';

      return `
      <div class="rev-card" id="srcrev-${r.id}" style="${r.done ? 'opacity:.55;' : ''}${overdue ? 'border-color:rgba(255,107,107,.3);' : dueToday ? 'border-color:rgba(255,209,102,.3);' : ''}">
        <div class="rev-header">
          <div class="rev-date-badge" style="${dueToday ? 'background:rgba(255,209,102,.12);color:var(--c4)' : overdue ? 'background:rgba(255,107,107,.12);color:var(--c3)' : r.done ? 'background:rgba(6,214,160,.12);color:var(--c5)' : ''}">
            ${intervalLabel}
          </div>
          <div class="rev-info">
            <div class="rev-topic">${esc(r.topicTitle)}</div>
            <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:3px">
              <span style="padding:1px 6px;border-radius:var(--rfull);font-size:9px;font-weight:700;background:${sourceBg};color:${sourceColor};border:1px solid ${sourceBorder}">Day ${r.topicDay}</span>
              <span style="font-size:10px;color:${statusColor};font-weight:600">${statusText}</span>
            </div>
          </div>
          <div class="rev-status">
            <button class="rev-done-btn ${r.done ? 'completed' : ''}" onclick="APP.markSectionRevDone('${r.id}','${source}')">
              ${r.done ? '✓' : 'Done'}
            </button>
          </div>
        </div>
      </div>`;
    }).join('');
  }

  function markSectionRevDone(id, source) {
    const revs = load(KEYS.REVISIONS, []);
    const idx = revs.findIndex(r => r.id === id);
    if (idx < 0) return;
    revs[idx].done = !revs[idx].done;
    revs[idx].doneDate = revs[idx].done ? today() : null;
    save(KEYS.REVISIONS, revs);
    renderSectionRevisions(source);
    // Keep global revision tab in sync
    try { renderRevisions(); } catch(e) {}
    // Refresh inline revision panels
    renderInlineRevisions('ai-inline-rev-days', 'ai');
    renderInlineRevisions('ai-inline-rev-weeks', 'ai');
    renderInlineRevisions('dsa-inline-rev-overview', 'dsa');
    renderInlineRevisions('dsa-inline-rev', 'dsa');
    toast(revs[idx].done ? '✅ Revision marked complete!' : '↩️ Revision unmarked', 'success');
  }

  function setSectionRevFilter(roadmap, f, btn) {
    _sectionRevState[roadmap] = f;
    const container = document.getElementById(roadmap + '-sub-revision');
    if (container) container.querySelectorAll('.filter-row .filter-chip').forEach(c => c.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderSectionRevisions(roadmap);
  }
  // Legacy shim
  function setDSARevFilter(f, btn) { setSectionRevFilter('dsa', f, btn); }
  function setAIRevFilter(f, btn)  { setSectionRevFilter('ai',  f, btn); }

  // ═══════════════════════════════════════════════════════
  //  SECTION PROJECTS (AI / DSA filtered views)
  // ═══════════════════════════════════════════════════════
  function renderSectionProjects(section) {
    const listEl = document.getElementById(section + '-projects-list');
    if (!listEl) return;
    const projects = load(KEYS.PROJECTS, []).filter(p => p.source === section);
    const _sectionEmoji = { ai:'🤖', dsa:'💻', frontend:'🎨', backend:'⚙️' };
    if (!projects.length) {
      const label = SECTION_LABEL[section] || section.toUpperCase();
      listEl.innerHTML = `<div class="empty-state"><div class="empty-ico">🚀</div><div class="empty-title">No ${label} projects yet</div><div class="empty-sub">Add your first ${label} project above</div></div>`;
      return;
    }
    listEl.innerHTML = projects.map(p => {
      const progressPct = Math.min(100, Math.round(p.progressPct || 0));
      const sectionEmoji = _sectionEmoji[section] || '📁';
      return `
      <div class="proj-card">
        <div class="flex items-center gap6" style="margin-bottom:6px">
          <div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,rgba(0,245,212,.1),rgba(123,47,255,.1));border:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0">${sectionEmoji}</div>
          <div style="flex:1;min-width:0">
            <div class="proj-name">${esc(p.name)}</div>
            <div class="proj-meta">Created ${fmtDate(p.createdAt)}</div>
          </div>
          <button onclick="APP.openProjectModal('${p.id}')" style="font-size:16px;background:none;border:none;color:var(--c4);cursor:pointer;padding:4px 6px;border-radius:6px">✏️</button>
        </div>
        ${p.tags ? `<div style="font-size:10px;color:var(--c1);font-family:var(--font-mono);margin-bottom:6px">${esc(p.tags)}</div>` : ''}
        ${p.notes ? `<div style="font-size:11px;color:var(--t2);line-height:1.6;background:var(--bg3);padding:8px;border-radius:var(--r8);border:1px solid rgba(255,255,255,.05);margin-bottom:8px">${esc(p.notes)}</div>` : ''}
        <div class="proj-progress-label"><span>Progress</span><span>${progressPct}%</span></div>
        <div class="proj-progress-bar"><div class="proj-progress-fill" style="width:${progressPct}%"></div></div>
        <div style="display:flex;justify-content:flex-end;margin-top:8px">
          <button class="note-del-btn" onclick="APP.deleteProject('${p.id}')">🗑️ Delete</button>
        </div>
      </div>`;
    }).join('');
  }

  // ═══════════════════════════════════════════════════════
  //  SECTION POMODORO (ai / dsa / frontend / backend — independent timers)
  //  Add a new roadmap key here to get a free timer for it.
  // ═══════════════════════════════════════════════════════
  const SECTION_BREAK = 5 * 60;

  function _makeSectionPomoState(duration) {
    return { running:false, isBreak:false, alarmRinging:false,
             seconds: duration*60, duration,
             interval:null, alarmAudio:null, alarmInterval:null };
  }
  const _sectionPomoState = {
    ai:       _makeSectionPomoState(load(KEYS.POMO_DURATION, 25) || 25),
    dsa:      _makeSectionPomoState(load(KEYS.POMO_DURATION, 25) || 25),
    frontend: _makeSectionPomoState(25),
    backend:  _makeSectionPomoState(25),
  };

  function _sectionPlayAlarm(section) {
    _sectionStopAlarmRaw(section);
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const beep = () => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = 'square'; osc.frequency.value = 880;
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.4);
      };
      beep();
      _sectionPomoState[section].alarmAudio = ctx;
      _sectionPomoState[section].alarmInterval = setInterval(beep, 600);
      const stopBtn = document.getElementById(section + '-pomo-alarm-stop');
      if (stopBtn) stopBtn.style.display = 'inline-flex';
      const ring = document.getElementById(section + '-pomo-ring');
      if (ring) ring.classList.add('alarm-ringing');
    } catch(e) {}
  }

  function _sectionStopAlarmRaw(section) {
    const s = _sectionPomoState[section];
    try {
      if (s.alarmInterval) { clearInterval(s.alarmInterval); s.alarmInterval = null; }
      if (s.alarmAudio) { s.alarmAudio.close(); s.alarmAudio = null; }
    } catch(e) {}
  }

  function stopSectionAlarm(section) {
    const s = _sectionPomoState[section];
    const wasRinging = s.alarmRinging;
    _sectionStopAlarmRaw(section);
    s.alarmRinging = false;
    const stopBtn = document.getElementById(section + '-pomo-alarm-stop');
    if (stopBtn) stopBtn.style.display = 'none';
    const ring = document.getElementById(section + '-pomo-ring');
    if (ring) ring.classList.remove('alarm-ringing');
    if (wasRinging) {
      s.isBreak = true;
      s.seconds = SECTION_BREAK;
      _updateSectionMode(section, 'BREAK', '⏸ Pause');
      updateSectionPomoDisplay(section);
      toast('☕ Break started! Relax.', 'info');
      s.running = true;
      s.interval = setInterval(() => {
        s.seconds--;
        updateSectionPomoDisplay(section);
        if (s.seconds <= 0) {
          clearInterval(s.interval); s.interval = null;
          s.running = false; s.isBreak = false;
          s.seconds = s.duration * 60;
          _updateSectionMode(section, 'FOCUS', '▶ Start');
          updateSectionPomoDisplay(section);
          toast('💪 Break over! Start another focus session.', 'info');
        }
      }, 1000);
    }
  }

  function _updateSectionMode(section, mode, btnText) {
    const modeEl   = document.getElementById(section + '-pomo-mode');
    const startBtn = document.getElementById(section + '-pomo-start-btn');
    if (modeEl) modeEl.textContent = mode;
    if (startBtn) startBtn.textContent = btnText;
  }

  function updateSectionPomoDisplay(section) {
    const s = _sectionPomoState[section];
    const m = Math.floor(s.seconds / 60);
    const sec = s.seconds % 60;
    const timeEl = document.getElementById(section + '-pomo-time');
    if (timeEl) timeEl.textContent = `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
    const total = s.isBreak ? SECTION_BREAK : s.duration * 60;
    const progress = ((total - s.seconds) / total) * 360;
    const color = s.isBreak ? 'var(--c5)' : (section === 'ai' ? 'var(--c1)' : 'var(--c2)');
    const ringEl = document.getElementById(section + '-pomo-ring');
    if (ringEl && !ringEl.classList.contains('alarm-ringing')) {
      ringEl.style.background = `conic-gradient(${color} ${progress}deg, var(--bg3) ${progress}deg)`;
    }
  }

  function renderSectionPomoStats(section) {
    const stats = load(KEYS.POMO_STATS, {ai:0,dsa:0,projects:0,extra:0});
    const sessions = stats[section] || 0;
    const s = _sectionPomoState[section];
    const hrs = ((sessions * s.duration) / 60).toFixed(1);
    const streaks = load(KEYS.STREAKS, {});
    const streak = streaks.global?.current || 0;
    const sessEl = document.getElementById(section + '-ps-sessions');
    const hrsEl  = document.getElementById(section + '-ps-hours');
    const strEl  = document.getElementById(section + '-ps-streak');
    const focEl  = document.getElementById(section + '-pomo-focus-hours');
    const dotsEl = document.getElementById(section + '-pomo-dots');
    if (sessEl) sessEl.textContent = sessions;
    if (hrsEl)  hrsEl.textContent  = hrs;
    if (strEl)  strEl.textContent  = streak;
    if (focEl)  focEl.textContent  = hrs;
    if (dotsEl) {
      const dots = sessions % 4 || (sessions > 0 ? 4 : 0);
      dotsEl.innerHTML = Array(4).fill(0).map((_,i) => `<div class="pomo-dot ${i < dots ? 'filled' : ''}"></div>`).join('');
    }
  }

  function sectionPomoToggle(section) {
    const s = _sectionPomoState[section];
    if (s.alarmRinging) { stopSectionAlarm(section); return; }
    if (s.running) {
      clearInterval(s.interval); s.interval = null;
      s.running = false;
      _updateSectionMode(section, s.isBreak ? 'BREAK' : 'FOCUS', '▶ Resume');
    } else {
      s.running = true;
      _updateSectionMode(section, s.isBreak ? 'BREAK' : 'FOCUS', '⏸ Pause');
      s.interval = setInterval(() => {
        s.seconds--;
        updateSectionPomoDisplay(section);
        if (s.seconds <= 0) {
          clearInterval(s.interval); s.interval = null;
          s.running = false;
          if (!s.isBreak) {
            const stats = load(KEYS.POMO_STATS, {ai:0,dsa:0,projects:0,extra:0});
            stats[section] = (stats[section] || 0) + 1;
            save(KEYS.POMO_STATS, stats);
            updateStreak(section, true);
            renderSectionPomoStats(section);
            renderPomoStats();
            try { if (typeof PomoEnhancer !== 'undefined') PomoEnhancer.logSession(section, s.duration); } catch(e) {}
            s.alarmRinging = true;
            _sectionPlayAlarm(section);
            _updateSectionMode(section, '⏰ DONE!', '🔔 Stop Alarm');
            toast(`⏰ ${(SECTION_LABEL[section]||section.toUpperCase())} session complete! Stop alarm to start break.`, 'success');
          } else {
            s.isBreak = false;
            s.seconds = s.duration * 60;
            _updateSectionMode(section, 'FOCUS', '▶ Start');
            updateSectionPomoDisplay(section);
            toast('💪 Break over! Start another focus session.', 'info');
          }
        }
      }, 1000);
    }
  }

  function sectionPomoReset(section) {
    const s = _sectionPomoState[section];
    clearInterval(s.interval); s.interval = null;
    _sectionStopAlarmRaw(section);
    s.running = false; s.isBreak = false; s.alarmRinging = false;
    s.seconds = s.duration * 60;
    const stopBtn = document.getElementById(section + '-pomo-alarm-stop');
    if (stopBtn) stopBtn.style.display = 'none';
    const ring = document.getElementById(section + '-pomo-ring');
    if (ring) ring.classList.remove('alarm-ringing');
    _updateSectionMode(section, 'FOCUS', '▶ Start');
    updateSectionPomoDisplay(section);
  }

  function sectionPomoSkip(section) {
    const s = _sectionPomoState[section];
    clearInterval(s.interval); s.interval = null;
    _sectionStopAlarmRaw(section);
    s.running = false; s.alarmRinging = false;
    s.isBreak = !s.isBreak;
    s.seconds = s.isBreak ? SECTION_BREAK : s.duration * 60;
    const ring = document.getElementById(section + '-pomo-ring');
    if (ring) ring.classList.remove('alarm-ringing');
    _updateSectionMode(section, s.isBreak ? 'BREAK' : 'FOCUS', '▶ Start');
    updateSectionPomoDisplay(section);
  }

  function setSectionPomoDuration(section) {
    const input = document.getElementById(section + '-pomo-dur-input');
    const val = input ? (parseInt(input.value) || 25) : 25;
    const clamped = Math.max(1, Math.min(120, val));
    if (input) input.value = clamped;
    const s = _sectionPomoState[section];
    s.duration = clamped;
    if (!s.running && !s.isBreak) { s.seconds = clamped * 60; updateSectionPomoDisplay(section); }
    toast(`⏱️ ${section.toUpperCase()} focus set to ${clamped} min`, 'success');
  }

  // Public API
  return {
    switchTab, filterRoadmap, setFilter, toggleDayCard, toggleDone, saveDate,
    selectPomoType, pomodoroToggle, pomodoroReset, pomodoroSkip,
    setCustomDuration, stopAlarm,
    renderRevisions, setRevFilter, markRevisionDone, toggleRevNotes,
    renderStreaks, markStudiedToday,
    openProjectModal, saveProject, deleteProject, logPomoToProject,
    autoSaveNotes, saveNotes, deleteNote,
    handleFileUpload, downloadFile, deleteFile,
    renderProfile,
    markAttendance, renderAttendance, getAttendance,
    continueLastSession,
    exportData, importData, resetAllData,
    closeModal, init,
    // DSA Week-wise Roadmap
    renderDSAWeeks, toggleDSAWeek, toggleDSATopic, toggleDSATopicDone, dsaBackToWeeks,
    toggleDSAProject, setDSAProjectStatus,
    // Inline Revision
    markInlineRevDone,
    // Sub-tab navigation
    switchRoadmapSub, switchDSASub, switchAISub, switchFrontendSub, switchBackendSub,
    // Section Notes (unified — works for all roadmaps)
    sectionNotesAutoSave, sectionNotesSave, renderSectionNotes, deleteSectionNote,
    // Legacy note shims (old HTML onclick attributes)
    dsaAutoSaveNotes, dsaSaveNotes, renderDSANotes, deleteDSANote,
    aiAutoSaveNotes, aiSaveNotes, renderAINotes, deleteAINote,
    // Section Projects
    renderSectionProjects,
    // Section Pomodoro
    sectionPomoToggle, sectionPomoReset, sectionPomoSkip,
    setSectionPomoDuration, stopSectionAlarm,
    updateSectionPomoDisplay, renderSectionPomoStats,
    // Section Revision
    renderSectionRevisions, markSectionRevDone,
    setSectionRevFilter, setDSARevFilter, setAIRevFilter,
        // Revision scheduling (used by roadmap_bridge and SpacedRep)
    scheduleRevisions,
    // Direct screen navigation (used by nav stack)
  };
})();

// ── Start the app ──
document.addEventListener('DOMContentLoaded', () => {
  try {
    if (typeof APP !== 'undefined' && APP.init) APP.init();
  } catch(e) {
    console.error('Init Error:', e);
  }
});


// ═══════════════════════════════════════════════════════
//  ROADMAPX v3 — FEATURE UPGRADES
//  All new modules injected here. Extends APP without
//  breaking existing functionality.
// ═══════════════════════════════════════════════════════

(function() {
'use strict';

// ── Helpers (local shortcuts) ──
const $ = id => document.getElementById(id);
const todayStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
};
function lsGet(k, def) {
  try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; }
  catch(e) { return def; }
}
function lsSet(k, v) {
  try { localStorage.setItem(k, JSON.stringify(v)); } catch(e) {}
}

// ═══════════════════════════════════════════════════════
//  MODULE 1: XP + GAMIFICATION SYSTEM
// ═══════════════════════════════════════════════════════
const XP = (function() {
  const LEVELS = [
    {min:0,    max:499,   name:'Beginner',     ico:'🌱', color:'#06d6a0'},
    {min:500,  max:1499,  name:'Explorer',     ico:'🔍', color:'#00f5d4'},
    {min:1500, max:2999,  name:'Learner',      ico:'📚', color:'#118ab2'},
    {min:3000, max:5999,  name:'Practitioner', ico:'⚙️',  color:'#7b2fff'},
    {min:6000, max:9999,  name:'Developer',    ico:'💻', color:'#ffd166'},
    {min:10000,max:14999, name:'Engineer',     ico:'🛠️',  color:'#ff6b6b'},
    {min:15000,max:24999, name:'Expert',       ico:'🚀', color:'#ef476f'},
    {min:25000,max:Infinity,name:'Master AI Engineer',ico:'🤖',color:'#00f5d4'},
  ];

  const BADGES_DEF = [
    {id:'first_day',    name:'First Step',     ico:'👣', desc:'Complete Day 1',           check: (s)=> s.aiDone >= 1 || s.dsaDone >= 1},
    {id:'week1',        name:'Week 1 Done',    ico:'🗓️', desc:'Complete 7 days',           check: (s)=> s.totalDone >= 7},
    {id:'streak7',      name:'On Fire',        ico:'🔥', desc:'7-day streak',              check: (s)=> s.maxStreak >= 7},
    {id:'streak30',     name:'Unstoppable',    ico:'⚡', desc:'30-day streak',             check: (s)=> s.maxStreak >= 30},
    {id:'pomo10',       name:'Focus Master',   ico:'⏱️', desc:'10 Pomodoro sessions',     check: (s)=> s.totalPomo >= 10},
    {id:'pomo100',      name:'Deep Worker',    ico:'🧠', desc:'100 Pomodoro sessions',    check: (s)=> s.totalPomo >= 100},
    {id:'beginner_ai',  name:'AI Beginner',    ico:'🟢', desc:'Complete AI Beginner',     check: (s)=> s.aiDone >= 42},
    {id:'intermediate', name:'AI Intermediate',ico:'🟡', desc:'Complete AI Intermediate', check: (s)=> s.aiDone >= 100},
    {id:'advanced',     name:'AI Advanced',    ico:'🔴', desc:'Complete AI Advanced',     check: (s)=> s.aiDone >= 171},
    {id:'dsa_done',     name:'DSA Complete',   ico:'💻', desc:'Complete DSA Roadmap',     check: (s)=> s.dsaDone >= 20},
    {id:'notes10',      name:'Note Taker',     ico:'📝', desc:'Save 10 notes',            check: (s)=> s.notesSaved >= 10},
    {id:'projects3',    name:'Builder',        ico:'🏗️', desc:'Add 3 projects',           check: (s)=> s.projects >= 3},
    {id:'projects10',   name:'Portfolio Pro',  ico:'🌟', desc:'Add 10 projects',          check: (s)=> s.projects >= 10},
    {id:'revision20',   name:'Reviser',        ico:'🔁', desc:'Complete 20 revisions',    check: (s)=> s.revisionsDone >= 20},
    {id:'attendance90', name:'Consistent',     ico:'📋', desc:'90% attendance (30 days)',  check: (s)=> s.attendance >= 0.9},
  ];

  function getStats() {
    const pomStats= lsGet('pomodoroStats', {ai:0,dsa:0,projects:0,extra:0});
    const streaks = lsGet('streaks', {});
    const notes   = lsGet('extraNotes', []);
    const projects= lsGet('projects', []);
    const att     = lsGet('attendance', {});
    // Revisions stored as flat array with .done flags under 'revisions' key.
    const revData = lsGet('revisions', []);
    const revDone = Array.isArray(revData)
      ? revData.filter(r => r && r.done).length
      : Object.values(revData).flat().filter(r => r && r.done).length;

    // FIX Bug 1: AI structured roadmap saves to 'ai_struct_<level>', not 'roadmapAI'.
    // Aggregate completed days across all three levels.
    const aiDone = ['beginner', 'intermediate', 'advanced'].reduce((sum, lvl) => {
      const prog = lsGet('ai_struct_' + lvl, {});
      return sum + Object.values(prog).filter(v => v && v.done).length;
    }, 0);

    // FIX Bug 2: DSA structured roadmap saves to 'dsa_struct_<level>', not 'roadmapDSA'.
    // Aggregate completed days across all three levels.
    const dsaDone = ['beginner', 'intermediate', 'advanced'].reduce((sum, lvl) => {
      const prog = lsGet('dsa_struct_' + lvl, {});
      return sum + Object.values(prog).filter(v => v && v.done).length;
    }, 0);

    const totalPomo = (pomStats.ai||0)+(pomStats.dsa||0)+(pomStats.projects||0)+(pomStats.extra||0);

    // Use global streak — single source of truth
    const maxStreak = Math.max(
      streaks.global?.longest  || 0,
      streaks.global?.current  || 0,
      // Legacy fallback for users who had per-type streaks before migration
      streaks.ai?.longest  || 0,
      streaks.ai?.current  || 0,
      streaks.dsa?.longest || 0,
      streaks.dsa?.current || 0
    );
    const notesSaved = Array.isArray(notes) ? notes.length : 0;
    const projCount  = Array.isArray(projects) ? projects.length : 0;

    // Attendance rate
    const last30 = Array(30).fill(0).map((_,i)=>{
      const d = new Date(); d.setDate(d.getDate()-i);
      return d.toISOString().slice(0,10);
    });
    const markedDays = last30.filter(d=>att[d]);
    const presentDays= last30.filter(d=>att[d]==='present').length;
    const attRate = markedDays.length ? presentDays/markedDays.length : 0;

    return {
      aiDone, dsaDone, totalDone: aiDone+dsaDone,
      totalPomo, maxStreak,
      notesSaved, projects: projCount,
      revisionsDone: revDone,
      attendance: attRate,
    };
  }

  function computeXP(stats) {
    // XP formula
    let xp = 0;
    xp += stats.aiDone * 30;
    xp += stats.dsaDone * 30;
    xp += stats.totalPomo * 5;
    xp += stats.maxStreak * 20;
    xp += stats.notesSaved * 10;
    xp += stats.projects * 50;
    xp += stats.revisionsDone * 15;
    // Bonus for attendance
    if (stats.attendance > 0.9) xp += 500;
    else if (stats.attendance > 0.7) xp += 200;
    return xp;
  }

  function getLevel(xp) {
    return LEVELS.find(l => xp >= l.min && xp <= l.max) || LEVELS[LEVELS.length-1];
  }

  function getLevelProgress(xp) {
    const lvl = getLevel(xp);
    if (lvl.max === Infinity) return 100;
    const range = lvl.max - lvl.min;
    return Math.round(((xp - lvl.min) / range) * 100);
  }

  function checkNewBadges(stats) {
    const earned = lsGet('earnedBadges', []);
    const newBadges = [];
    BADGES_DEF.forEach(b => {
      if (!earned.includes(b.id) && b.check(stats)) {
        earned.push(b.id);
        newBadges.push(b);
      }
    });
    if (newBadges.length) {
      lsSet('earnedBadges', earned);
      newBadges.forEach(b => showBadgeToast(b));
    }
    return earned;
  }

  function showXPToast(amount) {
    const el = $('xp-toast');
    if (!el) return;
    el.textContent = '+' + amount + ' XP 🎉';
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2500);
  }

  function showBadgeToast(badge) {
    const el = $('xp-toast');
    if (!el) return;
    el.textContent = '🏆 ' + badge.name + ' unlocked!';
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 3000);
  }

  function render() {
    const stats = getStats();
    const xp = computeXP(stats);
    const lvl = getLevel(xp);
    const pct = getLevelProgress(xp);
    const earned = checkNewBadges(stats);

    // Update level display in header-like area
    if ($('xp-level-ico'))  $('xp-level-ico').textContent = lvl.ico;
    if ($('xp-level-name')) $('xp-level-name').textContent = lvl.name;
    if ($('xp-points-text')) $('xp-points-text').textContent = xp.toLocaleString() + ' XP';
    if ($('xp-bar-fill'))   $('xp-bar-fill').style.width = pct + '%';

    // Render badges grid
    const grid = $('badges-grid');
    if (!grid) return;
    grid.innerHTML = BADGES_DEF.map(b => {
      const isEarned = earned.includes(b.id);
      return `<div class="badge-item ${isEarned?'earned':'locked'}">
        <div class="badge-ico">${b.ico}</div>
        <div class="badge-name">${b.name}</div>
        <div class="badge-desc">${b.desc}</div>
      </div>`;
    }).join('');
  }

  return { render, getStats, computeXP, showXPToast, checkNewBadges, getLevel };
})();

// Expose to APP namespace
window._XP = XP;

// ═══════════════════════════════════════════════════════
//  MODULE 2: AI MENTOR SYSTEM (Uses Anthropic API via artifact)
// ═══════════════════════════════════════════════════════
const AIMentor = (function() {
  let currentDay = null;
  let currentMode = 'explain';
  let isLoading = false;

  function open(dayData) {
    currentDay = dayData;
    currentMode = 'explain';
    // Reset UI
    const resp = $('ai-response-area');
    const noteArea = $('ai-note-area');
    const saveBtn = $('ai-save-note-btn');
    if (resp) {
      resp.textContent = `Ready to help with: "${dayData.title}"

Tap "Ask AI" to get a simple explanation.`;
      resp.style.display = 'block';
    }
    if (noteArea) noteArea.style.display = 'none';
    if (saveBtn) saveBtn.style.display = 'none';
    // Reset tab buttons
    document.querySelectorAll('.ai-tab-btn').forEach((b,i) => b.classList.toggle('active', i===0));
    $('ai-modal-overlay')?.classList.add('show');
  }

  function close() {
    $('ai-modal-overlay')?.classList.remove('show');
  }

  function setTab(mode, btn) {
    currentMode = mode;
    document.querySelectorAll('.ai-tab-btn').forEach(b => b.classList.remove('active'));
    btn?.classList.add('active');
    const resp = $('ai-response-area');
    const noteArea = $('ai-note-area');
    const saveBtn = $('ai-save-note-btn');
    if (!resp) return;
    const prompts = {
      explain: `Explain "${currentDay?.title}" in simple, beginner-friendly terms.`,
      notes: `Generate structured study notes for "${currentDay?.title}".`,
      practice: `Give me 5 practice questions for "${currentDay?.title}".`,
      project: `Suggest a mini-project idea to practice "${currentDay?.title}".`,
    };
    resp.textContent = prompts[mode] || '';
    if (mode === 'notes') {
      noteArea.style.display = 'block';
      saveBtn.style.display = 'inline-flex';
    } else {
      noteArea.style.display = 'none';
      saveBtn.style.display = 'none';
    }
  }

  async function ask() {
    if (!currentDay || isLoading) return;
    isLoading = true;
    const resp = $('ai-response-area');
    const btn = $('ai-ask-btn');
    if (btn) btn.textContent = '⏳ Thinking...';
    if (resp) {
      resp.innerHTML = '<span class="ai-loading-dots">Generating response</span>';
    }

    const dayInfo = `
Topic: ${currentDay.title}
Goal: ${currentDay.goal || ''}
Explanation: ${currentDay.explanation || ''}
    `.trim();

    const prompts = {
      explain: `You are an expert AI tutor. Explain this topic in simple, clear terms for a learner:

${dayInfo}

Use analogies, examples, and keep it under 250 words. Format with short paragraphs.`,
      notes: `Generate concise, structured study notes for this topic:

${dayInfo}

Format: Key concept → explanation. Use bullet points. Max 300 words.`,
      practice: `Create 5 progressive practice questions for:

${dayInfo}

Q1 easy, Q5 hard. Include the key skill each tests. Keep it concise.`,
      project: `Suggest ONE specific mini-project to practice:

${dayInfo}

Include: what to build, key skills practiced, rough time estimate (hrs). Be concrete and inspiring.`,
    };

    const prompt = prompts[currentMode] || prompts.explain;

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }]
        })
      });
      const data = await response.json();
      const text = data.content?.map(c => c.text || '').join('') || 'No response. Try again.';

      if (resp) resp.textContent = text;
      if (currentMode === 'notes') {
        const noteArea = $('ai-note-area');
        if (noteArea) noteArea.value = text;
      }
      // Award XP for using AI
      const xpKey = 'aiUsedToday_' + todayStr();
      if (!lsGet(xpKey, false)) {
        lsSet(xpKey, true);
        XP.showXPToast(10);
      }
    } catch(e) {
      if (resp) resp.textContent = '⚠️ AI unavailable. Check your connection.\n\nTip: Review the topic explanation in the day card instead!';
    }

    isLoading = false;
    if (btn) btn.textContent = '🤖 Ask Again';
  }

  function saveNote() {
    const noteArea = $('ai-note-area');
    if (!noteArea || !noteArea.value.trim()) return;
    const notes = lsGet('extraNotes', []);
    const note = {
      id: Date.now(),
      date: todayStr(),
      title: 'AI Notes: ' + (currentDay?.title || 'Topic'),
      content: noteArea.value.trim(),
      aiGenerated: true,
    };
    notes.unshift(note);
    lsSet('extraNotes', notes);
    // Show feedback
    const saveBtn = $('ai-save-note-btn');
    if (saveBtn) {
      saveBtn.textContent = '✅ Saved!';
      setTimeout(() => saveBtn.textContent = '💾 Save Note', 1500);
    }
    XP.showXPToast(10);
  }

  return { open, close, setTab, ask, saveNote };
})();

// ═══════════════════════════════════════════════════════
//  MODULE 3: ANALYTICS DASHBOARD
// ═══════════════════════════════════════════════════════
const Analytics = (function() {
  function getStudyHoursLast14() {
    const att = lsGet('attendance', {});
    const aiProg = lsGet('roadmapAI', {});
    const pomo = lsGet('pomodoroHistory', []);
    const days = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const ds = d.toISOString().slice(0,10);
      // Estimate hours: pomo sessions that day × 0.5hrs + attendance
      const dayPomos = pomo.filter(p => p.date === ds).length;
      const studied = att[ds] === 'present' ? 1 : 0;
      days.push({ date: ds, label: d.toLocaleDateString('en',{weekday:'short'}), hours: dayPomos * 0.5 + studied * 1.5 });
    }
    return days;
  }

  function getWeakTopics() {
    const revisions = lsGet('revisions', []);
    const weak = [];
    const todayISO = new Date().toISOString().slice(0,10);
    const revArr = Array.isArray(revisions) ? revisions : [];
    // Group by topicDay and count overdue
    const grouped = {};
    revArr.forEach(r => {
      if (!r || r.done) return;
      if (r.date && r.date <= todayISO) {
        const key = r.source + '_' + r.topicDay;
        if (!grouped[key]) grouped[key] = { name: r.topicTitle || ('Day ' + r.topicDay), overdueCount: 0 };
        grouped[key].overdueCount++;
      }
    });
    Object.values(grouped).forEach(g => { if (g.overdueCount > 0) weak.push(g); });
    return weak.sort((a,b) => b.overdueCount - a.overdueCount).slice(0, 5);
  }

  function getInsights() {
    const stats = XP.getStats();
    const insights = [];

    if (stats.maxStreak >= 7) insights.push({ icon:'🔥', text:`<strong>You're on a ${stats.maxStreak}-day streak!</strong> Incredible consistency.` });
    if (stats.totalPomo > 10) insights.push({ icon:'⏱️', text:`<strong>${stats.totalPomo} Pomodoro sessions</strong> completed. That's serious focus time!` });
    if (stats.aiDone > 0) {
      const pct = Math.round((stats.aiDone / 171) * 100);
      insights.push({ icon:'🤖', text:`AI Roadmap: <strong>${stats.aiDone} days done (${pct}%)</strong>. Keep the momentum!` });
    }
    if (stats.dsaDone > 0) insights.push({ icon:'💻', text:`DSA Roadmap: <strong>${stats.dsaDone}/20 topics</strong> mastered.` });
    if (stats.maxStreak === 0) insights.push({ icon:'💡', text:`Start your streak today! <strong>Study for just 30 minutes</strong> to begin Day 1.` });
    if (stats.attendance < 0.5 && stats.totalDone > 5) insights.push({ icon:'⚠️', text:`Attendance is below 50%. <strong>Consistency beats intensity</strong> — try to show up daily.` });

    return insights.length ? insights : [{ icon:'📊', text:'Complete some study sessions to unlock insights!' }];
  }

  function render() {
    // Insights
    const insightsEl = $('analytics-insights');
    if (insightsEl) {
      const insights = getInsights();
      insightsEl.innerHTML = insights.map(i =>
        `<div class="analytics-insight-card"><div class="insight-row"><span class="insight-icon">${i.icon}</span><div class="insight-text">${i.text}</div></div></div>`
      ).join('');
    }

    // Study Hours Chart (last 14 days)
    const hoursEl = $('study-hours-chart');
    if (hoursEl) {
      const data = getStudyHoursLast14();
      const maxH = Math.max(...data.map(d => d.hours), 1);
      hoursEl.innerHTML = data.map(d => {
        const pct = Math.round((d.hours / maxH) * 100);
        const color = d.hours >= 2 ? 'var(--c5)' : d.hours >= 1 ? 'var(--c4)' : 'var(--c3)';
        return `<div class="bar-chart-row">
          <div class="bar-chart-label">${d.label}</div>
          <div class="bar-chart-track"><div class="bar-chart-fill" style="width:${pct}%;background:${color}"></div></div>
          <div class="bar-chart-val">${d.hours.toFixed(1)}h</div>
        </div>`;
      }).join('');
    }

    // Completion chart (by level)
    const compEl = $('completion-chart');
    if (compEl) {
      const aiProg = lsGet('roadmapAI', {});
      const aiDone = Object.values(aiProg).filter(v=>v.done).length;
      const dsaProg = lsGet('roadmapDSA', {});
      const dsaAllTopicsForAnalytics = typeof DSA_WEEK_DATA !== 'undefined' ? DSA_WEEK_DATA.reduce((a,w)=>a.concat(w.topics),[]) : [];
      const dsaDone = dsaAllTopicsForAnalytics.filter(t => dsaProg['t'+t.id]?.done).length;
      const items = [
        { label:'AI', done: aiDone, total: typeof AI_ROADMAP_DATA !== 'undefined' ? AI_ROADMAP_DATA.length : aiDone, color:'var(--c1)' },
        { label:'DSA (20)', done: dsaDone, total: 20, color:'var(--c2)' },
      ];
      compEl.innerHTML = items.map(item => {
        const pct = item.total ? Math.round((item.done/item.total)*100) : 0;
        return `<div class="bar-chart-row">
          <div class="bar-chart-label" style="width:60px;font-size:9px">${item.label}</div>
          <div class="bar-chart-track"><div class="bar-chart-fill" style="width:${pct}%;background:${item.color}"></div></div>
          <div class="bar-chart-val">${pct}%</div>
        </div>`;
      }).join('');
    }

    // Weak topics
    const weakEl = $('weak-topics');
    if (weakEl) {
      const weak = getWeakTopics();
      if (weak.length === 0) {
        weakEl.innerHTML = '<div style="font-size:12px;color:var(--c5);padding:8px">✅ No weak topics detected! Great work.</div>';
      } else {
        weakEl.innerHTML = weak.map(w =>
          `<div class="weak-topic-item"><div class="weak-topic-dot"></div><div class="weak-topic-name">${w.name}</div><div class="weak-topic-badge">${w.overdueCount} overdue</div></div>`
        ).join('');
      }
    }
  }

  return { render };
})();

// ═══════════════════════════════════════════════════════
//  MODULE 4: CALENDAR VIEW
// ═══════════════════════════════════════════════════════
const Calendar = (function() {
  let viewDate = new Date();

  // ── Local date helper (no UTC drift) ──
  function localISO(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  // ── Save attendance to localStorage + backend ──
  function saveAttendance(att) {
    lsSet('attendance', att);
    if (window.HybridData && HybridData.isLoggedIn()) {
      HybridData.saveUserData({ attendance: att });
    }
  }

  // ── Update attendance stats bar ──
  function renderStats(att) {
    const vals    = Object.values(att);
    const present = vals.filter(v => v === 'present').length;
    const absent  = vals.filter(v => v === 'absent').length;
    const total   = present + absent;
    const pct     = total > 0 ? Math.round((present / total) * 100) : null;
    const pEl = document.getElementById('att-cal-present');
    const aEl = document.getElementById('att-cal-absent');
    const rEl = document.getElementById('att-cal-pct');
    if (pEl) pEl.textContent = present;
    if (aEl) aEl.textContent = absent;
    if (rEl) rEl.textContent = pct !== null ? pct + '%' : '—%';
  }

  // ════════════════════════════════════════════════════
  //  SPACED REPETITION HELPERS
  // ════════════════════════════════════════════════════

  // Generate revision dates from a completion date (+1,+3,+7,+14,+30 days).
  // Completion day itself is NEVER included.
  function generateRevisionDates(completedDate) {
    const INTERVALS = [1, 3, 7, 14, 30];
    const seen = new Set();
    return INTERVALS.map(n => {
      const d = new Date(completedDate + 'T00:00:00');
      d.setDate(d.getDate() + n);
      const y = d.getFullYear();
      const mo = String(d.getMonth() + 1).padStart(2, '0');
      const dy = String(d.getDate()).padStart(2, '0');
      return `${y}-${mo}-${dy}`;
    }).filter(ds => {
      // Guard against duplicates (shouldn't happen with fixed intervals)
      if (seen.has(ds) || ds === completedDate) return false;
      seen.add(ds);
      return true;
    });
  }

  // Build a map: date → { completed: [{id,title,source}], revision: [{id,title,source,interval}] }
  // from ALL progress stores + revisions list.
  function buildDateMap() {
    const map = {};

    function ensure(ds) {
      if (!map[ds]) map[ds] = { completed: [], revision: [] };
      return map[ds];
    }

    // ── AI progress ──
    const aiProg = lsGet('roadmapAI', {});
    Object.entries(aiProg).forEach(([key, v]) => {
      if (!v) return;
      const title = v.title || ('AI Day ' + key);
      if (v.completedDate) {
        ensure(v.completedDate).completed.push({ id: 'ai_' + key, title, source: 'ai' });
        // Generate revision dates on-the-fly for AI topics
        generateRevisionDates(v.completedDate).forEach((rd, i) => {
          ensure(rd).revision.push({ id: 'ai_' + key, title, source: 'ai', interval: [1,3,7,14,30][i] });
        });
      }
    });

    // ── DSA progress ──
    const dsaProg = lsGet('roadmapDSA', {});
    Object.entries(dsaProg).forEach(([key, v]) => {
      if (!v) return;
      const title = v.title || ('DSA ' + key);
      if (v.completedDate) {
        ensure(v.completedDate).completed.push({ id: 'dsa_' + key, title, source: 'dsa' });
        generateRevisionDates(v.completedDate).forEach((rd, i) => {
          ensure(rd).revision.push({ id: 'dsa_' + key, title, source: 'dsa', interval: [1,3,7,14,30][i] });
        });
      }
    });

    // ── Revisions list (authoritative — covers scheduled entries) ──
    const revisions = lsGet('revisions', []);
    const revArr = Array.isArray(revisions)
      ? revisions
      : Object.values(revisions).reduce((a, v) => a.concat(Array.isArray(v) ? v : []), []);

    revArr.forEach(r => {
      if (!r || !r.date) return;
      const ds = map[r.date] ? map[r.date] : ensure(r.date);
      // Avoid duplicate revision entries (already added from progress above for AI/DSA)
      const alreadyHas = ds.revision.some(x => x.id === (r.source + '_' + r.topicDay));
      if (!alreadyHas) {
        ds.revision.push({
          id: r.source + '_' + r.topicDay,
          title: r.topicTitle || ('Day ' + r.topicDay),
          source: r.source || 'ai',
          interval: r.interval,
          done: r.done,
        });
      }
    });

    return map;
  }

  // Get data for a specific date — returns { completed, revision, attendance }
  function getDateData(ds) {
    const map = buildDateMap();
    const att = lsGet('attendance', {});
    return {
      completed:  (map[ds] || {}).completed  || [],
      revision:   (map[ds] || {}).revision   || [],
      attendance: att[ds] || null,
    };
  }

  // ════════════════════════════════════════════════════
  //  RENDER
  // ════════════════════════════════════════════════════
  function render() {
    const year  = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay    = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today    = new Date();
    const todayISO = localISO(today);

    const att    = lsGet('attendance', {});
    const dateMap = buildDateMap();

    // Month title
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    if ($('cal-month-title')) $('cal-month-title').textContent = `${months[month]} ${year}`;

    const grid = $('cal-grid');
    if (!grid) return;
    let html = '';
    for (let i = 0; i < firstDay; i++) html += '<div class="cal-day empty"></div>';

    for (let day = 1; day <= daysInMonth; day++) {
      const ds      = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
      const dateObj = new Date(year, month, day);
      const isFuture = dateObj > today && ds !== todayISO;
      const isToday  = ds === todayISO;
      const attStatus   = att[ds];
      const dayData     = dateMap[ds] || { completed: [], revision: [] };
      const hasCompleted = dayData.completed.length > 0;
      const hasRevision  = dayData.revision.length > 0;

      // Priority order for class:
      // att-present / att-absent override study classes (attendance is primary)
      // Within study: both > completed > revision
      let cls = 'cal-day';
      if (isFuture) {
        cls += ' future';
        // Still show revision dots on future dates
        if (hasRevision) cls += ' revision';
      } else if (attStatus === 'present') {
        cls += ' att-present';
        if (hasCompleted) cls += ' completed-dot';
        if (hasRevision)  cls += ' revision-dot';
      } else if (attStatus === 'absent') {
        cls += ' att-absent';
        if (hasRevision)  cls += ' revision-dot';
      } else if (hasCompleted && hasRevision) {
        cls += ' cal-both';
      } else if (hasCompleted) {
        cls += ' completed';
      } else if (hasRevision) {
        cls += ' revision';
      }
      if (isToday) cls += ' today';

      // Build dot indicators
      let dots = '';
      if (hasCompleted) dots += '<span class="cal-dot dot-done"></span>';
      if (hasRevision)  dots += '<span class="cal-dot dot-rev"></span>';

      html += `<div class="${cls}" data-date="${ds}" onclick="APP.calDayClick('${ds}')">
        <span class="cal-day-num">${day}</span>
        ${dots ? `<span class="cal-dots">${dots}</span>` : ''}
      </div>`;
    }
    grid.innerHTML = html;
    renderStats(att);
  }

  function prev() { viewDate.setMonth(viewDate.getMonth() - 1); render(); }
  function next() { viewDate.setMonth(viewDate.getMonth() + 1); render(); }

  // ════════════════════════════════════════════════════
  //  DAY CLICK — shows completed + revision for that date
  // ════════════════════════════════════════════════════
  function dayClick(ds) {
    const detail = $('cal-day-detail');
    const todayISO = localISO(new Date());
    const isToday = ds === todayISO;

    if (detail) {
      const { completed, revision, attendance } = getDateData(ds);

      // ── Header ──
      const dateLabel = new Date(ds + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      let html = `<div style="margin-bottom:10px">
        <strong style="color:var(--c1);font-size:13px">${dateLabel}</strong>`;

      if (isToday) html += ` <span style="font-size:10px;background:var(--c1);color:#000;padding:2px 6px;border-radius:4px;font-weight:700;margin-left:6px">TODAY</span>`;
      html += `</div>`;

      // ── Attendance ──
      if (attendance) {
        const attColor = attendance === 'present' ? 'var(--c5)' : 'var(--c3)';
        const attIcon  = attendance === 'present' ? '✅' : '❌';
        html += `<div style="margin-bottom:10px;padding:6px 10px;background:rgba(255,255,255,0.03);border-radius:6px;border:1px solid rgba(255,255,255,0.06)">
          <span style="color:var(--t2);font-size:11px">Attendance: </span>
          <span style="color:${attColor};font-weight:700;font-size:11px">${attIcon} ${attendance.charAt(0).toUpperCase() + attendance.slice(1)}</span>
        </div>`;
      }

      // ── Today banners ──
      if (isToday && completed.length > 0) {
        html += `<div style="margin-bottom:8px;padding:6px 10px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.25);border-radius:6px;font-size:11px;color:var(--c5);font-weight:700">
          🎉 Completed Today — great work!
        </div>`;
      }
      if (isToday && revision.length > 0) {
        html += `<div style="margin-bottom:8px;padding:6px 10px;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.25);border-radius:6px;font-size:11px;color:var(--c4);font-weight:700">
          🔔 Revision Due Today!
        </div>`;
      }

      // ── Completed topics ──
      if (completed.length > 0) {
        html += `<div style="margin-bottom:8px">
          <div style="font-size:10px;font-weight:700;letter-spacing:1px;color:var(--c5);margin-bottom:6px;text-transform:uppercase">✅ Completed (${completed.length})</div>`;
        completed.forEach(t => {
          const badge = t.source === 'dsa'
            ? `<span style="font-size:9px;background:rgba(124,58,237,0.2);color:#a78bfa;padding:1px 5px;border-radius:3px;margin-left:4px">DSA</span>`
            : `<span style="font-size:9px;background:rgba(0,229,200,0.15);color:var(--c1);padding:1px 5px;border-radius:3px;margin-left:4px">AI</span>`;
          html += `<div style="padding:6px 8px;margin-bottom:4px;background:rgba(16,185,129,0.07);border-left:2px solid var(--c5);border-radius:0 4px 4px 0;font-size:12px;color:var(--t1)">
            ${t.title}${badge}
          </div>`;
        });
        html += `</div>`;
      }

      // ── Revision topics ──
      if (revision.length > 0) {
        html += `<div style="margin-bottom:4px">
          <div style="font-size:10px;font-weight:700;letter-spacing:1px;color:var(--c4);margin-bottom:6px;text-transform:uppercase">🔁 Revision Due (${revision.length})</div>`;
        revision.forEach(t => {
          const intervalLabel = t.interval ? `+${t.interval}d` : '';
          const doneStyle = t.done
            ? 'opacity:0.5;text-decoration:line-through;'
            : '';
          const badge = t.source === 'dsa'
            ? `<span style="font-size:9px;background:rgba(124,58,237,0.2);color:#a78bfa;padding:1px 5px;border-radius:3px;margin-left:4px">DSA</span>`
            : `<span style="font-size:9px;background:rgba(0,229,200,0.15);color:var(--c1);padding:1px 5px;border-radius:3px;margin-left:4px">AI</span>`;
          const intervalBadge = intervalLabel
            ? `<span style="font-size:9px;background:rgba(245,158,11,0.15);color:var(--c4);padding:1px 5px;border-radius:3px;margin-left:4px">${intervalLabel}</span>`
            : '';
          html += `<div style="padding:6px 8px;margin-bottom:4px;background:rgba(245,158,11,0.07);border-left:2px solid var(--c4);border-radius:0 4px 4px 0;font-size:12px;color:var(--t1);${doneStyle}">
            ${t.title}${badge}${intervalBadge}
          </div>`;
        });
        html += `</div>`;
      }

      // ── Empty state ──
      if (!completed.length && !revision.length && !attendance) {
        html += `<div style="color:var(--t2);font-size:12px;text-align:center;padding:8px 0">No activities logged for this day.</div>`;
      }

      detail.innerHTML = html;
    }

    // Open the attendance action modal
    AttModal.open(ds);
  }

  return { render, prev, next, dayClick, saveAttendance, renderStats, getDateData, generateRevisionDates };
})();

// ═══════════════════════════════════════════════════════
//  ATTENDANCE MODAL
// ═══════════════════════════════════════════════════════
const AttModal = (function() {
  let _currentDate = null;

  function _toast(msg) {
    const el = document.getElementById('toast');
    if (el) { el.textContent = msg; el.className = 'show info'; setTimeout(() => el.className = '', 2800); }
  }

  function open(ds) {
    _currentDate = ds;
    const att = lsGet('attendance', {});
    const existing = att[ds];

    // Populate modal
    const dateEl    = document.getElementById('att-modal-date');
    const curEl     = document.getElementById('att-modal-current');
    const resetBtn  = document.getElementById('att-modal-reset-btn');
    if (dateEl) dateEl.textContent = ds;
    if (curEl) {
      if (existing) {
        curEl.innerHTML = `Currently: <span class="${existing}">${existing === 'present' ? '✅ Present' : '❌ Absent'}</span>`;
      } else {
        curEl.textContent = 'Not marked yet';
      }
    }
    // Show/hide reset button
    if (resetBtn) resetBtn.style.display = existing ? '' : 'none';

    const overlay = document.getElementById('att-modal-overlay');
    if (overlay) overlay.classList.add('open');
  }

  function close() {
    const overlay = document.getElementById('att-modal-overlay');
    if (overlay) overlay.classList.remove('open');
    _currentDate = null;
  }

  function bgClose(e) {
    if (e.target === document.getElementById('att-modal-overlay')) close();
  }

  function mark(status) {
    if (!_currentDate) return;
    const att = lsGet('attendance', {});
    const existing = att[_currentDate];

    const doMark = () => {
      att[_currentDate] = status;
      Calendar.saveAttendance(att);
      Calendar.render();
      close();
      _toast(status === 'present' ? '✅ Marked Present!' : '❌ Marked Absent');
    };

    if (existing && existing !== status) {
      // Already marked with a different status — ask before overwriting
      if (confirm(`This day is already marked as "${existing}". Change to "${status}"?`)) {
        doMark();
      }
    } else {
      doMark();
    }
  }

  function reset() {
    if (!_currentDate) return;
    const att = lsGet('attendance', {});
    if (!att[_currentDate]) { close(); return; }
    if (confirm(`Remove attendance record for ${_currentDate}?`)) {
      delete att[_currentDate];
      Calendar.saveAttendance(att);
      Calendar.render();
      close();
      _toast('🗑 Attendance removed');
    }
  }

  return { open, close, bgClose, mark, reset };
})();

// ═══════════════════════════════════════════════════════
//  MODULE 5: GOALS SYSTEM
// ═══════════════════════════════════════════════════════
const Goals = (function() {
  function save() {
    const daily  = parseFloat($('goal-daily')?.value) || 2;
    const weekly = parseFloat($('goal-weekly')?.value) || 10;
    const days   = parseInt($('goal-days')?.value) || 20;
    lsSet('userGoals', { daily, weekly, days });
    render();
    // Toast feedback
    // Show a simple toast
    const toastEl = document.getElementById('toast');
    if (toastEl) { toastEl.textContent = '🎯 Goals saved!'; toastEl.className = 'show success'; setTimeout(() => { toastEl.className = ''; }, 2800); }
    XP.showXPToast(5);
  }

  function getActuals() {
    const att = lsGet('attendance', {});
    const pomo = lsGet('pomodoroHistory', []);
    const now = new Date();

    // Today's hours (pomo sessions × 0.5)
    const todayKey = now.toISOString().slice(0,10);
    const todayPomos = pomo.filter(p => p.date === todayKey).length;
    const dailyHours = todayPomos * 0.5;

    // This week's hours
    const weekStart = new Date(now); weekStart.setDate(now.getDate() - now.getDay());
    const weekPomos = pomo.filter(p => new Date(p.date) >= weekStart).length;
    const weeklyHours = weekPomos * 0.5;

    // This month's study days
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthDays = Object.entries(att)
      .filter(([d, s]) => s === 'present' && new Date(d) >= monthStart)
      .length;

    return { dailyHours, weeklyHours, monthDays };
  }

  function render() {
    const goals = lsGet('userGoals', { daily: 2, weekly: 10, days: 20 });
    if ($('goal-daily'))  $('goal-daily').value  = goals.daily;
    if ($('goal-weekly')) $('goal-weekly').value = goals.weekly;
    if ($('goal-days'))   $('goal-days').value   = goals.days;

    const actual = getActuals();
    const grid = $('goals-grid');
    if (!grid) return;

    const items = [
      { title:'Daily Goal',   goal: goals.daily,   actual: actual.dailyHours,   unit:'hrs',  color:'var(--c1)' },
      { title:'Weekly Goal',  goal: goals.weekly,  actual: actual.weeklyHours,  unit:'hrs',  color:'var(--c2)' },
      { title:'Monthly Days', goal: goals.days,    actual: actual.monthDays,    unit:'days', color:'var(--c4)' },
    ];

    grid.innerHTML = items.map(item => {
      const pct = Math.min(100, item.goal > 0 ? Math.round((item.actual / item.goal) * 100) : 0);
      const status = pct >= 100 ? 'on-track' : pct >= 60 ? 'partial' : 'off-track';
      const strokeDasharray = 2 * Math.PI * 28; // r=28
      const strokeDashoffset = strokeDasharray * (1 - pct / 100);
      const ringColor = pct >= 100 ? 'var(--c5)' : pct >= 60 ? 'var(--c4)' : 'var(--c3)';

      return `<div class="goal-card ${status}">
        <div class="goal-card-title">${item.title}</div>
        <div class="goal-ring-wrap">
          <svg class="goal-ring-svg" width="72" height="72" viewBox="0 0 72 72">
            <circle class="goal-ring-bg" cx="36" cy="36" r="28"/>
            <circle class="goal-ring-fill" cx="36" cy="36" r="28"
              stroke="${ringColor}"
              stroke-dasharray="${strokeDasharray.toFixed(1)}"
              stroke-dashoffset="${strokeDashoffset.toFixed(1)}"/>
          </svg>
          <div class="goal-ring-text" style="color:${ringColor}">${pct}%</div>
        </div>
        <div class="goal-card-val">${item.actual.toFixed(1)} / ${item.goal} ${item.unit}</div>
      </div>`;
    }).join('');
  }

  return { save, render };
})();

// ═══════════════════════════════════════════════════════
//  MODULE 6: ENHANCED POMODORO HISTORY + AUTO-NEXT
// ═══════════════════════════════════════════════════════
const PomoEnhancer = (function() {
  function logSession(type, durationMin) {
    // Save to history for analytics
    const history = lsGet('pomodoroHistory', []);
    history.unshift({ date: todayStr(), time: new Date().toLocaleTimeString(), type, duration: durationMin });
    if (history.length > 200) history.length = 200; // cap
    lsSet('pomodoroHistory', history);
    // XP
    XP.showXPToast(15);
    XP.checkNewBadges(XP.getStats());
  }

  function getBestStudyTime() {
    const history = lsGet('pomodoroHistory', []);
    if (history.length < 5) return null;
    const hourCounts = {};
    history.forEach(h => {
      const hr = h.time ? parseInt(h.time.split(':')[0]) : null;
      if (hr !== null) hourCounts[hr] = (hourCounts[hr] || 0) + 1;
    });
    const best = Object.entries(hourCounts).sort((a,b)=>b[1]-a[1])[0];
    if (!best) return null;
    const hr = parseInt(best[0]);
    const label = hr === 0 ? '12 AM' : hr < 12 ? hr + ' AM' : hr === 12 ? '12 PM' : (hr-12) + ' PM';
    return label;
  }

  function renderBestTime() {
    const bestEl = $('pomo-best-study-time');
    if (!bestEl) return;
    const best = getBestStudyTime();
    if (best) {
      bestEl.innerHTML = `<div class="pomo-best-time"><span class="pomo-best-ico">🌟</span><div class="pomo-best-text">Your best study time is <strong>${best}</strong> based on your session history.</div></div>`;
    }
  }

  function renderHistory() {
    const el = $('pomo-history-list');
    if (!el) return;
    const history = lsGet('pomodoroHistory', []).slice(0, 10);
    if (!history.length) { el.innerHTML = '<div style="font-size:11px;color:var(--t2);text-align:center;padding:12px">No sessions yet. Start your first Pomodoro!</div>'; return; }
    el.innerHTML = history.map(h => {
      const ico = h.type === 'ai' ? '🤖' : h.type === 'dsa' ? '💻' : h.type === 'projects' ? '🚀' : '📚';
      return `<div class="pomo-history-item">
        <span class="pomo-hist-ico">${ico}</span>
        <div class="pomo-hist-info">
          <div class="pomo-hist-title">${h.type?.toUpperCase() || 'Study'} Session</div>
          <div class="pomo-hist-time">${h.date} ${h.time || ''} · ${h.duration || 25} min</div>
        </div>
      </div>`;
    }).join('');
  }

  return { logSession, getBestStudyTime, renderBestTime, renderHistory };
})();

// ═══════════════════════════════════════════════════════
//  MODULE 7: PWA / SERVICE WORKER INSTALLER
// ═══════════════════════════════════════════════════════
const PWA = (function() {
  let deferredPrompt = null;

  function init() {
    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      // Show banner after 10s if not dismissed
      setTimeout(() => {
        if (deferredPrompt && !lsGet('pwaDismissed', false)) {
          $('pwa-banner')?.classList.add('show');
        }
      }, 10000);
    });

    // Register service worker
    if ('serviceWorker' in navigator) {
      // Inline service worker via blob URL
      const swCode = `
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(clients.claim()); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.open('roadmapx-v3').then(cache =>
      cache.match(e.request).then(cached => {
        const networkFetch = fetch(e.request).then(resp => {
          if (resp.ok) cache.put(e.request, resp.clone());
          return resp;
        }).catch(() => cached);
        return cached || networkFetch;
      })
    )
  );
});
      `.trim();
      try {
        const blob = new Blob([swCode], {type:'text/javascript'});
        const swUrl = URL.createObjectURL(blob);
        navigator.serviceWorker.register(swUrl).catch(()=>{});
      } catch(e) {}
    }
  }

  function install() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => {
      deferredPrompt = null;
      $('pwa-banner')?.classList.remove('show');
    });
  }

  function dismiss() {
    $('pwa-banner')?.classList.remove('show');
    lsSet('pwaDismissed', true);
  }

  return { init, install, dismiss };
})();

// ═══════════════════════════════════════════════════════
//  MODULE 8: SPACED REPETITION SCHEDULER
// ═══════════════════════════════════════════════════════
const SpacedRep = (function() {
  // Schedule: Day 1, 3, 7, 14, 30 after completion
  const INTERVALS = [1, 3, 7, 14, 30];

  function scheduleRevision(dayNum, title, completedDate) {
    // SpacedRep module uses APP's flat revisions array — delegate to APP.scheduleRevisions
    if (typeof APP !== 'undefined' && APP.scheduleRevisions) {
      // Already handled by APP core on toggleDone
    }
  }

  function getOverdue() {
    const revisions = lsGet('revisions', []);
    const today = new Date().toISOString().slice(0,10);
    const overdue = [];
    if (Array.isArray(revisions)) {
      revisions.forEach(r => {
        if (r && !r.done && r.date <= today) overdue.push(r);
      });
    }
    return overdue.sort((a,b) => a.date.localeCompare(b.date));
  }

  function getRevisionBadgeHTML(dayNum, completedDate) {
    const revisions = lsGet('revisions', []);
    const today = new Date().toISOString().slice(0,10);
    const topicRevs = Array.isArray(revisions)
      ? revisions.filter(r => r && (r.topicDay === dayNum || r.topicDay === String(dayNum)))
      : [];
    if (!topicRevs.length) return '';
    const next = topicRevs.find(r => !r.done);
    if (!next) return '<span class="spaced-rep-badge done">✅ All Reviews Done</span>';
    if (next.date <= today) return `<span class="spaced-rep-badge due">🔁 Review Due</span>`;
    return `<span class="spaced-rep-badge upcoming">📅 Review ${next.date}</span>`;
  }

  function getOverdueCount() {
    return getOverdue().length;
  }

  return { scheduleRevision, getOverdue, getRevisionBadgeHTML, getOverdueCount };
})();

// ═══════════════════════════════════════════════════════
//  MODULE 9: EXTENDED PROJECT SAVE (adds GitHub, Demo fields)
// ═══════════════════════════════════════════════════════
const ProjectEnhancer = (function() {
  function getSaveData() {
    return {
      github: $('proj-github')?.value?.trim() || '',
      demo:   $('proj-demo')?.value?.trim()   || '',
    };
  }

  function populateModal(project) {
    if ($('proj-github')) $('proj-github').value = project.github || '';
    if ($('proj-demo'))   $('proj-demo').value   = project.demo   || '';
  }

  function renderLinks(project) {
    let html = '<div class="proj-links-row">';
    if (project.github) html += `<a href="${project.github}" target="_blank" class="proj-link-btn github">🐙 GitHub</a>`;
    if (project.demo)   html += `<a href="${project.demo}"   target="_blank" class="proj-link-btn demo">🌐 Live Demo</a>`;
    html += '</div>';
    if (project.tags) {
      const tags = project.tags.split(',').map(t => t.trim()).filter(Boolean);
      html += '<div class="proj-tech-tags">' + tags.map(t => `<span class="proj-tech-tag">${t}</span>`).join('') + '</div>';
    }
    return html;
  }

  return { getSaveData, populateModal, renderLinks };
})();

// ═══════════════════════════════════════════════════════
//  WIRE UP: Extend APP's public API
// ═══════════════════════════════════════════════════════

// Store originals
const _origSwitchTab     = APP.switchTab.bind(APP);
window._origSwitchTab    = _origSwitchTab;  // expose for standaloneSwitch in index.html

// ── Expose all render functions globally for standaloneSwitch ──
// These are private to the APP IIFE so we expose them here at top level
window._rxRender = {
  home:     function() { try { _origSwitchTab('home');     } catch(e){} },
  streak:   function() { try { _origSwitchTab('streak');   } catch(e){} },
  files:    function() { try { _origSwitchTab('files');    } catch(e){} },
  calendar: function() { try { _origSwitchTab('calendar'); } catch(e){} },
  goals:    function() { try { _origSwitchTab('goals');    } catch(e){} },
  badges:   function() { try { _origSwitchTab('badges');   } catch(e){} },
  revision: function() { try { _origSwitchTab('revision'); } catch(e){} },
  pomo:     function() { try { _origSwitchTab('pomo');     } catch(e){} },
  projects: function() { try { _origSwitchTab('projects'); } catch(e){} },
  profile:  function() { try { _origSwitchTab('profile');  } catch(e){} },
  dsa:      function() { try { _origSwitchTab('dsa');      } catch(e){} },
  ai:       function() { try { _origSwitchTab('ai');       } catch(e){} },
  extra:    function() { try { _origSwitchTab('extra');    } catch(e){} },
};
const _origInit          = APP.init.bind(APP);
const _origSaveProject   = APP.saveProject.bind(APP);
const _origOpenProjModal = APP.openProjectModal.bind(APP);

// Override saveProject to include new fields
APP.saveProject = function() {
  const extra = ProjectEnhancer.getSaveData();
  // Temporarily set extra fields on elements the original saveProject reads
  const origSave = _origSaveProject;
  // Patch: inject github/demo into the project data after save
  const projects = lsGet('projects', []);
  origSave(); // original save
  // Now update the last-saved project with extra fields
  const updatedProjects = lsGet('projects', []);
  if (updatedProjects.length) {
    const last = updatedProjects[0]; // most recent
    last.github = extra.github;
    last.demo   = extra.demo;
    lsSet('projects', updatedProjects);
  }
  XP.showXPToast(50);
  XP.checkNewBadges(XP.getStats());
};

// Override openProjectModal to populate new fields
APP.openProjectModal = function(idOrSource) {
  _origOpenProjModal(idOrSource);
  // Only look up project data if this is a real project ID (not a source tag)
  const isSourceTag = (idOrSource === 'ai' || idOrSource === 'dsa');
  if (idOrSource && !isSourceTag) {
    const projects = lsGet('projects', []);
    const proj = projects.find(p => p.id === idOrSource);
    if (proj) ProjectEnhancer.populateModal(proj);
  } else {
    if ($('proj-github')) $('proj-github').value = '';
    if ($('proj-demo'))   $('proj-demo').value = '';
  }
};

// New methods exposed on APP
APP.closeAIModal    = AIMentor.close.bind(AIMentor);
APP.setAITab        = AIMentor.setTab.bind(AIMentor);
APP.askAI           = AIMentor.ask.bind(AIMentor);
APP.saveAINote      = AIMentor.saveNote.bind(AIMentor);
APP.openAIMentor    = AIMentor.open.bind(AIMentor);

APP.calPrev              = Calendar.prev.bind(Calendar);
APP.calNext              = Calendar.next.bind(Calendar);
APP.calDayClick          = Calendar.dayClick.bind(Calendar);
APP.calGetDateData       = Calendar.getDateData.bind(Calendar);
APP.calGenRevisionDates  = Calendar.generateRevisionDates.bind(Calendar);
window.AttModal          = AttModal;

APP.saveGoals       = Goals.save.bind(Goals);
APP.installPWA      = PWA.install.bind(PWA);
APP.dismissPWA      = PWA.dismiss.bind(PWA);

// ═══════════════════════════════════════════════════════
//  PATCH: Inject "Ask AI" button into day cards
//  We override the day card render to add the AI button
// ═══════════════════════════════════════════════════════
(function patchDayCards() {
  // After DOM is ready, add mutation observer to inject AI buttons
  function injectAIButtons() {
    document.querySelectorAll('.day-body-inner').forEach(body => {
      if (body.querySelector('.ai-ask-btn')) return; // already injected
      // Get day data from parent card
      const card = body.closest('.day-card, .ai-s-day-card');
      if (!card) return;
      // Create button
      const btn = document.createElement('button');
      btn.className = 'ai-ask-btn';
      btn.innerHTML = '🤖 Ask AI Mentor';
      btn.style.marginTop = '10px';
      btn.onclick = function(e) {
        e.stopPropagation();
        // Try to get day data from card's data attributes
        const dayTitle = card.querySelector('.day-title, .ai-s-day-title')?.textContent || 'This topic';
        const dayGoal  = card.querySelector('.day-meta, .ai-s-day-meta')?.textContent || '';
        const dayExp   = body.querySelector('.body-text, .ai-s-text')?.textContent || '';
        AIMentor.open({ title: dayTitle, goal: dayGoal, explanation: dayExp });
      };
      body.appendChild(btn);
    });
  }

  const observer = new MutationObserver(() => {
    injectAIButtons();
  });
  document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.getElementById('content') || document.body, { childList: true, subtree: true });
    injectAIButtons();
  });
})();

// ═══════════════════════════════════════════════════════
//  PATCH: Hook into toggleDone to award XP + schedule revision
// ═══════════════════════════════════════════════════════
const _origToggleDone = APP.toggleDone.bind(APP);
APP.toggleDone = function(type, dayNum, cb) {
  _origToggleDone(type, dayNum, cb);
  // Check if just marked done — award XP and ensure revisions are scheduled
  setTimeout(() => {
    const prog = lsGet(type === 'ai' ? 'roadmapAI' : 'roadmapDSA', {});
    if (prog[dayNum]?.done) {
      XP.showXPToast(30);
      XP.checkNewBadges(XP.getStats());
      // Revisions are already scheduled by toggleDone inside APP core
      // Refresh section revision panels if visible
      const secRevEl = document.getElementById(type + '-revision-list');
      if (secRevEl) try { APP.renderSectionRevisions(type); } catch(e) {}
    }
  }, 100);
};

// ═══════════════════════════════════════════════════════
//  INIT ALL NEW MODULES
// ═══════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    // Init PWA
    PWA.init();

    // Revision nav removed — revisions now appear inline in AI/DSA roadmaps

    // Add pomo history placeholder to pomo tab
    const pomoTab = document.getElementById('tab-pomo');
    if (pomoTab && !document.getElementById('pomo-best-study-time')) {
      const wrap = document.createElement('div');
      wrap.id = 'pomo-best-study-time';
      const histWrap = document.createElement('div');
      histWrap.id = 'pomo-history-list';
      histWrap.className = 'pomo-history-list';
      // Find a good insertion point
      const lastSection = pomoTab.querySelector('.section:last-child');
      if (lastSection) {
        const title = document.createElement('div');
        title.className = 'section';
        title.innerHTML = '<div class="section-title">⏱️ Session History</div>';
        pomoTab.appendChild(title);
        pomoTab.appendChild(wrap);
        pomoTab.appendChild(histWrap);
        PomoEnhancer.renderBestTime();
        PomoEnhancer.renderHistory();
      }
    }

    // Auto-check badges on init
    XP.checkNewBadges(XP.getStats());

  }, 500);
});

// ═══════════════════════════════════════════════════════
//  NAVIGATION STACK + BACK BUTTON + BROWSER HISTORY
// ═══════════════════════════════════════════════════════

// Each entry is a full state object:
//   { tab: 'home' }
//   { tab: 'ai', view: 'levels' }
//   { tab: 'ai', view: 'weeks',  level: 'beginner' }
//   { tab: 'ai', view: 'days',   level: 'beginner', week: 3 }
let navStack = [{ tab: 'home' }];
let __navSuppress = false;

function __hideBottomNavIf(tab) {
  const nav = document.getElementById('bottom-nav');
  if (!nav) return;
  nav.style.display = (tab === 'ai' || tab === 'dsa') ? 'none' : '';
}

// Push a full state object — collapses identical consecutive states
function __pushNavState(s) {
  if (__navSuppress) return;
  const top = navStack[navStack.length - 1];
  if (top && top.tab === s.tab && top.view === s.view &&
      top.level === s.level && top.week === s.week) return;
  navStack.push(s);
  try {
    history.pushState({ __nav: true, ...s }, '', '#' + s.tab);
  } catch (e) { /* ignore */ }
}
// Expose for use by switchTab overrides in index.html
window.__pushNavState = __pushNavState;

// Restore a full state object without touching the stack
function __applyNavState(s) {
  __navSuppress = true;
  try {
    if (s.tab === 'ai' && s.view === 'weeks' && s.level) {
      APP.switchTab('ai');
      const fn = APP.__origSelectAILevel || APP.selectAILevel;
      if (fn) fn.call(APP, s.level);
    } else if (s.tab === 'ai' && s.view === 'days' && s.level && s.week != null) {
      APP.switchTab('ai');
      const fnL = APP.__origSelectAILevel || APP.selectAILevel;
      if (fnL) fnL.call(APP, s.level);
      const fnW = APP.__origSelectAIWeek || APP.selectAIWeek;
      if (fnW) fnW.call(APP, s.week);
    } else if (s.tab === 'ai' && s.view === 'levels') {
      APP.switchTab('ai');
      if (APP.showAILevels) APP.showAILevels();
    } else if (s.tab === 'ai-rm') {
      // Go to AI Visual Roadmap
      const panels = document.querySelectorAll('.tab-panel');
      panels.forEach(p => { p.classList.remove('active'); });
      const aiRmPanel = document.getElementById('tab-ai-rm');
      if (aiRmPanel) { aiRmPanel.classList.add('active'); aiRmPanel.style.display = 'flex'; }
      const nav = document.getElementById('bottom-nav');
      if (nav) nav.style.display = '';
      if (typeof aiRmApplyProgress === 'function') aiRmApplyProgress();
    } else if (s.tab === 'dsa-rm') {
      const panels = document.querySelectorAll('.tab-panel');
      panels.forEach(p => { p.classList.remove('active'); if (p.id === 'tab-dsa-rm') p.style.display = 'none'; });
      const dsaRmPanel = document.getElementById('tab-dsa-rm');
      if (dsaRmPanel) { dsaRmPanel.classList.add('active'); dsaRmPanel.style.display = 'flex'; }
      const nav = document.getElementById('bottom-nav');
      if (nav) nav.style.display = '';
      if (typeof dsaRmApplyProgress === 'function') dsaRmApplyProgress();
    } else if (s.tab === 'fe') {
      const panels = document.querySelectorAll('.tab-panel');
      panels.forEach(p => { p.classList.remove('active'); });
      const dsaRm = document.getElementById('tab-dsa-rm');
      if (dsaRm) dsaRm.style.display = 'none';
      const fePanel = document.getElementById('tab-fe');
      if (fePanel) fePanel.classList.add('active');
      const nav = document.getElementById('bottom-nav');
      if (nav) nav.style.display = '';
      if (typeof feRmApplyProgress === 'function') feRmApplyProgress();
    } else {
      APP.switchTab(s.tab);
    }
  } finally {
    __navSuppress = false;
  }
  __hideBottomNavIf(s.tab);
}

// ── Single, consolidated APP.switchTab override ──────────────────────────────
APP.switchTab = function (name) {
  if (['calendar', 'goals', 'badges'].includes(name)) {
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const panel = document.getElementById('tab-' + name);
    if (panel) panel.classList.add('active');
    const nav = document.getElementById('nav-' + name);
    if (nav) { nav.classList.add('active'); nav.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }); }
    if (name === 'analytics') Analytics.render();
    if (name === 'calendar')  Calendar.render();
    if (name === 'goals')     Goals.render();
    if (name === 'badges')    XP.render();
  } else {
    _origSwitchTab(name);
    if (name === 'pomo') {
      setTimeout(() => { PomoEnhancer.renderBestTime(); PomoEnhancer.renderHistory(); }, 100);
    }
    if (name === 'profile') {
      setTimeout(() => { if (typeof APP.renderAttendance === 'function') APP.renderAttendance(); }, 150);
    }
  }

  __hideBottomNavIf(name);
  if (!__navSuppress) {
    const view = (name === 'ai') ? 'levels' : undefined;
    __pushNavState({ tab: name, view });
  }
};

// ── goBack — step back through nav stack ─────────────────────────────────────
APP.goBack = function () {
  if (navStack.length > 1) {
    navStack.pop();
    const prev = navStack[navStack.length - 1];
    __applyNavState(prev);
  } else {
    // Fall through to home if stack is empty or on first entry
    APP.switchTab('home');
  }
};

// ── Wrap selectAILevel — records { tab:'ai', view:'weeks', level } ────────────
if (APP.selectAILevel) {
  const __origLvl = APP.selectAILevel.bind(APP);
  APP.__origSelectAILevel = __origLvl;
  APP.selectAILevel = function (level) {
    __origLvl(level);
    if (!__navSuppress) __pushNavState({ tab: 'ai', view: 'weeks', level: level });
  };
}

// ── Wrap selectAIWeek — records { tab:'ai', view:'days', level, week } ────────
if (APP.selectAIWeek) {
  const __origWk = APP.selectAIWeek.bind(APP);
  APP.__origSelectAIWeek = __origWk;
  APP.selectAIWeek = function (week) {
    const topState = navStack[navStack.length - 1];
    const level = (topState && topState.level) ? topState.level : null;
    __origWk(week);
    if (!__navSuppress) __pushNavState({ tab: 'ai', view: 'days', level: level, week: week });
  };
}

// ── Phone / browser hardware back button ─────────────────────────────────────
window.addEventListener('popstate', function () {
  if (navStack.length > 1) {
    navStack.pop();
    const prev = navStack[navStack.length - 1];
    __applyNavState(prev);
  } else if (navStack.length === 1) {
    __applyNavState(navStack[0]);
  }
});

// ── Seed nav stack once the app has initialised ───────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    // state is private inside APP IIFE — always seed from home
    navStack = [{ tab: 'home' }];
    __hideBottomNavIf('home');
  }, 700);
});

})(); // end IIFE

// ═══════════════════════════════════════════════════════
//  PUBLIC ATTENDANCE WRAPPERS (called from Profile HTML)
// ═══════════════════════════════════════════════════════
APP.markPresent = function () {
  APP.markAttendance('present');
};

APP.markAbsent = function () {
  APP.markAttendance('absent');
};




// ==========================
// 🔥 STREAK + FILES HELPERS
// ==========================
// (No-op: all streak/file logic is handled by APP above.
//  This section is intentionally empty to avoid overriding APP.switchTab.)
// ============================================================
// FLOATING BUTTON START — paste at the END of script.js
// ============================================================

(function () {
  'use strict';

  // ── Constants ──────────────────────────────────────────────
  const LS_POS    = 'fab_position';
  const LS_NOTES  = 'fab_notes';
  const POMO_WORK  = 25 * 60;
  const POMO_BREAK =  5 * 60;

  // ── State ──────────────────────────────────────────────────
  let fabOpen     = false;
  let isDragging  = false;
  let dragOffX    = 0, dragOffY = 0;
  let pomoTimer   = null;
  let pomoSeconds = POMO_WORK;
  let pomoRunning = false;
  let pomoSession = 1;
  let pomoIsBreak = false;
  const CIRCUM    = 2 * Math.PI * 42;

  // ── DOM refs ────────────────────────────────────────────────
  let btn, panel, arc, timeEl, modeEl, startBtn, pauseBtn,
      resetBtn, countEl, notesTa, notesWc, notesSave;

  // ── Init ────────────────────────────────────────────────────
  function fabInit() {
    btn       = document.getElementById('fab-btn');
    panel     = document.getElementById('fab-panel');
    arc       = document.getElementById('fab-pomo-arc');
    timeEl    = document.getElementById('fab-pomo-time');
    modeEl    = document.getElementById('fab-pomo-mode');
    startBtn  = document.getElementById('fab-pomo-start');
    pauseBtn  = document.getElementById('fab-pomo-pause');
    resetBtn  = document.getElementById('fab-pomo-reset');
    countEl   = document.getElementById('fab-pomo-count');
    notesTa   = document.getElementById('fab-notes-ta');
    notesWc   = document.getElementById('fab-notes-wc');
    notesSave = document.getElementById('fab-notes-save');

    if (!btn || !panel) return;

    restorePosition();
    restoreNotes();
    bindDrag();
    bindPanel();
    bindPomo();
    bindNotes();
    bindTabs();
  }

  // ── Position ─────────────────────────────────────────────────
  // We ALWAYS use left/top in viewport space (position: fixed).
  // localStorage stores the edge-snapped position as a fraction
  // of the viewport so it survives window resizes and orientation changes.

  function setPos(left, top) {
    btn.style.right  = 'auto';
    btn.style.bottom = 'auto';
    btn.style.left   = left + 'px';
    btn.style.top    = top  + 'px';
  }

  function restorePosition() {
    try {
      const pos = JSON.parse(localStorage.getItem(LS_POS) || 'null');
      if (pos && typeof pos.rx === 'number') {
        // Stored as ratio of viewport — safe after resize / orientation flip
        const left = clamp(pos.rx * window.innerWidth,  0, window.innerWidth  - btn.offsetWidth);
        const top  = clamp(pos.ry * window.innerHeight, 0, window.innerHeight - btn.offsetHeight);
        setPos(left, top);
        return;
      }
    } catch (e) {}
    // Default: bottom-right corner (match CSS defaults)
    setPos(
      window.innerWidth  - btn.offsetWidth  - 16,
      window.innerHeight - btn.offsetHeight - 74
    );
  }

  function savePosition() {
    try {
      const r = btn.getBoundingClientRect();
      localStorage.setItem(LS_POS, JSON.stringify({
        rx: r.left / window.innerWidth,
        ry: r.top  / window.innerHeight
      }));
    } catch (e) {}
  }

  // Snap to nearest left or right edge, keep current top
  function snapToEdge() {
    const r    = btn.getBoundingClientRect();
    const cx   = r.left + r.width / 2;
    const snapX = cx < window.innerWidth / 2
      ? 10
      : window.innerWidth - r.width - 10;
    // Clamp top so button doesn't go off screen
    const snapY = clamp(r.top, 10, window.innerHeight - r.height - 10);

    btn.style.transition = 'left 0.22s cubic-bezier(0.25,0.46,0.45,0.94), top 0.1s ease';
    setPos(snapX, snapY);

    setTimeout(function () {
      btn.style.transition = '';
      savePosition();
    }, 250);
  }

  // ── Drag ─────────────────────────────────────────────────────
  // Key fix: position: fixed means left/top ARE viewport coords.
  // clientX/clientY from touch/mouse events are also viewport coords.
  // So: newLeft = clientX - dragOffX   (no scroll adjustment needed).

  function bindDrag() {
    btn.addEventListener('touchstart', onDragStart, { passive: false });
    btn.addEventListener('mousedown',  onDragStart);
    document.addEventListener('touchmove', onDragMove, { passive: false });
    document.addEventListener('mousemove',  onDragMove);
    document.addEventListener('touchend',  onDragEnd);
    document.addEventListener('mouseup',   onDragEnd);
  }

  function getXY(e) {
    if (e.touches && e.touches.length) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    if (e.changedTouches && e.changedTouches.length) {
      return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  }

  function onDragStart(e) {
    const { x, y } = getXY(e);
    const r = btn.getBoundingClientRect();

    // How far the finger/cursor is from the button's top-left corner
    dragOffX = x - r.left;
    dragOffY = y - r.top;

    isDragging = false;
    btn._startX = x;
    btn._startY = y;

    // Switch to left/top immediately so move calcs work correctly.
    // r.left / r.top are already viewport coords for position:fixed.
    btn.style.transition = '';
    setPos(r.left, r.top);

    if (e.cancelable) e.preventDefault();
  }

  function onDragMove(e) {
    if (btn._startX == null) return; // dragStart never fired

    const { x, y } = getXY(e);
    const dx = Math.abs(x - btn._startX);
    const dy = Math.abs(y - btn._startY);

    // 6px threshold before we commit to dragging
    if (!isDragging && dx < 6 && dy < 6) return;

    if (!isDragging) {
      isDragging = true;
      btn.classList.add('fab-dragging');
      closePanel();
    }

    // clientX/Y are viewport coords; left/top for position:fixed are viewport coords.
    // dragOffX keeps the button anchored under the finger exactly where you touched it.
    const newX = clamp(x - dragOffX, 0, window.innerWidth  - btn.offsetWidth);
    const newY = clamp(y - dragOffY, 0, window.innerHeight - btn.offsetHeight);

    setPos(newX, newY);

    if (e.cancelable) e.preventDefault();
  }

  function onDragEnd() {
    if (!isDragging) {
      btn._startX = null;
      btn._startY = null;
      return;
    }

    btn.classList.remove('fab-dragging');
    isDragging  = false;
    btn._startX = null;
    btn._startY = null;

    snapToEdge();
  }

  // ── Panel ───────────────────────────────────────────────────
  function bindPanel() {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (isDragging) return;
      fabOpen ? closePanel() : openPanel();
    });

    panel.addEventListener('click',      function (e) { e.stopPropagation(); });
    panel.addEventListener('touchstart', function (e) { e.stopPropagation(); }, { passive: true });

    document.addEventListener('mousedown', function (e) {
      if (!fabOpen) return;
      if (btn.contains(e.target) || panel.contains(e.target)) return;
      closePanel();
    });
    document.addEventListener('touchstart', function (e) {
      if (!fabOpen) return;
      if (btn.contains(e.target) || panel.contains(e.target)) return;
      closePanel();
    }, { passive: true });
  }

  function openPanel() {
    fabOpen = true;
    positionPanel();
    panel.classList.add('fab-panel-open');
  }

  function closePanel() {
    fabOpen = false;
    panel.classList.remove('fab-panel-open');
  }

  function positionPanel() {
    const r   = btn.getBoundingClientRect();
    const pw  = 280;
    const ph  = 340;
    const gap = 10;
    let left  = r.left + r.width / 2 - pw / 2;
    let top   = r.top - ph - gap;
    left = clamp(left, 8, window.innerWidth - pw - 8);
    if (top < 8) top = r.bottom + gap;
    panel.style.left = left + 'px';
    panel.style.top  = top  + 'px';
  }

  // ── Tabs ────────────────────────────────────────────────────
  function bindTabs() {
    document.querySelectorAll('.fab-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        document.querySelectorAll('.fab-tab').forEach(t => t.classList.remove('fab-tab-active'));
        tab.classList.add('fab-tab-active');
        const which = tab.dataset.tab;
        const pomoEl  = document.getElementById('fab-pomo');
        const notesEl = document.getElementById('fab-notes');
        if (pomoEl)  pomoEl.style.display  = which === 'pomo'  ? 'flex' : 'none';
        if (notesEl) notesEl.style.display = which === 'notes' ? 'flex' : 'none';
      });
    });
  }

  // ── Pomodoro ────────────────────────────────────────────────
  function bindPomo() {
    function addTap(el, fn) {
      if (!el) return;
      el.addEventListener('click',    function (e) { e.stopPropagation(); fn(); });
      el.addEventListener('touchend', function (e) { e.preventDefault(); e.stopPropagation(); fn(); });
    }
    addTap(startBtn, startPomo);
    addTap(pauseBtn, pausePomo);
    addTap(resetBtn, resetPomo);
    updatePomoUI();
  }

  function startPomo() {
    if (pomoRunning) return;
    pomoRunning = true;
    if (startBtn) startBtn.style.display = 'none';
    if (pauseBtn) pauseBtn.style.display = 'flex';
    pomoTimer = setInterval(tickPomo, 1000);
  }

  function pausePomo() {
    pomoRunning = false;
    clearInterval(pomoTimer);
    if (startBtn) startBtn.style.display = 'flex';
    if (pauseBtn) pauseBtn.style.display = 'none';
  }

  function resetPomo() {
    pausePomo();
    pomoSeconds = pomoIsBreak ? POMO_BREAK : POMO_WORK;
    updatePomoUI();
  }

  function tickPomo() {
    if (pomoSeconds <= 0) {
      clearInterval(pomoTimer);
      pomoRunning = false;
      onPomoEnd();
      return;
    }
    pomoSeconds--;
    updatePomoUI();
  }

  function onPomoEnd() {
    if (startBtn) startBtn.style.display = 'flex';
    if (pauseBtn) pauseBtn.style.display = 'none';
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      [0, 0.3, 0.6].forEach(function (d) {
        const osc = ctx.createOscillator(), g = ctx.createGain();
        osc.connect(g); g.connect(ctx.destination);
        osc.frequency.value = 880; osc.type = 'sine';
        g.gain.setValueAtTime(0.4, ctx.currentTime + d);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + d + 0.3);
        osc.start(ctx.currentTime + d);
        osc.stop(ctx.currentTime + d + 0.3);
      });
    } catch (e) {}

    if (!pomoIsBreak) {
      pomoIsBreak = true;
      pomoSeconds = (pomoSession >= 4) ? 15 * 60 : POMO_BREAK;
    } else {
      pomoIsBreak = false;
      pomoSeconds = POMO_WORK;
      if (pomoSession < 4) pomoSession++;
      else pomoSession = 1;
    }
    updatePomoUI();
    openPanel();
  }

  function updatePomoUI() {
    const total = pomoIsBreak
      ? (pomoSession >= 4 ? 15 * 60 : POMO_BREAK)
      : POMO_WORK;
    const m = Math.floor(pomoSeconds / 60);
    const s = pomoSeconds % 60;
    if (timeEl) timeEl.textContent = pad(m) + ':' + pad(s);
    if (arc) {
      arc.style.strokeDashoffset = CIRCUM * (1 - pomoSeconds / total);
      arc.style.stroke = pomoIsBreak ? 'var(--c2,#7c3aed)' : 'var(--c1,#00e5c8)';
    }
    if (modeEl)  modeEl.textContent  = pomoIsBreak ? 'BREAK' : 'FOCUS';
    if (countEl) countEl.textContent = pomoSession;
  }

  // ── Notes ───────────────────────────────────────────────────
  function restoreNotes() {
    try {
      const saved = localStorage.getItem(LS_NOTES) || '';
      if (saved && notesTa) { notesTa.value = saved; updateWordCount(); }
    } catch (e) {}
  }

  function bindNotes() {
    if (!notesTa || !notesSave) return;
    notesTa.addEventListener('input', updateWordCount);
    notesSave.addEventListener('click', function () {
      try {
        localStorage.setItem(LS_NOTES, notesTa.value);
        notesSave.style.background = 'rgba(0,229,200,0.3)';
        setTimeout(function () { notesSave.style.background = ''; }, 600);
      } catch (e) {}
    });
    let autoTimer;
    notesTa.addEventListener('input', function () {
      clearTimeout(autoTimer);
      autoTimer = setTimeout(function () {
        try { localStorage.setItem(LS_NOTES, notesTa.value); } catch (e) {}
      }, 1500);
    });
  }

  function updateWordCount() {
    if (!notesTa || !notesWc) return;
    const w = notesTa.value.trim() === '' ? 0 : notesTa.value.trim().split(/\s+/).length;
    notesWc.textContent = w + (w === 1 ? ' word' : ' words');
  }

  // ── Helpers ─────────────────────────────────────────────────
  function clamp(v, mn, mx) { return Math.min(Math.max(v, mn), mx); }
  function pad(n) { return String(n).padStart(2, '0'); }

  // ── Boot ────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fabInit);
  } else {
    fabInit();
  }

})();

// ============================================================
// FLOATING BUTTON END
// ============================================================
