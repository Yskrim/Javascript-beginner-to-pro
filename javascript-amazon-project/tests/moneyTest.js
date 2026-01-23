import formatPrice from "../scripts/utils/priceFormat.js";

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
        price : 'a',
        expected : 'NaN'
    },
    { 
        price : -1,
        expected : '-0.01'
    },
    { 
        price : -100,
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