async function amazon(){
    try {
        return await fetch("https://amazon.com")
        .then((response)=>{
            return response.text();
        }).then((text)=>{
            console.log(text);
        });
    } catch(error) {
        console.log(
`CORS error.Your request has been blocked by the backend.
Message:
${error}`
        );
    }
}

amazon();
