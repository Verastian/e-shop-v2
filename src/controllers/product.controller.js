import Product from "../models/product";
import Category from "../models/category";
import db from "mongoose";

export default {
  findAll: async (req, res, next) => {
    try {
      let products = await Product.find().sort({ dateCreated: -1 });

      if (!products) {
        return res.status(500).json({ success: false });
      }

      res.status(200).send(products);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  findById: async (req, res, next) => {
    try {
      let product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(500).json({
          success: false,
          message: "the product with the given ID was not found.",
        });
      }

      res.status(200).send(product);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  create: async (req, res, next) => {
    try {
      //we validate a category by its ID
      let category = await Category.findById(req.body.category);
      if (!category) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid Category!" });
      }
      //
      const file = req.file;
      if (!file) {
        return res.status(400).send("No Image in the request");
      }
      const fileName = file.filename;
      const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

      let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: `${basePath}${fileName}`,
        brand: req.body.brand,
        price: req.body.price,
        category: category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
        state: req.body.state,
      });

      product = await product.save();

      if (!product) {
        res.status(500).send("the Product cannot be created!");
      }

      res.status(200).send(product);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  delete: (req, res, next) => {
    try {
      Product.findByIdAndRemove(req.params.id)
        .then((product) => {
          if (product) {
            return res.status(200).json({
              success: true,
              message: "the product is deleted!",
            });
          } else {
            return res.status(404).json({
              success: false,
              message: "Product not found!",
            });
          }
        })
        .catch((e) => {
          return res.status(500).json({
            success: false,
            error: e,
          });
        });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      //we validate a category by its ID
      let category = await Category.findById(req.body.category);
      if (!category) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid Category!" });
      }
      // We validate the ID that we want to update.
      if (db.isValidObjectId(req.params.id)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid Product ID" });
      }

      let product = await Product.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          description: req.body.description,
          richDescription: req.body.richDescription,
          image: req.body.image,
          images: req.body.images,
          brand: req.body.brand,
          price: req.body.price,
          category: req.body.category,
          countInStock: req.body.countInStock,
          rating: req.body.rating,
          numReviews: req.body.numReviews,
          isFeatured: req.body.isFeatured,
          state: req.body.state,
        },
        {
          new: true,
        }
      );

      if (!product) {
        return res.status(500).json({
          success: false,
          message: "the Product cannot be Updated",
        });
      }

      res.status(200).json({
        success: true,
        message: "the product is Updated successfully",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  /* *** */
  count: async (req, res, next) => {
    try {
      //We will use the method
      let count = await Product.countDocuments();

      if (!count) {
        return res.status(500).json({ success: false });
      }
      res.send({ count: count });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  /* *** */
  featuredCount: async (req, res, next) => {
    try {
      const count = req.params.count ? req.params.count : 0;
      // we search for all products with isFeatured activated and limit the search to the number we want
      const products = await Product.find({ isFeatured: true }).limit(+count);

      if (!products) {
        return res.status(500).json({ success: false });
      }
      res.status(200).send(products);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  uploadImages: async (req, res, next) => {
    try {
      if (!db.isValidObjectId(req.params.id)) {
        return res.status(400).send("Invalid Product Id");
      }
      const files = req.files;
      let imagesPaths = [];
      const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

      if (files) {
        files.map((file) => {
          imagesPaths.push(`${basePath}${file.filename}`);
        });
      }

      const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
          images: imagesPaths,
        },
        { new: true }
      );

      if (!product)
        return res.status(500).send("the gallery cannot be updated!");

      res.send(product);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
