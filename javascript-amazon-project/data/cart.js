import deliveryOptions from './deliveryOptions.js';

let cart;

loadFromStorage();

function loadFromStorage(){
    cart = JSON.parse(localStorage.getItem('cart'))

    if(!cart){
        cart = [];
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
    
    if (!item) return

    const validDeliveryOptions = deliveryOptions.map(option => option.id)
    if(!validDeliveryOptions.includes(deliveryOptionId)) return

    item.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}

export function loadCart(fun){
	const xhr = new XMLHttpRequest();

	xhr.addEventListener("load", ()=>{
        console.log(xhr.response);
		fun();
	});

	xhr.open('GET', 'https://supersimplebackend.dev/cart')
	xhr.send();
}

export { cart, addToCart, loadFromStorage, fetchCartQuantity, removeFromCart, updateCartQuantity, updateQuantityInStorage, saveToStorage, updateDeliveryOption }
