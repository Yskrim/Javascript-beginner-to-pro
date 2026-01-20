// Optional: when importing a lot of values, you
// can put each value on a separate line to make
// the code easier to read.
import {
    cart,
    removeFromCart,
    fetchCartQuantity,
    saveToStorage,
    updateDeliveryOption,
    updateQuantity,
    updateCartQuantity
    } from '../data/cart.js';
import products from '../data/products.js';
import formatPrice from './utils/priceFormat.js';


import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import deliveryOptions from '../data/deliveryOptions.js';

const today = dayjs();

// console.log(today.add(7, "days"));
// console.log(today.format("dddd, MMMM D"));


// =================
// html generator
// =================
function generateCartHTML(){
    let cartSummaryHTML = '';
    cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        let matchingProduct;
        products.forEach((product) => {
            if (product.id === productId) {
                matchingProduct = product;
            }
        });
        
        const deliveryOptionId = cartItem.deliveryOptionId;
        // console.log(cartItem.deliveryOptionId)
        let matchingDeliveryOption;
        deliveryOptions.forEach(option=>{
            if(option.id === deliveryOptionId){
                matchingDeliveryOption = option;
            }
        });
        console.log(matchingDeliveryOption)
        const dateString = dayjs().add(matchingDeliveryOption.time, 'days').format("dddd, MMMM D");
        // const dateString = ''
        // console.log(date.add(matchingDeliveryOption.time, 'days'))
        cartSummaryHTML += `
        <div class="cart-item-container
            js-cart-item-container-${matchingProduct.id}" id=${matchingProduct.id}>
            
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>
    
            <div class="cart-item-details-grid">
            <img class="product-image"
                src="${matchingProduct.image}">
            <div class="cart-item-details">
                <div class="product-name">
                ${matchingProduct.name}
                </div>
                <div class="product-price">
                $${formatPrice(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link"
                    data-product-id="${matchingProduct.id}">
                    Update
                </span>
                <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                <span class="save-quantity-link link-primary js-save-link"
                    data-product-id="${matchingProduct.id}">
                    Save
                </span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                </span>
                </div>
            </div>
            <div class="delivery-options">
                <div class="delivery-options-title">
                Choose a delivery option:
                </div>
                    ${generateDeliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
            </div>
            </div>
        </div>
        `;
    });
    
    document.querySelector('.js-order-summary')
        .innerHTML = cartSummaryHTML;
}

updateCartQuantity();
    
// =================
// delete handlers
// =================
function setupDeleteHandlers(){
    document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            
            const productId = link.dataset.productId;
            removeFromCart(productId);
            const container = document.querySelector(
            `.js-cart-item-container-${productId}`
            );
            container.remove();
            updateCartQuantity();
        });
    });
}

// =================
// update handlers
// =================
function setupUpdateHandlers(){
    document.querySelectorAll('.js-update-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            const quantityInput = container.querySelector(`.quantity-input`);
            const quantityLabel = container.querySelector(`.quantity-label`);
    
            quantityInput.type = 'number'
            quantityInput.value = Number(quantityLabel.innerHTML);
            
            link.classList.add('is-hidden');
            quantityLabel.classList.add('is-hidden');
            container.classList.add('is-editing-quantity');
        });
    });
}

// =================
// save handlers
// =================

// funciton that handles 'save' operation
function saveQuantity(productId) {
    const container = document.querySelector(
        `.js-cart-item-container-${productId}`
    );
    container.classList.remove('is-editing-quantity');

    const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
    const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
    const newQuantity = Number(quantityInput.value);

    if (newQuantity < 0 || newQuantity >= 1000) {
        alert('Quantity must be at least 0 and less than 1000');
        
        container.classList.remove('is-editing-quantity');
        container.querySelector('.js-update-link').classList.remove('is-hidden');
        quantityInput.classList.add('is-hidden');
        quantityLabel.classList.remove('is-hidden');
        return;
    }

    if (newQuantity === 0){
        removeFromCart(productId);
        container.remove();

        updateCartQuantity();
    }

    updateQuantity(productId, newQuantity);
    container.classList.remove('is-editing-quantity');
    container.querySelector('.js-update-link').classList.remove('is-hidden');
    quantityInput.classList.add('is-hidden');
    quantityLabel.classList.remove('is-hidden');

    quantityLabel.innerHTML = newQuantity;
    updateCartQuantity();
}

// assigning saveQuantity() to every link
function setupSaveHandlers(){
    document.querySelectorAll('.js-save-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            saveQuantity(productId);
        });
    });

    // call saveQuantity() on enter
    const qtyInputs = document.querySelectorAll(".quantity-input");
    qtyInputs.forEach(input => {
        input.addEventListener('keydown', (e) => {
            if(e.key === 'Enter') {
                const container = input.closest('.cart-item-container');
                const saveBtn = container.querySelector('.save-quantity-link');
                if(saveBtn) {
                    const productId = saveBtn.dataset.productId;
                    saveQuantity(productId);
                }
            }
        });
    });
}


// const summaryContainer = document.querySelector('js-order-summary')
// console.log(summaryContainer)

function generateDeliveryOptionsHTML(matchingProduct, cartItem){
    let html = '';
    const today = dayjs();
    deliveryOptions.forEach(opt=>{
        const deliveryDate = today.add(opt.time, 'days')
        const priceString = opt.priceCents === 0 ? "FREE" : `$${formatPrice(opt.priceCents)} -`

        const isChecked = opt.id === cartItem.deliveryOptionId;

        html += `
            <div class="delivery-option js-delivery-option" data-delivery-option-id="${opt.id}" data-product-id="${matchingProduct.id}">
                <input type="radio" ${ isChecked ? 'checked' : '' }
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                <div>
                    <div class="delivery-option-date">
                        ${deliveryDate.format("dddd, MMMM D")}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} Shipping
                    </div>
                </div>
            </div>
        `
    });
    return html;
}


// ============================================
// change elements on delivery option selection
// update cart on every change of option
// ============================================
function setupDeliveryOptionSelectors(){
    document.querySelectorAll('.js-delivery-option')
    .forEach(option => {
        option.addEventListener('click', ()=>{
    
            // update UI

            // const optionDate = e.target.parentElement.querySelector('.delivery-option-date').innerText;
            // const container = option.closest('.cart-item-container');
            // container.querySelector('.delivery-date').innerHTML = 'Delivery date: ' + optionDate;
    
            // update cart
            const {productId, deliveryOptionId} = option.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
            renderCart()
        });
    });
}

function renderCart(){
    generateCartHTML();
    setupDeleteHandlers();
    setupUpdateHandlers();
    setupSaveHandlers();
    setupDeliveryOptionSelectors();
}

renderCart()