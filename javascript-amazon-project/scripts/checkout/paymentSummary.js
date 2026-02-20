import { cart, fetchCartQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import formatPrice from "../utils/priceFormat.js";
import { addOrder } from "../../data/orders.js";


export function renderPaymentSummary(){
    let productPriceCents = 0;
    let deliveryPriceCents = 0;
    
    cart.forEach(item=>{
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
            	<div>Items (${fetchCartQuantity() /* 15i */}):</div>
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

          	<button class="place-order-button js-place-order-button button-primary">Place your order</button>
        </div>
    `

    document.querySelector('.js-place-order-button')
		.addEventListener('click', async ()=>{
			try{
				const responce = await fetch("https://supersimplebackend.dev/orders", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						cart: cart
					})
				});
	
				const order = await responce.json()
				// console.log(order)
				addOrder(order);
			} catch(error) {
				console.log("Unexpected error while trying to place the order. Try again later.\nError:", error);
			}

			window.location.href = "orders.html"
		});
}