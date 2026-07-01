/**
 * offline.js — minimal offline-detection stub for RoadmapX.
 *
 * Originally referenced from every page as <script src="/offline.js" defer>,
 * but the file was never created, so the browser fetched the Cloudflare
 * Pages SPA fallback (index.html) and tried to execute it as JavaScript —
 * producing a console syntax error on every page load.
 *
 * This stub provides the minimum API other scripts *might* be looking for
 * (navigator.onLine + window online/offline events) without breaking if no
 * other code actually uses it. Safe to leave in place.
 */
(function () {
  'use strict';

  function update() {
    try {
      var banner = document.getElementById('offline-banner');
      if (!banner) return;
      banner.style.display = navigator.onLine ? 'none' : 'block';
    } catch (_) { /* ignore */ }
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', update);
    } else {
      update();
    }
  }
})();
