let greetings = document.getElementById("greetings");
let time = new Date().getHours();

// Time Based Greeting for readers
if (greetings) {
  if (time >= 5 && time < 12) {
    greetings.innerHTML = "Good Morning Reader!";
  } else if (time >= 12 && time < 14) {
    greetings.innerHTML = "Good Noon Reader!";
  } else if (time >= 14 && time < 18) {
    greetings.innerHTML = "Good Evening Reader!";
  } else {
    greetings.innerHTML = "Good Night Reader!";
  }
}

// Password show/hide toggle
const togglePassword = document.getElementById("showPass");
if (togglePassword) {
  const password = document.getElementById("passwordInput");

  togglePassword.addEventListener("click", function () {
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

    this.classList.toggle("fa-eye");
  });
}

// Pre Loader
let loader = document.getElementById("center");
let page = document.getElementById("page");

window.addEventListener("load", function () {
  loader.style.display = "none";
  page.style.display = "block";
});
