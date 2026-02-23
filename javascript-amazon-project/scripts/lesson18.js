async function postGreeting(){
    return await fetch("https://supersimplebackend.dev/greeting", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({ name: "Username"}),
    }).then((response)=>{
        return response.text();
    }).then((text)=>{
        console.log(text);
    });
}

postGreeting();
