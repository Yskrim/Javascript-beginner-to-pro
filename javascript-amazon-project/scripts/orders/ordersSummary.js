import renderHeader from "../homepage/homeHeader.js";
import { orders } from "../../data/orders.js"
import { products, loadProductsFetch } from "../../data/products.js";
import formatPrice from "../utils/priceFormat.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { addToCart } from "../../data/cart.js";


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
                    <div>${dayjs(order.orderTime).format("DD MMMM YYYY, HH:mm:ss")}</div>
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
                        ${dayjs(orderProduct.estimatedDeliveryTime).format("DD MMMM YYYY")}
                    </div>
                    <div class="product-quantity">
                        Quantity: ${orderProduct.quantity}
                    </div>
                    <button class="buy-again-button button-primary" data-product-id="${orderProduct.productId}">
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


function setupBuyAgainHandlers(){
    document.querySelectorAll('.buy-again-button')
    .forEach(btn=>btn.addEventListener('click', ()=>{
        const { productId } = btn.dataset;
        // console.log(productId)
        addToCart(productId);
        renderHeader();
        const btntext = btn.innerHTML;
        btn.innerHTML = 'Added to cart';
        setTimeout(()=>{
            btn.innerHTML = btntext;
        }, 500);
    }))
}

function setupTrackItemHandlers(){
    document.querySelectorAll('.track-package-button')
    .addEventListener('click', (e)=>{
        e.preventDefault();
        console.log(window.href)
    })
}

renderHeader();

async function loadPage(){
    try {
        await loadProductsFetch().then(()=>{
            generateOrdersHtml(orders);
            generateOrderProducts(orders);
            setupBuyAgainHandlers();
        })
    } catch (error) {
        console.log("Unexpected error. Please try again later.\nError code:", error)
    }
}

loadPage()

