import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.routes.js'


dotenv.config(); //so we can use the .env file

const app = express(); //for routing
 
app.use(express.json()); //allows to use json data in body

app.use("/api/products", productRoutes);

app.listen(5000, () => { 
    connectDB();
    console.log('Server started at http://localhost:5000');
}); //starts the server and connects to MongoDB

