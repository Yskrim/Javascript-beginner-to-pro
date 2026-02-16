class Car {
    brand;
    model;

    constructor(details){
        this.brand = details.brand;
        this.model = details.model;
    }
}

const carsDetails = [
    { brand: 'Toyota', model: 'Corolla'},
    { brand: 'Tesla', model: 'Model 3'},
]

const Cars = carsDetails.map(obj => new Car(obj))

console.log(Cars)
