let userCreds = JSON.parse(localStorage.getItem("user-creds"));
let userInfo = JSON.parse(localStorage.getItem("user-info"));

let logoutButton = document.getElementById("logoutBtn");
let loginButton = document.getElementById("loginBtn");

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDjWgkEDZI6dPWbai_OJ6KLKI9A8l83m4I",
  authDomain: "blogapp-c7488.firebaseapp.com",
  databaseURL: "https://blogapp-c7488-default-rtdb.firebaseio.com",
  projectId: "blogapp-c7488",
  storageBucket: "blogapp-c7488.appspot.com",
  messagingSenderId: "889483622671",
  appId: "1:889483622671:web:8eef199be7330f2418667a",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const date = new Date();

let ifUserLogin = () => {
    if (!localStorage.getItem("user-creds")) {
      // window.location.href = "login.html"
      logoutButton.style.display = "none";
      loginButton.style.display = "block";
    } else {
      logoutButton.style.display = "block";
      loginButton.style.display = "none";
    }
};

const formattedDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
}).format(date);

const dayWithSuffix =
  date.getDate() +
  (date.getDate() % 10 === 1 && date.getDate() !== 11
    ? "st"
    : date.getDate() % 10 === 2 && date.getDate() !== 12
    ? "nd"
    : date.getDate() % 10 === 3 && date.getDate() !== 13
    ? "rd"
    : "th");

const finalFormattedDate = formattedDate.replace(/\d+/, dayWithSuffix);

// Function to create a post card element
function createPostCard(post) {
  const postCard = document.createElement("div");
  postCard.className = "post-card";

  // Create post info section
  const postInfo = document.createElement("div");
  postInfo.className = "post-info";

  // Create author DP element
  const authorDp = document.createElement("img");
  authorDp.src = "assests/images/writer-dp.png";
  authorDp.className = "author-dp";

  // Create title and author info section
  const titleAndAuthor = document.createElement("div");

  // Create post title element
  const postTitle = document.createElement("h3");
  postTitle.className = "post-title";
  postTitle.textContent = post.postInfo.PostTitle;

  // Create post author info element
  const postAuthor = document.createElement("div");
  postAuthor.className = "post-author";
  postAuthor.innerHTML = `<span>${userInfo.firstName} ${userInfo.lastName}</span> - <span>${finalFormattedDate}</span>`;

  // Append elements to title and author info section
  titleAndAuthor.appendChild(postTitle);
  titleAndAuthor.appendChild(postAuthor);

  // Append elements to post info section
  postInfo.appendChild(authorDp);
  postInfo.appendChild(titleAndAuthor);

  // Create post content element
  const postContent = document.createElement("div");
  postContent.className = "post-content";
  postContent.textContent = post.postInfo.PostText;

  // Create content edit section
  const otherPost = document.createElement("a");
  otherPost.setAttribute("href", "author-page.html");
  otherPost.innerText = "See all from this user";

  // Append elements to post card
  postCard.appendChild(postInfo);
  postCard.appendChild(postContent);
  postCard.appendChild(otherPost);

  return postCard;
}

// Function to prepend new posts to the existing container
function prependPostsToContainer(postContainer, posts) {
  posts.forEach((post) => {
    // Create and prepend post card to post container
    postContainer.insertBefore(createPostCard(post), postContainer.firstChild);
  });
}

// Function to retrieve and display posts
function displayPostsFromFirebase() {
  const postsRef = ref(db, "Posts");

  // Use the 'on' method to listen for changes in real-time
  onValue(postsRef, (snapshot) => {
    const postContainer = document.querySelector(".post-container");

    // Convert the snapshot to an array of posts
    const posts = [];
    snapshot.forEach((childSnapshot) => {
      const post = childSnapshot.val();
      post.id = childSnapshot.key;
      posts.push(post);
    });

    // Prepend new posts to the existing container
    prependPostsToContainer(postContainer, posts);
  });
}

// Call the function to initially load and display posts
displayPostsFromFirebase();

let signOut = () => {
  localStorage.removeItem("user-creds");
  localStorage.removeItem("user-info");
  window.location.href = "login.html";
};


window.addEventListener("load", ifUserLogin);
logoutButton.addEventListener("click", signOut);
