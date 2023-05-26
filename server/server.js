import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import axios from 'axios';
import dotenv from "dotenv"
import { fileURLToPath } from 'url';
import path from 'path';
import Product from '/Users/leotulchin/Desktop/Coding_Projects/practice_projects/ecommerce-to-react/models/Product.js';
import Cart from '/Users/leotulchin/Desktop/Coding_Projects/practice_projects/ecommerce-to-react/models/Cart.js';

const app = express();
dotenv.config()
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '..', 'client')));

mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('Mongoose connection is open');
});

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error has occurred: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection is disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection is disconnected due to application termination');
    process.exit(0);
  });
});

// Seed the database with products from the given API
app.get('/seed', async (req, res) => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    const products = response.data;

    await Product.deleteMany({});
    await Product.create(products);

    res.json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Display all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific product by ID
app.get('/products/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findOne({id: productId});
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get products by category
app.get('/products/category/:category', async (req, res) => {
  const category = req.params.category;

  try {
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a product to the cart
app.post('/cart', async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const cartItem = await Cart.create({ product, quantity });
    res.json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch the cart items
app.get('/cart', async (req, res) => {
  try {
    const cartItems = await Cart.find({}).populate('product');
    res.json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Remove a cart item
app.delete('/cart/:id', async (req, res) => {
  const itemId = req.params.id;

  try {
    const cartItem = await Cart.findByIdAndDelete(itemId);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    res.json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
