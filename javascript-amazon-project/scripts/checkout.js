import { renderCheckoutHeader,} from "./checkout/chekoutHeader.js";
import { renderOrderSummary, } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import '../data/cart-oop.js'
import '../data/cart-class.js'

export function renderPage(){
    renderCheckoutHeader(); // 15j
    renderOrderSummary()
    renderPaymentSummary();
}

renderPage();