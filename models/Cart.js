import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
 product: {type: Number, ref: 'Product', field: 'id'},
 quantity: Number,
});

const Cart = mongoose.model('Cart', cartItemSchema, 'carts');

export default Cart;
