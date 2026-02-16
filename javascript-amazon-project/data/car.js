class Car {
    brand;
    model;
    speed;
    isTrunkOpen;
    
    constructor(details){
        this.brand = details.brand;
        this.model = details.model;
        this.speed = details.speed ?? 0;
        this.isTrunkOpen = details.isTrunkOpen ?? false;
    }

    displayInfo(){
        console.log(`Brand: ${this.brand}, Model: ${this.model}, Speed: ${this.speed} km/h, Trunk: ${this.isTrunkOpen ? 'OPEN' : 'CLOSED'}`);
    };

    go(){
        if(!this.isTrunkOpen){
            if(this.speed >= 0 && this.speed < 200){
                this.speed+=5;
            }
        }
    };
    brake(){
        if(this.speed >= 0 && this.speed < 200)
            this.speed-=5;
    };

    openTrunk(){
        if(!this.isTrunkOpen)
            this.isTrunkOpen = true;
    }
    closeTrunk(){
        if(this.isTrunkOpen){
            this.isTrunkOpen = false;
        }
    }
}

const carsDetails = [
    { brand: 'Toyota', model: 'Corolla'},
    { brand: 'Tesla', model: 'Model 3'},
]

const Cars = carsDetails.map(obj => new Car(obj));


Cars.forEach(car => car.displayInfo());
console.log('\n')
Cars[0].openTrunk()

Cars.forEach(car => {
    for(let i=0; i < 10; i++){car.go()}
})
Cars.forEach(car => car.displayInfo())
console.log('\n')

Cars.forEach(car => {
    for(let i=0; i < 10; i++){car.brake()}
})
Cars[0].closeTrunk()
Cars.forEach(car => car.displayInfo())
console.log('\n')