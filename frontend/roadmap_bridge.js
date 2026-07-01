/* ══════════════════════════════════════════════════════════════
   roadmap_bridge.js  —  RoadmapX My Roadmaps Feature
   Replaces the old inline script in index.html.
   Uses the backend API (roadmapController.js) via fetch().

   API Endpoints Used:
     POST   /api/roadmaps/create        → create a roadmap
     GET    /api/roadmaps               → list all roadmaps
     GET    /api/roadmaps/:id           → get single roadmap (full weeks/days)
     PUT    /api/roadmaps/:id/day       → update a day (completed, notes, pomodoro)
     POST   /api/roadmaps/:id/task      → add / toggle / delete a task on a day

   The backend base URL is set via window.API_BASE or falls back
   to the same origin (for when the frontend is served by the
   Express server itself).
══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Config ─────────────────────────────────────────────── */
  // API base URL is set by config.js (window.RX_API).
  // Falls back to the Render URL for safety if config.js is missing.
  window.API_BASE = window.RX_API;
  const API_BASE = window.API_BASE.replace(/\/$/, '');

  /* ── State ──────────────────────────────────────────────── */
  let _roadmaps       = [];      // list of roadmap summaries
  let _currentRoadmap = null;    // full roadmap object (with weeks/days)
  let _addStepOpen    = false;

  /* ── DOM helpers ────────────────────────────────────────── */
  const $  = id => document.getElementById(id);
  function escH(s) {
    return String(s || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function toast(msg) {
    if (window.APP && APP.showToast) { APP.showToast(msg); return; }
    const el = $('toast') || $('snackbar');
    if (!el) return;
    el.textContent = msg;
    el.className   = (el.className || '') + ' show';
    setTimeout(() => el.classList.remove('show'), 2400);
  }
  function setBtn(id, disabled, label) {
    const b = $(id);
    if (!b) return;
    b.disabled   = disabled;
    b.textContent = label;
  }

  /* ══════════════════════════════════════════════════════════
     FETCH HELPERS
  ══════════════════════════════════════════════════════════ */
  async function apiFetch(path, options = {}) {
    const url = API_BASE + path;
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',   // required: sends session cookie cross-origin
      ...options,
    });
    const data = await res.json();
    return data;
  }

  /* ══════════════════════════════════════════════════════════
     PANEL OPEN / CLOSE
  ══════════════════════════════════════════════════════════ */
  function openMyRoadmaps() {
    $('myrm-panel').style.display = 'block';
    document.body.style.overflow  = 'hidden';
    showListView();
    loadRoadmaps();
  }

  function closeMyRoadmaps() {
    $('myrm-panel').style.display = 'none';
    document.body.style.overflow  = '';
    _currentRoadmap = null;
  }

  /* ══════════════════════════════════════════════════════════
     VIEW SWITCHING
  ══════════════════════════════════════════════════════════ */
  function showListView() {
    $('myrm-view-list').style.display   = 'block';
    $('myrm-view-detail').style.display = 'none';
    $('myrm-hdr-title').textContent     = 'My Roadmaps';
    _currentRoadmap = null;
  }

  function showDetailView(rm) {
    _currentRoadmap = rm;
    $('myrm-view-list').style.display   = 'none';
    $('myrm-view-detail').style.display = 'block';
    $('myrm-hdr-title').textContent     = rm.title;
    $('myrm-detail-title').textContent  = rm.title;
    $('myrm-detail-desc').textContent   = rm.level
      ? rm.level + ' · ' + rm.numWeeks + ' weeks'
      : rm.numWeeks + ' weeks';
    closeAddStepForm();
    renderDayDetail(rm);
  }

  /* ══════════════════════════════════════════════════════════
     LOAD & RENDER ROADMAP LIST
     GET /api/roadmaps
  ══════════════════════════════════════════════════════════ */
  async function loadRoadmaps() {
    $('myrm-list-loader').style.display  = 'flex';
    $('myrm-list-content').style.display = 'none';
    try {
      const data = await apiFetch('/api/roadmaps');
      _roadmaps = data.success ? (data.roadmaps || []) : [];
    } catch (e) {
      _roadmaps = [];
      toast('⚠️ Could not load roadmaps.');
    }
    renderRoadmaps();
    $('myrm-list-loader').style.display  = 'none';
    $('myrm-list-content').style.display = 'block';
  }

  function renderRoadmaps() {
    const container = $('myrm-cards');
    const empty     = $('myrm-empty');
    const label     = $('myrm-list-label');
    if (label) label.textContent =
      _roadmaps.length + ' roadmap' + (_roadmaps.length !== 1 ? 's' : '');

    if (!_roadmaps.length) {
      container.innerHTML = '';
      empty.style.display = 'block';
      return;
    }
    empty.style.display = 'none';

    container.innerHTML = _roadmaps.map(rm => {
      // Compute progress from weeks/days
      let totalDays = 0, doneDays = 0;
      (rm.weeks || []).forEach(wk =>
        (wk.days || []).forEach(d => {
          totalDays++;
          if (d.completed) doneDays++;
        })
      );
      const pct = totalDays > 0 ? Math.round(doneDays / totalDays * 100) : 0;
      const emojiMap = { Beginner: '🟢', Intermediate: '🟡', Advanced: '🔴' };
      const emoji = rm.emoji || emojiMap[rm.level] || '📚';

      return `
        <div onclick="window._myRmBridge.openDetail('${rm._id}')"
          style="background:var(--bg2);border:1px solid rgba(255,255,255,0.06);
                 border-radius:12px;padding:14px;margin-bottom:10px;cursor:pointer;
                 position:relative;overflow:hidden;transition:border-color 0.15s,background 0.15s;"
          onmouseover="this.style.borderColor='rgba(124,58,237,0.3)';this.style.background='var(--bg3)'"
          onmouseout="this.style.borderColor='rgba(255,255,255,0.06)';this.style.background='var(--bg2)'">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:6px;">
            <div style="font-size:14px;font-weight:600;color:var(--t1);line-height:1.3;">
              ${emoji} ${escH(rm.title)}
            </div>
            <button onclick="event.stopPropagation();window._myRmBridge.deleteRoadmap('${rm._id}')"
              style="font-size:12px;color:var(--c3);padding:2px 7px;border-radius:6px;
                     background:rgba(255,107,107,.1);border:1px solid rgba(255,107,107,.2);
                     cursor:pointer;flex-shrink:0;">✕</button>
          </div>
          ${rm.level ? `<div style="font-size:10px;color:var(--t2);margin-bottom:6px;">
            ${escH(rm.level)} · ${rm.numWeeks} week${rm.numWeeks !== 1 ? 's' : ''}</div>` : ''}
          <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--t2);
                      font-family:var(--font-mono);margin-bottom:5px;">
            <span>${doneDays} / ${totalDays} days</span><span>${pct}%</span>
          </div>
          <div style="height:3px;background:var(--bg5);border-radius:2px;overflow:hidden;">
            <div style="height:100%;background:linear-gradient(90deg,var(--c1),var(--c2));
                        border-radius:2px;width:${pct}%;transition:width 0.4s;"></div>
          </div>
        </div>`;
    }).join('');
  }

  /* ══════════════════════════════════════════════════════════
     OPEN A ROADMAP DETAIL
     GET /api/roadmaps/:id
  ══════════════════════════════════════════════════════════ */
  async function openDetail(id) {
    // Show loader while fetching
    $('myrm-view-list').style.display   = 'none';
    $('myrm-view-detail').style.display = 'block';
    $('myrm-detail-title').textContent  = '…';
    $('myrm-detail-desc').textContent   = '';
    $('myrm-hdr-title').textContent     = 'Loading…';
    $('myrm-steps-loader').style.display = 'flex';
    $('myrm-steps-list').innerHTML       = '';
    $('myrm-steps-empty').style.display  = 'none';

    try {
      const data = await apiFetch('/api/roadmaps/' + id);
      if (!data.success) throw new Error(data.error || 'Not found');
      showDetailView(data.roadmap);
    } catch (e) {
      toast('⚠️ Could not load roadmap.');
      showListView();
    } finally {
      $('myrm-steps-loader').style.display = 'none';
    }
  }

  /* ══════════════════════════════════════════════════════════
     RENDER DAY CARDS (re-uses the detail view area)
     Shows weeks → days with tasks, notes, pomodoro, revision
  ══════════════════════════════════════════════════════════ */
  function renderDayDetail(rm) {
    const stepsEl = $('myrm-steps-list');
    const emptyEl = $('myrm-steps-empty');
    if (!stepsEl) return;

    // Progress header
    let totalDays = 0, doneDays = 0;
    (rm.weeks || []).forEach(wk =>
      (wk.days || []).forEach(d => {
        totalDays++;
        if (d.completed) doneDays++;
      })
    );
    const pct = totalDays > 0 ? Math.round(doneDays / totalDays * 100) : 0;

    const stepsLabel = $('myrm-steps-label');
    const pctLabel   = $('myrm-pct-label');
    const pctTag     = $('myrm-detail-pct-tag');
    const progFill   = $('myrm-prog-fill');
    const stepsCount = $('myrm-steps-count');

    if (stepsLabel) stepsLabel.textContent  = doneDays + ' / ' + totalDays + ' days';
    if (pctLabel)   pctLabel.textContent    = pct + '%';
    if (pctTag)     pctTag.textContent      = pct + '%';
    if (progFill)   progFill.style.width    = pct + '%';
    if (stepsCount) stepsCount.textContent  = totalDays + ' day' + (totalDays !== 1 ? 's' : '');

    if (!totalDays) {
      stepsEl.innerHTML      = '';
      emptyEl.style.display  = 'block';
      emptyEl.innerHTML      =
        '<div style="font-size:14px;font-weight:600;color:var(--t1);margin-bottom:6px;">No days yet</div>' +
        'This roadmap has no weeks/days.';
      return;
    }
    emptyEl.style.display = 'none';

    let html = '';
    (rm.weeks || []).forEach(wk => {
      const wDone  = (wk.days || []).filter(d => d.completed).length;
      const wTotal = (wk.days || []).length;
      const wPct   = wTotal > 0 ? Math.round(wDone / wTotal * 100) : 0;

      html += `
        <div style="margin-bottom:16px;">
          <div style="display:flex;align-items:center;justify-content:space-between;
                      margin-bottom:8px;padding:8px 10px;background:var(--bg2);
                      border:1px solid rgba(255,255,255,0.06);border-radius:8px;">
            <div style="font-size:13px;font-weight:700;color:var(--c2);font-family:var(--font-mono);">
              Week ${wk.week}
            </div>
            <div style="font-size:10px;color:var(--t2);font-family:var(--font-mono);">
              ${wDone}/${wTotal} · ${wPct}%
            </div>
          </div>`;

      (wk.days || []).forEach(d => {
        const tasksDone  = (d.tasks || []).filter(t => t.done).length;
        const tasksTotal = (d.tasks || []).length;
        html += renderDayCard(rm._id, d, tasksTotal, tasksDone);
      });

      html += '</div>';
    });

    stepsEl.innerHTML = html;
  }

  function renderDayCard(roadmapId, d, tasksTotal, tasksDone) {
    const taskPct = tasksTotal > 0 ? Math.round(tasksDone / tasksTotal * 100) : 0;
    const taskBar = tasksTotal > 0
      ? `<div style="height:2px;background:var(--bg5);border-radius:1px;overflow:hidden;margin-top:4px;">
           <div style="height:100%;width:${taskPct}%;background:var(--c1);"></div>
         </div>`
      : '';

    const taskList = (d.tasks || []).map(t => `
      <div id="task-${t.id}" style="display:flex;align-items:center;gap:8px;padding:6px 0;
                border-bottom:1px solid rgba(255,255,255,0.04);">
        <div onclick="window._myRmBridge.toggleTask('${roadmapId}',${d.day},'${t.id}')"
          style="width:16px;height:16px;border-radius:4px;cursor:pointer;flex-shrink:0;
                 display:flex;align-items:center;justify-content:center;
                 background:${t.done ? 'linear-gradient(135deg,var(--c1),var(--c2))' : 'var(--bg3)'};
                 border:1.5px solid ${t.done ? 'transparent' : 'rgba(255,255,255,0.12)'};
                 transition:background 0.15s;">
          ${t.done ? '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
        </div>
        <span style="flex:1;font-size:12px;color:${t.done ? 'var(--t2)' : 'var(--t1)'};
                     ${t.done ? 'text-decoration:line-through;' : ''}">${escH(t.text)}</span>
        <button onclick="window._myRmBridge.deleteTask('${roadmapId}',${d.day},'${t.id}')"
          style="font-size:11px;color:var(--c3);padding:1px 5px;border-radius:4px;
                 background:rgba(255,107,107,.08);border:1px solid rgba(255,107,107,.15);cursor:pointer;">
          ✕
        </button>
      </div>`).join('');

    return `
      <div id="day-card-${d.day}" style="background:var(--bg2);border:1px solid rgba(255,255,255,0.06);
            border-radius:10px;padding:12px;margin-bottom:8px;
            ${d.completed ? 'border-color:rgba(6,214,160,0.2);' : ''}">
        <!-- Day header -->
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
          <div onclick="window._myRmBridge.toggleDay('${roadmapId}',${d.day})"
            style="width:20px;height:20px;border-radius:5px;cursor:pointer;flex-shrink:0;
                   display:flex;align-items:center;justify-content:center;
                   background:${d.completed ? 'linear-gradient(135deg,var(--c1),var(--c2))' : 'var(--bg3)'};
                   border:1.5px solid ${d.completed ? 'transparent' : 'rgba(255,255,255,0.12)'};
                   transition:background 0.15s;">
            ${d.completed ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
          </div>
          <div style="flex:1;">
            <div style="font-size:12px;font-weight:700;color:${d.completed ? 'var(--t2)' : 'var(--t1)'};
                        ${d.completed ? 'text-decoration:line-through;' : ''}">
              Day ${d.day}
            </div>
            ${tasksTotal > 0
              ? `<div style="font-size:10px;color:var(--t2);margin-top:2px;">${tasksDone}/${tasksTotal} tasks</div>`
              : ''}
            ${taskBar}
          </div>
          <!-- Pomodoro counter -->
          <div style="display:flex;align-items:center;gap:4px;">
            <button onclick="window._myRmBridge.decPomo('${roadmapId}',${d.day})"
              style="width:22px;height:22px;border-radius:5px;background:var(--bg3);
                     border:1px solid rgba(255,255,255,0.06);color:var(--t2);cursor:pointer;
                     font-size:13px;display:flex;align-items:center;justify-content:center;">−</button>
            <span id="pomo-${d.day}" style="font-size:11px;color:var(--c4);
                  font-family:var(--font-mono);min-width:22px;text-align:center;">
              🍅${d.pomodoroCount || 0}
            </span>
            <button onclick="window._myRmBridge.incPomo('${roadmapId}',${d.day})"
              style="width:22px;height:22px;border-radius:5px;background:var(--bg3);
                     border:1px solid rgba(255,255,255,0.06);color:var(--t2);cursor:pointer;
                     font-size:13px;display:flex;align-items:center;justify-content:center;">+</button>
          </div>
        </div>

        <!-- Tasks list -->
        ${taskList}

        <!-- Add task input -->
        <div style="display:flex;gap:6px;margin-top:8px;">
          <input id="task-input-${d.day}" type="text" placeholder="Add a task…"
            maxlength="200"
            onkeydown="if(event.key==='Enter')window._myRmBridge.addTask('${roadmapId}',${d.day})"
            style="flex:1;background:var(--bg3);border:1px solid rgba(255,255,255,0.06);
                   border-radius:6px;padding:7px 10px;font-size:12px;color:var(--t1);
                   font-family:var(--font-ui);" />
          <button onclick="window._myRmBridge.addTask('${roadmapId}',${d.day})"
            style="padding:7px 12px;background:var(--bg3);color:var(--c1);font-size:11px;
                   font-weight:600;border-radius:6px;border:1px solid rgba(0,245,212,0.2);cursor:pointer;">
            + Add
          </button>
        </div>

        <!-- Notes -->
        <textarea id="notes-${d.day}" rows="2" placeholder="Notes for this day…"
          onblur="window._myRmBridge.saveNotes('${roadmapId}',${d.day})"
          style="width:100%;margin-top:8px;background:var(--bg3);border:1px solid rgba(255,255,255,0.06);
                 border-radius:6px;padding:8px 10px;font-size:11px;color:var(--t1);resize:none;"
          >${escH(d.notes || '')}</textarea>

        <!-- Revision dates -->
        ${(d.revisionDates || []).length > 0
          ? `<div style="font-size:10px;color:var(--t2);margin-top:6px;font-family:var(--font-mono);">
               🔁 Revisions: ${d.revisionDates.join(' · ')}
             </div>`
          : ''}
      </div>`;
  }

  /* ══════════════════════════════════════════════════════════
     CREATE ROADMAP
     POST /api/roadmaps/create
  ══════════════════════════════════════════════════════════ */
  function openCreate() {
    $('myrm-create-title').value = '';
    $('myrm-create-desc').value  = '';
    const m = $('myrm-modal');
    m.style.display = 'flex';
    setTimeout(() => $('myrm-create-title').focus(), 80);
  }

  function closeCreate() {
    $('myrm-modal').style.display = 'none';
  }

  async function createRoadmap() {
    const title  = $('myrm-create-title').value.trim();
    const level  = $('myrm-create-level')?.value || null;
    const numWeeks = parseInt($('myrm-create-weeks')?.value) || 4;

    if (!title) { toast('⚠️ Title is required.'); return; }
    setBtn('myrm-btn-create', true, 'Creating…');

    try {
      const data = await apiFetch('/api/roadmaps/create', {
        method: 'POST',
        body: JSON.stringify({ title, level, numWeeks }),
      });
      if (!data.success) throw new Error(data.error || 'Failed');
      closeCreate();
      toast('✅ Roadmap created!');
      await loadRoadmaps();
    } catch (e) {
      toast('⚠️ Could not create roadmap: ' + e.message);
    } finally {
      setBtn('myrm-btn-create', false, 'Create');
    }
  }

  /* ══════════════════════════════════════════════════════════
     DELETE ROADMAP
     DELETE /api/roadmaps/:id  (controller handles this)
  ══════════════════════════════════════════════════════════ */
  async function deleteRoadmap(id) {
    if (!confirm('Delete this roadmap? This cannot be undone.')) return;
    try {
      const data = await apiFetch('/api/roadmaps/' + id, { method: 'DELETE' });
      if (!data.success) throw new Error(data.error);
      toast('🗑️ Roadmap deleted.');
      _roadmaps = _roadmaps.filter(r => r._id !== id);
      renderRoadmaps();
    } catch (e) {
      toast('⚠️ Could not delete roadmap.');
    }
  }

  /* ══════════════════════════════════════════════════════════
     UPDATE A DAY
     PUT /api/roadmaps/:id/day
     Body: { dayNum, completed?, notes?, pomodoroCount? }
  ══════════════════════════════════════════════════════════ */
  async function updateDay(roadmapId, dayNum, patch) {
    try {
      const data = await apiFetch('/api/roadmaps/' + roadmapId + '/day', {
        method: 'PUT',
        body: JSON.stringify({ dayNum, ...patch }),
      });
      if (!data.success) throw new Error(data.error);
      return data.day;
    } catch (e) {
      toast('⚠️ Could not update day: ' + e.message);
      return null;
    }
  }

  /* ── Toggle day completed ─── */
  async function toggleDay(roadmapId, dayNum) {
    // Optimistic toggle
    const rm = _currentRoadmap;
    if (!rm) return;
    let dayObj = null;
    outer: for (const wk of rm.weeks || []) {
      for (const d of wk.days || []) {
        if (d.day === dayNum) { dayObj = d; break outer; }
      }
    }
    if (!dayObj) return;
    const newVal = !dayObj.completed;
    dayObj.completed = newVal;

    // Update checkbox UI immediately
    const card = document.getElementById('day-card-' + dayNum);
    if (card) {
      const cb = card.querySelector('div[onclick*="toggleDay"]');
      if (cb) {
        cb.style.background = newVal
          ? 'linear-gradient(135deg,var(--c1),var(--c2))' : 'var(--bg3)';
        cb.style.borderColor = newVal ? 'transparent' : 'rgba(255,255,255,0.12)';
        cb.innerHTML = newVal
          ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
          : '';
      }
    }

    const updated = await updateDay(roadmapId, dayNum, { completed: newVal });
    if (!updated) { dayObj.completed = !newVal; } // revert on error

    // Re-render progress
    _syncStats(rm);
    toast(newVal ? '✅ Day ' + dayNum + ' marked complete!' : '↩️ Day ' + dayNum + ' unmarked');
  }

  /* ── Notes save on blur ─── */
  async function saveNotes(roadmapId, dayNum) {
    const ta = document.getElementById('notes-' + dayNum);
    if (!ta) return;
    const notes = ta.value;
    await updateDay(roadmapId, dayNum, { notes });
    // Update local state silently
    _patchLocalDay(roadmapId, dayNum, { notes });
  }

  /* ── Pomodoro +1 / -1 ─── */
  async function incPomo(roadmapId, dayNum) { await _changePomo(roadmapId, dayNum, +1); }
  async function decPomo(roadmapId, dayNum) { await _changePomo(roadmapId, dayNum, -1); }

  async function _changePomo(roadmapId, dayNum, delta) {
    const rm = _currentRoadmap;
    if (!rm) return;
    let dayObj = _findDay(rm, dayNum);
    if (!dayObj) return;
    const newCount = Math.max(0, (dayObj.pomodoroCount || 0) + delta);
    dayObj.pomodoroCount = newCount;
    const el = document.getElementById('pomo-' + dayNum);
    if (el) el.textContent = '🍅' + newCount;
    await updateDay(roadmapId, dayNum, { pomodoroCount: newCount });
  }

  /* ══════════════════════════════════════════════════════════
     TASKS
     POST /api/roadmaps/:id/task
     Body: { dayNum, action: 'add'|'toggle'|'delete', taskText?, taskId? }
  ══════════════════════════════════════════════════════════ */
  async function _taskApi(roadmapId, dayNum, body) {
    try {
      const data = await apiFetch('/api/roadmaps/' + roadmapId + '/task', {
        method: 'POST',
        body: JSON.stringify({ dayNum, ...body }),
      });
      if (!data.success) throw new Error(data.error);
      return data;
    } catch (e) {
      toast('⚠️ Task error: ' + e.message);
      return null;
    }
  }

  async function addTask(roadmapId, dayNum) {
    const input = document.getElementById('task-input-' + dayNum);
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    input.value = '';

    const result = await _taskApi(roadmapId, dayNum, { action: 'add', taskText: text });
    if (!result) return;

    // Update local and re-render day
    _patchLocalDay(roadmapId, dayNum, { tasks: result.tasks });
    _rerenderDay(roadmapId, dayNum);
    toast('✅ Task added!');
  }

  async function toggleTask(roadmapId, dayNum, taskId) {
    const result = await _taskApi(roadmapId, dayNum, { action: 'toggle', taskId });
    if (!result) return;
    _patchLocalDay(roadmapId, dayNum, { tasks: result.tasks });
    _rerenderDay(roadmapId, dayNum);
  }

  async function deleteTask(roadmapId, dayNum, taskId) {
    const result = await _taskApi(roadmapId, dayNum, { action: 'delete', taskId });
    if (!result) return;
    _patchLocalDay(roadmapId, dayNum, { tasks: result.tasks });
    _rerenderDay(roadmapId, dayNum);
    toast('🗑️ Task deleted.');
  }

  /* ══════════════════════════════════════════════════════════
     LOCAL STATE HELPERS
  ══════════════════════════════════════════════════════════ */
  function _findDay(rm, dayNum) {
    for (const wk of rm.weeks || []) {
      for (const d of wk.days || []) {
        if (d.day === dayNum) return d;
      }
    }
    return null;
  }

  function _patchLocalDay(roadmapId, dayNum, patch) {
    const rm = _currentRoadmap;
    if (!rm || rm._id !== roadmapId) return;
    const d = _findDay(rm, dayNum);
    if (d) Object.assign(d, patch);
  }

  function _rerenderDay(roadmapId, dayNum) {
    const rm = _currentRoadmap;
    if (!rm) return;
    const d = _findDay(rm, dayNum);
    if (!d) return;
    const tasksDone  = (d.tasks || []).filter(t => t.done).length;
    const tasksTotal = (d.tasks || []).length;
    const card = document.getElementById('day-card-' + dayNum);
    if (!card) return;
    const newHtml = document.createElement('div');
    newHtml.innerHTML = renderDayCard(roadmapId, d, tasksTotal, tasksDone);
    card.replaceWith(newHtml.firstElementChild);
  }

  function _syncStats(rm) {
    let totalDays = 0, doneDays = 0;
    (rm.weeks || []).forEach(wk =>
      (wk.days || []).forEach(d => {
        totalDays++;
        if (d.completed) doneDays++;
      })
    );
    const pct = totalDays > 0 ? Math.round(doneDays / totalDays * 100) : 0;
    if ($('myrm-steps-label')) $('myrm-steps-label').textContent = doneDays + ' / ' + totalDays + ' days';
    if ($('myrm-pct-label'))   $('myrm-pct-label').textContent   = pct + '%';
    if ($('myrm-detail-pct-tag')) $('myrm-detail-pct-tag').textContent = pct + '%';
    if ($('myrm-prog-fill'))   $('myrm-prog-fill').style.width    = pct + '%';
  }

  /* ══════════════════════════════════════════════════════════
     ADD STEP FORM (re-uses existing buttons for compatibility)
  ══════════════════════════════════════════════════════════ */
  function toggleAddStepForm() {
    _addStepOpen = !_addStepOpen;
    $('myrm-add-form').style.display = _addStepOpen ? 'block' : 'none';
    $('myrm-btn-add-step').textContent = _addStepOpen ? '- Cancel' : '+ Add Task';
    if (_addStepOpen) setTimeout(() => $('myrm-step-title').focus(), 80);
  }

  function closeAddStepForm() {
    _addStepOpen = false;
    const form = $('myrm-add-form');
    const btn  = $('myrm-btn-add-step');
    if (form) form.style.display  = 'none';
    if (btn)  btn.textContent     = '+ Add Task';
  }

  // "Save Step" button in the add-step form is repurposed as a quick add-task
  // It will add a task to Day 1 if no specific day is active
  async function saveStep() {
    const title = $('myrm-step-title')?.value.trim();
    if (!title) { toast('⚠️ Task title is required.'); return; }
    if (!_currentRoadmap) return;
    const rm  = _currentRoadmap;
    const id  = rm._id;
    // Add to the first incomplete day, or Day 1
    let targetDay = 1;
    for (const wk of rm.weeks || []) {
      for (const d of wk.days || []) {
        if (!d.completed) { targetDay = d.day; break; }
      }
    }
    $('myrm-step-title').value = '';
    closeAddStepForm();
    setBtn('myrm-btn-save-step', true, 'Saving…');
    const result = await _taskApi(id, targetDay, { action: 'add', taskText: title });
    setBtn('myrm-btn-save-step', false, 'Save Task');
    if (!result) return;
    _patchLocalDay(id, targetDay, { tasks: result.tasks });
    _rerenderDay(id, targetDay);
    toast('✅ Task added to Day ' + targetDay + '!');
  }

  /* ══════════════════════════════════════════════════════════
     INJECT LEVEL + WEEKS FIELDS INTO CREATE MODAL
  ══════════════════════════════════════════════════════════ */
  function _upgradeCreateModal() {
    const modal = $('myrm-modal');
    if (!modal || modal.dataset.upgraded) return;
    modal.dataset.upgraded = '1';

    // Find the title field container and insert after it
    const titleInput = $('myrm-create-title');
    if (!titleInput) return;
    const titleWrap = titleInput.parentElement;

    // Level selector
    const levelDiv = document.createElement('div');
    levelDiv.style.cssText = 'margin-bottom:12px;';
    levelDiv.innerHTML = `
      <div style="font-size:10px;font-weight:700;color:var(--t2);font-family:var(--font-mono);
                  letter-spacing:1px;text-transform:uppercase;margin-bottom:6px;">Level (optional)</div>
      <select id="myrm-create-level"
        style="width:100%;background:var(--bg3);border:1px solid rgba(255,255,255,0.06);
               border-radius:8px;padding:10px 12px;font-size:13px;color:var(--t1);
               font-family:var(--font-ui);">
        <option value="">— No level —</option>
        <option value="Beginner">🟢 Beginner</option>
        <option value="Intermediate">🟡 Intermediate</option>
        <option value="Advanced">🔴 Advanced</option>
      </select>`;

    // Weeks selector
    const weeksDiv = document.createElement('div');
    weeksDiv.style.cssText = 'margin-bottom:12px;';
    weeksDiv.innerHTML = `
      <div style="font-size:10px;font-weight:700;color:var(--t2);font-family:var(--font-mono);
                  letter-spacing:1px;text-transform:uppercase;margin-bottom:6px;">Number of Weeks</div>
      <select id="myrm-create-weeks"
        style="width:100%;background:var(--bg3);border:1px solid rgba(255,255,255,0.06);
               border-radius:8px;padding:10px 12px;font-size:13px;color:var(--t1);
               font-family:var(--font-ui);">
        ${[1,2,3,4,6,8,10,12,16,20,24].map(n =>
          `<option value="${n}" ${n === 4 ? 'selected' : ''}>${n} week${n > 1 ? 's' : ''}</option>`
        ).join('')}
      </select>`;

    titleWrap.insertAdjacentElement('afterend', weeksDiv);
    titleWrap.insertAdjacentElement('afterend', levelDiv);
  }

  /* ══════════════════════════════════════════════════════════
     WIRE INTO APP
  ══════════════════════════════════════════════════════════ */
  document.addEventListener('DOMContentLoaded', function () {
    // Upgrade the create modal with extra fields
    _upgradeCreateModal();

    // Override the inline myrm-modal open button
    const createBtn = $('myrm-btn-create');
    if (createBtn) {
      createBtn.onclick = createRoadmap;
    }

    // Enter key shortcuts
    const titleEl = $('myrm-create-title');
    if (titleEl) titleEl.addEventListener('keydown', e => {
      if (e.key === 'Enter') createRoadmap();
    });
    const stepTitleEl = $('myrm-step-title');
    if (stepTitleEl) stepTitleEl.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) saveStep();
    });

    // Close modal on backdrop click
    const modal = $('myrm-modal');
    if (modal) modal.addEventListener('click', e => {
      if (e.target === modal) closeCreate();
    });

    // Attach to APP namespace (overrides the old inline script)
    if (window.APP) {
      Object.assign(APP, {
        openMyRoadmaps:    openMyRoadmaps,
        closeMyRoadmaps:   closeMyRoadmaps,
        myRmOpenCreate:    openCreate,
        myRmCloseCreate:   closeCreate,
        myRmCreate:        createRoadmap,
        myRmToggleAddStep: toggleAddStepForm,
        myRmSaveStep:      saveStep,
      });
    }
  });

  /* ── Public bridge object (used from inline HTML onclick) ── */
  window._myRmBridge = {
    openDetail,
    toggleDay,
    addTask,
    toggleTask,
    deleteTask,
    incPomo,
    decPomo,
    saveNotes,
    deleteRoadmap,
  };

})();
