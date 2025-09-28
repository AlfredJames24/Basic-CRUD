import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';


dotenv.config(); //so we can use the .env file

const app = express(); //for routing
 
app.use(express.json()); //allows to use json data in body

app.post("/api/products", async (req,res) => {
    const product = req.body; //this is so we can send data

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({ success:false, message: "Please provide all fields"});
    }

    const newProduct = new Product (product)

    try {
      await newProduct.save(); //saves input of user to db
      res.status(201).json({ success:true, data: newProduct}); 
    } catch (error) {

        console.error("Error in creating product:", error.message);
        res.status(500).json({success:false, message: "Server Error"});
    }
});

app.delete("/api/products/:id", async (req,res) => {
    const {id} = req.params;
    
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json({success: true, message:"Product Deleted"});  
    } catch (error) {
        res.status(404).json({success: true, message:"Product Not Found"}); 
        
    }
})


app.listen(5000, () => { 
    connectDB();
    console.log('Server started at http://localhost:5000');
}); //starts the server and connects to MongoDB

