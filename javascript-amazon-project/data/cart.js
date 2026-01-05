const cart = []
export default cart;

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
}