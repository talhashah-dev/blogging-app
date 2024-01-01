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

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
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

onAuthStateChanged(auth, (user)=>{
    if(user){
        document.getElementById("loginBtn").style.display = "none";
        console.log(user);
    } else{
        document.getElementById("loginBtn").style.display = "block";
    }
});