import { renderOrderSummary, } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from './chekoutHeader.js';

import { loadProducts } from "../data/products.js";

export default function renderPage(){
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
}

if (document.querySelector('.js-checkout-header')) { // makes sure the function is run in the right route and not break everything
    loadProducts(renderPage);
}