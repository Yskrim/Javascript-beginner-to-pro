// import { cart, fetchCartQuantity } from "../../data/cart.js";
import { cart } from "../../data/cart-class.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import formatPrice from "../utils/priceFormat.js";


export function renderPaymentSummary(){
    let productPriceCents = 0;
    let deliveryPriceCents = 0;
    
    cart.cartItems.forEach(item=>{
        const product = getProduct(item.productId);
        productPriceCents += product.priceCents * item.quantity

        const delOpt = getDeliveryOption(item.deliveryOptionId)
        deliveryPriceCents += delOpt.priceCents
    });
    
    const totalBeforeTax = productPriceCents + deliveryPriceCents;
    const tax = totalBeforeTax * 0.1;
    const totalAfterTax = totalBeforeTax + tax

    document.querySelector('.js-payment-summary').innerHTML = `
        <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row js-payment-summary">
            <div>Items (${cart.fetchCartQuantity() /* 15i */}):</div>
            <div class="payment-summary-money">$${formatPrice(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money js-shipping-price">$${formatPrice(deliveryPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatPrice(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatPrice(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money js-total-price">$${formatPrice(totalAfterTax)}</div>
          </div>

          <button class="place-order-button button-primary">Place your order</button>
        </div>
    `
}