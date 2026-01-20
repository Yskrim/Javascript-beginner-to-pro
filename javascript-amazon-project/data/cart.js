
let cart = JSON.parse(localStorage.getItem('cart'))
if(!cart){
    cart = [
        {
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1',
        },
        {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 2,
            deliveryOptionId: '2',
        },
    ]
} 


function addToCart(productId, quantity, deliveryOptionId = '1'){
    let matchingItem;
    cart.forEach(cartItem=>{
        if(productId===cartItem.productId)
            matchingItem = cartItem; // this sets the pointer to the object inside the array to a local variable. Updating this variable updates the object cart[cartItem].
    });
    
    if(matchingItem){
        matchingItem.quantity += quantity;
    }else{
        cart.push({productId, quantity, deliveryOptionId});
    }
    saveToStorage();
}

// 14e (done ahead of task)
function fetchCartQuantity(){
    let qty = 0;
    cart.forEach(item=>qty+=item.quantity)
    return qty;
}

function removeFromCart(productId){
    cart = cart.filter(item=>item.productId !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateQuantity(productId, qty){
    cart = cart.map(item => 
        item.productId === productId 
            ? { ...item, quantity: Number(qty) } 
            : item
    );
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartQuantity() {
    const cartQuantity = fetchCartQuantity();
    document.querySelector('.js-return-to-home-link')
        .innerHTML = `${cartQuantity} items`;
}

function fetchTotalPrice(){
    let totalPrice = 0
    cart.forEach(item=>{
        totalPrice+=item.priceCents
    });
    return totalPrice;
}

function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateDeliveryOption(productId, deliveryOptionId){
    cart.find(item => item.productId === productId)
        .deliveryOptionId = deliveryOptionId;

    saveToStorage();
}

export { cart, addToCart, fetchCartQuantity, removeFromCart, updateCartQuantity, updateQuantity, saveToStorage, updateDeliveryOption }
