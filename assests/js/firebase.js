document.querySelector("form").addEventListener("submit", (event) =>{
  event.preventDefault()
})

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

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


//----- New Registration code start
// document.getElementById("signup").addEventListener("click", function() {
//   let email = document.getElementById("email").value;
//   let password = document.getElementById("password").value;

//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       console.log(user);
//       alert("Registration successfully!!");
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log(errorMessage);
//       alert(error);
//     });
// });
//----- End

// //----- Login code start
document.getElementById("login").addEventListener("click", function () {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      alert(user.email + " Login successfully!!!");
      document.getElementById("logout").style.display = "block";
      location.replace("../dashboard.html")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      alert(errorMessage);
    });
});
// //----- End

// //----- Logout code start
// document.getElementById("logout").addEventListener("click", function () {
//   signOut(auth)
//     .then(() => {
//       // Sign-out successful.
//       console.log("Sign-out successful.");
//       alert("Sign-out successful.");
//       document.getElementById("logout").style.display = "none";
//     })
//     .catch((error) => {
//       // An error happened.
//       console.log("An error happened.");
//     });
// });
// //----- End
