// this is a unit test because we're testing a signle unit that performs a single function.
import { cart, addToCart, loadFromStorage } from "../../data/cart.js";

describe('Test suite:addToCart', ()=>{
    it('adds an existing product to the cart', ()=>{
        spyOn(localStorage, 'setItem');
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
                [
                    {
                        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                        quantity: 2, // updated quantity is 1 -> 2
                        deliveryOptionId: '1',

                    }
                ]
            )
        );
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
    })

    it('adds a new product to the cart', ()=>{
        spyOn(localStorage, 'setItem');
        
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        });
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', 
            JSON.stringify(
                [
                    {
                        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                        quantity: 1, // new item quantity is 1 
                        deliveryOptionId: '1',

                    }
                ]
            )
        );
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
        
    });
})