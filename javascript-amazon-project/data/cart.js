
let cart;


const DefaultCart = [
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
];

loadFromStorage();

function loadFromStorage(){
    cart = JSON.parse(localStorage.getItem('cart'))

    if(!cart){
        cart = DefaultCart
    } 
}

function addToCart(productId, quantity = 1, deliveryOptionId = '1'){
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
    if(cart.find(item => item.productId === productId)){
        cart = cart.filter(item=>item.productId !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

function updateQuantityInStorage(productId, qty){
    cart = cart.map(item => 
        item.productId === productId 
            ? { ...item, quantity: Number(qty) } 
            : item
    );
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartQuantity() {
    /* 15j */
    const cartQuantity = fetchCartQuantity();
    document.querySelector('.js-return-to-home-link')
        .innerHTML = `${cartQuantity} items`;
}

function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateDeliveryOption(productId, deliveryOptionId){
    let item = cart.find(item => item.productId === productId);
    
    if (!item)
        return

    item.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}

export { cart, DefaultCart, addToCart, loadFromStorage, fetchCartQuantity, removeFromCart, updateCartQuantity, updateQuantityInStorage, saveToStorage, updateDeliveryOption }
