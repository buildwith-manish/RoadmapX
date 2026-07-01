---
Task ID: 5-b
Agent: frontend-roadmap-reviewer
Task: Deep code review of RoadmapX frontend roadmap pages and step pages

Work Log:
- Read /home/z/my-project/roadmapx-work/RoadmapX/frontend/config.js (central API config, exposes window.RX_API)
- Read /home/z/my-project/roadmapx-work/RoadmapX/frontend/notes_storage.js (notes module — only loaded on index.html)
- Read /home/z/my-project/roadmapx-work/RoadmapX/frontend/hybrid_data.js (LS patch + backend sync — only loaded on index.html)
- Read /home/z/my-project/roadmapx-work/RoadmapX/frontend/roadmap_bridge.js (My Roadmaps feature — only loaded on index.html)
- Read /home/z/my-project/roadmapx-work/RoadmapX/frontend/ai-steps.html (full)
- Read /home/z/my-project/roadmapx-work/RoadmapX/frontend/dsa-steps.html (full)
- Read /home/z/my-project/roadmapx-work/RoadmapX/frontend/backend-steps.html (full)
- Read /home/z/my-project/roadmapx-work/RoadmapX/frontend/normal-rm-fe.html (full)
- Read /home/z/my-project/roadmapx-work/RoadmapX/frontend/custom-roadmap.html (full)
- Read /home/z/my-project/roadmapx-work/RoadmapX/frontend/ai-roadmap.html (partial — visual roadmap with embedded JS)
- Read /home/z/my-project/roadmapx-work/RoadmapX/frontend/ai-steps.js (large file, read in chunks: 1-120, 1595-1644, 1900-1999, 2200-2319, 3960-3994, 4040-4051, 4567-4900, 5760-5783, 5840-6089)
- Read /home/z/my-project/roadmapx-work/RoadmapX/frontend/dsa-steps.js (chunks: 1-100, 1360-1389, 1400-1499, 1550-1669, 1670-1999, 2080-2163)
- Read /home/z/my-project/roadmapx-work/RoadmapX/frontend/backend-steps.js (chunks: 1410-1509, 2020-2115)
- Read /home/z/my-project/roadmapx-work/RoadmapX/frontend/normal-rm-fe.js (chunks: 1-80, 1510-1559, 1588-1816, 2465-2494)
- Read /home/z/my-project/roadmapx-work/RoadmapX/frontend/custom-roadmap.js (chunks: 1-120, 126-200, 383-403, 644-658, 818-857, 916-931, 1290-1409, 1500-1716)
- Grep'd across all frontend files for: localhost:5000, onrender.com, history.back, history.go, window.location, api.anthropic.com, BASE_URL, RX_API, HybridData, innerHTML, target=_blank, localStorage patterns, goBack/switchSub/selectLevel, ?step=/?week=, bookmark/favorite
- Verified which HTML pages load config.js / hybrid_data.js / notes_storage.js / roadmap_bridge.js (only index.html)
- Verified element ID mismatches between normal-rm-fe.html and normal-rm-fe.js
- Verified structural HTML issues (extra closing </div> tags) in all 4 step HTML files

Stage Summary:

══════════════════════════════════════════════════════════
 CRITICAL BUGS (broken feature / data loss)
══════════════════════════════════════════════════════════

BUG 1 — Broken nav link (404)
- File: /home/z/my-project/roadmapx-work/RoadmapX/frontend/normal-rm-fe.html:309
- Type: broken-feature / navigation
- Description: The "Visual" bottom-nav button links to `fe-roadmap.html` which does NOT exist. The actual file is `frontend-roadmap.html`. Clicking it produces a 404. The other three step pages correctly link to `ai-roadmap.html`, `dsa-roadmap.html`, `backend-roadmap.html`.
  ```html
  <button class="fe-nav-item" id="fe-nav-visual" onclick="window.location.href='fe-roadmap.html'">
  ```
- Suggested fix: Change `fe-roadmap.html` to `frontend-roadmap.html`.

BUG 2 — Frontend step page is entirely broken (JS/HTML ID mismatch)
- File: /home/z/my-project/roadmapx-work/RoadmapX/frontend/normal-rm-fe.js (many lines) vs /home/z/my-project/roadmapx-work/RoadmapX/frontend/normal-rm-fe.html
- Type: broken-feature / runtime
- Description: The JS expects element IDs that do not exist anywhere in the HTML:
  - JS calls `showPanel('fe-levels-panel')`, `showPanel('fe-weeks-panel')`, `showPanel('fe-days-panel')`, `showPanel('fe-revision-panel')` — HTML has `fe-screen-levels`, `fe-screen-weeks`, `fe-screen-days`, `fe-sub-revision` instead.
  - JS reads `document.getElementById('fe-back-btn')` (line 1642) — HTML has no such element (uses class `.back-home-btn`).
  - JS reads `document.getElementById('fe-hdr-sub')` (lines 1665, 1747, 1810) — HTML has `id="hdr-sub"` (generic, shared with other pages).
  - JS reads `document.getElementById('fe-level-cards')` (line 1681) — HTML hard-codes level cards inline, no such container.
  - JS reads `document.getElementById('fe-weeks-header')` (line 1751) and `fe-days-header` (line 1813) — neither exists.
  - JS reads `document.getElementById('fe-day-modal')` (lines 1972, 1977) — HTML has no day modal.
  - JS reads `document.getElementById('fe-search-input')` (line 2074) — HTML has `id="fe-search"`.
  - JS reads `document.getElementById('fe-rev-list')`, `fe-rev-empty` (lines 2102-2103) — HTML has `fe-revision-list`.
  - JS reads `fe-fab-btn`, `fe-fab-panel`, `fe-fab-pomo-*` (lines 2247-2256) — none exist in HTML.
  - Consequence: `selectLevel()` calls `renderWeeks()` (writes into `fe-weeks-list` which exists, but it's inside `fe-screen-weeks` which stays `display:none`) and `showPanel('fe-weeks-panel')` which is a no-op. Clicking a level card does nothing visible. The whole FE step page is unusable.
- Suggested fix: Either rewrite normal-rm-fe.js to use the actual HTML IDs (`fe-screen-levels`, `fe-screen-weeks`, `fe-screen-days`, `fe-search`, `fe-revision-list`, `fe-hdr-sub`, etc.), or rewrite the HTML to match the JS expectations. Recommend aligning JS to HTML (smaller change).

BUG 3 — normal-rm-fe.js public API is missing functions called from HTML
- File: /home/z/my-project/roadmapx-work/RoadmapX/frontend/normal-rm-fe.js:2465-2482 (public API) vs normal-rm-fe.html onclick attributes
- Type: broken-feature / runtime
- Description: The HTML calls functions that are not exposed on `window.FE`:
  - `FE.switchSub('roadmap', this)` (HTML lines 285, 291, 297, 303) — not in API (only `switchTab` is). The inline wrapper at lines 397-411 of normal-rm-fe.html assigns `FE.switchSub` but it only manages the active class, never calls `setTab`.
  - `FE.filterRoadmap()` (HTML line 184) — not defined anywhere in normal-rm-fe.js.
  - `FE.setRevFilter('all', this)` (HTML lines 219-223) — not defined.
  - `FE.autoSaveNotes()` (HTML line 248) — not defined.
  - `FE.saveNotes()` (HTML line 251) — not the public version; private `saveNotes()` is a storage helper.
  - `FE.openProjectModal('fe')` (HTML line 269) — not defined.
  - `FE.setAITab(...)`, `FE.askAI()`, `FE.saveAINote()` (HTML lines 373-382) — not defined.
  - `FE.closeModal('modal-project')` (HTML line 324) — exists ✓.
  - Clicking any of these buttons throws "FE.xxx is not a function".
- Suggested fix: Expose all the missing functions on `window.FE` or rename the HTML onclick handlers to match the existing API.

BUG 4 — AI Mentor calls Anthropic API directly from browser (always fails)
- File: /home/z/my-project/roadmapx-work/RoadmapX/frontend/ai-steps.js:4837-4845
- Type: broken-feature / security
- Description: The `AIMentor.ask()` function does:
  ```js
  const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      })
  });
  ```
  This fails for three reasons: (1) no `x-api-key` header, (2) no `anthropic-dangerous-direct-browser-access: true` header (required for CORS), (3) Anthropic blocks browser-origin requests by default. The call always lands in the catch block (line 4860) which shows "⚠️ AI unavailable." The same bug exists in script.js:3065.
- Suggested fix: Route AI requests through the RoadmapX backend (e.g. `POST /api/ai/mentor`) which holds the API key server-side. Never expose Anthropic keys in client code.

BUG 5 — custom-roadmap.js uses wrong global for API base URL
- File: /home/z/my-project/roadmapx-work/RoadmapX/frontend/custom-roadmap.js:44-47
- Type: broken-feature / logic
- Description:
  ```js
  function _apiBase() {
      try { return (typeof BASE_URL !== 'undefined' && BASE_URL) ? BASE_URL : ''; }
      catch(e) { return ''; }
  }
  ```
  `config.js` exposes `window.RX_API`, NOT `window.BASE_URL`. So `_apiBase()` always returns `''`. All fetches (`_apiBase() + '/me'`, `_apiBase() + '/api/user-data'`) become relative URLs. On Cloudflare Pages (static hosting) these 404. `_isLoggedIn()` always returns false, `_loadFromBackend()` always returns null, `_saveToBackend()` silently fails. Custom roadmaps are NEVER synced to the backend — even for logged-in users. The user's roadmaps exist only in `localStorage['crm_v2_data']` and are lost on device switch.
- Suggested fix: Change to `return window.RX_API || '';` (and load `config.js` from custom-roadmap.html).

BUG 6 — Step & roadmap pages don't load config.js / hybrid_data.js / notes_storage.js
- Files: ai-steps.html, dsa-steps.html, backend-steps.html, normal-rm-fe.html, custom-roadmap.html, ai-roadmap.html, dsa-roadmap.html, backend-roadmap.html, frontend-roadmap.html
- Type: broken-feature / data loss
- Description: Each of these HTML files loads only its own JS file (e.g. `<script src="dsa-steps.js"></script>`). NONE of them load `config.js`, `hybrid_data.js`, or `notes_storage.js`. As a result:
  - `window.RX_API` is undefined on every step/roadmap page.
  - `window.HybridData` is undefined → the localStorage.setItem/getItem patch is never installed → nothing syncs to the backend.
  - `NotesBridge` / `notes_storage.js` is absent → notes saved on step pages never reach the `/save-text` endpoint.
  - Consequence: ALL progress, notes, projects, revisions, streaks, pomodoro stats saved on step pages are LOCAL-ONLY. A logged-in user who completes 30 days of DSA on dsa-steps.html, then logs in from another device, sees zero progress. Only index.html syncs (because it loads the foundational scripts).
- Suggested fix: Add `<script src="config.js"></script>`, `<script src="hybrid_data.js"></script>`, and `<script src="notes_storage.js"></script>` (where applicable) to the `<head>` of every step/roadmap HTML file, BEFORE the page-specific script.

BUG 7 — ai-steps.js goBack is overridden to always jump to index.html
- File: /home/z/my-project/roadmapx-work/RoadmapX/frontend/ai-steps.js:6058-6060
- Type: back-button / broken-feature
- Description: The file first defines a proper nav-stack-based back at line 5958-5968:
  ```js
  APP.goBack = function () {
    if (navStack.length > 1) { navStack.pop(); __applyNavState(navStack[navStack.length-1]); }
    else { APP.switchTab('home'); }
  };
  ```
  Then the IIFE at line 6042-6061 overrides it:
  ```js
  (function patchSwitchTab() {
    ...
    APP.goBack = function() { window.location.href = 'index.html'; };
  })();
  ```
  Every "Back" button on ai-steps.html (lines 167, 185, 201, 222, 248) uses `onclick="APP.goBack()"`. From the Weeks screen, back should return to Levels; from Days, back should return to Weeks; from Notes/Projects/Revision, back should return to Roadmap. Instead ALL of them navigate to `index.html`, throwing away the user's place in the roadmap. (Note: the browser/hardware back button still works correctly via the popstate handler at line 5993-6001 — only the on-page back button is broken.)
- Suggested fix: Remove the `APP.goBack = function() { window.location.href = 'index.html'; };` override at line 6058-6060, OR replace it with logic that mirrors `dsaGoBack()` (dsa-steps.js:1637-1647) and `backendGoBack()` (backend-steps.js:1440-1457): if currently on Days → go to Weeks; if on Weeks → go to Levels; if on Levels → go to index.html; if on a non-roadmap sub (notes/projects/revision) → go to Roadmap.

══════════════════════════════════════════════════════════
 HIGH-SEVERITY BUGS (functional / UX)
══════════════════════════════════════════════════════════

BUG 8 — Structural HTML bug: 3 extra </div> tags prematurely close #app and #content
- Files:
  - ai-steps.html lines 215-217 (after `</div>` that closes `ai-sub-revision` at 214)
  - dsa-steps.html lines 229-231 (after close of `dsa-sub-revision` at 228)
  - backend-steps.html lines 229-231 (after close of `backend-sub-revision` at 228)
  - normal-rm-fe.html lines 229-231 (after close of `fe-sub-revision` at 226, with an empty `<!-- ── POMO TAB ── -->` comment)
- Type: render / UX
- Description: Each of the four step pages has 3 stray `</div>` tags immediately after the revision sub-tab. Since the revision sub-tab was already properly closed by the preceding `</div>`, these 3 extras cascade-close `tab-ai`/`tab-dsa`/`tab-backend`/`tab-fe-normal`, then `#content`, then `#app`. Everything that follows — Notes sub-tab, Projects sub-tab, the bottom nav (`#ai-bottom-nav` etc.), and all modals — ends up OUTSIDE `#app` and `#content`. Modern browsers auto-recover via "foster parenting" so the page still renders, but: (a) CSS selectors like `#content .notes-ta` no longer match, (b) any JS that walks `#app` children misses these elements, (c) the bottom-nav padding on `#content` doesn't apply to the misplaced sub-tabs.
- Suggested fix: Delete the 3 stray `</div>` tags at the locations listed above in all four files. The pages already have the correct closing `</div>` count at the end (for `tab-*`, `#content`, `#app`).

BUG 9 — ai-steps.html bottom-nav active state never updates
- File: /home/z/my-project/roadmapx-work/RoadmapX/frontend/ai-steps.html (no inline wrapper) vs ai-steps.js:3965-3981
- Type: UX
- Description: dsa-steps.html, backend-steps.html, and normal-rm-fe.html each have an inline `<script>` at the bottom that wraps `APP.switchDSASub` / `APP.switchBackendSub` / `FE.switchSub` to remove the `active` class from all bottom-nav buttons before adding it to the new one. ai-steps.html has NO such wrapper. The JS `switchAISub()` (line 3965) tries to remove `active` from `#ai-subtab-bar .section-subtab` — but `#ai-subtab-bar` doesn't exist in ai-steps.html, so the NodeList is empty and the previous button's `active` class is never removed. Net effect: tapping "Revision" makes BOTH "Roadmap" and "Revision" appear active; tapping "Notes" makes three buttons active; etc.
- Suggested fix: Add the same inline wrapper to ai-steps.html that the other three step pages have, e.g.:
  ```html
  <script>
  document.addEventListener('DOMContentLoaded', function() {
    var _orig = APP.switchAISub ? APP.switchAISub.bind(APP) : null;
    APP.switchAISub = function(sub, btn) {
      document.querySelectorAll('#ai-bottom-nav .ai-nav-item').forEach(function(b) {
        b.classList.remove('active');
      });
      var navBtn = document.getElementById('ai-nav-' + sub);
      if (navBtn) navBtn.classList.add('active');
      if (_orig) _orig(sub, null);
    };
  });
  </script>
  ```

BUG 10 — DSA, Backend, Frontend structured-roadmap progress keys are missing from HybridData LS_FIELD_MAP
- File: /home/z/my-project/roadmapx-work/RoadmapX/frontend/hybrid_data.js:93-110
- Type: progress-tracking / data loss
- Description: `LS_FIELD_MAP` includes `ai_struct_beginner`/`intermediate`/`advanced` (lines 107-109) but NOT the equivalent DSA/Backend keys:
  - dsa-steps.js saves progress to `'dsa_struct_' + dsaCurrentLevel` (line 1679) — keys `dsa_struct_beginner`, `dsa_struct_intermediate`, `dsa_struct_advanced` are unmapped.
  - backend-steps.js saves to `'backend_struct_' + backendCurrentLevel` (line 1415) — `backend_struct_*` unmapped.
  - normal-rm-fe.js saves to `'fe_normal_progress'` (line 1514) — unmapped.
  - normal-rm-fe.js also uses `fe_normal_revision`, `fe_normal_notes`, `fe_normal_projects`, `fe_normal_streak`, `fe_pomo_dur` (lines 1515-1519) — all unmapped.
  - Even after BUG 6 is fixed (hybrid_data.js loaded on step pages), these keys would still NOT sync because they're not in `LS_FIELD_MAP`. Only AI roadmap progress would sync.
- Suggested fix: Add to `LS_FIELD_MAP`:
  ```js
  'dsa_struct_beginner':     'dsaStructBeginner',
  'dsa_struct_intermediate': 'dsaStructIntermediate',
  'dsa_struct_advanced':     'dsaStructAdvanced',
  'backend_struct_beginner':     'backendStructBeginner',
  'backend_struct_intermediate': 'backendStructIntermediate',
  'backend_struct_advanced':     'backendStructAdvanced',
  'fe_normal_progress':  'feNormalProgress',
  'fe_normal_revision':  'feNormalRevision',
  'fe_normal_notes':     'feNormalNotes',
  'fe_normal_projects':  'feNormalProjects',
  'fe_normal_streak':    'feNormalStreak',
  'fe_pomo_dur':         'fePomoDuration',
  ```
  And add matching fields to `defaultData()` and `allowedFields` in `pushToBackend()`. Also update the backend user-data schema to accept these fields.

BUG 11 — Visual roadmap progress keys not in LS_FIELD_MAP
- Files: ai-roadmap.html:326 (`'ai_visual_progress'`), dsa-roadmap.html:352 (`'dsa_visual_progress'`), backend-roadmap.html:325 (`'backend_visual_progress'`), frontend-roadmap.html:347 (`'frontend_visual_progress'`)
- Type: progress-tracking / data loss
- Description: Each visual roadmap page stores topic completion status (done / in-progress / skip) in its own localStorage key. None of these keys are in `LS_FIELD_MAP`. So even with hybrid_data.js loaded, visual roadmap progress never syncs to the backend.
- Suggested fix: Add `'ai_visual_progress'`, `'dsa_visual_progress'`, `'backend_visual_progress'`, `'frontend_visual_progress'` to `LS_FIELD_MAP` and the backend schema; OR migrate the visual roadmaps to reuse the existing `ai_struct_*` / `dsa_struct_*` / `backend_struct_*` keys.

BUG 12 — DSA/Backend notes saved on step pages use a different storage key than notes_storage.js expects
- File: /home/z/my-project/roadmapx-work/RoadmapX/frontend/dsa-steps.js:1372 (`DSA_NOTES: 'dsaNotes'`) and lines 1890-1900 (save path); /home/z/my-project/roadmapx-work/RoadmapX/frontend/notes_storage.js:24-27 (uses `roadmapx_notes_dsa_guest` and `/get-text?title=dsa`)
- Type: notes / data loss
- Description: On dsa-steps.html, `dsaSaveNotes()` writes to `localStorage['dsaNotes']` as an array of `{id, date, text}`. On index.html, `notes_storage.js` reads notes from the backend `/get-text` endpoint (logged-in) or from `localStorage['roadmapx_notes_dsa_guest']` (guest). The two systems use completely different keys and never share data. A note saved on dsa-steps.html is invisible on index.html, never migrates to the backend on login, and is lost when the user clears localStorage. Same applies to AI notes (`'aiNotes'` vs `roadmapx_notes_ai_guest`). Backend notes use `backend_notes` (let me verify) but follow the same pattern.
- Suggested fix: Either (a) load `notes_storage.js` on every step page and have step pages call `NotesBridge` / `APP.dsaSaveNotes` from notes_storage.js instead of their local implementations, or (b) align the keys: make notes_storage.js read/write `'dsaNotes'`/`'aiNotes'` and have dsa-steps.js / ai-steps.js post to `/save-text` on save.

BUG 13 — roadmap_bridge.js crashes if window.RX_API is undefined
- File: /home/z/my-project/roadmapx-work/RoadmapX/frontend/roadmap_bridge.js:24-25
- Type: runtime
- Description:
  ```js
  window.API_BASE = window.RX_API;
  const API_BASE = window.API_BASE.replace(/\/$/, '');
  ```
  If `config.js` is missing or fails to load, `window.RX_API` is `undefined`, and `.replace()` throws `TypeError: Cannot read properties of undefined (reading 'replace')`. This crashes the entire IIFE, breaking all "My Roadmaps" functionality on index.html with no graceful fallback. (Currently this doesn't happen because index.html loads config.js before roadmap_bridge.js, but it's fragile.)
- Suggested fix: `const API_BASE = (window.RX_API || '').replace(/\/$/, '');`

BUG 14 — ai-steps.js attendance never saves to backend
- File: /home/z/my-project/roadmapx-work/RoadmapX/frontend/ai-steps.js:5031-5032
- Type: progress-tracking / data loss
- Description:
  ```js
  if (window.HybridData && HybridData.isLoggedIn()) {
      HybridData.saveUserData({ attendance: att });
  }
  ```
  `window.HybridData` is undefined on ai-steps.html (hybrid_data.js not loaded — see BUG 6). The guard short-circuits, so attendance is only saved to `localStorage['attendance']`. Logged-in users lose attendance data on device switch. Same pattern likely affects other backend-sync branches in ai-steps.js.
- Suggested fix: Load hybrid_data.js on ai-steps.html (see BUG 6 fix).

══════════════════════════════════════════════════════════
 MEDIUM-SEVERITY BUGS
══════════════════════════════════════════════════════════

BUG 15 — Visual roadmap back button may navigate to unrelated page after refresh
- Files: ai-roadmap.html:268, dsa-roadmap.html:292, backend-roadmap.html:268, frontend-roadmap.html:287
- Type: back-button / UX
- Description: All four visual roadmap pages use:
  ```html
  <button id="hdr-back" onclick="window.history.length > 1 ? history.back() : window.location.href='index.html'">← Back</button>
  ```
  `window.history.length` is almost always > 1 (it counts the current page too), so the fallback rarely fires. After a page refresh, `history.back()` may navigate to whatever unrelated page the user visited before — possibly an external site, possibly a different RoadmapX page. Should explicitly link to `index.html` (or to the corresponding step page) instead of relying on `history.back()`.
- Suggested fix: Replace with `onclick="window.location.href='index.html'"` (or the corresponding step page, e.g. `ai-steps.html`).

BUG 16 — custom-roadmap.js makes a /me network call on every save
- File: /home/z/my-project/roadmapx-work/RoadmapX/frontend/custom-roadmap.js:126-130
- Type: UX / performance
- Description:
  ```js
  function save() {
      try { localStorage.setItem(STORE_KEY, JSON.stringify(_data)); } catch(e) {}
      _isLoggedIn().then(loggedIn => { if (loggedIn) _saveToBackend(); });
  }
  ```
  `save()` is called on every task toggle, day complete, note save, etc. Each call triggers `_isLoggedIn()` which does `fetch(_apiBase() + '/me', ...)` — a network round-trip on every interaction. Even with caching, this is wasteful. And since `_apiBase()` returns `''` (BUG 5), every call hits `'/me'` on the wrong origin and 404s.
- Suggested fix: Cache the logged-in state (set once on init, invalidate on logout). Use a debounced backend save instead of calling `_isLoggedIn()` then `_saveToBackend()` on every keystroke/toggle.

BUG 17 — custom-roadmap.js goBack() is a no-op on the list screen
- File: /home/z/my-project/roadmapx-work/RoadmapX/frontend/custom-roadmap.js:383-399
- Type: back-button / UX
- Description:
  ```js
  function goBack() {
      if (_nav.screen === 'day-detail') { ... }
      else if (_nav.screen === 'roadmap') { ... }
      else { showScreen('list', 'back'); renderRoadmapList(); }  // already on list → no-op
  }
  ```
  The HTML back button (`<button class="crm-back-btn" onclick="CRM.goBack()">`, custom-roadmap.html:35) calls `CRM.goBack()`. On the list screen, the else branch runs and just re-renders the list — the user stays on the same page. There's no way to leave custom-roadmap.html via the back button from the list screen.
- Suggested fix: In the else branch, add `window.location.href = 'index.html';` (or `history.back()` if history exists).

BUG 18 — DSA/Backend step pages have a fully-rendered AI Mentor modal but only stub JS
- Files: dsa-steps.html:360-385 (full modal HTML) vs dsa-steps.js:2085-2090 (stubs); backend-steps.html:360-385 vs backend-steps.js:2074-2083
- Type: UX / broken-feature
- Description: The HTML renders the entire AI Mentor modal (tabs: Explain / Notes / Practice / Project Idea; Ask AI button; Save Note button) but the JS only provides:
  ```js
  function askAI() { toast('AI Mentor: Connect your API key in settings.', 'info'); }
  function saveAINote() { toast('AI note saved!', 'success'); }   // dsa — doesn't actually save
  ...
  askAI: function() { var el = ...; el.textContent = 'AI Mentor: use the resource links...'; },
  saveAINote: function() {},   // backend — does literally nothing
  ```
  Users see a polished AI Mentor UI, type a question, hit "Ask AI", and either get a toast (DSA) or a static text message (Backend). "Save Note" either shows a fake success toast (DSA, nothing is saved) or does nothing at all (Backend). Misleading.
- Suggested fix: Either (a) hide/remove the AI Mentor modal from dsa-steps.html and backend-steps.html until the feature is implemented, or (b) wire the buttons to the same backend-proxied AI endpoint that should fix BUG 4.

BUG 19 — scheduleRevisions uses Date.now() + interval as revision ID (collision risk)
- File: /home/z/my-project/roadmapx-work/RoadmapX/frontend/dsa-steps.js:1925 (also ai-steps.js similar pattern)
- Type: logic / potential data corruption
- Description:
  ```js
  revs.push({ id: Date.now() + interval, ... });
  ```
  `Date.now()` is in milliseconds, `interval` is 1/3/7/14/30. If two days are completed within the same millisecond (e.g. rapid double-tap on the checkbox, or programmatic batch completion), the IDs collide and `markDSARevDone` (line 1972: `revs.find(r => r.id == id)`) may toggle the wrong revision. Unlikely in practice but possible. Also: the 5 IDs for one day's revisions are only 1/3/7/14/30 ms apart, so if `Date.now()` for the next day's completion is within 30ms of the first, the IDs overlap.
- Suggested fix: Use a proper unique ID generator: `id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7)` (same pattern as custom-roadmap.js `uid()`).

BUG 20 — dsa-steps.js switchDSASub references non-existent 'pomo' sub-tab
- File: /home/z/my-project/roadmapx-work/RoadmapX/frontend/dsa-steps.js:1651 (also ai-steps.js:3966, backend-steps.js similar)
- Type: logic / dead code
- Description:
  ```js
  const subs = ['roadmap','revision','pomo','notes','projects'];
  subs.forEach(s => { const el = document.getElementById('dsa-sub-' + s); ... });
  ```
  The HTML has `dsa-sub-roadmap`, `dsa-sub-revision`, `dsa-sub-notes`, `dsa-sub-projects` — but NO `dsa-sub-pomo`. The 'pomo' iteration is a no-op. Also `switchDSASub` looks for `#dsa-subtab-bar .section-subtab` (line 1656) which doesn't exist in the HTML — the active class is managed by the inline wrapper at the bottom of dsa-steps.html. Not a crash, but dead code that confuses readers.
- Suggested fix: Remove 'pomo' from the subs array, or add the missing `dsa-sub-pomo` div if a pomo sub-tab is intended.

BUG 21 — DSA notes list delete button uses onclick with numeric ID that could break for string IDs
- File: /home/z/my-project/roadmapx-work/RoadmapX/frontend/dsa-steps.js:1874
- Type: logic / latent
- Description: `onclick="APP.deleteDSANote(${n.id})"` — if `n.id` is ever a string (e.g. after BUG 19 fix uses string IDs), this would generate `onclick="APP.deleteDSANote(abc123)"` which is a syntax error. Currently safe because `n.id = Date.now()` is a number, but fragile.
- Suggested fix: Use `onclick="APP.deleteDSANote('${n.id}')"` (quoted) for forward-compatibility.

BUG 22 — == vs === in revision lookup
- File: /home/z/my-project/roadmapx-work/RoadmapX/frontend/dsa-steps.js:1923, 1974
- Type: logic / style
- Description:
  - Line 1923: `r.topicDay == dayNum` (one is number, one might be string after JSON round-trip)
  - Line 1974: `r.id == id` (number vs number passed from HTML onclick)
  Both work, but `===` is the project convention. Mixing `==` and `===` makes the code harder to audit.
- Suggested fix: Use `===` everywhere; if types differ, coerce explicitly.

══════════════════════════════════════════════════════════
 LOW-SEVERITY / OBSERVATIONS
══════════════════════════════════════════════════════════

OBS 23 — Roadmap-bridge apiFetch has no timeout / no retry
- File: /home/z/my-project/roadmapx-work/RoadmapX/frontend/roadmap_bridge.js:57-66
- The `apiFetch` helper does a single `fetch` with no timeout. On Render's free tier (cold starts ~30s), users see infinite spinner. Add an AbortController with a 15s timeout and a friendly error toast.

OBS 24 — All visual-roadmap pages have inline JS, not external
- Files: ai-roadmap.html, dsa-roadmap.html, backend-roadmap.html, frontend-roadmap.html
- Each visual roadmap page has ~3400+ lines of inline `<script>` (including a giant NODES data array). This makes the HTML files huge (3.5MB+ each) and prevents caching. Consider extracting to `ai-visual.js`, `dsa-visual.js`, etc.

OBS 25 — Step pages don't load auth_guard.js
- None of the step pages load `auth_guard.js` (which index.html loads). This means the user can be a guest and still access all step pages. Whether this is a bug depends on product intent — if step pages are meant to be public previews, it's fine; if they require login, it's a security gap.

OBS 26 — ai-steps.js injects "Ask AI Mentor" button into every day card via MutationObserver
- File: /home/z/my-project/roadmapx-work/RoadmapX/frontend/ai-steps.js:5760-5782
- The `MutationObserver` fires on every DOM change inside `#content` and calls `injectAIButtons()` which re-queries all day cards. This is O(n) per mutation and could cause performance issues with many day cards. Consider debouncing or using event delegation instead.

OBS 27 — notes_storage.js initNotes() may never run if rx:authReady never fires
- File: /home/z/my-project/roadmapx-work/RoadmapX/frontend/notes_storage.js:377-383
- The fallback `setTimeout` at line 380 only triggers `initNotes()` if `ai-notes-list` is empty. But on a page that has no `ai-notes-list` element (e.g. profile.html if it loads notes_storage.js), the fallback never fires. The `rx:authReady` event from hybrid_data.js is the primary trigger, which works on index.html but not on step pages (since hybrid_data.js isn't loaded there).

══════════════════════════════════════════════════════════
 SUMMARY OF ROOT-CAUSE THEMES
══════════════════════════════════════════════════════════

1. **Step pages are isolated from the sync layer.** None of ai-steps.html, dsa-steps.html, backend-steps.html, normal-rm-fe.html, custom-roadmap.html, or the visual roadmap pages load `config.js`, `hybrid_data.js`, or `notes_storage.js`. This single architectural omission causes BUGS 5, 6, 11, 12, 14. Fixing BUG 6 (loading the foundational scripts on every page) would automatically resolve several of the others.

2. **normal-rm-fe.html + normal-rm-fe.js are severely mismatched.** The HTML and JS appear to have been written/edited independently and never reconciled. Most element IDs and most public function names don't line up. The FE step page is effectively non-functional (BUGS 1, 2, 3). This is the highest-priority page to fix or rewrite.

3. **The AI Mentor feature is broken across the board.** ai-steps.js calls Anthropic directly without auth (BUG 4); dsa-steps.js and backend-steps.js have stubs that pretend to work (BUG 18). All three need a unified backend proxy.

4. **The AI step page's back button is the only one broken.** dsa-steps.js, backend-steps.js, and normal-rm-fe.js all have correct `goBack()` implementations (DSA/Backend navigate Levels↔Weeks↔Days, FE does too modulo BUG 2). Only ai-steps.js has the override at line 6058 that force-redirects to index.html (BUG 7).

5. **Structural HTML drift.** All four step HTML files have 3 stray `</div>` tags after the revision sub-tab (BUG 8). This was likely caused by removing a "POMO TAB" section (normal-rm-fe.html still has the leftover `<!-- ── POMO TAB ── -->` comment) without cleaning up the closing tags.

Recommended fix priority: BUG 1 (one-line fix, blocks navigation) → BUG 2+3 (FE page unusable) → BUG 6 (unblocks sync for all step pages) → BUG 7 (AI back button) → BUG 4+18 (AI Mentor) → BUG 8 (HTML structure) → BUG 5 (custom roadmap sync) → BUG 9 (AI nav active state) → BUG 10+11 (sync key map) → BUG 12 (notes key alignment) → BUG 13 (defensive guard) → BUG 14 (already fixed by BUG 6) → BUG 15-22 (medium/low).

---
Task ID: 8a + 8b (fixes)
Agent: main
Task: Apply fixes to all identified bugs (backend security + frontend critical bugs)

Work Log:
- BACKEND/server.js: removed `app.use(express.static(__dirname))` which was exposing ALL backend source files (including .env if present) to the public internet
- BACKEND/server.js: replaced hardcoded session secret fallback `"change-me-in-env"` with fail-fast in production
- BACKEND/server.js: re-enabled SMTP TLS verification (was `rejectUnauthorized: false`)
- BACKEND/server.js: added `payload.email_verified` check on both Google OAuth flows (credential + redirect callback)
- BACKEND/server.js: added `sharePublic` and `twoFactorBackupHashes` fields to User schema (were being silently dropped by Mongoose strict mode, breaking share feature)
- BACKEND/server.js: added authLimiter to /forgot-password, /reset-password, /verify-email, /resend-verification, /2fa/verify-login (rate-limit on critical auth endpoints)
- BACKEND/server.js: replaced `Math.random()` OTP generation with `crypto.randomInt()` (CSPRNG)
- BACKEND/server.js: added session invalidation on /profile/password change, /reset-password, /profile DELETE, and /profile/username change (other sessions force-logged-out)
- BACKEND/server.js: cascaded username rename across UserData, Attendance, Progress, Note, Pomodoro, Roadmap collections (was orphaning everything except UserData)
- BACKEND/server.js: cascaded account-delete across all collections + sessions
- BACKEND/server.js: /profile/email now checks uniqueness, resets emailVerified=false, triggers verification email
- BACKEND/server.js: sanitized error responses — 500 errors no longer leak raw err.message
- BACKEND/server.js: added /api/ai/ask proxy endpoint so AI Mentor feature actually works (was impossible from browser due to CORS + API key exposure)
- BACKEND/controllers/stepController.js: added ownership check on parent roadmap for addStep, getSteps, and completeStep (was IDOR — any user could read/modify any other user's steps)
- BACKEND/controllers/roadmapController.js: deleteRoadmap now also deletes orphan Step documents

- FRONTEND/custom-roadmap.js: fixed `_apiBase()` to read `window.RX_API` (was looking for non-existent global `BASE_URL`, causing all backend sync to silently fail on Cloudflare Pages)
- FRONTEND/index.html: replaced hardcoded `https://roadmapx-backend-3qmc.onrender.com` URL with `window.RX_API` via getter
- FRONTEND/login_script.js: removed hardcoded onrender.com URL fallback
- FRONTEND/login.html: removed hardcoded onrender.com URL fallback in getAPI()
- FRONTEND/auth_guard.js: changed `const API = window.RX_API` to a lazy getter to handle script load order races
- FRONTEND/sessions.html: reordered script tags so config.js loads BEFORE auth_guard.js (was racing because auth_guard had `defer`)
- FRONTEND/sessions_script.js: inlined a minimal logout flow (was calling `window.rxLogout()` which is never loaded on this page), used replace() for 401 redirect to avoid back-button loop, escaped s.ip/s.ua to prevent stored XSS via spoofed User-Agent
- FRONTEND/profile_script.js: fixed guest-hiding logic to target actual `.card` elements by h2 text (was looking for non-existent IDs `section-username` etc.), wrapped form handlers in try/catch so buttons don't get stuck disabled on network error, guarded HybridData.onLogout call
- FRONTEND/reset_password_script.js: stripped token from URL via history.replaceState after extraction (was leaking via history/Referer/screenshots), used replace() for redirect
- FRONTEND/verify_email_script.js: same token-leak fix
- FRONTEND/stats.html: changed `const API = window.RX_API` to a lazy getter and updated all 5 fetch call sites (inline script ran before config.js loaded, so API was undefined and every fetch became `fetch("undefined/me")` → 404)
- FRONTEND/roadmap_bridge.js: changed `const API_BASE = window.API_BASE.replace(...)` to a lazy getter (was throwing TypeError if window.RX_API was undefined, killing the entire My Roadmaps feature IIFE)
- FRONTEND/ai-steps.js: removed override of APP.goBack that was hard-coded to `window.location.href = 'index.html'` (was breaking in-page back navigation: Week→Level back-button instead redirected to index)
- FRONTEND/ai-steps.js: rerouted direct `https://api.anthropic.com/v1/messages` call through new backend `/api/ai/ask` proxy (browser-direct call always failed due to missing API key + CORS)
- FRONTEND/normal-rm-fe.html: fixed broken `fe-roadmap.html` link to `frontend-roadmap.html`
- FRONTEND/{ai,dsa,backend}-steps.html, normal-rm-fe.html, custom-roadmap.html: removed 3 extra `</div>` tags per file that prematurely closed the #app/#content containers (99 <div> vs 102 </div> → now 99/99 in all four files)
- FRONTEND/{ai,dsa,backend}-steps.html, normal-rm-fe.html, custom-roadmap.html: added `<script src="config.js">` so window.RX_API is defined (was missing → every backend sync call from these pages silently 404'd)
- FRONTEND/manifest.json: created (was referenced everywhere via `<link rel="manifest">` but never existed → SPA-fallback returned HTML for the manifest, breaking PWA install)
- FRONTEND/offline.js: created minimal stub (was referenced everywhere via `<script src="/offline.js" defer>` but never existed → console syntax error on every page load)

Stage Summary:
- 4 backend security fixes (static file exposure, session secret, SMTP TLS, OAuth email_verified)
- 5 backend logic fixes (IDOR, sharePublic field, session invalidation, username cascade, OTP CSPRNG, email change re-verify, error sanitization, AI Mentor proxy)
- 6 frontend critical bug fixes (hardcoded URLs in 5 files, broken link, script order, AI Mentor browser-direct, goBack override, extra </div>)
- 4 frontend security fixes (token leak via URL, stored XSS in sessions, missing rate-limit headers, error leak)
- 5 frontend structural fixes (missing config.js on step pages, missing manifest.json, missing offline.js, roadmap_bridge crash, profile guest-hiding)
- All backend files syntax-OK; all frontend JS files syntax-OK; all HTML files have balanced divs
