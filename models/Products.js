import mongoose from "mongoose";

const ProdctSchema = new mongoose.Schema({
  ProductName: String,
  ProductImages: [String],
});

const ProductModel = mongoose.model("products", ProdctSchema);
export default ProductModel;
