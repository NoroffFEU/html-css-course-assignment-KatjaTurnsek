import { API_BASE_URL, fetchFromApi } from "./api.js";

export const products = [
  {
    id: "product-1",
    title: "Zyran Parka Jacket",
    titleSecondary: "Product details",
    description:
      "A very popular jacket with GORE-TEX ePE fabric, available in four colors.",
    descriptionSecondary:
      "The primary fabric, which is made of recycled polyester, is also PFC-free. Furthermore, zip vents make it simple to regulate your body temperature while free riding uphill. A great outer layer for the ideal adventure day.",
    gender: "Male",
    image: "assets/images/RainyDays_Jacket-red.png",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Red", "Blue", "Green", "Black"],
    images: {
      Red: "../assets/images/RainyDays_Jacket-red.png",
      Blue: "../assets/images/RainyDays_Jacket-blue.png",
      Green: "../assets/images/RainyDays_Jacket-green.png",
      Black: "../assets/images/RainyDays_Jacket-black.png",
    },
    price: 1149.99,
    discountedPrice: 999.99,
    onSale: true,
    tags: ["jacket", "winter", "warm"],
    baseColor: "Red",
    link: "html/zyran-parka-jacket.html?id=product-1",
  },
  {
    id: "product-2",
    title: "Ociel Rain Jacket",
    titleSecondary: "Product details",
    description: "A stylish and practical jacket for rainy days.",
    descriptionSecondary:
      "The Ociel Rain Jacket is a stylish and functional choice for rainy days. Made with water-resistant fabric, it keeps you dry and comfortable while offering adjustable features for the perfect fit.",
    gender: "Female",
    image: "assets/images/Ociel_Jacket-black.png",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Pink", "Green", "Yellow"],
    images: {
      Black: "../assets/images/Ociel_Jacket-black.png",
      Pink: "../assets/images/Ociel_Jacket-pink.png",
      Green: "../assets/images/Ociel_Jacket-green.png",
      Yellow: "../assets/images/Ociel_Jacket-yellow.png",
    },
    price: 1200.46,
    discountedPrice: null,
    onSale: false,
    tags: ["jacket", "rain"],
    favorite: false,
    baseColor: "Black",
    link: "html/ociel-rain-jacket.html?id=product-2",
  },
  {
    id: "product-3",
    title: "Donner Jacket",
    titleSecondary: "Product details",
    description: "Perfect for summer, lightweight and comfortable.",
    descriptionSecondary:
      "Lightweight and comfortable, the Donner Jacket is perfect for summer. Available in Red, Green, and Black, it offers a stylish, breathable option for warm days.",
    gender: "Female",
    image: "assets/images/Donner_Jacket-red.png",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Red", "Green", "Black"],
    images: {
      Red: "../assets/images/Donner_Jacket-red.png",
      Green: "../assets/images/Donner_Jacket-green.png",
      Black: "../assets/images/Donner_Jacket-black.png",
    },
    price: 949.52,
    discountedPrice: null,
    onSale: false,
    tags: ["jacket", "summer"],
    favorite: false,
    baseColor: "Red",
    link: "html/donner-jacket.html?id=product-3",
  },
  {
    id: "product-4",
    title: "Zaphyr Jacket",
    description: "A stylish and functional jacket designed for year-round wear",
    descriptionSecondary:
      "A must-have for any wardrobe, offering a versatile and timeless design suitable for all seasons. Whether you're braving the chill of winter or layering up for a cool summer evening, this unisex jacket provides comfort and durability.",
    gender: "Unisex",
    image: "assets/images/Zaphyr_Jacket.png",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black"],
    images: {
      Black: "../assets/images/Zaphyr_Jacket.png",
    },
    price: 1569.09,
    discountedPrice: null,
    onSale: false,
    tags: ["jacket", "winter"],
    favorite: false,
    baseColor: "Black",
    link: "html/zaphyr-jacket.html?id=product-4",
  },
  {
    id: "product-5",
    title: "Starling Jacket",
    description:
      "A lightweight and stylish jacket for men and women. Perfect for year-round use.",
    descriptionSecondary:
      "The Starling Jacket blends style and practicality, making it an ideal choice for any season. Designed for both men and women, this sleek black jacket offers a comfortable fit and versatile.",
    gender: "Unisex",
    image: "assets/images/Starling_Jacket.png",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black"],
    images: {
      Black: "../assets/images/Starling_Jacket.png",
    },
    price: 1149.09,
    discountedPrice: null,
    onSale: false,
    tags: ["jacket", "summer"],
    favorite: false,
    baseColor: "Black",
    link: "html/starling-jacket.html?id=product-5",
  },
  {
    id: "product-6",
    title: "Mellan Rain Jacket",
    description:
      "Stay dry with a waterproof, stylish grey jacket. Designed for men and women.",
    descriptionSecondary:
      "Designed for rainy days without compromising on fashion. Made from high-quality waterproof material, this modern grey jacket is perfect for unisex wear and offers optimal protection. Lightweight and breathable.",
    gender: "Unisex",
    image: "assets/images/Mellan_Jacket.png",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Grey"],
    images: {
      Grey: "../assets/images/Mellan_Jacket.png",
    },
    price: 1200.1,
    discountedPrice: null,
    onSale: false,
    tags: ["jacket", "rain"],
    favorite: false,
    baseColor: "Grey",
    link: "html/mellan-jacket.html?id=product-6",
  },
  {
    id: "product-7",
    title: "Sol wool Jacket",
    description: "A premium wool jacket, ideal for cold weather.",
    descriptionSecondary:
      "A premium wool jacket, crafted from high-quality materials, this jacket provides excellent insulation, making it ideal for winter, autumn, and early spring.",
    gender: "Male",
    image: "assets/images/SolWool_Jacket-green.png",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Green", "Black", "Grey", "Blue"],
    images: {
      Green: "../assets/images/SolWool_Jacket-green.png",
      Black: "../assets/images/SolWool_Jacket-black.png",
      Grey: "../assets/images/SolWool_Jacket-grey.png",
      Blue: "../assets/images/SolWool_Jacket-blue.png",
    },
    price: 949.25,
    discountedPrice: 820.25,
    onSale: true,
    tags: ["jacket", "winter", "autumn", "spring"],
    favorite: false,
    baseColor: "Green",
    link: "html/solwool-jacket.html?id=product-7",
  },
];

export function createProductCard({
  linkPath,
  imagePath,
  title,
  price,
  discountedPrice,
  onSale,
}) {
  const template = document.querySelector("#product-card-template");
  if (!template) return null;

  const productCard = template.content.cloneNode(true);

  const productLink = productCard.querySelector(".product-link");
  const productImage = productCard.querySelector(".product-image");
  const productTitle = productCard.querySelector(".product-title");
  const productPriceContainer = productCard.querySelector(".product-price");
  const saleBadge = productCard.querySelector(".sale-badge");

  productLink.href = linkPath;
  productImage.src = imagePath;
  productImage.alt = title;
  productTitle.textContent = title;

  productPriceContainer.innerHTML = "";
  if (onSale) {
    productPriceContainer.appendChild(createPriceSpan("old-price", price));
    productPriceContainer.appendChild(
      createPriceSpan("new-price", discountedPrice)
    );

    if (saleBadge) saleBadge.style.display = "block";
  } else {
    productPriceContainer.textContent = `${price}kr`;

    if (saleBadge) saleBadge.style.display = "none";
  }

  return productCard;
}

function createPriceSpan(className, price) {
  const span = document.createElement("span");
  span.classList.add(className);
  span.textContent = `${price}kr`;
  return span;
}

export function generateProductCardContent(product) {
  const isHomepage = window.location.pathname === "/index.html";

  return {
    linkPath: isHomepage ? `/${product.link}` : `../html/${product.link}`,
    imagePath: isHomepage ? product.image : `../${product.image}`,
    title: product.title,
    price: product.price,
    discountedPrice: product.discountedPrice,
    onSale: product.onSale,
  };
}


export async function renderPosts(filteredProducts = products) {
  const page = document.body.getAttribute("data-page");
  if (!["homepage", "product-list"].includes(page)) return;

  const productList = document.querySelector(`#${page} .row`);
  if (!productList) return alert("Product list container not found!");

  const productsToDisplay =
    page === "homepage" ? filteredProducts.slice(0, 4) : filteredProducts;
  productList.innerHTML = "";

  try {
    await Promise.all(
      productsToDisplay.map(async (product) => {
        const cardContent = generateProductCardContent(
          product,
          page === "homepage"
        );
        const productCard = createProductCard(cardContent);
        productCard && productList.appendChild(productCard);
      })
    );
  } catch {
    alert("An error occurred while rendering posts. Please try again.");
  }
}

export async function renderProductPage(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return alert("Product not found!");

  try {
    updateProductPageContent(product);
    handleProductGallery(product);
  } catch {
    alert(
      "An error occurred while rendering the product page. Please try again."
    );
  }
}

function updateProductPageContent(product) {
  document.querySelector(".product-title").textContent =
    product.title || "No Title Available";
  document.querySelector(".product-description").textContent =
    product.description || "No Description Available";

  const priceElement = document.querySelector(".product-price");
  priceElement.innerHTML = product.discountedPrice
    ? `<span class="old-price">${product.price}kr</span> <span class="new-price">${product.discountedPrice}kr</span>`
    : `${product.price}kr`;

  const productInfo = document.querySelector(".product-info");
  productInfo.innerHTML = `
    <h2>${product.titleSecondary || "Additional Info"}</h2>
    <p>${product.descriptionSecondary || "More details coming soon."}</p>
  `;

  updateSizesAndColors(product);
}

function updateSizesAndColors(product) {
  const sizesNav = document.querySelector(".sizesnav");
  sizesNav.innerHTML = product.sizes
    .map(
      (size, index) => `
    <input type="radio" id="size-${size.toLowerCase()}" name="sizes" value="${size}" ${
        index === 0 ? "checked" : ""
      }>
    <label for="size-${size.toLowerCase()}">${size}</label>
  `
    )
    .join("");

  document.getElementById("color-legend").textContent = "COLOR";
  document.getElementById("size-legend").textContent = "SIZE";

  const colorNav = document.querySelector(".colornav");
  colorNav.innerHTML = product.colors
    .map(
      (color, index) => `
    <label for="${color}">
      <input type="radio" value="${color}" name="colors" id="${color}" ${
        index === 0 ? "checked" : ""
      }>
      <span>${color}</span>
    </label>
  `
    )
    .join("");
}

function handleProductGallery(product) {
  const gallery = document.querySelector(".gallery-jacket");
  gallery.innerHTML = product.colors
    .map(
      (color, index) => `
    <input type="radio" name="select" id="img-tab-${index + 1}" ${
        index === 0 ? "checked" : ""
      }>
    <label for="img-tab-${index + 1}" style="background-image: url('${
        product.images[color]
      }')"></label>
    <img src="${
      product.images[color]
    }" alt="${color} color jacket" class="product-image" data-color="${color}">
  `
    )
    .join("");

  const colorInputs = document.querySelectorAll('input[name="colors"]');
  const galleryImages = document.querySelectorAll(".product-image");

  colorInputs.forEach((input) => {
    input.addEventListener("change", () => {
      const selectedColor = input.value;
      galleryImages.forEach(
        (image) =>
          (image.style.display =
            image.dataset.color === selectedColor ? "block" : "none")
      );
    });
  });
}

export async function filterPosts() {
  const filterValue = document
    .getElementById("category-filter")
    ?.value.toLowerCase();
  const filteredProducts = products.filter(
    (product) => !filterValue || product.gender.toLowerCase() === filterValue
  );
  await renderPosts(filteredProducts);
}

document.addEventListener("DOMContentLoaded", async () => {
  const page = document.body.getAttribute("data-page");

  if (page === "product-page") {
    const productId = new URLSearchParams(window.location.search).get("id");
    if (productId) await renderProductPage(productId);
  } else {
    await renderPosts();
    if (page === "product-list") renderFilterSection();
  }

  async function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCountElement = document.getElementById("cart-count");
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCountElement) {
      cartCountElement.textContent = cartCount;
      cartCountElement.classList.add("bump");
      setTimeout(() => cartCountElement.classList.remove("bump"), 300);
    }
  }

  async function updateTotalAmount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalAmount = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const totalAmountElement = document.getElementById("total-amount");
    if (totalAmountElement) totalAmountElement.textContent = `${totalAmount}kr`;
  }

  updateCartCount();
  updateTotalAmount();
});

function renderFilterSection() {
  const filterData = {
    title: "Filter By:",
    categories: [
      { value: "", text: "Category" },
      { value: "male", text: "Male" },
      { value: "female", text: "Female" },
      { value: "unisex", text: "Unisex" },
    ],
  };

  document.getElementById("filterTitle").textContent = filterData.title;

  const categorySelect = document.getElementById("category-filter");
  filterData.categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.value;
    option.textContent = category.text;
    categorySelect.appendChild(option);
  });

  categorySelect.addEventListener("change", filterPosts);
}
