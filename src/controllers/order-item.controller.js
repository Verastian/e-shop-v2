import db from "mongoose";

const orderItemSchema = db.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  product: {
    type: db.Schema.Types.ObjectId,
    ref: "Product",
  },
});

const OrderItem = db.model("OrderItem", orderItemSchema);

export default OrderItem;
