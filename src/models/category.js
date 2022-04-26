import db, { Schema } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxlength: 255,
  },
  state: {
    type: Number,
    default: 1,
  },
  icon: {
    type: String,
  },
  color: {
    type: String,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Category = db.model("Category", categorySchema);

export default Category;
