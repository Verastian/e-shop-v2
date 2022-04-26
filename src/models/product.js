import db from "mongoose";

const productSchema = db.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  richDescripcion: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  images: {
    types: String,
    default: "",
  },
  brand: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: db.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  rating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  state: {
    type: Number,
    default: 1,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});
const Product = db.model("Product", productSchema);

export default Product;
