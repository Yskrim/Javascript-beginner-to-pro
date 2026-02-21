async function greeting(){
    let result;
    await new Promise((resolveOuter)=>{
        fetch("https://supersimplebackend.dev/greeting")
        .then((fetchResponse)=>{
            return new Promise((resolveInner)=>{
                fetchResponse.text()
                    .then((text)=>{
                        resolveInner(text);
                    });
            });
        })
        .then((text)=>{
            resolveOuter(text)
            result = text;
        })
    }) 
    return result;
}
/* 
    Here I tried to write the most complicated version of this function.
    
    1. I am creating a variable result === undefined.
    2. I am now awaiting for the fetch operation to return a raw response.
    3. Once the response is here, I am returning a new Promise that will process the raw response into the readable text.
    4. Once the text has been parsed, I am resolving the inner promise with the text as the returned value.
    5. After all of that, I am passing the text to the outer promise, where I am resolving it with the returning value, which is the text. This makes the text being returned twice by each promise.
    6. Then I am initializing the result variable with the value of text.
    7. Then I am returning the text for the third time, held by result variable.
    
    Outside the function
    8. Then once the function has completed, I am storing the returned text in a variable, then console.logging this variable.
 */

async function greeting1(){
    const response = await fetch(
        "https://supersimplebackend.dev/greeting"
    ).then((response)=>{
        return response.text();
    }).then((text)=>{
        return text
    });
    
    return response;
}
/* 
    Here is the same logic, but wrapped in the await of fetch,
    - fetch response is then being passed to another async function .text()
    - parsed text is being stored in the const response,
    - response is returned.
*/


async function greeting3() {
    const response = await fetch(
        "https://supersimplebackend.dev/greeting"
    ).then((fetchResponse)=>{
        return fetchResponse.text();
    });
    
    return response;
}

/* 
    here I took away the redundant .then() case, returning text as the outcome result of running response.text() straight away.
*/

async function greeting2(){
    return fetch(
        "https://supersimplebackend.dev/greeting"
    ).then((response)=>{
        return response.text();
    }).then((text)=>{
        return text
    });
}
/* 
    here is how the redundancy in the variable is mitigated, but keeps the redundant .then(text) part.
*/


async function greeting4() {
    return await fetch(
        "https://supersimplebackend.dev/greeting"
    ).then((response)=>{
        return response.text();
    });
}
/* 
    Here all the redundancies are abstracted away, now only the parsed fetchResponse is returned.
*/

async function greeting5() {
    const response = await fetch("https://supersimplebackend.dev/greeting");
    const text = await response.text();
    return text;
}
/*
    * Here is another approach to abstraction, the variables store the intermediate results of consequent await executions.
*/

async function greeting6() {
    const response = await fetch("https://supersimplebackend.dev/greeting");
    return await response.text();
}
/**
    This is by far the most syntactically reduced version of the initial function, can't step away from storing the fetchResponse result in a temporary variable that is then passed to the second await.
*/


let result;
greeting().then((text)=>{
    result = text;
    console.log(result)
})
/**
    As per the execution of the async code, this is the approach that allowed me to store the async results in a synchronous variable, yet not allowing me to run the console.log() with the text as usual. 
    
    I think this would be the dead end of the file, in the course, the page render functions usually turned out to be the resulting outcome of the script.

    I guess, if I was to render some elements, this would be the next .then() case 
 */
