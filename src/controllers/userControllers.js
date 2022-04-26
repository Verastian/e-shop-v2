import User from "../models/user";
import pass from "../helpers/pass";
import Role from "../models/role";

export default {
  findAll: async (req, res, next) => {
    try {
      let users = await User.find().sort({ dateCreated: -1 });

      if (!users) {
        return res.status(500).json({ success: false });
      }

      res.status(200).send(users);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  findById: async (req, res, next) => {
    try {
      let user = await User.findById(req.params.id);

      if (!user) {
        return res.status(500).json({
          success: false,
          message: "the user given ID was not found. ",
        });
      }
      res.status(200).send(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      // Roles
      const { roles } = req.body;
      // if no role, create default user role
      if (!roles.lenth) {
        console.log(roles);
      }
      const rolesFound = await Role.find({ name: { $in: roles } });
      const passHash = await pass.encryptPass(req.body.passwordHash);
      // console.log(rolesFound);

      let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: passHash,
        phone: req.body.phone,
        // isAdmin: req.body.isAdmin,
        roles: rolesFound.map((role) => role._id),
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
      });

      user = await user.save();
      // user = "";
      if (!user) {
        return res.status(500).json({
          success: false,
          massage: "The user cannot be created!",
        });
      }

      res.status(200).send(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  delete: (req, res, next) => {
    try {
      User.findByIdAndRemove(req.params.id).then((user) => {
        if (user) {
          return res
            .status(200)
            .json({ success: true, message: "the User is deleted" });
        } else {
          return res
            .status(404)
            .json({ success: false, message: "the User not found" });
        }
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const userExist = await User.findById(req.params.id);
      let newPass;
      if (req.body.passwordHash) {
        newPass = await pass.encryptPass(req.body.passwordHash);
      } else {
        newPass = userExist.passwordHash;
      }
      // roles
      const { roles } = req.body;
      const rolesFound = await Role.find({ name: { $in: roles } });
      let user = await User.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          email: req.body.email,
          passwordHash: newPass,
          phone: req.body.phone,
          // isAdmin: req.body.isAdmin,
          roles: rolesFound.map((role) => role._id),
          street: req.body.street,
          apartment: req.body.apartment,
          zip: req.body.zip,
          city: req.body.city,
          country: req.body.country,
        },
        { new: true }
      );

      if (!user) {
        return res
          .status(500)
          .json({ success: false, message: "the User cannot be Updated!" });
      }

      res.status(200).json({
        success: true,
        message: "the User is Updated successfully",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  count: async (req, res, next) => {
    try {
      const count = await User.countDocuments();
      if (!count) {
        return res.status(500).json({ success: false });
      }
      res.status(200).json({
        count: count,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
