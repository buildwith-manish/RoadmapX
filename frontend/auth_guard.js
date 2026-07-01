/**
 * auth_guard.js — RoadmapX Auth Guard (Guest-First, Bug-Fixed)
 *
 * ROOT CAUSE FIXES:
 *
 * 1. TIMING: The async IIFE was calling whenReady() AFTER DOMContentLoaded
 *    had already fired (because await fetch() takes time). The handler was
 *    registered too late and never executed. Fixed by always waiting for
 *    DOMContentLoaded first, THEN running the auth check inside it.
 *
 * 2. FAST-PATH BYPASS: If rx_token was missing (e.g. HybridData failed to
 *    write it), we skipped /me entirely and showed guest UI even for a live
 *    session. Fixed: always call /me regardless of localStorage state.
 *    localStorage is only used as a cache hint, not a gate.
 *
 * 3. GUEST BANNER: The banner's setTimeout only checked localStorage, so it
 *    could fire even for logged-in users if the token write was delayed.
 *    Fixed: banner logic is now controlled here, after auth state is known.
 *
 * 4. TOKEN WRITE RELIABILITY: We now always write rx_token + rx_user on
 *    every successful /me response, not just in the login flow.
 */
(function () {
  'use strict';

  const API = window.RX_API; // set by config.js

  // ── UI: Guest header ─────────────────────────────────────────────────────
  function applyGuestHeader() {
    const hdrRight = document.querySelector('.hdr-right');
    if (!hdrRight) return;

    // Clean up any logged-in elements
    hdrRight.querySelectorAll('button[title="Profile"]').forEach(b => b.remove());
    const staleUserPill = hdrRight.querySelector('.hdr-user-pill');
    if (staleUserPill) staleUserPill.remove();

    // Remove Stats button — requires auth
    hdrRight.querySelectorAll('button[title="Stats"], a[href="stats.html"], [data-page="stats"], .stats-btn').forEach(b => b.remove());

    // Avoid duplicates
    if (hdrRight.querySelector('.hdr-signin-btn')) return;

    const signinBtn = document.createElement('button');
    signinBtn.className = 'hdr-btn hdr-signin-btn';
    signinBtn.title = 'Sign In';
    signinBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round" style="width:13px;height:13px">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
        <polyline points="10 17 15 12 10 7"/>
        <line x1="15" y1="12" x2="3" y2="12"/>
      </svg>
      Sign In`;
    signinBtn.addEventListener('click', () => { window.location.href = 'login.html#signin'; });
    hdrRight.appendChild(signinBtn);

    // Schedule guest banner only now that we know user is a guest
    scheduleGuestBanner();
  }

  // ── UI: Logged-in header ─────────────────────────────────────────────────
  function applyLoggedInHeader(username) {
    const hdrRight = document.querySelector('.hdr-right');
    if (!hdrRight) return;

    // Remove guest elements
    const signinBtn = hdrRight.querySelector('.hdr-signin-btn');
    if (signinBtn) signinBtn.remove();

    // Remove any stale username pill (no longer shown)
    const stalePill = hdrRight.querySelector('.hdr-user-pill');
    if (stalePill) stalePill.remove();

    // Always suppress guest banner for logged-in users
    hideGuestBanner();

    // Add Profile button if not already present
    const hasProfile = hdrRight.querySelector('button[title="Profile"]');
    if (!hasProfile) {
      const profileBtn = document.createElement('button');
      profileBtn.className = 'hdr-btn';
      profileBtn.title = 'Profile';
      profileBtn.onclick = () => { window.location.href = 'profile.html'; };
      profileBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
      hdrRight.appendChild(profileBtn);
    }
  }

  // ── Guest banner helpers ─────────────────────────────────────────────────
  var _bannerTimer = null;

  function hideGuestBanner() {
    clearTimeout(_bannerTimer);
    _bannerTimer = null;
    var b = document.getElementById('guest-banner');
    if (b) b.style.display = 'none';
  }

  function scheduleGuestBanner() {
    clearTimeout(_bannerTimer);
    _bannerTimer = setTimeout(function () {
      // Re-check: don't show if auth state changed while timer was pending
      if (!localStorage.getItem('rx_token')) {
        var b = document.getElementById('guest-banner');
        if (b) b.style.display = 'block';
      }
    }, 10000);
  }

  // ── Core auth check ──────────────────────────────────────────────────────
  // FIX: DOM must be ready BEFORE we touch any elements.
  // FIX: Always hit /me — localStorage is a cache hint, not the truth.
  function runAuthCheck() {
    const cachedToken = localStorage.getItem('rx_token');
    const cachedUser  = localStorage.getItem('rx_user');

    // Optimistic render from cache while network check is in flight.
    // Prevents flash of "Sign In" button for logged-in users on refresh.
    if (cachedToken && cachedUser) {
      applyLoggedInHeader(cachedUser);
    }

    // Always verify with the server — cookies are the source of truth.
    // credentials:'include' is REQUIRED to send the session cookie cross-origin.
    fetch(API + '/me', {
      method: 'GET',
      credentials: 'include',
      headers: { 'Accept': 'application/json' }
    })
    .then(function (res) {
      if (!res.ok) throw new Error('http_' + res.status);
      return res.json();
    })
    .then(function (data) {
      if (data && data.success && data.username) {
        // Session confirmed — refresh local cache and show logged-in UI
        localStorage.setItem('rx_token', 'true');
        localStorage.setItem('rx_user', data.username);
        applyLoggedInHeader(data.username);
      } else {
        // Server says not authenticated — clear stale cache
        localStorage.removeItem('rx_token');
        localStorage.removeItem('rx_user');
        applyGuestHeader();
      }
    })
    .catch(function (err) {
      console.warn('[auth_guard] /me check failed:', err.message);
      // Network error (e.g. server cold-starting on free tier):
      // Trust cached token if present, otherwise fall back to guest.
      if (cachedToken && cachedUser) {
        // Optimistic render already applied above — just suppress banner.
        hideGuestBanner();
      } else {
        applyGuestHeader();
      }
    });
  }

  // ── Entry point ──────────────────────────────────────────────────────────
  // FIX: Register on DOMContentLoaded synchronously (not inside an async IIFE)
  // so the handler is guaranteed to fire even if the script loads late.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAuthCheck);
  } else {
    // Script loaded after DOM was already parsed (defer / bottom of body)
    runAuthCheck();
  }

})();
