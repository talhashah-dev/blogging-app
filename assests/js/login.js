import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  getAuth,
  signInWithEmailAndPassword,
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
const mainForm = document.getElementById("mainForm");
const resetPass = document.getElementById("resetPass");

let login = (eve) => {
  eve.preventDefault();

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(async (userCredential) => {
      var ref = doc(db, "Users", userCredential.user.uid);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        localStorage.setItem(
          "user-info",
          JSON.stringify({
            firstName: docSnap.data().firstName,
            lastName: docSnap.data().lastName,
          })
        );
        localStorage.setItem("user-creds", JSON.stringify(userCredential));
        //  window.location.href = "index.html";
      }

      swal("Login Successful!", "", "success");
      // console.log(userCredential);
      email.value = "";
      password.value = "";
      // window.location.href = "dashboard.html";
    })
    .catch((e) => {
      if (e.code === "auth/invalid-email") {
        swal("Email is missing!", "", "error");
      } else if (e.code === "auth/missing-password") {
        swal("Password is missing!", "", "error");
      } else if (e.code === "auth/too-many-requests") {
        swal(
          "Account temporarily disabled due to multiple failed login attempts.",
          "",
          "error"
        );
        resetPass.style.display = "block";
      } else {
        swal("Invalid Credentials!", "", "error");
      }
      //   console.log(e.code);
      // console.log(e.message);
    });
};

mainForm.addEventListener("submit", login);
