// import { cart, removeFromCart, updateDeliveryOption, updateQuantityInStorage, updateCartQuantity } from '../../data/cart.js';
import { cart } from '../../data/cart-class.js';
import { getProduct } from '../../data/products.js';
import formatPrice from '../utils/priceFormat.js';
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import deliveryOptions, { getDeliveryOption } from '../../data/deliveryOptions.js';
import renderPage from '../checkout.js';
import { renderCheckoutHeader } from './chekoutHeader.js';

// =================
// html generator
// =================
function generateCartHTML(){
    let cartSummaryHTML = '';
    cart.cartItems.forEach((cartItem) => {
        const productId = cartItem.productId;
        const matchingProduct = getProduct(productId)

        const deliveryOptionId = cartItem.deliveryOptionId;
        const matchingDeliveryOption = getDeliveryOption(deliveryOptionId);

        const dateString = dayjs().add(matchingDeliveryOption.time, 'days').format("dddd, MMMM D");
        cartSummaryHTML += `
        <div class="cart-item-container
            js-cart-item-container
            js-cart-item-container-${matchingProduct.id}" id=${matchingProduct.id}
        >
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>
            <div class="cart-item-details-grid">
                <img class="product-image" src="${matchingProduct.image}">
                <div class="cart-item-details">
                    <div class="product-name js-product-name-${matchingProduct.id}">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                        ${matchingProduct.getPrice()}
                    </div>
                    <div class="product-quantity js-product-quantity-${matchingProduct.id}">
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
                        <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
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
        `;
    });
    
    document.querySelector('.js-order-summary')
        .innerHTML = cartSummaryHTML;
}
    
// =================
// delete handlers
// =================
function setupDeleteHandlers(){
    document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            cart.removeFromCart(productId);

            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            
            container.remove();
            renderPage()
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
            
            addEditingState(container, link, quantityLabel);
        });
    });
}

// =================
// save handlers
// =================

// funciton that handles 'save' operation
function saveQuantity(productId) {
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
    const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
    const newQuantity = Number(quantityInput.value);

    if (newQuantity < 0 || newQuantity >= 1000) {
        alert('Quantity must be at least 0 and less than 1000');
        removeEditingState(container, quantityInput, quantityLabel)
        return;
    }

    if (newQuantity === 0){
        cart.removeFromCart(productId);
        renderPage() // 15n
    }

    cart.updateQuantityInStorage(productId, newQuantity);
    renderPage() // 15n
}

function removeEditingState(container, quantityInput, quantityLabel){
    container.classList.remove('is-editing-quantity');
    container.querySelector('.js-update-link').classList.remove('is-hidden');
    quantityInput.classList.add('is-hidden');
    quantityLabel.classList.remove('is-hidden');
}

function addEditingState(container, link, quantityLabel){
    link.classList.add('is-hidden');
    quantityLabel.classList.add('is-hidden');
    container.classList.add('is-editing-quantity');
}

function setupSaveHandlers(){
    
    document.querySelectorAll('.js-save-link')
    .forEach((link) => {    
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            saveQuantity(productId);
        });
    });
    
    const qtyInputs = document.querySelectorAll(".quantity-input");
    qtyInputs.forEach(input => {
        input.addEventListener('keydown', (e) => {
            if(e.key === 'Enter') {
                const container = input.closest('.cart-item-container');
                const saveBtn = container.querySelector('.save-quantity-link');
                const productId = saveBtn.dataset.productId;
                
                saveQuantity(productId);
            }

            if(e.key === 'Escape'){
                const container = input.closest('.cart-item-container');
                const saveBtn = container.querySelector('.save-quantity-link');
                const productId = saveBtn.dataset.productId;
                const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
                const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);

                removeEditingState(container, quantityInput, quantityLabel);
            }
        });
    });
}

// 15l, 15m
function calculateDeliveryDate(opt){
    const today = dayjs();

    let calendarDays=0;
    let businessDays=0;

    while(businessDays <= opt.time){
        calendarDays++;
        const dayname = today.add(calendarDays, 'days').format('dddd')
        if(dayname === 'Saturday' || dayname === 'Sunday'){
            continue
        }
        businessDays++;
    }

    const deliveryDate = today.add(calendarDays, 'days');
    return deliveryDate;
}

function generateDeliveryOptionsHTML(matchingProduct, cartItem){
    let html = '';
    deliveryOptions.forEach(opt=>{
        const deliveryDate = calculateDeliveryDate(opt);
        const priceString = opt.priceCents === 0 ? "FREE" : `$${formatPrice(opt.priceCents)} -`
        const isChecked = opt.id === cartItem.deliveryOptionId;
        html += `
            <div class="delivery-option js-delivery-option js-delivery-option-product-${matchingProduct.id}-${opt.id}" data-delivery-option-id="${opt.id}" data-product-id="${matchingProduct.id}">
                <input type="radio" ${ isChecked ? 'checked' : '' }
                    class="delivery-option-input js-delivery-option-input-${matchingProduct.id}-${opt.id}"
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
// update cart on every change of option
// ============================================
function setupDeliveryOptionSelectors(){
    document.querySelectorAll('.js-delivery-option')
    .forEach(option => {
        option.addEventListener('click', ()=>{
            // update cart
            const {productId, deliveryOptionId} = option.dataset;
            cart.updateDeliveryOption(productId, deliveryOptionId);
            
            renderPage()
        });
    });
}

export function renderOrderSummary(){
    renderCheckoutHeader()
    generateCartHTML();
    cart.updateCartQuantity(); /* 15k */
    setupDeleteHandlers();
    setupUpdateHandlers();
    setupSaveHandlers();
    setupDeliveryOptionSelectors();
}

