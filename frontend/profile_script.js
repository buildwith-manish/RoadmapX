// ═══════════════════════════════════════════════════════
//  RoadmapX — Profile page script
// ═══════════════════════════════════════════════════════

// FIX: use a getter so window.RX_API is read at call time. profile.html loads
// config.js first, then auth_guard.js with `defer`, then this file with
// `defer`. The previous `const API = window.RX_API;` worked in practice
// because deferred scripts run after parser finishes — but the order between
// multiple deferred scripts is by document position, so it was fragile.
const API = () => window.RX_API || '';
const $ = (id) => document.getElementById(id);

// ── Guest check — hide edit forms if not logged in ──────
// Determined synchronously from localStorage before any network calls.
const _isGuest = !localStorage.getItem("rx_token");

if (_isGuest) {
  const _hideForGuest = () => {
    // FIX: the previous code looked for IDs `section-username`, `section-email`,
    // etc. — none of which exist in profile.html. The guest-hiding logic was
    // therefore silently no-op. The actual structure is one `.card` per
    // section, so we hide the action cards by their h2 label.
    const cardsToHide = [
      "Change username",
      "Change email",
      "Change password",
      "Notifications",
      "Danger zone",
    ];
    document.querySelectorAll(".card").forEach((card) => {
      const h2 = card.querySelector("h2");
      if (h2 && cardsToHide.includes(h2.textContent.trim())) {
        card.style.display = "none";
      }
    });

    // Hide logout link — guests aren't "logged in" to log out of
    const logoutLink = $("logout-link");
    if (logoutLink) logoutLink.style.display = "none";

    // Show a sign-in prompt at the top of the wrap
    const wrap = document.querySelector(".wrap") || document.body;
    const banner = document.createElement("div");
    banner.className = "card";
    banner.style.cssText = `
      margin: 20px 0;
      padding: 16px 20px;
      background: linear-gradient(135deg, rgba(0,229,200,0.08), rgba(124,58,237,0.08));
      border: 1px solid rgba(0,229,200,0.25);
      border-radius: 10px;
      text-align: center;
      font-family: monospace;
      font-size: 13px;
      color: #aaa;
    `;
    banner.innerHTML = `
      You're browsing as a guest. &nbsp;
      <a href="login.html" style="color:#00e5c8;font-weight:700;text-decoration:none;">Sign in</a>
      &nbsp;or&nbsp;
      <a href="login.html#register" style="color:#7c3aed;font-weight:700;text-decoration:none;">Create an account</a>
      &nbsp;to manage your profile.
    `;
    wrap.insertBefore(banner, wrap.querySelector(".card"));
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", _hideForGuest);
  } else {
    _hideForGuest();
  }
}

function setMsg(el, text, kind) {
  el.textContent = text || "";
  el.className   = "msg" + (kind ? " " + kind : "");
}

function fmtDate(s) {
  if (!s) return "—";
  try { return new Date(s).toLocaleDateString(); } catch (_) { return "—"; }
}

function pill(text, cls) {
  return `<span class="pill ${cls}">${text}</span>`;
}

async function loadProfile() {
  try {
    const r = await fetch(`${API()}/profile`, { credentials: "include" });
    // FIX: previously on 401 we faked user data from localStorage and rendered
    // it. This made the profile page show a non-existent account for any
    // unauthenticated visitor. Redirect to login instead — profile is for
    // logged-in users only.
    if (r.status === 401) {
      if (!_isGuest) window.location.replace("login.html");
      return;
    }
    const d = await r.json();
    if (!d.success) return;
    const u = d.user;
    $("i-username").textContent = u.username;
    $("i-email").textContent    = u.email || "—";
    $("i-verified").innerHTML   = u.emailVerified ? pill("VERIFIED","ok") : pill("UNVERIFIED","no");
    $("i-2fa").innerHTML        = u.twoFactorEnabled ? pill("ENABLED","ok") : pill("OFF","no");
    $("i-joined").textContent   = fmtDate(u.createdAt);
  } catch (_) { /* silent */ }
}

async function loadAlerts() {
  try {
    const r = await fetch(`${API()}/profile/login-alerts`, { credentials: "include" });
    const d = await r.json();
    if (d.success) $("alerts-toggle").checked = !!d.enabled;
  } catch (_) {}
}

$("alerts-toggle").addEventListener("change", async (e) => {
  setMsg($("alerts-msg"), "Saving…");
  try {
    const r = await fetch(`${API()}/profile/login-alerts`, {
      method: "POST", credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled: e.target.checked }),
    });
    const d = await r.json();
    setMsg($("alerts-msg"), d.success ? "Saved." : "Failed.", d.success ? "ok" : "err");
    setTimeout(() => setMsg($("alerts-msg"), ""), 1800);
  } catch (_) { setMsg($("alerts-msg"), "Server unreachable.", "err"); }
});

async function postJSON(url, body) {
  const r = await fetch(url, {
    method: "POST", credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return r.json().catch(() => ({}));
}

// FIX: wrap each form handler in try/catch so the button doesn't stay disabled
// forever when the network request throws (e.g. server cold-start on Render
// free tier).
$("u-btn").addEventListener("click", async () => {
  const newUsername = $("u-new").value.trim();
  const password    = $("u-pw").value;
  if (!newUsername) return setMsg($("u-msg"), "Enter a new username.", "err");
  setMsg($("u-msg"), "Saving…");
  $("u-btn").disabled = true;
  try {
    const d = await postJSON(`${API()}/profile/username`, { newUsername, password });
    if (d.success) {
      setMsg($("u-msg"), "Username updated.", "ok");
      $("u-pw").value = "";
      loadProfile();
    } else setMsg($("u-msg"), d.message || "Failed.", "err");
  } catch (_) {
    setMsg($("u-msg"), "Server unreachable.", "err");
  } finally {
    $("u-btn").disabled = false;
  }
});

$("e-btn").addEventListener("click", async () => {
  const newEmail = $("e-new").value.trim();
  const password = $("e-pw").value;
  if (!newEmail) return setMsg($("e-msg"), "Enter an email.", "err");
  setMsg($("e-msg"), "Saving…");
  $("e-btn").disabled = true;
  try {
    const d = await postJSON(`${API()}/profile/email`, { newEmail, password });
    if (d.success) {
      setMsg($("e-msg"), d.message || "Check your inbox to verify.", "ok");
      $("e-pw").value = "";
      loadProfile();
    } else setMsg($("e-msg"), d.message || "Failed.", "err");
  } catch (_) {
    setMsg($("e-msg"), "Server unreachable.", "err");
  } finally {
    $("e-btn").disabled = false;
  }
});

$("p-btn").addEventListener("click", async () => {
  const cur  = $("p-cur").value;
  const nw   = $("p-new").value;
  const conf = $("p-conf").value;
  if (nw.length < 6) return setMsg($("p-msg"), "Password must be at least 6 characters.", "err");
  if (nw !== conf)   return setMsg($("p-msg"), "Passwords don't match.", "err");
  setMsg($("p-msg"), "Saving…");
  $("p-btn").disabled = true;
  try {
    const d = await postJSON(`${API()}/profile/password`, { currentPassword: cur, newPassword: nw });
    if (d.success) {
      setMsg($("p-msg"), "Password updated.", "ok");
      $("p-cur").value = ""; $("p-new").value = ""; $("p-conf").value = "";
    } else setMsg($("p-msg"), d.message || "Failed.", "err");
  } catch (_) {
    setMsg($("p-msg"), "Server unreachable.", "err");
  } finally {
    $("p-btn").disabled = false;
  }
});

$("d-btn").addEventListener("click", async () => {
  if (_isGuest) { alert("Sign in to manage your account."); return; }
  if (!confirm("This permanently deletes your account. Continue?")) return;
  if (!confirm("Last chance — really delete everything?")) return;
  const password = $("d-pw").value;
  setMsg($("d-msg"), "Working…");
  try {
    const r = await fetch(`${API()}/profile`, {
      method: "DELETE", credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const d = await r.json();
    if (d.success) {
      alert("Account deleted. Goodbye.");
      // FIX: use replace() so the back button doesn't return to the deleted
      // account's profile page.
      window.location.replace("login.html");
    } else setMsg($("d-msg"), d.message || "Failed.", "err");
  } catch (_) { setMsg($("d-msg"), "Server unreachable.", "err"); }
});

$("logout-link").addEventListener("click", async (e) => {
  e.preventDefault();
  try { await fetch(`${API()}/logout`, { method: "POST", credentials: "include" }); } catch (_) {}
  // FIX: guard the HybridData call — if HybridData isn't loaded or onLogout
  // isn't a function, the original code would throw and skip the local
  // cleanup + redirect, leaving the user in a half-logged-out state.
  try {
    if (window.HybridData && typeof window.HybridData.onLogout === 'function') {
      window.HybridData.onLogout();
    }
  } catch (_) { /* ignore */ }
  localStorage.removeItem("rx_token");
  localStorage.removeItem("rx_user");
  window.location.replace("login.html");
});

loadProfile();
loadAlerts();
