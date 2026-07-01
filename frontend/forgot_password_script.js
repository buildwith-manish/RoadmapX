// ═══════════════════════════════════════════════════════
//  RoadmapX — Forgot Password page script
// ═══════════════════════════════════════════════════════
const API = window.RX_API; // must match login_script.js

function showMsg(text, type) {
  const box = document.getElementById("msg");
  box.className = "msg " + type + " visible";
  box.textContent = text;
}
function hideMsg() {
  document.getElementById("msg").classList.remove("visible");
}

async function sendReset() {
  hideMsg();
  const email = document.getElementById("email").value.trim();
  if (!email || !/.+@.+\..+/.test(email)) {
    showMsg("Please enter a valid email.", "error");
    return;
  }

  const btn = document.getElementById("send-btn");
  btn.disabled = true;
  btn.textContent = "Sending…";

  try {
    const res = await fetch(`${API}/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    let data = {};
    try { data = await res.json(); } catch (_) {}

    if (data.success) {
      showMsg(
        data.message || "If that email is registered, a reset link has been sent.",
        "success"
      );
    } else {
      showMsg(data.message || "Could not send reset email.", "error");
    }
  } catch (err) {
    showMsg("Cannot reach server. Try again later.", "error");
  } finally {
    btn.disabled = false;
    btn.textContent = "Send reset link";
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendReset();
});
