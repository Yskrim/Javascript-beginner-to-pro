const xhr = new XMLHttpRequest();

xhr.addEventListener("load", ()=>{
    console.log(xhr.response)
});

xhr.addEventListener('error', ()=>{
    console.log("Unexpected error.\n", error);
});

xhr.open("GET", "https://supersimplebackend.dev/greeting");
xhr.send();