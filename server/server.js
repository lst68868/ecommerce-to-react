import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from "axios";
import Product from "/Users/leotulchin/Desktop/Coding_Projects/practice_projects/ecommerce-to-react/models/Product.js"
import Cart from "/Users/leotulchin/Desktop/Coding_Projects/practice_projects/ecommerce-to-react/models/Cart.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;  // Default to 3000 if no PORT is set in .env

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('Mongoose connection is open');
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error has occurred: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection is disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection is disconnected due to application termination');
    process.exit(0);
  });
});

//Only had to run once; populate mongo from API
app.get('/seed', async (req, res) => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    const products = response.data;

    for (const product of products) {
      await Product.create(product);
    }

    res.send('Database seeded successfully');
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

// Display a specific product by ID
app.get('/products/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findOne({ id: id });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a specific product by ID
app.put('/products/:id', async (req, res) => {
  const id = req.params.id;
  const updatedProductData = req.body;
  try {
    const updatedProduct = await Product.findOneAndUpdate({ id: id }, updatedProductData, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a specific product by ID
app.delete('/products/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedProduct = await Product.findOneAndDelete({ id: id });
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(deletedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a product to the cart
app.post('/cart', async (req, res) => {
  const { productId, quantity } = req.body;

  // Check if the product exists in the Product collection using the 'productId'
  const product = await Product.findOne({ id: productId });
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  // Check if a cart already exists
  const existingCart = await Cart.findOne();
  if (existingCart) {
    // If a cart exists, update the quantity of the existing cart item
    const existingCartItem = existingCart.items.find(item => item.productId === productId);
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      // If the product is not already in the cart, add a new cart item
      existingCart.items.push({ productId, quantity });
    }
    await existingCart.save();
    return res.json(existingCart);
  }

  // If no cart exists, create a new cart and add the item
  const cart = await Cart.create({ items: [{ productId, quantity }] });
  res.json(cart);
});

// View the cart
app.get('/cart', async (req, res) => {
  const cart = await Cart.findOne();
  if (!cart) {
    return res.status(404).json({ error: 'Cart not found' });
  }
  res.json(cart);
});

// Adjust the quantity of a product in the cart
app.put('/cart/:id', async (req, res) => {
  const { quantity } = req.body;

  const cart = await Cart.findOne();
  if (!cart) {
    return res.status(404).json({ error: 'Cart not found' });
  }

  const cartItem = cart.items.find(item => item._id.toString() === req.params.id);
  if (!cartItem) {
    return res.status(404).json({ error: 'Cart item not found' });
  }

  cartItem.quantity = quantity;
  await cart.save();

  res.json(cart);
});

// Delete a product from the cart
app.delete('/cart/:id', async (req, res) => {
  const cart = await Cart.findOne();
  if (!cart) {
    return res.status(404).json({ error: 'Cart not found' });
  }

  const cartItemIndex = cart.items.findIndex(item => item._id.toString() === req.params.id);
  if (cartItemIndex === -1) {
    return res.status(404).json({ error: 'Cart item not found' });
  }

  cart.items.splice(cartItemIndex, 1);
  await cart.save();

  res.json(cart);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
