const request = fetch(
    "https://supersimplebackend.dev/greeting"
).then((response)=>{
    return response.text()
}).then((text)=>{
    console.log(text)
})
