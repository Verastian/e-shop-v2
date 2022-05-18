// import tokenService from "../helpers/tokenService";
import User from "../models/user";
import jwt from "jsonwebtoken";
import Role from "../models/role";
export default {
  verifyToken: async (req, res, next) => {
    try {
      let token = await req.headers.token;

      if (!token) {
        return res
          .status(403) //Forbidden
          .json({ success: false, messages: "No token provided!" });
      }
      //   const decoded = await tokenService.decode(token);
      const decoded = jwt.verify(token, process.env.SECRET);
      req.userId = decoded._id;
      const user = await User.findById(
        { _id: req.userId.id },
        {
          passwordHash: 0,
        }
      );
      console.log(req.userId);
      console.log(user);

      if (!user) {
        return res
          .status(404) //not Found
          .json({ success: false, message: "No user Found" });
      }
      next();
    } catch (error) {
      console.error(error);
      next();
    }
  },

  isAdmin: async (req, res, next) => {
    try {
      const user = await User.findById(req.userId.id);
      const roles = await Role.find({ _id: { $in: user.roles } }); //find all user role from roles list

      console.log(roles);
      const matching = roles.filter((role) => {
        return role.name === "admin";
      });
      console.log(matching);

      if (!matching.length) {
        return res
          .status(403)
          .json({ success: false, message: "Require Admin Role!" });
      }
      next();
    } catch (error) {
      /* console.error(error);
      return res.status(500).send(error); */
      console.error(error);
      next();
    }
  },
};
