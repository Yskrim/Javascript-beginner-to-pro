class Car {
    #brand;
    #model;
    speed;
    isTrunkOpen;
    
    constructor(details){
        this.#brand = details.brand;
        this.#model = details.model;
        this.speed = details.speed ?? 0;
        this.isTrunkOpen = details.isTrunkOpen ?? false;
    }

    displayInfo(){
        console.log(`Brand: ${this.#brand}, Model: ${this.#model}, Speed: ${this.speed} km/h, Trunk: ${this.isTrunkOpen ? 'OPEN' : 'CLOSED'}`);
    };

    go(){
        if(!this.isTrunkOpen){
            if(this.speed >= 0 && this.speed < 200){
                this.speed+=5;
            }
        }
    };
    brake(){
        if(this.speed >= 5 && this.speed <= 200)
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

class RaceCar extends Car{
    acceleration;

    constructor(details){
        super(details);
        this.acceleration = details.acceleration;
    }

    go(){
        if(this.speed >= 0 && this.speed < 300)
            this.speed+=this.acceleration;
    };
    brake(){
        if(this.speed >= 20 && this.speed <= 300 )
            this.speed-=this.acceleration;
    };

    openTrunk(){
        console.log("Race cars don't have a trunk");
    }
    closeTrunk(){
        console.log("Race cars don't have a trunk");
    }

}

const carsDetails = [
    { brand: 'Toyota', model: 'Corolla'},
    { brand: 'Tesla', model: 'Model 3'},
    { brand: 'McLaren', model: 'F1', acceleration: 20},
]

const Cars = carsDetails.map(obj => {
    if(obj.brand === 'McLaren'){
        return new RaceCar(obj);   
    }
    return new Car(obj);
});

//display cars
console.log("Displaying car info before accelerating")
Cars.forEach(car => car.displayInfo());
console.log('\n');


//open trunk
Cars.forEach(car => car.openTrunk());

//close trunk
Cars.forEach(car => car.closeTrunk());


//accelerate
console.log("Displaying car info after accelerating")
Cars.forEach(car => {
    for(let i=0; i < 40; i++){car.go()}
})
Cars.forEach(car => car.displayInfo());
console.log('\n');



//brake
console.log("Displaying car info before braking")
Cars.forEach(car => {
    for(let i=0; i < 40; i++){car.brake()}
})
Cars.forEach(car => car.displayInfo());
console.log('\n');