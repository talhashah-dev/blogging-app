// Firebase Configs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
  remove,
  get,
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

// Check if user is Logged in

let ifUserLogin = () => {
  if (!localStorage.getItem("user-creds")) {
    location.href = "../screen/login.html"
  } else {
    logoutButton.style.display = "block";
    userName.innerText = `${userInfo.firstName + " " + userInfo.lastName}`;
  }
};
window.addEventListener("load", ifUserLogin);


// Function to fetch all posts
async function getAllPosts() {
  const postsRef = ref(db, "Posts");

  const snapshot = await get(postsRef);
  snapshot.forEach((childSnapshot) => {
    const post = childSnapshot.val();
    post.id = childSnapshot.key;
    console.log(post.id);
  });

}


let userCreds = JSON.parse(localStorage.getItem("user-creds"));
let userInfo = JSON.parse(localStorage.getItem("user-info"));
let userName = document.getElementById("userName");
let logoutButton = document.getElementById("logoutBtn");
let deleteButton = document.querySelector(".delBtn");

// ...

// Publishing Posts
const postTitleInput = document.getElementById("postTitle");
const postTextInput = document.getElementById("postText");
const publishButton = document.getElementById("pubBtn");


const date = new Date();

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

function addPost(e) {
  e.preventDefault();
  const postIdInput = Date.now();
  const postTitle = postTitleInput.value.trim();
  const postText = postTextInput.value.trim();

  if (postTitleInput.value === "" || postTextInput.value === "") {
    swal("Please fill in all fields!", "", "error");
    return;
  }

  set(ref(db, `Posts/${userInfo.firstName}-${postIdInput}`), {
    postInfo: {
      PostTitle: postTitleInput.value,
      PostText: postTextInput.value,
      PostDate: finalFormattedDate,
    },
  })
    .then(() => {
      swal("Blog Posted", "", "success");
      postTitleInput.value = "";
      postTextInput.value = "";
    })
    .catch((error) => {
      console.error(error.code);
      console.error(error.message);
    });
}

publishButton.addEventListener("click", addPost);
// ...

// // Function to create a post card element
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
  const contentEdit = document.createElement("div");
  contentEdit.className = "content-edit";

  // Create delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.setAttribute("class", "delBtn");
  deleteButton.setAttribute("data-post-id", ``);

  // Create edit button
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.setAttribute("id", "editBtn");
  editButton.setAttribute("type", "button");

  // Append buttons to content edit section
  contentEdit.appendChild(deleteButton);
  contentEdit.appendChild(editButton);

  // Append elements to post card
  postCard.appendChild(postInfo);
  postCard.appendChild(postContent);
  postCard.appendChild(contentEdit);

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

    prependPostsToContainer(postContainer, posts);
  });
}

displayPostsFromFirebase();

// Function to delete a specific post
function deletePost(postId) {
  const postRef = ref(db, `Posts/${postId}`);

  remove(postRef)
    .then(() => {
      swal("Post Deleted", "", "success");

      // Remove the post card from the UI
      const postCardToRemove = document.getElementById(postId);
      if (postCardToRemove) {
        postCardToRemove.remove();
      }
    })
    .catch((error) => {
      console.error(error.code);
      console.error(error.message);
    });
}

// Attach the deletePost function to the delete button(s)
const deleteButtons = document.querySelectorAll(".delBtn");

deleteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Assuming the post ID is stored as a data attribute on the button
    const postId = button.dataset.postId;
    deletePost(postId);
  });
});

// Signout
let signOut = () => {
  localStorage.removeItem("user-creds");
  localStorage.removeItem("user-info");
  window.location.href = "login.html";
};


logoutButton.addEventListener("click", signOut);
