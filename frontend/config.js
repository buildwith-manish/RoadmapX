// ═══════════════════════════════════════════════════════
//  RoadmapX — Centralised API Config  (Bug #7 fix)
//
//  SINGLE SOURCE OF TRUTH for the backend URL.
//  Load this as the FIRST <script> in every HTML page:
//
//    <script src="config.js"></script>
//
//  Then all other JS files use window.RX_API instead of
//  their own hardcoded copy of the backend URL. To switch
//  environments (dev / staging / prod) you only need to
//  change ONE line — right here.
// ═══════════════════════════════════════════════════════

(function () {
  // ── Capacitor detection ────────────────────────────────
  // When running inside the Capacitor native shell, always
  // use the production backend regardless of hostname.
  const isCapacitor = typeof window.Capacitor !== 'undefined' &&
                      window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform();

  // ── Environment detection ──────────────────────────────
  // Cloudflare Pages preview URLs contain "pages.dev".
  // Local dev runs on localhost or 127.0.0.1.
  // Everything else is treated as production.
  const host = window.location.hostname;

  let apiBase;

  if (isCapacitor) {
    // Capacitor native app — always use production backend
    apiBase = 'https://roadmapx-backend-3qmc.onrender.com';
  } else if (host === 'localhost' || host === '127.0.0.1') {
    // Local development — point at the local backend
    apiBase = 'http://localhost:5000';
  } else {
    // Production / Cloudflare Pages — point at Render backend
    apiBase = 'https://roadmapx-backend-3qmc.onrender.com';
  }

  // Expose globally — never ends with a trailing slash
  window.RX_API = apiBase;

  // Expose Capacitor flag for other scripts (OAuth, etc.)
  window.RX_IS_CAPACITOR = isCapacitor;
})();
