const signupForm = document.getElementById("signup");
const loginForm = document.getElementById("login");
// const email = document.getElementById("email").value;
// const password = document.getElementById("password").value;
const logoutBtn = document.getElementById("logout");
const formSubmitStop = document.querySelector(".form");

if (formSubmitStop) {
  formSubmitStop.addEventListener("submit", (event) => {
    event.preventDefault();
  });
}

// onAuthStateChanged(auth, (user)=>{
//     if(!user){
//         location.replace("index.html");
//     }
// });

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import {
  getDatabase,
  set,
  ref,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";

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

//----- Signup code start
// if (signupForm) {
//   signupForm.addEventListener("click", function () {
//     createUserWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         const user = userCredential.user;
//         console.log(user);
//         alert("Signup successfully!");
//         location.replace("dashboard.html");
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log(errorMessage);
//         alert(error);
//       });
//   });
// }
//----- End

//----- Login code start
// if (loginForm) {
//   loginForm.addEventListener("click", function () {
//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         // Signed in
//         const user = userCredential.user;
//         console.log(user);
//         alert(user.email + " Login successfully!!!");
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log(errorMessage);
//         // alert(errorMessage);
//       });
//   });
// }
//----- End

//----- Logout code start
// logoutBtn.addEventListener("click", function () {
//   signOut(auth)
//     .then(() => {
//       console.log("Sign-out successful.");
//       alert("Sign-out successful.");
//       location.replace("index.html");
//     })
//     .catch((error) => {
//       console.log("An error happened" + error);
//     });
// });
// if (logoutBtn) {
// }
//----- End

//----- Posting Blog Start

const addPostBtn = document.getElementById("postBtn");
const notify = document.querySelector(".notify");

function addPost() {
  const postTitle = document.getElementById("postTitle").value;
  const postText = document.getElementById("postText").value;
  const postId = new Date().getTime() ;

  set(ref(db, "post/" + postId), {
    postTitle: postTitle,
    postText: postText,
  });

  notify.innerHTML = "Post Added";

  document.getElementById("postTitle").value="";
  document.getElementById("postText").value="";

}

addPostBtn.addEventListener("click", addPost());
