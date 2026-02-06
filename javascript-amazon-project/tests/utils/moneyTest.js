import formatPrice from "../../scripts/utils/priceFormat.js";

describe('test suite: formatPrice', ()=>{
    it('converts cents to dollars', ()=>{
        expect(formatPrice(2095)).toEqual('20.95');
    });
    it('Supports zero', ()=>{
        expect(formatPrice(0)).toEqual('0.00');
    });
    it('Rounds to nearest cent', ()=>{
        expect(formatPrice(2000.5)).toEqual('20.01');
    });
    it('Supports negative integers', ()=>{
        expect(formatPrice(-100)).toEqual('-1.00');
    });
    it('Supports negative floats', ()=>{
        expect(formatPrice(-1)).toEqual('-0.01');
    });
    it('Rejects strings', ()=>{
        expect(formatPrice('abc')).toEqual('NaN');
    });
})

/*
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
}) */