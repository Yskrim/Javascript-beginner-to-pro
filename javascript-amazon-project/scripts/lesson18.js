async function amazon(){
    return await fetch("https://amazon.com")
    .then((response)=>{
        return response.text();
    }).then((text)=>{
        console.log(text);
    });
}

amazon();
