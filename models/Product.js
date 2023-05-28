import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
