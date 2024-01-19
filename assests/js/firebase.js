const signupForm = document.getElementById("signup");
const loginForm = document.getElementById("login");
const formSubmitStop = document.querySelector(".form");

if (formSubmitStop) {
  formSubmitStop.addEventListener("submit", (event) => {
    event.preventDefault();
  });
}

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

import { getDatabase, ref, child, get, set, update, remove } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDjWgkEDZI6dPWbai_OJ6KLKI9A8l83m4I",
  authDomain: "blogapp-c7488.firebaseapp.com",
  projectId: "blogapp-c7488",
  storageBucket: "blogapp-c7488.appspot.com",
  messagingSenderId: "889483622671",
  appId: "1:889483622671:web:8eef199be7330f2418667a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase(app);

// onAuthStateChanged(auth, (user) => {
//   if (!user) {
//     location.replace("index.html");
//   }
// });



//----- Signup code start
if (signupForm) {
  document.getElementById("signup").addEventListener("click", function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        alert("Signup successfully!");
        location.replace("dashboard.html");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        alert(error);
      });
  });
}
//----- End

//----- Login code start
if (loginForm) {
  document.getElementById("login").addEventListener("click", function () {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        alert(user.email + " Login successfully!!!");
        location.replace("dashboard.html");
      })
      .catch((error) => {
        console.log(error.message);
        alert(errorMessage);
      });
  });
}
//----- End

//----- Logout code start
const logoutBtn = document.getElementById("logout");
if(logoutBtn){
  logoutBtn.addEventListener("click", function () {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
        alert("Sign-out successful.");
        location.replace("index.html");
      })
      .catch((error) => {
        console.log("An error happened" + error);
      });
  });
}

//----- End

