import express from 'express';
// Importing the mongoose package
import mongoose from 'mongoose';
import Product from './src/models/product.js';
import cors from 'cors';
import nodemailer from 'nodemailer'
import bodyParser from 'body-parser'
import dotenv from 'dotenv';

dotenv.config()
const app = express();
const router = express.Router();
const port = process.env.PORT || 5000;
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
app.use(bodyParser.json());

app.get('/', (req,res)=> {
    res.send('backend working')
})

router.get('/api/homepageProduct', async(req, res) => {
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

router.get('/api/products/:id', async(req,res)=> {
    const productId = req.params.id;
    
    try{
        const productItem = await Product.findById(productId);

        if(!productItem){
            return res.status(404).json({ message: 'Item not found' })
        };
        res.status(200).json(productItem);
    }catch (error) {
        res.status(500).json({message: 'Server Error' })
    }
})

router.get('/api/allProduct',  async(req,res) => {
    try{
        const allProducts = await Product.find();
        res.json(allProducts)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal Sever Error'})
    }
})

router.post('/api/send-email', async (req, res) => {
    const { category, 'First Name': firstName, 'Last Name': lastName, Address, 'Contact Number': contactNumber, email, Message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 5000,
        host: '',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        }
    });

    const mailOptions = {
        from:email,
        to: process.env.GMAIL_USER ,
        subject: `New ${category} from ${firstName} ${lastName}`,
        text: `
            Category: ${category}
            First Name: ${firstName}
            Last Name: ${lastName}
            Address: ${Address}
            Contact Number: ${contactNumber}
            Email: ${email}
            Message: ${Message}
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email', error });
    }
})

app.use('/', router)

app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`)
})