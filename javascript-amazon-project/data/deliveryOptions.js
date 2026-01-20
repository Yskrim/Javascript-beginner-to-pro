const deliveryOptions = [
    {
        id: '1',
        time: 7,
        priceCents: 0
    },
    {
        id: '2',
        time: 3,
        priceCents: 499,
    },
    {
        id: '3',
        time: 1,
        priceCents: 999,
    },
];

export function getDeliveryOption(deliveryOptionId){
    let matchingDeliveryOption;
    deliveryOptions.forEach(option=>{
        if(option.id === deliveryOptionId){
            matchingDeliveryOption = option;
        }
    });

    return matchingDeliveryOption || deliveryOptions[0];
}

export default deliveryOptions