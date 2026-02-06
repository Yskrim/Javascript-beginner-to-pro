// this is a unit test because we're testing a signle unit that performs a single function.
import { cart, addToCart, loadFromStorage, removeFromCart } from "../../data/cart.js";

describe('Test suite:addToCart', ()=>{

    beforeEach(()=>{
        spyOn(localStorage, 'setItem');
    })
    
    it('adds an existing product to the cart', ()=>{
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 1,
                    deliveryOptionId: '1',
                }
            ]);
        });
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);        
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', 
            JSON.stringify(
            [{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,                                                                // updated quantity is 1 -> 2
                deliveryOptionId: '1',
            }]
        ));
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
    })

    it('adds a new product to the cart', ()=>{
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        });
        loadFromStorage();

        addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', 
            JSON.stringify(
            [{
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,        // new item quantity is 1 
                deliveryOptionId: '1',
            }]
        ));
        expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(cart[0].quantity).toEqual(1);
    });

    it('removes existing product from the cart', ()=>{
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([      // preset the cart to only have one productid in it quantity is irrelevant
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 2,
                    deliveryOptionId: '1',
                },
                {
                    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 1,
                    deliveryOptionId: '1',
                }])
            });
        loadFromStorage();

        removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');     // only requires a product id to work

        expect(cart.length).toEqual(1);     // one thing left in the cart
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);      // localstorage is updated once
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
            {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '1',
            }])
        );      // array with remaining item is what is passed to storage after execution of the function

        removeFromCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');     // expected to do nothing as the cart doesnt have this item in it
        expect(cart.length).toEqual(1);     // still one thing inside the cart
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);      // no new calls for storage update
    });
})