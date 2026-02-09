import { renderOrderSummary, } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import '../data/cart-oop.js'
// import '../data/cart-class.js'

export default function renderPage(){
    renderOrderSummary()
    renderPaymentSummary();
}

if (document.querySelector('.js-checkout-header')) { // makes sure the function is run in the right route and not break everything
    renderPage();
}