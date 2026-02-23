import renderHeader from "../homepage/homeHeader.js";
import { orders } from "../../data/orders.js"
import { products, loadProductsFetch } from "../../data/products.js";
import formatPrice from "../utils/priceFormat.js";

console.log(orders);


// body
function generateOrdersHtml(orders){
    const container = document.querySelector(".js-orders-grid")
    orders.forEach(order=>{
        container.innerHTML +=
        `<div class="order-container js-order-${order.id}">
            <div class="order-header">
            <div class="order-header-left-section">
                <div class="order-date">
                    <div class="order-header-label">Order Placed:</div>
                    <div>${order.orderTime}</div>
                </div>
                <div class="order-total">
                    <div class="order-header-label">Total:</div>
                    <div>${formatPrice(order.totalCostCents)}</div>
                </div>
            </div>
    
            <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>${order.id}</div>
            </div>
        </div>
        <div class="order-details-grid js-order-details-grid-${order.id}">
        </div>`
    })
}

function generateOrderProducts(orders){
    orders.forEach(order=>{
        let orderHtml = '';
        order.products.forEach(orderProduct=>{
            const cur = products.find(product=>product.id === orderProduct.productId);
            console.log(cur);
            orderHtml +=
            `
                <div class="product-image-container">
                    <img src="${cur.image}">
                </div>

                <div class="product-details">
                    <div class="product-name">
                        ${cur.name}
                    </div>
                    <div class="product-delivery-date">
                        ${orderProduct.estimatedDeliveryTime}
                    </div>
                    <div class="product-quantity">
                        ${orderProduct.quantity}
                    </div>
                    <button class="buy-again-button button-primary">
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                    </button>
                </div>

                <div class="product-actions">
                    <a href="tracking.html?orderId=${order.id}&productId=${orderProduct.productId}">
                        <button class="track-package-button button-secondary">
                            Track package
                        </button>
                    </a>
                </div>
            `
        });
        document.querySelector(`.js-order-details-grid-${order.id}`).innerHTML = orderHtml;
    });
}


renderHeader();

async function loadPage(){
    try {
        await loadProductsFetch().then(()=>{
            generateOrdersHtml(orders);
            generateOrderProducts(orders);
        })
    } catch (error) {
        console.log("Unexpected error. Please try again later.\nError code:", error)
    }
}

loadPage()

