import jwtoken from "../helpers/token.service";
import pass from "../helpers/password.service";
import User from "../models/user";
import Role from "../models/role";

export default {
  // login
  signIn: async (req, res, next) => {
    try {
      // Request body email or username
      const userFound = await User.findOne({
        email: req.body.email,
        // state: 1,
      }).populate("roles");

      if (!userFound) {
        return res
          .status(400) //Bad Request
          .json({ success: false, message: "User not found!" });
      }
      // console.log(userFound);

      if (!req.body.passwordHash) {
        return res
          .status(401)
          .json({ success: false, message: "You must enter a password" });
      }
      console.log(req.body.passwordHash);
      console.log(userFound.passwordHash);

      const matchPass = await pass.comparePass(
        req.body.passwordHash,
        userFound.passwordHash
      );
      console.log(matchPass);
      if (!matchPass) {
        return res
          .status(401) //Unauthorized
          .json({ success: false, message: "Invalid Password!" });
      }
      const token = jwtoken.getToken({ id: userFound.id }, 86400);
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      next();
    }
  },
  // register
  signUp: async (req, res, next) => {
    try {
      // Roles : get roles from request
      const { roles } = req.body;
      let rolesFound;
      // if no role, create default user role
      if (!roles.length) {
        const role = await Role.findOne({ name: "user" });
        rolesFound = [role._id];
        // console.log(roles);
      }
      rolesFound = await Role.find({ name: { $in: roles } });
      const passHash = await pass.encryptPass(req.body.passwordHash);
      // console.log(rolesFound);

      let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: passHash,
        // isAdmin: req.body.isAdmin,
        roles: rolesFound.map((role) => role._id),
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
  // forgot pass
  forgotPassword: async (req, res, next) => {
    try {
      const { email } = req.body; // TODO: unstructure the other requests in the same way as here
      const userFound = await User.findOne({ email: email });
      // console.log(userFound.id);

      // verify if user exists
      if (!userFound) {
        return res
          .status(400)
          .json({ success: false, message: "User not found!" });
      }

      //create token
      const oneHours = 3600000;
      const token = jwtoken.getToken({ id: userFound.id }, oneHours);
      res.status(200).json({ token });
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).send(error);
    }
  },
  // create new password
  createNewPassword: async (req, res, next) => {
    const { id } = req.userId;
    // verify token
    const user = await User.findById({ _id: id });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found!" });
    }
    // haashear password
    const passHash = await pass.encryptPass(req.body.passwordHash);

    // create new password
    const userWithNewPassword = await User.findByIdAndUpdate(
      id,
      {
        passwordHash: passHash,
      },
      { new: true }
    );

    if (!userWithNewPassword) {
      return res
        .status(500)
        .json({ success: false, message: "the password cannot be create" });
    }
    res.send(userWithNewPassword);
    next();
  },
};
