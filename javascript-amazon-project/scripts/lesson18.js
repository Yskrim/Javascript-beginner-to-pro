async function pg(){
    try {
        return await fetch("https://supersimplebackend.dev/greeting", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response)=>{
            if(response.status >= 400){
                throw response;
            }
            return response.text();
        }).then((text)=>{
            console.log(text);
        });
    } catch(error) {
        if(error.status === 400){
            return await error.json()
            .then((json)=>{
                console.log(json.errorMessage);
            })
        }
        console.log("Network error. Please try again later.")
    }
}

pg();
