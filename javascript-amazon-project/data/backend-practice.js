// XMLHttpRequest - built in class in JS

const xhr = new XMLHttpRequest(); // -- message for the backend == request

xhr.addEventListener('load', ()=>{
    console.log(xhr.response) 
    /* 
        this is an example of ASYNCHRONOUS code == it takes time for the response to travel across the internet and response to come back == xhr.response will be undefined at first
    */
});

xhr.open('GET', 'https://supersimplebackend.dev/'); 
xhr.send(); // -- sends the message across the internet to a computer with this domain name

/*
    XMLHttpRequest takes: 
        1)type of http message like [GET, POST, PUT, DELETE] == param1; 
        2)where to send the request -- URL(Uniform Resource Locator) == param2 

    were using https://supersimplebackend.dev/hello
        - PROTOCOL: "https://"
        - DOMAIN NAME: "supersimplebackend.dev"
        - URL PATH:  "/hello", 
            CAN BE:
                - "/" == for default path (main page) 
                - "/products/first/details" == multiple levels

    Message sent to the server is called: REQUEST
    Message received from the server is called: RESPONSE
    Request-Response Cycle == 1 request : 1 response
*/

/* 
    WHY setting up an eventListener before running the request? 
    -- Same as with button, we have to create a listener and then wait for an event:

    const button = document.querySelector('button');

    button.addEventListener("click", ()=>{
        alert("clicked");
    });
    
    button.click()
*/

/*
    STATUS CODES:
    - Starting with 4 or 5 (400, 404, 500) == failed
        - Starting with 4 == client problem
        - Starting with 5 == backend problem
    - Starting with 2 (200, 201, 204) == succeeded 
    
*/

/* 
    APIs (Application Programming Interface):
    
    The list of all the URL paths that are supported is called == BACKEND API 
*/

// Using a browser = Make GET request
// Browser interprets the response data in the expected format: ".jpg" = image; ".html" = webpage; ".txt" = text;