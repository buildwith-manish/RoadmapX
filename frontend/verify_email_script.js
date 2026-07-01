// ═══════════════════════════════════════════════════════
//  RoadmapX — Verify Email page script
//  URL must be: verify-email.html?token=XXX&u=USERNAME
// ═══════════════════════════════════════════════════════
const API = window.RX_API; // must match login_script.js

const params   = new URLSearchParams(window.location.search);
const token    = params.get("token");
const username = params.get("u");

const card    = document.getElementById("card");
const spinner = document.getElementById("spinner");
const title   = document.getElementById("title");
const msg     = document.getElementById("msg");
const cta     = document.getElementById("cta");
const resend  = document.getElementById("resend-block");
const resendA = document.getElementById("resend-link");

function done(state, head, body, showResend) {
  spinner.classList.add("hide");
  card.classList.add(state); // "ok" or "err"
  title.textContent = head;
  // Use textContent + a leading icon set via CSS-friendly span
  const icon = document.createElement("span");
  icon.className = "icon";
  icon.textContent = state === "ok" ? "✓" : "✕";
  title.parentNode.insertBefore(icon, title);
  msg.textContent = body;
  cta.classList.remove("hide");
  if (showResend) resend.classList.remove("hide");
}

(async function verify() {
  if (!token || !username) {
    done("err", "Invalid link", "This verification link is missing required info.", true);
    return;
  }
  try {
    const res = await fetch(`${API}/verify-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, username }),
    });
    let data = {};
    try { data = await res.json(); } catch (_) {}

    if (data.success) {
      done("ok", "Email verified!", data.message || "You can log in now.", false);
    } else if (data.code === "EXPIRED") {
      done("err", "Link expired", data.message || "Request a new verification email below.", true);
    } else {
      done("err", "Verification failed", data.message || "Something went wrong.", true);
    }
  } catch (err) {
    done("err", "Server unreachable", "Please try again in a moment.", true);
  }
})();

// Resend handler — asks for the email since we may not have it on this page
resendA.addEventListener("click", async () => {
  const email = prompt("Enter the email you signed up with:");
  if (!email) return;
  try {
    const res = await fetch(`${API}/resend-verification`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim() }),
    });
    let data = {};
    try { data = await res.json(); } catch (_) {}
    alert(data.message || "If that account needs verification, a new email was sent.");
  } catch (_) {
    alert("Cannot reach server. Try again later.");
  }
});
