// ═══════════════════════════════════════════════════════
//  RoadmapX — Reset Password page script
//  URL must be: reset-password.html?token=XXX&u=USERNAME
// ═══════════════════════════════════════════════════════
const API = window.RX_API; // must match login_script.js

const params   = new URLSearchParams(window.location.search);
const token    = params.get("token");
const username = params.get("u");

function showMsg(text, type) {
  const box = document.getElementById("msg");
  box.className = "msg " + type + " visible";
  box.textContent = text;
}
function hideMsg() {
  document.getElementById("msg").classList.remove("visible");
}

// Sanity check the link before the user types anything
(function checkLink() {
  if (!token || !username) {
    showMsg("This reset link is invalid. Request a new one.", "error");
    document.getElementById("save-btn").disabled = true;
    document.getElementById("pw").disabled = true;
    document.getElementById("pw2").disabled = true;
  }
})();

async function resetPassword() {
  hideMsg();
  const pw  = document.getElementById("pw").value;
  const pw2 = document.getElementById("pw2").value;

  if (!pw || !pw2) {
    showMsg("Please fill in both password fields.", "error");
    return;
  }
  if (pw.length < 6) {
    showMsg("Password must be at least 6 characters.", "error");
    return;
  }
  if (pw !== pw2) {
    showMsg("Passwords do not match.", "error");
    return;
  }

  const btn = document.getElementById("save-btn");
  btn.disabled = true;
  btn.textContent = "Saving…";

  try {
    const res = await fetch(`${API}/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, username, password: pw }),
    });
    let data = {};
    try { data = await res.json(); } catch (_) {}

    if (data.success) {
      showMsg(data.message || "Password updated. Redirecting to login…", "success");
      setTimeout(() => { window.location.href = "login.html"; }, 1200);
    } else {
      showMsg(data.message || "Could not reset password.", "error");
      btn.disabled = false;
      btn.textContent = "Update password";
    }
  } catch (err) {
    showMsg("Cannot reach server. Try again later.", "error");
    btn.disabled = false;
    btn.textContent = "Update password";
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") resetPassword();
});
