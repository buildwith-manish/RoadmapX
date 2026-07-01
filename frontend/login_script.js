/**
 * login_script.js — RoadmapX Auth UI Logic
 * Login/Signup panel removed. Only Google + OTP sign-in available.
 */

const API  = window.RX_API || "https://roadmapx-backend-3qmc.onrender.com";
const HOME = 'index.html';

function getAPI() { return API; }

// ── Capacitor detection helper ──────────────────────────────
function isCapacitor() {
  return typeof window.Capacitor !== 'undefined' && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform();
}

// ── Capacitor Google Auth ───────────────────────────────────
// When running inside Capacitor, use the native Google Sign-In
// plugin instead of the web redirect/GSI flow.
async function capacitorGoogleSignIn() {
  if (!isCapacitor()) return false;

  try {
    // Dynamic import of Capacitor Google Auth plugin
    const { CapacitorGoogleAuth } = await import('@codetrix-studio/capacitor-google-auth');

    // Initialise with the same client ID used on web
    CapacitorGoogleAuth.initialize({
      clientId: '659466725316-onvlvclmfn6r6n7h5p7in9ffqdvcbpm3.apps.googleusercontent.com',
    });

    // Trigger native Google Sign-In
    const result = await CapacitorGoogleAuth.signIn();

    if (result && result.authentication && result.authentication.idToken) {
      // Send the native Google ID token to our backend (same flow as web)
      const res = await fetch(getAPI() + '/auth/google', {
        method:      'POST',
        credentials: 'include',
        headers:     { 'Content-Type': 'application/json' },
        body:        JSON.stringify({ credential: result.authentication.idToken }),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem('rx_token', 'true');
        localStorage.setItem('rx_user', data.username);
        try {
          if (window.HybridData && typeof window.HybridData.onLoginSuccess === 'function') {
            await window.HybridData.onLoginSuccess(data.username);
          }
        } catch (e) { /* ignore */ }
        window.location.replace(HOME);
        return true;
      } else {
        throw new Error(data.message || 'Google sign-in failed.');
      }
    } else {
      throw new Error('No ID token received from native Google Sign-In.');
    }
  } catch (err) {
    console.error('[Capacitor Google Auth] Error:', err);
    // Fall through to web flow
    return false;
  }
}

// ── Logout ────────────────────────────────────────────────────────────────
window.rxLogout = async function () {
  try {
    await fetch(`${API}/logout`, { method: 'POST', credentials: 'include' });
  } catch (e) { /* ignore */ }

  // If Capacitor, sign out of native Google Auth too
  if (isCapacitor()) {
    try {
      const { CapacitorGoogleAuth } = await import('@codetrix-studio/capacitor-google-auth');
      await CapacitorGoogleAuth.signOut();
    } catch (e) { /* ignore */ }
  }

  try {
    if (window.HybridData && typeof window.HybridData.onLogout === 'function') {
      window.HybridData.onLogout();
    }
  } catch (e) { /* ignore */ }

  localStorage.removeItem('rx_token');
  localStorage.removeItem('rx_user');

  window.location.replace(HOME);
};
