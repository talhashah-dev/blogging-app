import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDjWgkEDZI6dPWbai_OJ6KLKI9A8l83m4I",
  authDomain: "blogapp-c7488.firebaseapp.com",
  projectId: "blogapp-c7488",
  storageBucket: "blogapp-c7488.appspot.com",
  messagingSenderId: "889483622671",
  appId: "1:889483622671:web:8eef199be7330f2418667a",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(app);

const email = document.getElementById("emailInput");
const password = document.getElementById("passwordInput");
const fName = document.getElementById("firstName");
const lName = document.getElementById("lastName");
const mainForm = document.getElementById("mainForm");

let signUp = (eve) => {
  eve.preventDefault();

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async (userCredential) => {
      var ref = doc(db, "Users", userCredential.user.uid);
      await setDoc(ref, {
        firstName: fName.value,
        lastName: lName.value,
      });
      swal("Signup Successful!", "", "success");
      // console.log(userCredential);
      // email.value = "";
      fName.value = "";
      lName.value = "";
      password.value = "";
      emailInput.value = "";
      //   re_password.value = "";
    })
    .catch((e) => {
      if (e.code === "auth/email-already-in-use") {
        swal("User with this Email already exist!", "", "error");
      } else if (e.code === "auth/weak-password") {
        swal("Password should be at least 6 characters!", "", "error");
      } else if (e.code === "auth/too-many-requests") {
        swal(
          "Account temporarily disabled due to multiple failed login attempts. Reset password or try again later.",
          "",
          "error"
        );
        //   resetPass.style.display = "block"
      } else {
        swal("Invalid Credentials!", "", "error");
      }
      console.log(e.code);
      console.log(e.message);
    });
};

mainForm.addEventListener("submit", signUp);
