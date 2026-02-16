import products from "../../data/products.js";
import animateAddedToCart from "../utils/animateAddedToCart.js.js";
import { addToCart, fetchCartQuantity} from "../../data/cart.js"
import { cart } from "../../data/cart-class.js";



function generateProductsHTML(){
    let productsHtml= ''
    products.forEach(p=>{
        const html = `
            <div class="product-container ">
                <div class="product-image-container">
                    <img class="product-image"
                    src=${p.image}>
                </div>
    
                <div class="product-name limit-text-to-2-lines">
                    ${p.name}
                </div>
    
                <div class="product-rating-container">
                    <img class="product-rating-stars"
                    src="${p.getStarsUrl()}">
                    <div class="product-rating-count link-primary">
                    ${p.rating.count}
                    </div>
                </div>
    
                <div class="product-price">
                    ${p.getPrice()}
                </div>
    
                <div class="product-quantity-container">
                    <select class="product-quantity-select" id="${p.id}">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    </select>
                </div>

                ${p.extraInfoHTML()}

    
                <div class="product-spacer"></div>
    

                <div class='added-to-cart' id="added-to-cart-${p.id}">
                    <img src="images/icons/checkmark.png">
                    Added
                </div>
                <button class="add-to-cart-button button-primary" data-product-id="${p.id}">
                    Add to Cart
                </button>
                </div>
            </div>
        `
        productsHtml += html
    });

    document.querySelector('.js-products-grid').innerHTML = productsHtml;
}

function setupAddHandlers(){
    // solution to 13a -- 13f exercises in l13
    document.querySelectorAll('.add-to-cart-button')
        .forEach(button => {
        button.addEventListener('click', () => {
            const {productId} = button.dataset; // everything that starts with data- is a dataset
            const quantity = parseInt(document.getElementById(productId).value);
            
            //  13g - 13h also 14d
            cart.addToCart(productId,quantity);
            document.querySelector('.cart-quantity').innerHTML = fetchCartQuantity();
    
            // 13i
            document.getElementById(`added-to-cart-${productId}`).classList.add('added-to-cart-visible')
            animateAddedToCart(productId)
        });
    });
}

export default function renderProducts(){
    generateProductsHTML();
    setupAddHandlers();
}

renderProducts()