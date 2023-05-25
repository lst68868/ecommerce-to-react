import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String
});

export default mongoose.model('Product', productSchema);
