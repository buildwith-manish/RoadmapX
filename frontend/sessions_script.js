// ═══════════════════════════════════════════════════════
//  RoadmapX — Sessions & Devices page script
// ═══════════════════════════════════════════════════════

// FIX: use a getter so window.RX_API is read at call time, not at script-load
// time. Previously this captured undefined when config.js loaded after this
// script (which can happen because sessions_script.js has `defer` and
// config.js doesn't — the execution order between deferred and non-deferred
// scripts at end of body is browser-dependent).
const API = () => window.RX_API || '';

const listEl  = document.getElementById("list");
const toastEl = document.getElementById("toast");

document.getElementById("refresh-btn").addEventListener("click", load);
document.getElementById("revoke-others-btn").addEventListener("click", revokeOthers);
document.getElementById("logout-link").addEventListener("click", async (e) => {
  e.preventDefault();
  // FIX: sessions.html does not load login_script.js, so window.rxLogout() is
  // undefined here. Inline a minimal logout flow so the "Sign out everywhere"
  // link actually works instead of silently doing nothing.
  try {
    await fetch(`${API()}/logout`, { method: "POST", credentials: "include" });
  } catch (_) { /* ignore — we still want to clear local state */ }
  try {
    if (window.HybridData && typeof window.HybridData.onLogout === 'function') {
      window.HybridData.onLogout();
    }
  } catch (_) { /* ignore */ }
  localStorage.removeItem('rx_token');
  localStorage.removeItem('rx_user');
  // Use replace() so the back button doesn't return the user to the (now
  // unauthenticated) sessions page and immediately bounce them again.
  window.location.replace("login.html");
});

function toast(msg, kind) {
  toastEl.textContent = msg;
  toastEl.className   = "toast show" + (kind === "error" ? " error" : "");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toastEl.classList.remove("show"), 2400);
}

function fmtDate(s) {
  if (!s) return "—";
  try {
    const d = new Date(s);
    return d.toLocaleString();
  } catch (_) { return s; }
}

// Escape user-controlled text before injecting into innerHTML.
// `s.ip` and `s.ua` come from the backend (User-Agent + X-Forwarded-For)
// and CAN be spoofed — without escaping this is a stored XSS vector.
function esc(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

async function load() {
  listEl.innerHTML = `<div class="loading">Loading sessions…</div>`;
  try {
    const res = await fetch(`${API()}/sessions`, { credentials: "include" });
    if (res.status === 401) {
      // FIX: use replace() to avoid a back-button loop (login → sessions → login).
      window.location.replace("login.html");
      return;
    }
    const data = await res.json();
    if (!data.success) throw new Error(data.message || "Failed");

    if (!data.sessions.length) {
      listEl.innerHTML = `<div class="empty">No active sessions found.</div>`;
      return;
    }

    listEl.innerHTML = "";
    data.sessions.forEach((s) => listEl.appendChild(renderItem(s)));
  } catch (err) {
    listEl.innerHTML = `<div class="empty">Could not load sessions.</div>`;
  }
}

function renderItem(s) {
  const wrap = document.createElement("div");
  wrap.className = "item" + (s.current ? " current" : "");

  const info = document.createElement("div");
  info.className = "info";

  const dev = document.createElement("div");
  dev.className = "device";
  dev.textContent = s.device;   // textContent is XSS-safe
  if (s.current) {
    const b = document.createElement("span");
    b.className = "badge";
    b.textContent = "THIS DEVICE";
    dev.appendChild(b);
  }

  // FIX: escape server-supplied fields (s.ip, s.ua) before injecting via
  // innerHTML. A spoofed User-Agent header could otherwise inject markup.
  const meta = document.createElement("div");
  meta.className = "meta";
  meta.innerHTML =
    `Signed in: ${esc(fmtDate(s.createdAt))}<br>` +
    `Expires: ${esc(fmtDate(s.expiresAt))}<br>` +
    (s.ip ? `IP: ${esc(s.ip)}<br>` : "") +
    `${esc(s.ua)}`;

  info.appendChild(dev);
  info.appendChild(meta);

  const btn = document.createElement("button");
  btn.className = "btn danger";
  btn.textContent = s.current ? "Sign out" : "Revoke";
  btn.addEventListener("click", () => revoke(s.id, s.current));

  wrap.appendChild(info);
  wrap.appendChild(btn);
  return wrap;
}

async function revoke(id, isCurrent) {
  if (isCurrent && !confirm("Sign out from this device?")) return;
  if (!isCurrent && !confirm("Revoke this session? The device will be signed out.")) return;
  try {
    const res = await fetch(`${API()}/sessions/${encodeURIComponent(id)}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();
    if (!data.success) {
      toast(data.message || "Could not revoke.", "error");
      return;
    }
    if (data.signedOut) {
      // FIX: replace() instead of href to avoid back-button loop.
      window.location.replace("login.html");
      return;
    }
    toast("Session revoked.");
    load();
  } catch (_) {
    toast("Server unreachable.", "error");
  }
}

async function revokeOthers() {
  if (!confirm("Sign out from every other device?")) return;
  try {
    const res = await fetch(`${API()}/sessions/revoke-others`, {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    if (!data.success) {
      toast(data.message || "Could not revoke.", "error");
      return;
    }
    toast(`Revoked ${data.revoked} session${data.revoked === 1 ? "" : "s"}.`);
    load();
  } catch (_) {
    toast("Server unreachable.", "error");
  }
}

load();
