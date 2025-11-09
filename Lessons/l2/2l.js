// 2.l
function toFarengheit(celsius) {
    return (celsius * 9 / 5) + 32
}

function toCelsius(fareng){
    return (fareng - 32) * 5 / 9
}

temp = 25
result = toFarengheit(temp)

// 2.m
temp = 86
result = toCelsius(temp)

// 2.n
temp = -5
result = toFarengheit(temp)
