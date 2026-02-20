// this is an integration test because the function we're testing consists of multiple of funcitons and libraries and do not count as a single unit
import { loadFromStorage, cart } from "../../data/cart.js";
import renderPage from '../../scripts/checkout.js';
import { loadProducts, loadProductsFetch } from "../../data/products.js";


describe('Test suite: renderOrderSummary', ()=>{
    const ids = [ 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '15b6fc6f-327a-4ec4-896f-486349e85a3d'];

    beforeAll((done)=>{
        loadProductsFetch().then(()=>{
            done();
        });
    });

    beforeEach(()=>{
        document.querySelector('.js-test-container').innerHTML = `
            <div class="js-checkout-header"></div>
            <div class="js-return-to-home-link"></div>
            <div class="js-payment-summary"></div>
            <div class="js-order-summary"></div>
        `;

        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([
                {
                    productId: ids[0],
                    quantity: 2,
                    deliveryOptionId: '1',
                },
                {
                    productId: ids[1],
                    quantity: 1,
                    deliveryOptionId: '2',
                },
            ]);
        });
        loadFromStorage();
        renderPage();
    });

    afterEach(()=>{
        document.querySelector('.js-test-container').innerHTML = ''; //16f
    })

    // how the page looks
    it('displays the cart', ()=>{
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2)
        expect(document.querySelector(`.js-product-quantity-${ids[0]}`).innerText).toContain('Quantity: 2')
        expect(document.querySelector(`.js-product-name-${ids[0]}`).innerText).toContain('Black and Gray Athletic Cotton Socks - 6 Pairs') // 16g
        expect(document.querySelector(`.js-product-quantity-${ids[1]}`).innerText).toContain('Quantity: 1')
        expect(document.querySelector(`.js-product-name-${ids[1]}`).innerText).toContain('Intermediate Size Basketball') //16g
        
        document.querySelectorAll('.payment-summary-money').forEach(item => expect(item.innerText[0]).toBe('$')) // 16h -- check every price item to begin with $
    });

    // how the page behaves
    it('Removes a product on <a>Delete</a>', ()=>{
        // before clicks
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
        
        expect(cart.length).toEqual(2)
        expect(cart[0].productId).toEqual(ids[0])
        expect(cart[0].quantity).toEqual(2)

        // first click
        document.querySelector(`.js-delete-link-${ids[0]}`).click();
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
        
        expect(cart.length).toEqual(1)
        expect(cart[0].productId).toEqual(ids[1])
        expect(cart[0].quantity).toEqual(1)
        
        expect(document.querySelector(`.js-delete-link-${ids[0]}`)).toEqual(null)
        expect(document.querySelector(`.js-delete-link-${ids[1]}`)).not.toEqual(null)
        
        // second click
        document.querySelector(`.js-delete-link-${ids[1]}`).click();

        expect(cart.length).toEqual(0)

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(0);
        expect(document.querySelector(`.js-delete-link-${ids[0]}`)).toEqual(null)
        expect(document.querySelector(`.js-delete-link-${ids[1]}`)).toEqual(null)
    });

    it('Updates the delivery option on radio button click', ()=>{     //16j
        //before click
        expect(cart[0].deliveryOptionId).toEqual('1');
        expect(document.querySelector(`.js-delivery-option-product-${ids[0]}-${1}`).querySelector(`.js-delivery-option-input-${ids[0]}-${1}`).checked).toBe(true)
        
        //click
        let deliveryOption = 3;
        document.querySelector(`.js-delivery-option-product-${ids[0]}-${deliveryOption}`).querySelector(`.js-delivery-option-input-${ids[0]}-${deliveryOption}`).click();

        // after click
        expect(cart[0].deliveryOptionId).toEqual('3');
        expect(document.querySelector(`.js-delivery-option-product-${ids[0]}-${deliveryOption}`).querySelector(`.js-delivery-option-input-${ids[0]}-${deliveryOption}`).checked).toBe(true);
        expect(document.querySelector(`.js-shipping-price`).innerText).toEqual("$14.98")
        expect(document.querySelector(`.js-total-price`).innerText).toEqual("$63.50")
        
    });


});