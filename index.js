import express from 'express';
// Importing the mongoose package
import mongoose from 'mongoose';
import Product from './src/models/product.js'

const app = express();
const port = 5000;
const URL = 'mongodb+srv://sample1:LyvivoDB@lyvivo.5glflir.mongodb.net/';

const connectDB = async() => {
    try {
        const connect = await mongoose.connect( URL);
        console.log(`MongoDB Connected: ${connect.connection.host}`)
    }catch (error) {
        console.error('Error with connecting MongoDB' + error );

    }
}
// calling MongoDB
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static('../Frontend/public"'))

app.get('/', (req,res)=> {
    res.send('backend working')
})

app.get('/api/allProduct',  async(req,res) => {
    try{
        const allProducts = await Product.find();
        res.json(allProducts)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal Sever Error'})
    }
})

app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`)
})