import { fetchAndCreateProducts } from "./products.js";
import { addToCart, updateCartCount, loadCheckoutPage } from "./checkout.js";
import { API_BASE_URL, fetchFromApi } from "./api.js";
import loader from "./loader.js";

async function app() {
  const errorMessage =
    "Sorry, we couldn't load the data. Please try again later.";
  loader.show();
  try {
    await fetchAndCreateProducts();
  } catch (error) {
    const container = document.querySelector("#productContainer");
    if (container) {
      if (error.message.includes("NetworkError")) {
        container.innerHTML = `<p class="error-message">Network issue detected. Please check your internet connection and try again.</p>`;
      } else {
        container.innerHTML = `<p class="error-message">${errorMessage}</p>`;
      }
    }
  } finally {
    loader.hide();
  }
}

app();

const menuBtn = document.querySelector(".toggle-btn");
const navLinks = document.querySelector(".menu-links");
const menuCart = document.querySelector(".menu-cart");

const page = document.body.getAttribute("data-page");
const hideOnPages = ["thank-you", "checkout"];

if (hideOnPages.includes(page)) {
  if (navLinks) navLinks.style.display = "none";
  if (menuCart) menuCart.style.display = "none";
} else if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("mobile-menu");
  });
} else {
  const container = document.querySelector("#menuContainer");
  if (container) {
    container.innerHTML = `<p class="error-message">We're sorry, something went wrong with the menu. Please try again later.</p>`;
  }
}
