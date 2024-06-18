import express from 'express';
// Importing the mongoose package
import mongoose from 'mongoose';


const app = express();
const port = 5000;
const url = 'mongodb+srv://sample1:LyvivoDB@lyvivo.5glflir.mongodb.net/';

const connectDB = async() => {
    try {
        const connect = await mongoose.connect( url, {
            useNewUrlParser: true,
        });
        console.log(`MongoDB Connected: ${connect.connection.host}`)
    }catch (error) {
        console.error('Error with connecting MongoDB' + error.massage);

    }
}
// calling MongoDB
connectDB();

app.use(express.json());

app.use(express.static('../Frontend/public"'))

app.get('/', (req,res)=> {
    res.send('backend working')
    
})

app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`)
})