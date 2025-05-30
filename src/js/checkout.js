import { fetchFromApi } from "./api.js";

const VAT_RATE = 0.25;
const SHIPPING_FEE = 125;

export function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

export async function saveCart(cart) {
  try {
    await localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    alert("There was an error saving your cart. Please try again later.");
  }
}

export async function addToCart(productId, selectedSize) {
  let cart = getCart();
  const data = await fetchFromApi("rainy-days");

  if (!data || !data.data) {
    alert("Error: Unable to fetch product data. Please try again later.");
    return;
  }

  let product = data.data.find((p) => p.id === productId);
  if (!product) {
    alert("Error: Product not found. Please check the product ID.");
    return;
  }

  let existingItem = cart.find(
    (item) => item.id === productId && item.size === selectedSize
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      size: selectedSize,
      title: product.title,
      image: product.image?.url || "fallback-image.jpg",
      price: parseFloat(
        product.onSale ? product.discountedPrice : product.price
      ),
      originalPrice: parseFloat(product.price),
      onSale: product.onSale,
      quantity: 1,
    });
  }

  await saveCart(cart);
  updateCartCount();
  updateTotalAmount();
}

export function updateCartCount() {
  const cart = getCart();
  const cartCountElement = document.getElementById("cart-count");
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  if (cartCountElement) {
    cartCountElement.style.display = cartCount === 0 ? "none" : "inline";
    cartCountElement.textContent = cartCount;
  }
}

export async function loadCheckoutPage() {
  const page = document.body.getAttribute("data-page");
  if (page !== "checkout") return;

  const checkoutContainer = document.getElementById("checkout-container");
  const checkoutDetails = document.getElementById("checkout-details");
  const cartItemTemplate = document.querySelector("#cart-item-template");

  if (!checkoutContainer || !checkoutDetails || !cartItemTemplate) {
    alert("Error: Unable to load checkout page. Please try again later.");
    return;
  }

  checkoutDetails.style.visibility = "visible";
  checkoutContainer.innerHTML = "";

  const cart = getCart();

  if (cart.length === 0) {
    const emptyMessage = document.createElement("div");
    emptyMessage.textContent = "Your cart is empty. Please add items to continue.";
    emptyMessage.className = "empty-cart-message";
    checkoutContainer.appendChild(emptyMessage);

    // Clear totals
    const subtotalElement = document.getElementById("subtotal");
    const vatElement = document.getElementById("vat-amount");
    const shippingElement = document.getElementById("shipping-amount");
    const totalElement = document.getElementById("total-amount");

    if (subtotalElement) subtotalElement.textContent = "0.00kr";
    if (vatElement) vatElement.textContent = "0.00kr";
    if (shippingElement) shippingElement.textContent = "0.00kr";
    if (totalElement) totalElement.textContent = "0.00kr";

    return;
  }

  cart.forEach((item) => {
    const template = cartItemTemplate.content.cloneNode(true);
    const cartItem = template.querySelector(".cart-item");

    cartItem.setAttribute("data-id", item.id);
    cartItem.setAttribute("data-size", item.size);

    cartItem.querySelector("img").src = item.image;
    cartItem.querySelector("img").alt = item.title;
    cartItem.querySelector(".product-title").textContent = item.title;
    cartItem.querySelector(
      ".product-color-size"
    ).textContent = `Size: ${item.size}`;
    cartItem.querySelector(".number-controls").textContent = item.quantity;

    let priceHTML = item.onSale
      ? `<span class="discounted-price">${item.price.toFixed(2)}kr</span> 
         <span class="original-price">${item.originalPrice.toFixed(2)}kr</span>`
      : `<span class="regular-price">${item.price.toFixed(2)}kr</span>`;

    cartItem.querySelector(".price-info").innerHTML = priceHTML;

    checkoutContainer.appendChild(cartItem);

    const decreaseBtn = cartItem.querySelector(".decrease-quantity");
    const increaseBtn = cartItem.querySelector(".increase-quantity");
    const removeBtn = cartItem.querySelector(".remove-item");

    if (decreaseBtn && increaseBtn && removeBtn) {
      decreaseBtn.addEventListener("click", () =>
        updateQuantity(item.id, item.size, -1)
      );
      increaseBtn.addEventListener("click", () =>
        updateQuantity(item.id, item.size, 1)
      );
      removeBtn.addEventListener("click", () => {
        deleteFromCart(item.id, item.size);
        loadCheckoutPage();
      });
    }
  });

  updateTotalAmount();
}

export function updateQuantity(productId, selectedSize, change) {
  let cart = getCart();
  let itemIndex = cart.findIndex(
    (item) => item.id === productId && item.size === selectedSize
  );

  if (itemIndex !== -1) {
    cart[itemIndex].quantity += change;
    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
    }
  }

  saveCart(cart);
  loadCheckoutPage();
  updateCartCount();
}

export function deleteFromCart(productId, selectedSize) {
  let cart = getCart();
  cart = cart.filter(
    (item) => !(item.id === productId && item.size === selectedSize)
  );

  saveCart(cart);
  loadCheckoutPage();
  updateCartCount();
}

export async function updateTotalAmount() {
  const page = document.body.getAttribute("data-page");
  if (page !== "checkout") return;

  const subtotalElement = document.getElementById("subtotal");
  const vatElement = document.getElementById("vat-amount");
  const shippingElement = document.getElementById("shipping-amount");
  const totalElement = document.getElementById("total-amount");

  if (!subtotalElement || !vatElement || !shippingElement || !totalElement) {
    alert("Error: Unable to update total amounts. Please try again later.");
    return;
  }

  const cart = getCart();
  let totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const vatAmount = totalAmount * VAT_RATE;

  let shippingAmount = 0;
  if (cart.length > 0) {
    shippingAmount = totalAmount > 1900 ? 0 : SHIPPING_FEE;
  }

  const finalTotalPrice = totalAmount + vatAmount + shippingAmount;

  subtotalElement.textContent = `${totalAmount.toFixed(2)}kr`;
  vatElement.textContent = `${vatAmount.toFixed(2)}kr`;
  shippingElement.textContent = `${shippingAmount.toFixed(2)}kr`;
  totalElement.textContent = `${finalTotalPrice.toFixed(2)}kr`;
}

updateCartCount();

const page = document.body.getAttribute("data-page");
if (page === "checkout") {
  loadCheckoutPage();
  updateTotalAmount();

  // Form validation section
  const form = document.getElementById("checkout-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      const name = form.querySelector("#fullName");
      const email = form.querySelector("#email");
      const address = form.querySelector("#streetAddress");
      const errorMessage = document.getElementById("form-error");
    
      let valid = true;
      let errors = [];
    
      if (!name || name.value.trim() === "") {
        valid = false;
        errors.push("Name cannot be empty.");
      }
    
      if (
        !email ||
        !/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email.value.trim())
      ) {
        valid = false;
        errors.push("Please enter a valid email address.");
      }
    
      if (!address || address.value.trim() === "") {
        valid = false;
        errors.push("Address cannot be empty.");
      }
    
      if (!valid) {
        e.preventDefault();
        if (errorMessage) {
          errorMessage.innerHTML = errors.join("<br>");
          errorMessage.style.display = "block";
        } else {
          alert(errors.join("\n"));
        }
      }
    });    
  }
}
