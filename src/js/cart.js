const cart = JSON.parse(localStorage.getItem("cart")) || [];

export function addToCart(item) {
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

export function getCart() {
  return cart;
}

export function updateCartCount() {
  document.getElementById("cart-count").textContent = cart.length;
}
