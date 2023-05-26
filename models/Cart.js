import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number
    }
  ]
});

const Cart = mongoose.model('Cart', cartSchema, 'carts');

export default Cart;
