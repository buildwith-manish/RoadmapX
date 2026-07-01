// ═══════════════════════════════════════════════════════
//  RoadmapX — Profile page script
// ═══════════════════════════════════════════════════════
const API = window.RX_API; // set by config.js
const $ = (id) => document.getElementById(id);

// ── Guest check — hide edit forms if not logged in ──────
// Determined synchronously from localStorage before any network calls.
const _isGuest = !localStorage.getItem("rx_token");

if (_isGuest) {
  // Wait for DOM then hide all edit/action sections
  const _hideForGuest = () => {
    // Hide the editable forms section (username / email / password / delete)
    [
      "section-username", "section-email", "section-password",
      "section-delete",   "section-alerts",
    ].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = "none";
    });

    // Hide logout link — guests aren't "logged in" to log out of
    const logoutLink = document.getElementById("logout-link");
    if (logoutLink) logoutLink.style.display = "none";

    // Show a sign-in prompt instead
    const infoSection = document.querySelector(".profile-info") || document.querySelector("main") || document.body;
    const banner = document.createElement("div");
    banner.style.cssText = `
      margin: 20px auto;
      max-width: 480px;
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
    if (infoSection) infoSection.prepend(banner);
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
    const r = await fetch(`${API}/profile`, { credentials: "include" });
    if (r.status === 401) { const u = { username: localStorage.getItem("rx_user") || "User", email: "", emailVerified: false, twoFactorEnabled: false, createdAt: new Date() }; document.getElementById("i-username").textContent = u.username; return; }
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
    const r = await fetch(`${API}/profile/login-alerts`, { credentials: "include" });
    const d = await r.json();
    if (d.success) $("alerts-toggle").checked = !!d.enabled;
  } catch (_) {}
}

$("alerts-toggle").addEventListener("change", async (e) => {
  setMsg($("alerts-msg"), "Saving…");
  try {
    const r = await fetch(`${API}/profile/login-alerts`, {
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

$("u-btn").addEventListener("click", async () => {
  const newUsername = $("u-new").value.trim();
  const password    = $("u-pw").value;
  if (!newUsername) return setMsg($("u-msg"), "Enter a new username.", "err");
  setMsg($("u-msg"), "Saving…");
  $("u-btn").disabled = true;
  const d = await postJSON(`${API}/profile/username`, { newUsername, password });
  $("u-btn").disabled = false;
  if (d.success) {
    setMsg($("u-msg"), "Username updated.", "ok");
    $("u-pw").value = "";
    loadProfile();
  } else setMsg($("u-msg"), d.message || "Failed.", "err");
});

$("e-btn").addEventListener("click", async () => {
  const newEmail = $("e-new").value.trim();
  const password = $("e-pw").value;
  if (!newEmail) return setMsg($("e-msg"), "Enter an email.", "err");
  setMsg($("e-msg"), "Saving…");
  $("e-btn").disabled = true;
  const d = await postJSON(`${API}/profile/email`, { newEmail, password });
  $("e-btn").disabled = false;
  if (d.success) {
    setMsg($("e-msg"), d.message || "Check your inbox to verify.", "ok");
    $("e-pw").value = "";
    loadProfile();
  } else setMsg($("e-msg"), d.message || "Failed.", "err");
});

$("p-btn").addEventListener("click", async () => {
  const cur  = $("p-cur").value;
  const nw   = $("p-new").value;
  const conf = $("p-conf").value;
  if (nw.length < 6) return setMsg($("p-msg"), "Password must be at least 6 characters.", "err");
  if (nw !== conf)   return setMsg($("p-msg"), "Passwords don't match.", "err");
  setMsg($("p-msg"), "Saving…");
  $("p-btn").disabled = true;
  const d = await postJSON(`${API}/profile/password`, { currentPassword: cur, newPassword: nw });
  $("p-btn").disabled = false;
  if (d.success) {
    setMsg($("p-msg"), "Password updated.", "ok");
    $("p-cur").value = ""; $("p-new").value = ""; $("p-conf").value = "";
  } else setMsg($("p-msg"), d.message || "Failed.", "err");
});

$("d-btn").addEventListener("click", async () => {
  if (_isGuest) { alert("Sign in to manage your account."); return; }
  if (!confirm("This permanently deletes your account. Continue?")) return;
  if (!confirm("Last chance — really delete everything?")) return;
  const password = $("d-pw").value;
  setMsg($("d-msg"), "Working…");
  try {
    const r = await fetch(`${API}/profile`, {
      method: "DELETE", credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const d = await r.json();
    if (d.success) {
      alert("Account deleted. Goodbye.");
      window.location.href = "login.html";
    } else setMsg($("d-msg"), d.message || "Failed.", "err");
  } catch (_) { setMsg($("d-msg"), "Server unreachable.", "err"); }
});

$("logout-link").addEventListener("click", async (e) => {
  e.preventDefault();
  try { await fetch(`${API}/logout`, { method: "POST", credentials: "include" }); } catch (_) {}
  if (window.HybridData) window.HybridData.onLogout();
  localStorage.removeItem("rx_token");
  localStorage.removeItem("rx_user");
  window.location.replace("login.html");
});

loadProfile();
loadAlerts();
