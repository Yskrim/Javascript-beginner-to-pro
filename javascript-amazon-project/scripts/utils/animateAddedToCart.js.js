export default function animateAddedToCart(productId){
    const addedToCartElement = document.getElementById(`added-to-cart-${productId}`);
    addedToCartElement.style.opacity = 1;
    
    // Clear any existing timeout/interval for this element
    if (addedToCartElement.timeoutId) {
        clearTimeout(addedToCartElement.timeoutId);
    }
    if (addedToCartElement.intervalId) {
        clearInterval(addedToCartElement.intervalId);
    }
    
    // After 1 second, start fading out
    addedToCartElement.timeoutId = setTimeout(() => {
        addedToCartElement.intervalId = setInterval(() => {
            const currentOpacity = parseFloat(addedToCartElement.style.opacity);
            if (currentOpacity <= 0) {
                clearInterval(addedToCartElement.intervalId);
                addedToCartElement.intervalId = null;
            } else {
                addedToCartElement.style.opacity = currentOpacity - 0.05;
            }
        }, 10); // Run every 10ms for smoother animation
    }, 500);
}
