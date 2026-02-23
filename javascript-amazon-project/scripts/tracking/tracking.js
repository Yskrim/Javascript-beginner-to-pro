import renderHeader from "../homepage/homeHeader.js";
import { products, loadProductsFetch } from "../../data/products.js";
import { orders } from "../../data/orders.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";






function renderTrackingPage(){
    const url = new URL(window.location.href);
    const orderId = url.searchParams.get("orderId");
    const productId = url.searchParams.get("productId");

    const product = products.find(pr=>pr.id === productId);
    const order = orders.find(or=>or.id===orderId);
    const orderProduct = order.products.find(op=>op.productId === product.id)

    console.log(product)
    console.log(order)
    console.log(orderProduct)


    document.querySelector('.js-main').innerHTML = `
        <div class="order-tracking">
            <a class="back-to-orders-link link-primary" href="orders.html">
                View all orders
            </a>

            <div class="delivery-date">
                Arriving on ${dayjs(orderProduct.estimatedDeliveryTime).format("dddd, MMMM D")}
            </div>

            <div class="product-info">
                ${product.name}
            </div>

            <div class="product-info">
                Quantity: ${orderProduct.quantity}
            </div>

            <img class="product-image" src="${product.image}">

            <div class="progress-labels-container">
                <div class="progress-label">
                    Preparing
                </div>
                <div class="progress-label current-status">
                    Shipped
                </div>
                <div class="progress-label">
                    Delivered
                </div>
            </div>

            <div class="progress-bar-container">
                <div class="progress-bar"></div>
            </div>
        </div>
    `
}

await loadProductsFetch().then(()=>{
    renderHeader();
    renderTrackingPage();
})