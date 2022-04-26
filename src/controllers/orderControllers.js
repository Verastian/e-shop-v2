import Order from "../models/order";
import OrderItem from "./order-item";

export default {
  /* *** */

  findAll: async (req, res, next) => {
    try {
      let orders = await Order.find().sort({ dateCreated: -1 });

      if (!orders) {
        return res.status(500).json({ success: false });
      }

      res.status(200).send(orders);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  /* *** */

  findById: async (req, res, next) => {
    try {
      let order = await Order.findById(req.params.id);

      if (!order) {
        return res.status(500).json({
          success: false,
          message: "The Orders with given ID was not found!",
        });
      }

      res.status(200).send(order);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  /* *** */

  create: async (req, res, next) => {
    try {
      // get order Items, products and quantity/////////////////////////
      const orderItemsIds = Promise.all(
        req.body.orderItems.map(async (orderItem) => {
          //we create a new item order and get its values ​​from the request.
          let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product,
          });
          // we save the orderItems and return its Id
          newOrderItem = await newOrderItem.save();
          return newOrderItem._id;
        })
      );
      const resultOrderItemsIds = await orderItemsIds;
      // console.log(resultOrderItemsIds);

      // we will calculate the total price of the order//////////////////
      // From the result obtained in the creation of the items of the order,
      //  we will obtain each ID with the map method
      const totalPrices = await Promise.all(
        resultOrderItemsIds.map(async (orderItemsId) => {
          // We will have the items of the order by their Id and we will relate
          // it to the price of the product through the populate() method
          // The first argument corresponds to the model referenced in the OrderItems schema.
          // the second refers to the price argument of the Product model
          const orderItem = await OrderItem.findById(orderItemsId).populate(
            "product",
            "price"
          );

          //We will calculate the total price by the quantity.
          const totalPrice = orderItem.product.price * orderItem.quantity;
          console.log(totalPrice);
          return totalPrice;
        })
      );
      // here we will have the total sum of the prices
      const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

      let order = new Order({
        orderItems: resultOrderItemsIds, //we assign the order items created in the order
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
        user: req.body.user,
      });

      order = await order.save();

      if (!order) {
        return res.status(500).json({
          success: false,
          massage: "The Order cannot be created!",
        });
      }

      res.status(200).send(order);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  /* *** */

  delete: (req, res, next) => {
    try {
      Order.findByIdAndRemove(req.params.id)
        .then((order) => {
          if (order) {
            res.status(200).json({
              success: true,
              message: "the Orders is Deleted",
            });
          } else {
            res.status(404).json({
              success: false,
              message: "Order not found!",
            });
          }
        })
        .catch((err) => {
          return res.status(500).json({ success: false, error: err });
        });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  /* *** */

  update: async (req, res, next) => {
    try {
      let order = await Order.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status,
        },
        { new: true }
      );
      if (!order) {
        return res
          .status(400)
          .json({ success: false, message: "the Order cannot be Update!" });
      }

      res.status(200).json({
        success: true,
        message: "the Order was successfully updated ",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  count: async (req, res, next) => {
    try {
      const count = await Order.countDocuments();
      if (!count) {
        return res.status(500).json({ success: false });
      }
      res.send({ count: count });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  findOrderByUserId: async (req, res, next) => {
    try {
      const userOrders = await Order.find({ user: req.params.userid })
        .populate({
          path: "orderItems",
          populate: {
            path: "product",
            populate: "category",
          },
        })
        .sort({ dateCreated: -1 });

      if (!userOrders) {
        return res.status(500).json({ success: false });
      }
      res.send(userOrders);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
/* 
{
         "orderItems": [
    {
      "quantity": 1,
      "product":"625f77d09e32d066bb54a8c0"
    },
    {
      "quantity": 2,
      "product":"625f7d73222b2ba7e1275473"
    }
  ],
  "status": "1",
  "shippingAddress1": "Flowers Street",
  "shippingAddress2": "13",
  "city": "Prague",
  "zip": "15541",
  "country": "Czech Republic",
  "phone": "688874451",
  "totalPrice": 1240.9,
  "user": {
    "id": "5f1687e1be2e99a158c08504"
  }
} */
