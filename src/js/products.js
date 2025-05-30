import { fetchFromApi } from "./api.js";
import { addToCart } from "./checkout.js";

const isHomepage =
  document.body.id === "homepage" ||
  document.body.getAttribute("data-page") === "homepage";

// Create reusable popup message
const globalCartMessage = document.createElement("span");
globalCartMessage.className = "cart-message";
globalCartMessage.textContent = "Added to cart!";
document.body.appendChild(globalCartMessage);

// Function to show popup
function showCartPopup() {
  globalCartMessage.classList.add("show");
  setTimeout(() => {
    globalCartMessage.classList.remove("show");
  }, 2000);
}

export async function fetchAndCreateProducts() {
  const errorMessage =
    "Sorry, we couldn't load the products. Please try again later.";

  try {
    const container = document.querySelector("#productContainer");
    if (!container) return;

    const data = await fetchFromApi("rainy-days");
    if (!data || !data.data) {
      container.innerHTML = `<p class="error-message">${errorMessage}</p>`;
      return;
    }

    let products = data.data;
    const displayedProducts = isHomepage ? products.slice(0, 4) : products;

    function renderProducts(productsToShow) {
      container.innerHTML = "";
      productsToShow.forEach((product) => {
        const card = document.createElement("div");
        card.className = "card";

        const image = document.createElement("img");
        image.className = "card-image";
        image.src = product.image?.url || "fallback-image.jpg";
        image.alt = product.image?.alt || "Product image";

        const content = document.createElement("div");
        content.className = "card-content";

        const title = document.createElement("h2");
        title.className = "card-title";
        title.textContent = product.title;

        const priceContainer = document.createElement("div");
        priceContainer.className = "card-price-container";

        if (product.onSale) {
          const salePrice = document.createElement("p");
          salePrice.className = "sale-price";
          salePrice.textContent = `${product.discountedPrice.toFixed(2)} kr`;

          const originalPrice = document.createElement("p");
          originalPrice.className = "original-price";
          originalPrice.textContent = `${product.price.toFixed(2)} kr`;

          const saleBadge = document.createElement("span");
          saleBadge.className = "sale-badge";
          saleBadge.textContent = "SALE";

          priceContainer.appendChild(originalPrice);
          priceContainer.appendChild(salePrice);
          content.appendChild(saleBadge);
        } else {
          const regularPrice = document.createElement("p");
          regularPrice.className = "regular-price";
          regularPrice.textContent = `${product.price.toFixed(2)} kr`;
          priceContainer.appendChild(regularPrice);
        }

        content.appendChild(title);
        content.appendChild(priceContainer);
        card.appendChild(image);
        card.appendChild(content);

        if (isHomepage) {
          const anchor = document.createElement("a");
          anchor.href = `./product/index.html?id=${product.id}`;
          anchor.appendChild(card);
          container.appendChild(anchor);
        } else {
          const description = document.createElement("p");
          description.className = "product-description";
          description.textContent = product.description;
          content.appendChild(description);

          if (product.sizes && product.sizes.length > 0) {
            const sizeSelect = document.createElement("select");
            sizeSelect.className = "size-dropdown";
            sizeSelect.id = `size-${product.id}`;

            product.sizes.forEach((size) => {
              const option = document.createElement("option");
              option.value = size;
              option.textContent = size;
              sizeSelect.appendChild(option);
            });

            content.appendChild(sizeSelect);
          }

          const buyButton = document.createElement("button");
          buyButton.className = "buy-now-button";
          buyButton.textContent = "Buy Now";
          buyButton.dataset.id = product.id;

          buyButton.addEventListener("click", (event) => {
            const productId = event.target.dataset.id;
            const selectedSize = document.getElementById(
              `size-${productId}`
            )?.value;
            addToCart(productId, selectedSize);
            showCartPopup();
          });

          content.appendChild(buyButton);
          container.appendChild(card);
        }
      });
    }

    renderProducts(displayedProducts);

    if (!isHomepage) {
      const filterSelect = document.querySelector("#genderFilter");
      if (filterSelect) {
        filterSelect.addEventListener("change", () => {
          const selectedGender = filterSelect.value.toLowerCase();
          const filteredProducts =
            selectedGender === "all"
              ? displayedProducts
              : displayedProducts.filter(
                  (product) => product.gender?.toLowerCase() === selectedGender
                );
          renderProducts(filteredProducts);
        });
      }
    }
  } catch (err) {
    const container = document.querySelector("#productContainer");
    if (container) {
      container.innerHTML = `<p class="error-message">${errorMessage}</p>`;
    }
  }
}
