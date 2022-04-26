import db from "mongoose";

const orderSchema = db.Schema({
  orderItems: [
    {
      type: db.Schema.Types.ObjectId,
      ref: "OrderItem",
      required: true,
    },
  ],
  shippingAddress1: {
    type: String,
    required: true,
  },
  shippingAddress2: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
  },
  user: {
    type: db.Schema.Types.ObjectId,
    ref: "User",
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Order = db.model("Order", orderSchema);

export default Order;
