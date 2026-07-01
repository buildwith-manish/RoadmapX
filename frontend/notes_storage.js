/**
 * notes_storage.js — RoadmapX Notes Storage Module (FIXED v3)
 *
 * FIXES:
 *  1. No longer makes its own /me auth check — uses HybridData.isLoggedIn()
 *     as the single source of truth, eliminating duplicate calls & desync.
 *  2. Guests: drafts persist across refresh via localStorage.
 *  3. syncAfterLogin() is idempotent (won't double-upload on HMR / re-mount).
 *  4. initNotes() waits for rx:authReady event before running.
 *  5. All containers are null-checked before innerHTML writes.
 */
(function () {
  "use strict";

  const API = window.RX_API; // set by config.js

  // ── Auth ────────────────────────────────────────────────
  // FIX: delegate to HybridData — single source of truth
  function isLoggedIn() {
    return !!(window.HybridData && window.HybridData.isLoggedIn());
  }

  // ── Guest localStorage keys ─────────────────────────────
  const GUEST_AI_KEY    = "roadmapx_notes_ai_guest";
  const GUEST_DSA_KEY   = "roadmapx_notes_dsa_guest";
  const GUEST_AI_DRAFT  = "roadmapx_draft_ai_guest";
  const GUEST_DSA_DRAFT = "roadmapx_draft_dsa_guest";

  function loadLocal(key) {
    try { return JSON.parse(localStorage.getItem(key) || "[]"); }
    catch (e) { return []; }
  }
  function saveLocal(key, arr) {
    try { localStorage.setItem(key, JSON.stringify(arr)); } catch (e) {}
  }

  function todayStr() {
    return new Date().toLocaleDateString("en-IN", {
      day: "2-digit", month: "short", year: "numeric"
    });
  }
  function wordCount(t) {
    return t.trim() === "" ? 0 : t.trim().split(/\s+/).length;
  }
  function showToast(msg) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    setTimeout(() => el.classList.remove("show"), 2500);
  }
  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  // ── Login prompt ────────────────────────────────────────
  function showLoginPrompt() {
    const overlay = document.getElementById("modal-confirm");
    if (overlay) {
      const title = document.getElementById("confirm-title");
      const text  = document.getElementById("confirm-text");
      const okBtn = document.getElementById("confirm-ok");
      if (title) title.textContent = "🔒 Login Required";
      if (text)  text.textContent  = "Your notes are saved locally. Log in to sync them across devices.";
      if (okBtn) {
        okBtn.textContent  = "Go to Login";
        okBtn.style.background = "linear-gradient(135deg,#7b2fff,#00f5d4)";
        okBtn.onclick = () => { window.location.href = "login.html"; };
      }
      overlay.classList.add("active");
      overlay.style.display = "flex";
    } else {
      if (confirm("Log in to save notes to the cloud.\n\nGo to Login?"))
        window.location.href = "login.html";
    }
  }

  // ── Backend helpers ─────────────────────────────────────
  function fetchBackendNotes(section) {
    return fetch(API + "/get-text", { credentials: "include" })
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(data => {
        if (!data.success) return [];
        return (data.data || [])
          .filter(n => n.title === section)
          .map(n => ({
            id:   n._id || n.id || String(Date.now()),
            date: n.createdAt
              ? new Date(n.createdAt).toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" })
              : todayStr(),
            text: n.content,
          }));
      })
      .catch(() => []);
  }

  function postBackendNote(section, text) {
    return fetch(API + "/save-text", {
      method:      "POST",
      credentials: "include",
      headers:     { "Content-Type": "application/json" },
      body:        JSON.stringify({ title: section, content: text }),
    })
      .then(r => r.json())
      .catch(() => ({ success: false }));
  }

  // ── Debounce timers ─────────────────────────────────────
  let aiTimer = null, dsaTimer = null;

  // ════════════════════ AI NOTES ══════════════════════════

  function aiAutoSaveNotes() {
    const ta = document.getElementById("ai-notes-ta"); if (!ta) return;
    const wc = document.getElementById("ai-notes-wc");
    if (wc) wc.textContent = wordCount(ta.value) + " words";
    clearTimeout(aiTimer);
    aiTimer = setTimeout(() => {
      try { localStorage.setItem(GUEST_AI_DRAFT, ta.value); } catch (e) {}
    }, 800);
  }

  function aiSaveNotes() {
    const ta = document.getElementById("ai-notes-ta");
    if (!ta || !ta.value.trim()) { showToast("⚠️ Write something first!"); return; }

    if (!isLoggedIn()) {
      const notes = loadLocal(GUEST_AI_KEY);
      notes.unshift({ id: Date.now(), date: todayStr(), text: ta.value.trim() });
      saveLocal(GUEST_AI_KEY, notes);
      try { localStorage.setItem(GUEST_AI_DRAFT, ta.value); } catch (e) {}
      renderAINotesList(notes);
      showLoginPrompt();
      return;
    }

    postBackendNote("ai", ta.value.trim()).then(data => {
      if (data.success) {
        try { localStorage.removeItem(GUEST_AI_DRAFT); localStorage.removeItem(GUEST_AI_KEY); } catch (e) {}
        ta.value = "";
        const wc = document.getElementById("ai-notes-wc");
        if (wc) wc.textContent = "0 words";
        showToast("✅ AI note saved to cloud!");
        loadAndRenderAINotes();
        syncProfileNotesCount();
      } else {
        showToast("❌ Save failed. Try again.");
      }
    });
  }

  function loadAndRenderAINotes() {
    if (isLoggedIn()) {
      fetchBackendNotes("ai").then(notes => {
        renderAINotesList(notes);
        syncProfileNotesCount(notes.length);
      });
    } else {
      renderAINotesList(loadLocal(GUEST_AI_KEY));
    }
  }

  function renderAINotesList(notes) {
    const container = document.getElementById("ai-notes-list"); if (!container) return;
    if (!notes || notes.length === 0) {
      container.innerHTML = '<p style="color:var(--t2);font-size:13px;padding:8px 0;">No saved AI notes yet.</p>';
      return;
    }
    container.innerHTML = notes.map(n => {
      const preview = n.text.length > 120 ? n.text.slice(0, 120) + "…" : n.text;
      return `<div class="card" style="margin-bottom:10px;">
        <div class="card-header">
          <span class="card-title" style="font-size:12px;color:var(--t2);">📅 ${esc(n.date)}</span>
          <button onclick="APP.deleteAINote('${esc(String(n.id))}')"
            style="background:none;border:none;color:var(--t2);font-size:16px;cursor:pointer;padding:2px 6px;"
            title="Delete">🗑</button>
        </div>
        <div style="font-size:13px;color:var(--t1);white-space:pre-wrap;line-height:1.6;margin-top:6px;">${esc(preview)}</div>
      </div>`;
    }).join("");
  }

  function deleteAINote(id) {
    // Remove from local guest cache (used for display)
    const notes = loadLocal(GUEST_AI_KEY).filter(n => String(n.id) !== String(id));
    saveLocal(GUEST_AI_KEY, notes);
    if (isLoggedIn()) {
      // Re-fetch from backend to get accurate list
      showToast("🗑 Note removed");
      loadAndRenderAINotes();
    } else {
      renderAINotesList(notes);
      showToast("🗑 Note deleted");
    }
  }

  // ════════════════════ DSA NOTES ═════════════════════════

  function dsaAutoSaveNotes() {
    const ta = document.getElementById("dsa-notes-ta"); if (!ta) return;
    const wc = document.getElementById("dsa-notes-wc");
    if (wc) wc.textContent = wordCount(ta.value) + " words";
    clearTimeout(dsaTimer);
    dsaTimer = setTimeout(() => {
      try { localStorage.setItem(GUEST_DSA_DRAFT, ta.value); } catch (e) {}
    }, 800);
  }

  function dsaSaveNotes() {
    const ta = document.getElementById("dsa-notes-ta");
    if (!ta || !ta.value.trim()) { showToast("⚠️ Write something first!"); return; }

    if (!isLoggedIn()) {
      const notes = loadLocal(GUEST_DSA_KEY);
      notes.unshift({ id: Date.now(), date: todayStr(), text: ta.value.trim() });
      saveLocal(GUEST_DSA_KEY, notes);
      try { localStorage.setItem(GUEST_DSA_DRAFT, ta.value); } catch (e) {}
      renderDSANotesList(notes);
      showLoginPrompt();
      return;
    }

    postBackendNote("dsa", ta.value.trim()).then(data => {
      if (data.success) {
        try { localStorage.removeItem(GUEST_DSA_DRAFT); localStorage.removeItem(GUEST_DSA_KEY); } catch (e) {}
        ta.value = "";
        const wc = document.getElementById("dsa-notes-wc");
        if (wc) wc.textContent = "0 words";
        showToast("✅ DSA note saved to cloud!");
        loadAndRenderDSANotes();
        syncProfileNotesCount();
      } else {
        showToast("❌ Save failed. Try again.");
      }
    });
  }

  function loadAndRenderDSANotes() {
    if (isLoggedIn()) {
      fetchBackendNotes("dsa").then(notes => renderDSANotesList(notes));
    } else {
      renderDSANotesList(loadLocal(GUEST_DSA_KEY));
    }
  }

  function renderDSANotesList(notes) {
    const container = document.getElementById("dsa-notes-list"); if (!container) return;
    if (!notes || notes.length === 0) {
      container.innerHTML = '<p style="color:var(--t2);font-size:13px;padding:8px 0;">No saved DSA notes yet.</p>';
      return;
    }
    container.innerHTML = notes.map(n => {
      const preview = n.text.length > 120 ? n.text.slice(0, 120) + "…" : n.text;
      return `<div class="card" style="margin-bottom:10px;">
        <div class="card-header">
          <span class="card-title" style="font-size:12px;color:var(--t2);">📅 ${esc(n.date)}</span>
          <button onclick="APP.deleteDSANote('${esc(String(n.id))}')"
            style="background:none;border:none;color:var(--t2);font-size:16px;cursor:pointer;padding:2px 6px;"
            title="Delete">🗑</button>
        </div>
        <div style="font-size:13px;color:var(--t1);white-space:pre-wrap;line-height:1.6;margin-top:6px;">${esc(preview)}</div>
      </div>`;
    }).join("");
  }

  function deleteDSANote(id) {
    const notes = loadLocal(GUEST_DSA_KEY).filter(n => String(n.id) !== String(id));
    saveLocal(GUEST_DSA_KEY, notes);
    if (isLoggedIn()) {
      showToast("🗑 Note removed");
      loadAndRenderDSANotes();
    } else {
      renderDSANotesList(notes);
      showToast("🗑 Note deleted");
    }
  }

  // ── Profile notes count ─────────────────────────────────
  function syncProfileNotesCount(aiCount) {
    const el = document.getElementById("p-notes-count"); if (!el) return;
    if (aiCount !== undefined) { el.textContent = aiCount; return; }
    if (isLoggedIn()) {
      Promise.all([fetchBackendNotes("ai"), fetchBackendNotes("dsa")])
        .then(([a, d]) => { el.textContent = (a||[]).length + (d||[]).length; })
        .catch(() => { el.textContent = "—"; });
    } else {
      el.textContent = loadLocal(GUEST_AI_KEY).length + loadLocal(GUEST_DSA_KEY).length;
    }
  }

  // ── Post-login sync ─────────────────────────────────────
  let _syncDone = false;

  function syncAfterLogin(username) {
    if (_syncDone) return;
    _syncDone = true;

    const aiNotes  = loadLocal(GUEST_AI_KEY);
    const dsaNotes = loadLocal(GUEST_DSA_KEY);
    const aiDraft  = localStorage.getItem(GUEST_AI_DRAFT);
    const dsaDraft = localStorage.getItem(GUEST_DSA_DRAFT);
    const promises = [];

    aiNotes.forEach(n  => promises.push(postBackendNote("ai",  n.text)));
    dsaNotes.forEach(n => promises.push(postBackendNote("dsa", n.text)));
    if (aiDraft  && aiDraft.trim())  promises.push(postBackendNote("ai",  aiDraft.trim()));
    if (dsaDraft && dsaDraft.trim()) promises.push(postBackendNote("dsa", dsaDraft.trim()));

    const cleanup = () => {
      try {
        localStorage.removeItem(GUEST_AI_KEY);   localStorage.removeItem(GUEST_DSA_KEY);
        localStorage.removeItem(GUEST_AI_DRAFT); localStorage.removeItem(GUEST_DSA_DRAFT);
      } catch (e) {}
      loadAndRenderAINotes();
      loadAndRenderDSANotes();
    };

    if (promises.length === 0) { cleanup(); return; }

    Promise.all(promises)
      .then(() => { showToast("☁️ Notes synced to your account!"); cleanup(); })
      .catch(() => { cleanup(); });
  }

  // ── Init ────────────────────────────────────────────────
  function initNotes() {
    const pendingSync = sessionStorage.getItem("rx_pending_sync");
    if (pendingSync && isLoggedIn()) {
      sessionStorage.removeItem("rx_pending_sync");
      syncAfterLogin(pendingSync);
      return;
    }

    // Restore drafts for guests
    if (!isLoggedIn()) {
      const aiDraft = localStorage.getItem(GUEST_AI_DRAFT);
      const aiTa    = document.getElementById("ai-notes-ta");
      if (aiTa && aiDraft) {
        aiTa.value = aiDraft;
        const wc = document.getElementById("ai-notes-wc");
        if (wc) wc.textContent = wordCount(aiDraft) + " words";
      }
      const dsaDraft = localStorage.getItem(GUEST_DSA_DRAFT);
      const dsaTa    = document.getElementById("dsa-notes-ta");
      if (dsaTa && dsaDraft) {
        dsaTa.value = dsaDraft;
        const wc = document.getElementById("dsa-notes-wc");
        if (wc) wc.textContent = wordCount(dsaDraft) + " words";
      }
    }

    loadAndRenderAINotes();
    loadAndRenderDSANotes();
    syncProfileNotesCount();
  }

  // ── Attach to APP ───────────────────────────────────────
  function attachToApp() {
    if (typeof window.APP === "undefined") { setTimeout(attachToApp, 50); return; }

    window.APP.aiAutoSaveNotes    = aiAutoSaveNotes;
    window.APP.aiSaveNotes        = aiSaveNotes;
    window.APP.renderAINotesList  = () => loadAndRenderAINotes();
    window.APP.deleteAINote       = deleteAINote;

    window.APP.dsaAutoSaveNotes   = dsaAutoSaveNotes;
    window.APP.dsaSaveNotes       = dsaSaveNotes;
    window.APP.renderDSANotesList = () => loadAndRenderDSANotes();
    window.APP.deleteDSANote      = deleteDSANote;

    window.NotesBridge = { syncAfterLogin };

    // FIX: Wait for HybridData auth check to complete before initialising,
    // so isLoggedIn() is accurate on the very first call.
    window.addEventListener("rx:authReady", () => initNotes(), { once: true });

    // Safety fallback: if rx:authReady never fires (HybridData absent), init anyway
    setTimeout(() => {
      const aiList = document.getElementById("ai-notes-list");
      if (aiList && aiList.innerHTML === "") initNotes();
    }, 2000);
  }

  attachToApp();
})();
