import renderHeader from "./homepage/homeHeader.js";
import renderProducts from "./homepage/homeMain.js";
import { products, loadProducts } from "../data/products.js";

loadProducts(()=>{
    renderHeader();
    renderProducts(products);
});