import formatPrice from "../../scripts/utils/priceFormat.js";

const testCases = [
    { 
        price : 2095,
        expected : '20.95'
    },
    { 
        price : 0,
        expected : '0.00'
    },
    { 
        price : 2000.5,
        expected : '20.01'
    },
    { 
        price : 2000.4, //16a -- mathematically rounds up to the nearest cent
        expected : '20.00'
    },
    { 
        price : 'a',
        expected : 'NaN'
    },
    { 
        price : -1, // 16b - I decided to let this function accept negative values
        expected : '-0.01'
    },
    { 
        price : -100, //16b
        expected : '-1.00'
    },
]

testCases.forEach(testCase=>{
    const result = formatPrice(testCase.price)
    if (result === testCase.expected){
        console.log(`Price: ${testCase.price} - passed. \nResult: ${result}, Expected : ${testCase.expected}`)
    } else {
        console.log(`Price: ${testCase.price} - failed. \nResult: ${result}, Expected : ${testCase.expected}`)
    }
})