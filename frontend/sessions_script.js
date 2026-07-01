// ═══════════════════════════════════════════════════════
//  RoadmapX — Sessions & Devices page script
// ═══════════════════════════════════════════════════════
const API = window.RX_API; // must match login_script.js

const listEl  = document.getElementById("list");
const toastEl = document.getElementById("toast");

document.getElementById("refresh-btn").addEventListener("click", load);
document.getElementById("revoke-others-btn").addEventListener("click", revokeOthers);
document.getElementById("logout-link").addEventListener("click", (e) => {
  e.preventDefault();
  if (window.rxLogout) window.rxLogout();
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

async function load() {
  listEl.innerHTML = `<div class="loading">Loading sessions…</div>`;
  try {
    const res = await fetch(`${API}/sessions`, { credentials: "include" });
    if (res.status === 401) {
      window.location.href = "login.html";
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
  dev.textContent = s.device;
  if (s.current) {
    const b = document.createElement("span");
    b.className = "badge";
    b.textContent = "THIS DEVICE";
    dev.appendChild(b);
  }

  const meta = document.createElement("div");
  meta.className = "meta";
  meta.innerHTML =
    `Signed in: ${fmtDate(s.createdAt)}<br>` +
    `Expires: ${fmtDate(s.expiresAt)}<br>` +
    (s.ip ? `IP: ${s.ip}<br>` : "") +
    `${s.ua}`;

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
    const res = await fetch(`${API}/sessions/${encodeURIComponent(id)}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();
    if (!data.success) {
      toast(data.message || "Could not revoke.", "error");
      return;
    }
    if (data.signedOut) {
      window.location.href = "login.html";
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
    const res = await fetch(`${API}/sessions/revoke-others`, {
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
