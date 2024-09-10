const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.models.js');
const { message } = require('prompt');
const app = express()

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Checking from node api check");
});

app.get('/api/products', async(req,res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

app.get('/api/product/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const products = await Product.findById(id);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

app.post('/api/products', async(req,res)=>{
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

app.put('/api/product/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);

        if(!product){
            return res.status(404).json({message:"Product not found"});
        }

        const updateProduct = await Product.findById(id);
        res.status(200).json(updateProduct);
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

mongoose.connect("mongodb+srv://jethikaviduruwan:u1VACa5wGD2hW54C@backenddb.aotmz.mongodb.net/NODE-API?retryWrites=true&w=majority&appName=BackEndDB")
.then(()=>{
    console.log("Connected to db");  
    app.listen(3000, ()=>{
        console.log('Run on port 3000');
    });
        
})
.catch(()=>{
    console.log("connection failed");
})