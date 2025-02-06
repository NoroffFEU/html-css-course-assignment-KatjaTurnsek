// Imported JS
import { renderPosts } from "./products.js";
import { updateCartCount } from "./checkout.js";
import { API_BASE_URL, fetchFromApi } from "./api.js";
import loader from "./loader.js";

// API Call
async function getPosts() {
  const postsEndpoint = `${API_BASE_URL}/rainy-days`;
  try {
    const posts = await fetchFromApi(postsEndpoint);
    return posts;
  } catch (error) {
    throw new Error("Failed to fetch posts: " + error.message);
  }
}

// App Function
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

// Menu
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".toggle-btn");
  const navLinks = document.querySelector(".menu-links");
  const menuCart = document.querySelector(".menu-cart");

  const page = document.body.getAttribute("data-page");
  const hideOnPages = ["thank-you", "checkout"];

  if (hideOnPages.includes(page)) {
    if (navLinks) {
      navLinks.style.display = "none";
    }
    if (menuCart) {
      menuCart.style.display = "none";
    }
  } else {
    if (menuBtn && navLinks) {
      menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("mobile-menu");
      });
    } else {
      console.error("Menu button or navigation links not found.");
    }
  }
});
