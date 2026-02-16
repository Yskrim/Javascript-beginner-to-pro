class Car {
    brand;
    model;

    displayInfo(){
        console.log(`Brand: ${this.brand}, Model: ${this.model}`);
    }

    constructor(details){
        this.brand = details.brand;
        this.model = details.model;
    }
}

const carsDetails = [
    { brand: 'Toyota', model: 'Corolla'},
    { brand: 'Tesla', model: 'Model 3'},
]

const Cars = carsDetails.map(obj => new Car(obj));

Cars.forEach(car => car.displayInfo());
