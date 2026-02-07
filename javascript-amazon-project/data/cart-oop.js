import deliveryOptions from './deliveryOptions.js';

const DefaultCartItems = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1',
},{
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 2,
    deliveryOptionId: '2',
}];

function Cart(localStorageKey){
    const cart = {
        cartItems :  undefined,
    
        loadFromStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
            
            if(!this.cartItems)
                this.cartItems = DefaultCartItems;
        },
        
        saveToStorage(){
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },
    
        addToCart(productId, quantity = 1, deliveryOptionId = '1'){
            let matchingItem = this.cartItems.find(item => item.productId===productId);
            
            if(matchingItem)
                matchingItem.quantity += quantity;
            else
                this.cartItems.push({productId, quantity, deliveryOptionId});
            
            this.saveToStorage();
        },
    
        fetchCartQuantity(){
            let qty = 0;
            this.cartItems.forEach(item=>qty+=item.quantity)
            return qty;
        },
    
        removeFromCart(productId){
            if(this.cartItems.find(item => item.productId === productId)){
                this.cartItems = this.cartItems.filter(item=>item.productId !== productId);
                localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
            }
        },
        
        updateQuantityInStorage(productId, qty){
            this.cartItems = this.cartItems.map(item => 
                item.productId === productId 
                    ? { ...item, quantity: Number(qty) } 
                    : item
            );
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },
        
        updateCartQuantity() {
            const cartQuantity = fetchCartQuantity();
            document.querySelector('.js-return-to-home-link')
                .innerHTML = `${cartQuantity} items`;
        },
        
        updateDeliveryOption(productId, deliveryOptionId){
            let item = this.cartItems.find(item => item.productId === productId);
            
            if (!item) 
                return
        
            const validDeliveryOptions = deliveryOptions.map(option => option.id)
            if(!validDeliveryOptions.includes(deliveryOptionId)) 
                return
        
            item.deliveryOptionId = deliveryOptionId;
            this.saveToStorage();
        },
    
    };

    return cart;
}

const cart = Cart('cart-oop')
const businessCart = Cart('buiness-cart-oop')

cart.loadFromStorage()
businessCart.loadFromStorage()

console.log(cart)
console.log(businessCart)