import products from "../data/products.js";

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
                src="images/ratings/rating-${p.rating.stars * 10}.png">
                <div class="product-rating-count link-primary">
                ${p.rating.count}
                </div>
            </div>

            <div class="product-price">
                $${(p.priceCents / 100).toFixed(2)}
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

            <div class="product-spacer"></div>

            <div class="added-to-cart">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary">
                Add to Cart
            </button>
            </div>
        </div>
    `
    productsHtml += html
});

document.querySelector('.js-products-grid').innerHTML = productsHtml;

// solution to 13a -- 13f exercises in l13
// each button should add the quantity of the product to the cart, which now is console.logged : TO BE UPDATED.
const addButtons = document.querySelectorAll('.add-to-cart-button');
addButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.parentElement.querySelector('.product-quantity-select').id;
        const quantity = button.parentElement.querySelector('.product-quantity-select').value;
        console.log(productId, quantity);
    });
});