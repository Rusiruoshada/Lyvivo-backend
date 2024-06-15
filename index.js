import express from 'express';


const app = express();
const port = 5000;


app.get('/', (req,res)=> {
    res.send('backend working')
})

app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`)
})