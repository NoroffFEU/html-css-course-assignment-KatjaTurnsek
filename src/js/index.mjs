// Imports
import { API_BASE_URL } from "./config.mjs";
import { getPosts } from "./api.mjs";
import { renderPosts } from "./products.mjs";
import loader from "./loader.mjs";

// Loader
async function app() {
  loader.show();
  try {
    const posts = await getPosts();
    renderPosts(posts);
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("An error occurred. Please try again.");
  } finally {
    loader.hide();
  }
}

app();

// button
document
  .querySelector("#fetchButton")
  .addEventListener("click", performAsyncAction);

async function performAsyncAction() {
  loader.show();
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulates a 3-second delay
    console.log("Data fetched successfully!");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    loader.hide();
  }
}

// Toggle button Mobile
const menuBtn = document.querySelector(".toggle-btn");
const navlinks = document.querySelector(".menu-links");

menuBtn.addEventListener("click", () => {
  navlinks.classList.toggle("mobile-menu");
});
