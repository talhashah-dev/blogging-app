let greetings = document.getElementById("greetings");
let time = new Date().getHours();

// Time Based Greeting for readers
if (greetings) {
  if (time <= 5 && time < 12) {
    greetings.innerHTML = "Good Morning Readers!";
  } else if (time = 12 && time < 14) {
    greetings.innerHTML = "Good Noon Readers!";
  } else if (time > 14 && time < 18) {
    greetings.innerHTML = "Good Evening Readers!";
  } else {
    greetings.innerHTML = "Good Night Readers!";
  }
}

