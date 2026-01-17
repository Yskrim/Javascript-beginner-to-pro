import {cart, fetchCartQuantity, removeFromCart, updateQuantity} from "../data/cart.js"

import products from "../data/products.js"
import formatPrice from "./utils/priceFormat.js";

function generateCartHTML(cart){
    let cartItemsHtml = '';
    if(cart.length){
        cart.forEach(cartItem=>{
            const item = products.find(product=>product.id===cartItem.productId);
            let elementHtml = `
            <div class="cart-item-container js-cart-item-container-${cartItem.productId}">
                <div class="delivery-date"> Delivery date: Tuesday, June 21</div>
                <div class="cart-item-details-grid">
                    <img class="product-image" src="${item.image}">
        
                    <div class="cart-item-details">
                        <div class="product-name">${item.name}</div>
                        <div class="product-price">$${formatPrice(item.priceCents)}</div>
                        <div class="product-quantity">
                            <span>
                                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                            </span> 
                            <span class="update-quantity-link link-primary" data-product-id='${cartItem.productId}'>Update</span>
                           
                            <input class="quantity-input" type="number" min="0" value="${cartItem.quantity}">
                            <span class="save-quantity-link link-primary" data-product-id='${cartItem.productId}'>Save</span>
                           
                            <span class="delete-quantity-link link-primary" data-product-id='${cartItem.productId}'>Delete</span>
                        </div>
                    </div>
        
                    <div class="delivery-options">
                        <div class="delivery-options-title">Choose a delivery option:</div>
                        <div class="delivery-option">
                            <input type="radio" checked class="delivery-option-input" name="delivery-option-${cartItem.productId}">
                            <div>
                                <div class="delivery-option-date">Tuesday, June 21</div>
                                <div class="delivery-option-price">FREE Shipping</div>
                            </div>
                        </div>
                        <div class="delivery-option">
                            <input type="radio" class="delivery-option-input" name="delivery-option-${cartItem.productId}">
                            <div>
                                <div class="delivery-option-date">Wednesday, June 15</div>
                                <div class="delivery-option-price">$4.99 - Shipping</div>
                            </div>
                        </div>
                            <div class="delivery-option">
                                <input type="radio" class="delivery-option-input" name="delivery-option-${cartItem.productId}">
                            <div>
                                <div class="delivery-option-date">Monday, June 13</div>
                                <div class="delivery-option-price">$9.99 - Shipping</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
            cartItemsHtml += elementHtml;
        });
        document.querySelector(".order-summary").innerHTML = cartItemsHtml
    } else {
        document.querySelector(".order-summary").innerHTML = `<p> Your cart is empty </p>`
    }
}

function updateReturnLink(){
    document.querySelector(".js-return-to-home-link").innerText = `${fetchCartQuantity()} items`;
}

function updatePaymentSummary(){
    document.querySelector(".js-payment-summary").innerText = `Items (${fetchCartQuantity()})`;
}

function setupDeleteHandlers(){
    const qtyDeleteBtns = document.querySelectorAll(".delete-quantity-link");
    qtyDeleteBtns.forEach(btn=>{
        btn.addEventListener('click', ()=>{
            const {productId} = btn.dataset;
            removeFromCart(productId);

            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.remove();
            renderCart()
        });
    });
}

function setupSaveHandlers(){
    const saveBtns = document.querySelectorAll(".save-quantity-link");
    saveBtns.forEach(btn => {
        btn.addEventListener('click', ()=>{

            const {productId} = btn.dataset;
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            const qtyInput = container.querySelector(".quantity-input");
            const qtyLabel = container.querySelector('.quantity-label');

            if(qtyInput.value > 0){
                updateQuantity(productId, Number(qtyInput.value));
                renderCart()
            };
            if(qtyInput.value <=0){
                removeFromCart(productId);
                container.remove();
            };

            container.classList.remove('is-editing-quantity');
            qtyLabel.classList.remove('is-hidden');
            btn.classList.remove('is-hidden');

            renderCart()
        });   
    });
}

function setupUpdateHandlers(){
    const qtyUpdateBtns = document.querySelectorAll(".update-quantity-link");
    qtyUpdateBtns.forEach(btn=>{
        btn.addEventListener('click', ()=>{
            const {productId} = btn.dataset;
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            const qtyLabel = container.querySelector('.quantity-label');

            container.classList.add('is-editing-quantity');
            qtyLabel.classList.add('is-hidden');
            btn.classList.add('is-hidden');
        }); 
    });
}

function renderCart(){
    generateCartHTML(cart);

    setupDeleteHandlers();
    setupUpdateHandlers();
    setupSaveHandlers();

    // 14a 14b NOTE - this uses the same function from cart.js to refresh the data on the dependent elements.
    updatePaymentSummary();
    updateReturnLink();
}

renderCart();
