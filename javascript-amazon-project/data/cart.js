export let cart = JSON.parse(localStorage.getItem('cart')) ?? []

export function addToCart(productId, quantity){
    let matchingItem;
    cart.forEach(cartItem=>{
        if(productId===cartItem.productId)
            matchingItem = cartItem; // this sets the pointer to the object inside the array to a local variable. Updating this variable updates the object cart[cartItem].
    });
    
    if(matchingItem){
        matchingItem.quantity += quantity;
    }else{
        cart.push({productId,quantity});
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

// 14e (done ahead of task)
export function fetchCartQuantity(){
    let qty = 0;
    cart.forEach(item=>qty+=item.quantity)
    return qty;
}

export function removeFromCart(productId){
    cart = cart.filter(item=>item.productId !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateQuantity(productId, qty){
    cart = cart.map(item => 
        item.productId === productId 
            ? { ...item, quantity: Number(qty) } 
            : item
    );
    localStorage.setItem('cart', JSON.stringify(cart));
}

