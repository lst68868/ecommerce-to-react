import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
 id: Number,
 title: String,
 price: Number,
 description: String,
 category: String,
 image: String
});

productSchema.virtual('carts', {
  ref: 'Cart',
  localField: 'id',
  foreignField: 'product',
  justOne: false
});

const Product = mongoose.model('Product', productSchema, 'products');

export default Product;
