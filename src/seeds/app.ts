import mongoose from "mongoose";
import productsSeedData from "./products.ts";
const Product = require("../models/product.ts")


const URL = 'mongodb+srv://sample1:LyvivoDB@lyvivo.5glflir.mongodb.net/';

mongoose.connect(URL).then(() => {
    console.log('Connect to DB in seed data')
}).catch((error) => {
    console.error(error)
})

const seedDB = async() => {
    await Product.deleteMany({});
    for(let i =0; i<50; i++) {
    const product = new Product ({
        ProductName: productsSeedData[i].productName
    })}
}