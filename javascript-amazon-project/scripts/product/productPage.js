import renderHeader from "../homepage/homeHeader.js";
import { loadProductsFetch, getProduct } from "../../data/products.js";
import { addToCart, fetchCartQuantity } from "../../data/cart.js";

function renderProduct(product) {
  document.querySelector(".product-page-image").src = product.image;
  document.querySelector(".product-page-image").alt = product.name;
  document.querySelector(".product-page-title").textContent = product.name;
  document.querySelector(".product-page-stars").src = product.getStarsUrl();
  document.querySelector(".product-page-rating-count").textContent = product.rating.count;
  document.querySelector(".product-page-price").textContent = product.getPrice();
  const quantitySelect = document.querySelector(".product-page-quantity-select");
  quantitySelect.id = product.id;
  document.querySelector(".product-page-quantity label").setAttribute("for", product.id);
  document.querySelector(".product-page-add-to-cart").dataset.productId = product.id;
}

function setupAddToCartHandler() {
  const button = document.querySelector(".product-page-add-to-cart");
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    const quantity = parseInt(document.getElementById(productId).value);
    addToCart(productId, quantity);
    renderHeader()
  });
}

renderHeader();

await loadProductsFetch().then(() => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("productId");
  const product = productId ? getProduct(productId) : null;

  if (!product) {
    window.location = "amazon.html";
    return;
  }

  renderProduct(product);
  setupAddToCartHandler();
});