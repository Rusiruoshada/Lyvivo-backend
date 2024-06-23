import mongoose from "mongoose";
import productsSeedData from "./products.js";
const Product = require("../models/product.js")

mongoose.set('strictQuery',false)
const URL = 'mongodb+srv://sample1:LyvivoDB@lyvivo.5glflir.mongodb.net/';

mongoose.connect(URL).then(() => {
    console.log('Connect to DB in seed data')
}).catch((error) => {
    console.error(error)
})

const seedDB = async() => {
    await Product.deleteMany({});
    for(let i =0; i<50; i++) {
        const product = new ProductSchema ({
            productName: productsSeedData[i].productName,
            category: productsSeedData[i].category,
            regularPrice: productsSeedData[i].regularPrice,
            discountPrice: productsSeedData[i].discountPrice,
            description: productsSeedData[i].description,
            weight: productsSeedData[i].weight,
            imageUrl: productsSeedData[i].image
        })
        await product.save()
    }
}

seedDB().then(()=>{
    mongoose.connection.close()
})