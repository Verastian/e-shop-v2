import User from "../models/user";

export default {
  checkDuplicatedUserOrEmail: async (req, res, next) => {
    try {
      const user = await User.findOne({ name: req.body.name });
      if (user) {
        return res
          .status(400)
          .json({ success: false, message: "The user already exists!" });
      }
      const email = await User.findOne({ email: req.body.email });
      if (email) {
        return res
          .status(400)
          .json({ success: false, message: "The email already exits!" });
      }
      next();
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  },
};
