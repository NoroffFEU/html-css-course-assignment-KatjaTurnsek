import { products } from "./products.js";

const VAT_RATE = 0.25;
const SHIPPING_FEE = 50;

export function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

export async function saveCart(cart) {
  try {
    await localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    alert("There was an error saving your cart. Please try again.");
    console.error("Error saving cart:", error);
  };
};

export async function addToCart(productId, selectedColor, selectedSize) {
  let cart = getCart();

  let product = products.find((p) => p.id === productId);
  if (!product) {
    alert("Product not found!");
    return;
  };

  let price = parseFloat(product.discountedPrice || product.price).toFixed(2);

  let existingItem = cart.find(
    (item) =>
      item.id === productId &&
      item.color === selectedColor &&
      item.size === selectedSize
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      color: selectedColor,
      size: selectedSize,
      title: product.title,
      image: product.images[selectedColor],
      price: price,
      quantity: 1,
    });
  },

  await saveCart(cart);
  updateCartCount();
  updateTotalAmount();
};

document.addEventListener("DOMContentLoaded", () => {
  updateCheckoutLabels();
  updateCartCount();
  updateTotalAmount();
  loadCheckoutPage();

  const page = document.body.getAttribute("data-page");
  if (page === "product-page") {
    const addToCartButton = document.getElementById("addToCartButton");

    if (addToCartButton) {
      addToCartButton.addEventListener("click", (event) => {
        event.preventDefault();

        const selectedColor = document.querySelector(
          'input[name="colors"]:checked'
        )?.value;
        const selectedSize = document.querySelector(
          'input[name="sizes"]:checked'
        )?.value;

        if (!selectedColor || !selectedSize) {
          alert("Please select both color and size!");
          return;
        };

        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get("id");

        if (!productId) {
          alert("Product ID is missing in the URL.");
          return;
        };

        addToCart(productId, selectedColor, selectedSize);

        addToCartButton.textContent = "Added to Cart";

        setTimeout(() => {
          addToCartButton.textContent = "Add to Cart";
        }, 3000);
      });
    };
  };
});

function updateCheckoutLabels() {
  const subtotalLabel = document.getElementById("subtotal-label");
  const shippingLabel = document.getElementById("shipping-label");
  const vatLabel = document.getElementById("vat-label");
  const totalLabel = document.getElementById("total-label");

  if (subtotalLabel) subtotalLabel.textContent = "Subtotal:";
  if (shippingLabel) shippingLabel.textContent = "Shipping:";
  if (vatLabel) vatLabel.textContent = "VAT:";
  if (totalLabel) totalLabel.textContent = "Total Amount:";
};

async function loadCheckoutPage() {
  const checkoutContainer = document.getElementById("checkout-container");
  const checkoutDetails = document.getElementById("checkout-details");

  if (!checkoutContainer || !checkoutDetails) return;

  let cart = getCart();

  if (!cart.length) {
    checkoutContainer.innerHTML = "<p>Your cart is empty.</p>";
    checkoutDetails.style.visibility = "hidden";
    return;
  };

  checkoutDetails.style.visibility = "visible";

  const template = document.getElementById("cart-item-template");
  checkoutContainer.innerHTML = "";

  cart.forEach((item) => {
    const product = products.find((p) => p.id === item.id);

    if (!product) {
      console.warn(`Product with ID ${item.id} not found`);
      return;
    };

    let price = parseFloat(product.discountedPrice || product.price);

    const cartItem = template.content.cloneNode(true);
    cartItem.querySelector(".item-details img").src =
      product.images[item.color];
    cartItem.querySelector(".product-title").textContent = product.title;
    cartItem.querySelector(
      ".product-color-size"
    ).textContent = `Color: ${item.color} | Size: ${item.size}`;
    cartItem.querySelector(".number-controls").textContent = item.quantity;
    cartItem.querySelector(".discounted-price").textContent = `${price.toFixed(
      2
    )}kr`;
    cartItem.querySelector(".regular-price").textContent = `${product.price}kr`;

    cartItem
      .querySelector(".decrease-quantity")
      .addEventListener("click", () =>
        updateQuantity(item.id, item.color, item.size, -1)
      );
    cartItem
      .querySelector(".increase-quantity")
      .addEventListener("click", () =>
        updateQuantity(item.id, item.color, item.size, 1)
      );
    cartItem.querySelector(".delete-controls").addEventListener("click", () => {
      deleteFromCart(item.id, item.color, item.size);
      loadCheckoutPage();
    });

    checkoutContainer.appendChild(cartItem);
  });

  updateTotalAmount();
};

export async function updateTotalAmount() {
  const cart = getCart();
  let totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const vatAmount = (totalAmount * VAT_RATE).toFixed(2);
  const shippingAmount = totalAmount > 500 ? 0 : SHIPPING_FEE;

  const finalTotalPrice = (
    parseFloat(totalAmount) +
    parseFloat(vatAmount) +
    shippingAmount
  ).toFixed(2);

  const subtotalElement = document.getElementById("subtotal");
  const totalAmountElement = document.getElementById("total-amount");
  const vatAmountElement = document.getElementById("vat-amount");
  const shippingAmountElement = document.getElementById("shipping-amount");

  if (subtotalElement)
    subtotalElement.textContent = `${totalAmount.toFixed(2)}kr`;
  if (vatAmountElement) vatAmountElement.textContent = `${vatAmount}kr`;
  if (shippingAmountElement)
    shippingAmountElement.textContent = `${shippingAmount}kr`;
  if (totalAmountElement)
    totalAmountElement.textContent = `${finalTotalPrice}kr`;
};

export function updateCartCount() {
  const cart = getCart();
  const cartCountElement = document.getElementById("cart-count");

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  if (cartCountElement) {
    cartCountElement.style.display = cartCount === 0 ? "none" : "inline";
    cartCountElement.textContent = cartCount;
    cartCountElement.classList.add("bump");
    setTimeout(() => cartCountElement.classList.remove("bump"), 300);
  };
};

export async function deleteFromCart(productId, selectedColor, selectedSize) {
  let cart = getCart();

  cart = cart.filter(
    (item) =>
      !(
        item.id === productId &&
        item.color === selectedColor &&
        item.size === selectedSize
      )
  );

  await saveCart(cart);
  updateCartCount();
  updateTotalAmount();
};

async function updateQuantity(productId, selectedColor, selectedSize, change) {
  let cart = getCart();

  let item = cart.find(
    (item) =>
      item.id === productId &&
      item.color === selectedColor &&
      item.size === selectedSize
  );

  if (item) {
    item.quantity = Math.max(item.quantity + change, 1);

    await saveCart(cart);
    updateCartCount();
    updateTotalAmount();

    loadCheckoutPage(); // Refreshes the cart

    const itemElement = document.querySelector(
      `.cart-item[data-id="${productId}"][data-color="${selectedColor}"][data-size="${selectedSize}"]`
    );
    if (itemElement) {
      itemElement.querySelector(".number-controls").textContent = item.quantity;
    };
  };
};
