import { Product, Clothing, Appliance } from "../../data/products.js";

describe('Classes test suite', ()=>{

    const productDetails = [
        {
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
                stars: 4.5,
                count: 87
            },
            priceCents: 1090,
            keywords: [
                "socks",
                "sports",
                "apparel"
            ]
        },	
        {
            id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
            name: "Adults Plain Cotton T-Shirt - 2 Pack",
            rating: {
                stars: 4.5,
                count: 56
            },
            priceCents: 799,
            keywords: [
                "tshirts",
                "apparel",
                "mens"
            ],
            type: "clothing", // class discriminator property
            sizeChartLink: "images/clothing-size-chart.png"
        },
        {
            id: "54e0eccd-8f36-462b-b68a-8182611d9add",
            image: "images/products/black-2-slot-toaster.jpg",
            name: "2 Slot Toaster - Black",
            rating: {
                stars: 5,
                count: 2197
            },
            priceCents: 1899,
            keywords: [
                "toaster",
                "kitchen",
                "appliances"
            ]
    }];

    describe('Product test', ()=>{
        it('Class creates an instance of product', ()=>{
            const product = new Product(productDetails[0]);
            
            expect(product instanceof Product).toBe(true);
            expect(product.getPrice()).toEqual('$10.90');
            expect(product.getStarsUrl()).toEqual('images/ratings/rating-45.png');
            expect(product.extraInfoHTML()).toEqual('');
        });

        it('Product properties are correct',()=>{
            const product = new Product(productDetails[0]);

            expect(product.id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
            expect(product.image).toEqual('images/products/athletic-cotton-socks-6-pairs.jpg');
            expect(product.name).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
            expect(product.rating.stars).toEqual(4.5);
            expect(product.rating.count).toEqual(87);
            expect(product.priceCents).toEqual(1090);
            expect(product.keywords).toEqual(["socks","sports","apparel"]);
        });
    });

    describe('Clothing test',()=>{
        it('Class creates an instance of Clothing', ()=>{
            const tshirt = new Clothing(productDetails[1]);
    
            expect(tshirt instanceof Clothing).toBe(true);
            expect(tshirt.getPrice()).toEqual('$7.99');
            expect(tshirt.getStarsUrl()).toEqual("images/ratings/rating-45.png");
            expect(tshirt.sizeChartLink).toEqual("images/clothing-size-chart.png");
            expect(tshirt.extraInfoHTML()).toEqual('<a href="images/clothing-size-chart.png" target="_blank">Size chart</a>');
        });

        it('Product properties are correct',()=>{
            const tshirt = new Clothing(productDetails[1]);

            expect(tshirt.id).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
            expect(tshirt.image).toEqual('images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg');
            expect(tshirt.name).toEqual('Adults Plain Cotton T-Shirt - 2 Pack');
            expect(tshirt.rating.stars).toEqual(4.5);
            expect(tshirt.rating.count).toEqual(56);
            expect(tshirt.priceCents).toEqual(799);
            expect(tshirt.keywords).toEqual(["tshirts","apparel","mens"]);
        });
    });

    describe('Appliance test',()=>{
        it('Class creates an instance of Appliance', ()=>{
            const toaster = new Appliance(productDetails[2]);
    
            expect(toaster instanceof Appliance).toBe(true);
            expect(toaster.getPrice()).toEqual('$18.99');
            expect(toaster.getStarsUrl()).toEqual("images/ratings/rating-50.png");
        });
        
        it('Product properties are correct',()=>{
            const toaster = new Appliance(productDetails[2]);

            expect(toaster.id).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add');
            expect(toaster.image).toEqual('images/products/black-2-slot-toaster.jpg');
            expect(toaster.name).toEqual('2 Slot Toaster - Black');
            expect(toaster.rating.stars).toEqual(5);
            expect(toaster.rating.count).toEqual(2197);
            expect(toaster.priceCents).toEqual(1899);
            expect(toaster.keywords).toEqual(["toaster","kitchen","appliances"]);
            expect(toaster.extraInfoHTML()).toEqual('<a href="images/appliance-instructions.png" target="_blank">Instructions</a><a href="images/appliance-warranty.png" target="_blank">Warranty</a>');
        });
    });
});