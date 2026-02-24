import { fetchCartQuantity } from "../../data/cart.js";
import { Product, products } from "../../data/products.js";
import renderProducts from "./homeMain.js";

function generateHeaderHTML(){
    const headerContainerHTML = `
        <div class="amazon-header">
            <div class="amazon-header-left-section">
                <a href="amazon.html" class="header-link">
                <img class="amazon-logo"
                    src="images/amazon-logo-white.png">
                <img class="amazon-mobile-logo"
                    src="images/amazon-mobile-logo-white.png">
                </a>
            </div>

            <div class="amazon-header-middle-section">
                <input class="search-bar js-search-bar" type="text" placeholder="Search" name="search">
                <button class="search-button" type="submit">
                    <img class="search-icon" src="images/icons/search-icon.png">
                </button>
            </div>

            <div class="amazon-header-right-section">
                <a class="orders-link header-link" href="orders.html">
                <span class="returns-text">Returns</span>
                <span class="orders-text">& Orders</span>
                </a>

                <a class="cart-link header-link" href="checkout.html">
                <img class="cart-icon" src="images/icons/cart-icon.png">
                <div class="cart-quantity">${fetchCartQuantity()>0 ? fetchCartQuantity() : ''}</div> 
                <div class="cart-text">Cart</div>
                </a>
            </div>
        </div>    
    `
    return headerContainerHTML
}

export default function renderHeader(){
    document.querySelector('.js-header').innerHTML = generateHeaderHTML();
    setupSearchHandler();

}

export function setupSearchHandler(){
    document.querySelector(".js-search-bar").addEventListener("input", (e)=>{
        e.preventDefault();
        const searchParam = document.querySelector(".js-search-bar").value;

        if(!searchParam)
            renderProducts(products);

        const newProducts = [];
        products.forEach(p=>{
            if(p.name.toLowerCase().includes(searchParam.toLowerCase()))
                newProducts.push(p);
        })
        renderProducts(newProducts);
    })
}
