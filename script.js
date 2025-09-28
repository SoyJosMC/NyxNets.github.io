const publishBtn = document.getElementById("publishBtn");
const postInput = document.getElementById("postInput");
const feed = document.getElementById("feed");
const loginBtn = document.getElementById("loginBtn");

let posts = JSON.parse(localStorage.getItem("nyxPosts")) || [];
let likes = JSON.parse(localStorage.getItem("nyxLikes")) || [];

function renderPosts() {
  feed.innerHTML = "";
  posts.forEach((post, i) => {
    const postEl = document.createElement("div");
    postEl.className = "post";
    const liked = likes.includes(i);
    postEl.innerHTML = `
      <p>${post.text}</p>
      <button class="like-btn" onclick="likePost(${i})" ${liked? "disabled": ""}>
        ❤️ ${post.likes}
      </button>
    `;
    feed.appendChild(postEl);
});
}

function likePost(index) {
  if (!likes.includes(index)) {
    posts[index].likes += 1;
    likes.push(index);
    localStorage.setItem("nyxLikes", JSON.stringify(likes));
    localStorage.setItem("nyxPosts", JSON.stringify(posts));
    renderPosts();
}
}

publishBtn.addEventListener("click", () => {
  const text = postInput.value.trim();
  if (text) {
    posts.push({ text, likes: 0});
    localStorage.setItem("nyxPosts", JSON.stringify(posts));
    postInput.value = "";
    renderPosts();
}
});

loginBtn.addEventListener("click", () => {
  netlifyIdentity.open();
});

netlifyIdentity.on("login", user => {alert(`Bienvenido, ${user.user_metadata.full_name || user.email}`);
});

netlifyIdentity.init();
renderPosts();