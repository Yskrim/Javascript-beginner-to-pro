import renderProducts from "../scripts/homepage/homeMain.js";
import formatPrice from "../scripts/utils/priceFormat.js";

export function getProduct(productId){
  let matchingProduct;

  products.forEach(product =>{
      if(product.id === productId) {
          matchingProduct = product
      }
  });

  	return matchingProduct
}

export class Product { //converting an object into a class(enhanced version of obj)
	id;
	image;
	name;
	rating;
	priceCents;
	keywords;

	constructor(obj){
		this.id = obj.id
		this.image = obj.image
		this.name = obj.name
		this.rating = obj.rating
		this.priceCents = obj.priceCents
		this.keywords = obj.keywords
	}

	getStarsUrl() {
		return `images/ratings/rating-${this.rating.stars * 10}.png`
	}

	getPrice() {
		return `$${formatPrice(this.priceCents)}`
	}

	extraInfoHTML() { return '' }
}

export class Clothing extends Product {
	sizeChartLink;

	constructor(productDetails){ // by default parent constructor works if new one is not specified, making it basically the same class as parent
		super(productDetails); // calls parent constructor() method
		this.sizeChartLink = productDetails.sizeChartLink
	}

	extraInfoHTML() {  // method overriding == change the parent's method with the same name with new code to update it on the instance of the child Class
		super.extraInfoHTML();
		return `<a href="${this.sizeChartLink}" target="_blank">Size chart</a>`;
	}
}

export class Appliance extends Product{
	instructionsLink;
	warrantyLink;

	constructor(details){
		super(details);
		this.instructionsLink = details.instructionsLink ?? 'images/appliance-instructions.png';
		this.warrantyLink = details.warrantyLink ?? 'images/appliance-warranty.png';
	}

	extraInfoHTML(){
		return `<a href="${this.instructionsLink}" target="_blank">Instructions</a><a href="${this.warrantyLink}" target="_blank">Warranty</a>`
	}
}

export let products = [];

export function loadProducts(fun){
	const xhr = new XMLHttpRequest();

	xhr.addEventListener("load", ()=>{
		products = JSON.parse(xhr.response).map(obj => {
			if(obj.type === 'clothing') return new Clothing(obj);
			if(obj.keywords.includes('appliances')) return new Appliance(obj);
			return new Product(obj);
		})
		console.log('load products');
		fun();
	});

	xhr.open('GET', 'https://supersimplebackend.dev/products')
	xhr.send();
}