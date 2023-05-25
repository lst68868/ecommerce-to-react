import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: String, // Assuming the API provides a 'productId' field for each product
  quantity: Number
});

const Cart = mongoose.model('Cart', cartItemSchema);

export default Cart;
