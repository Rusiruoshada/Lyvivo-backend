import express from 'express';
// Importing the mongoose package
import mongoose from 'mongoose';
import Product from './src/models/product.js'
import cors from 'cors'

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
app.use(cors({
    origin: 'http://localhost:3000',
    Credential: true,
}))

app.get('/', (req,res)=> {
    res.send('backend working')
})

app.get('/api/homepageProduct', async(req, res) => {
    const category = {show: 'Grocery', show1: 'Best Savings', show2: 'Electronics'}

    try{
        const grocery = await Product.find({category:category.show});
        if (!grocery) {
            return res.status(500).json({ message: 'Server unavailable now!' });
        }
        const bestSavings = await Product.find({category:category.show1});
        if (!bestSavings) {
            return res.status(500).json({ message: 'Server unavailable now!' });
        }
        const Electronics = await Product.find({category:category.show2});
        if (!Electronics) {
            return res.status(500).json({ message: 'Server unavailable now!' });
        }


        res.json(grocery);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error!' });
    }
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