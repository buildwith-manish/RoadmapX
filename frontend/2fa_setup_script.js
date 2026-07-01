// ═══════════════════════════════════════════════════════
//  RoadmapX — 2FA setup/management page
// ═══════════════════════════════════════════════════════
const API = window.RX_API;

const $ = (id) => document.getElementById(id);
const badge       = $("status-badge");
const startCard   = $("start-card");
const setupCard   = $("setup-card");
const verifyCard  = $("verify-card");
const backupCard  = $("backup-card");
const enabledCard = $("enabled-card");

function setMsg(el, text, kind) {
  el.textContent = text || "";
  el.className   = "msg" + (kind ? " " + kind : "");
}

async function loadStatus() {
  try {
    const res = await fetch(`${API}/2fa/status`, { credentials: "include" });
    if (res.status === 401) { window.location.href = "login.html"; return; }
    const data = await res.json();
    if (data.enabled) {
      badge.textContent = "ENABLED";
      badge.className = "status on";
      enabledCard.classList.remove("hide");
      startCard.classList.add("hide");
    } else {
      badge.textContent = "DISABLED";
      badge.className = "status off";
      startCard.classList.remove("hide");
      enabledCard.classList.add("hide");
    }
  } catch (_) {
    badge.textContent = "UNKNOWN";
  }
}

$("start-btn").addEventListener("click", async () => {
  $("start-btn").disabled = true;
  try {
    const res = await fetch(`${API}/2fa/setup`, { method: "POST", credentials: "include" });
    const data = await res.json();
    if (!data.success) {
      alert(data.message || "Setup failed.");
      $("start-btn").disabled = false;
      return;
    }
    const img = document.createElement("img");
    img.src = data.qrDataUrl;
    img.alt = "2FA QR code";
    $("qr").innerHTML = "";
    $("qr").appendChild(img);
    $("secret").textContent = data.secret;
    startCard.classList.add("hide");
    setupCard.classList.remove("hide");
    verifyCard.classList.remove("hide");
    $("enable-code").focus();
  } catch (_) {
    alert("Server unreachable.");
    $("start-btn").disabled = false;
  }
});

$("enable-btn").addEventListener("click", async () => {
  const code = $("enable-code").value.trim();
  if (!/^\d{6}$/.test(code)) {
    setMsg($("enable-msg"), "Enter the 6-digit code from your app.", "error");
    return;
  }
  setMsg($("enable-msg"), "Verifying…");
  try {
    const res = await fetch(`${API}/2fa/enable`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    const data = await res.json();
    if (!data.success) {
      setMsg($("enable-msg"), data.message || "Failed.", "error");
      return;
    }
    setMsg($("enable-msg"), "2FA enabled!", "success");
    setupCard.classList.add("hide");
    verifyCard.classList.add("hide");

    const grid = $("backup-codes");
    grid.innerHTML = "";
    data.backupCodes.forEach((c) => {
      const d = document.createElement("div");
      d.textContent = c;
      grid.appendChild(d);
    });
    backupCard.classList.remove("hide");
    badge.textContent = "ENABLED";
    badge.className = "status on";
  } catch (_) {
    setMsg($("enable-msg"), "Server unreachable.", "error");
  }
});

$("copy-btn").addEventListener("click", () => {
  const codes = [...document.querySelectorAll("#backup-codes div")].map((d) => d.textContent).join("\n");
  navigator.clipboard.writeText(codes).then(() => {
    $("copy-btn").textContent = "Copied!";
    setTimeout(() => ($("copy-btn").textContent = "Copy all"), 1500);
  });
});

$("disable-btn").addEventListener("click", async () => {
  const code = $("disable-code").value.trim();
  if (!/^\d{6}$/.test(code)) {
    setMsg($("disable-msg"), "Enter your current 6-digit code.", "error");
    return;
  }
  if (!confirm("Disable 2FA on your account?")) return;
  setMsg($("disable-msg"), "Working…");
  try {
    const res = await fetch(`${API}/2fa/disable`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    const data = await res.json();
    if (!data.success) {
      setMsg($("disable-msg"), data.message || "Failed.", "error");
      return;
    }
    setMsg($("disable-msg"), "2FA disabled.", "success");
    setTimeout(loadStatus, 600);
  } catch (_) {
    setMsg($("disable-msg"), "Server unreachable.", "error");
  }
});

loadStatus();
