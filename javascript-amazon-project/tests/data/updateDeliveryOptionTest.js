import { cart, addToCart, loadFromStorage, removeFromCart, updateDeliveryOption } from "../../data/cart.js";


describe('Test suite: UpdateDeliveryoption', ()=>{

    beforeEach(()=>{
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([      // preset the cart to only have one productid in it quantity is irrelevant
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 2,
                    deliveryOptionId: '1',
                }])
            });
        loadFromStorage();
    })

    it('Returns if item doesnt exist in the cart', ()=>{
        updateDeliveryOption('15b6fc6f-327a-4ec4-896f-486349e85a3d', '3');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });
    
    it('Updates delivery option on item that exists in the cart', ()=>{
        updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '3');
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '3', // updated value
            }])
        );  
    })
    
    it('Returns if deliveryOptionId passed is not valid', ()=>{
        updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '0');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
        expect(cart).toEqual([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1', 
        }])

        updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '4');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
        expect(cart).toEqual([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1', 
        }])
    });
})