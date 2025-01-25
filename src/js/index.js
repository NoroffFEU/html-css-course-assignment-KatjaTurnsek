// imported JS
import { addToCart } from "./cart.js";
import { fetchFromApi } from "./api.js";
import loader from "./loader.js";

async function getPosts() {
  const postsEndpoint = `${API_BASE_URL}/rainy-days`;
  try {
    const posts = await fetchFromApi(postsEndpoint);
    return posts;
  } catch (error) {
    throw new Error("Failed to fetch posts: " + error.message);
  }
}

function renderPosts(posts) {
  const element1 = document.getElementById("element1");
  const element2 = document.getElementById("element2");
  const element3 = document.getElementById("element3");

  if (posts.length >= 3) {
    element1.textContent = posts[0];
    element2.textContent = posts[1];
    element3.textContent = posts[2];
  } else {
    throw new Error("Not enough posts to render.");
  }
}

// Loader function
async function app() {
  loader.show();
  try {
    const posts = await getPosts();
    renderPosts(posts);
  } catch (error) {
    alert(error.message);
  } finally {
    loader.hide();
  }
}

app();

// Toggle button Mobile
const menuBtn = document.querySelector(".toggle-btn");
const navLinks = document.querySelector(".menu-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("mobile-menu");
});
