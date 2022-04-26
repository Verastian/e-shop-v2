import Category from "../models/category";

export default {
  findAll: async (req, res, next) => {
    try {
      let categories = await Category.find().sort({ dateCreated: -1 });

      if (!categories) {
        return res.status(500).json({ sucess: false });
      }

      res.status(200).send(categories);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  findById: async (req, res, next) => {
    try {
      let category = await Category.findById(req.params.id);

      if (!category) {
        res
          .status(500)
          .json({ message: "the category with the given ID was not found. " });
      }

      res.status(200).send(category);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  create: async (req, res, next) => {
    try {
      let category = new Category({
        name: req.body.name,
        description: req.body.description,
        state: req.body.state,
        icon: req.body.icon,
        color: req.body.color,
      });

      category = await category.save();

      if (!category) {
        return res.status(400).send("the category cannot be created!");
      }
      res.send(category);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  delete: (req, res, next) => {
    try {
      Category.findByIdAndRemove(req.params.id)
        .then((cat) => {
          if (cat) {
            return res
              .status(200)
              .json({ success: true, message: "the category is deleted!" });
          } else {
            return res
              .status(404)
              .json({ success: false, message: "category not found!" });
          }
        })
        .catch((e) => {
          return res.status(500).json({ success: false, error: e });
        });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      let category = await Category.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          description: req.body.description,
          state: req.body.state,
          icon: req.body.icon,
          color: req.body.color,
        },
        { new: true }
      );

      if (!category) {
        res
          .status(400)
          .json({ success: false, message: "the category cannot be Updated" });
      }

      res.status(200).send(category);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
