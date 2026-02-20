import { renderOrderSummary, } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from './checkout/chekoutHeader.js';
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

export default function renderPage(){
    if (document.querySelector('.js-checkout-header')) {
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
    }
}

async function loadPage(){
    await loadProductsFetch();

    const value = await new Promise((resolve)=>{
        loadCart(()=>{
            resolve('value2');
        });
    })

    renderPage();
}

loadPage();

/*  ABOVE CODE IS THE SAME AS:

    function loadPage(){
        return new Promise((resolve)=>{
            console.log('load page')
            resolve();

        }).then(()=>{
            return loadProductsFetch();    

        }).then(()=>{
            return new Promise((resolve)=>{
                resolve('value2')    
            });
        });
    }
*/



/*  PROMISE.ALL() EXAMPLE

    Promise.all([
        loadProductsFetch(),

        new Promise((resolve)=>{
            loadCart(()=>{
                resolve('value2');
            });
        }),

    ]).then((values)=>{
        renderPage();
    });

*/



/*  LINKED PROMISES EXAMPLE

    new Promise((resolve)=>{
        loadProducts(()=>{
            resolve('value1');
        });

    }).then((value)=>{
        console.log(value);

        return new Promise((resolve)=>{
            loadCart(()=>{
                resolve();
            });
        });

    }).then(()=>{
        renderPage();
    });

*/




/*  LESSON 18.2

    PROMISE == built in class, takes a function as param and will run this function immediately
    RESOLVE == function that lets us control when to move to the next step, similar to done().

    PROMISE creates a separate thread of code running at the same time with the other thread. It allows JS to do multiple things at the same time.

    ---
    PROMISE EXAMPLE:
    ```JS
    new Promise((resolve)=>{ 
        console.log('start promise'); 
        loadProducts(()=>{
            console.log('finished loading');
            resolve(); 
        });
    }).then(()=>{
        console.log('next step');
    });
    ```

    WHY USING PROMISES INSTEAD OF CALLBACKS? -- callbacks create a lot of code nesting, when one function is being passed to another
    ** attach image from clipboard **
    multiple callbacks make a lot of nesting ,making the code less readable and maintainable. 

    PROMISE.ALL() -- feature that allows to create an array of promises that will then create their own threads and be run simultaneously.
    Just like with the regular promise, there is a .then(values) method, where values is the array of the values passed from the resolves of each promise. Good for returning the values and codes for the fetch operations.
*/

/*
    18.3 ASYNC AWAIT



*/