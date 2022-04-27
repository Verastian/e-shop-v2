import jwtoken from "../helpers/token";
import pass from "../helpers/pass";
import User from "../models/user";

export default {
  login: async (req, res, next) => {
    try {
      // Request body email or username
      const userFound = await User.findOne({
        email: req.body.email,
        state: 1,
      }).populate("roles");

      if (!userFound) {
        return res
          .status(400) //Bad Request
          .json({ success: false, message: "User not found!" });
      }

      const matchPass = pass.comparePass(
        req.body.passwordHash,
        userFound.passwordHash
      );

      if (!matchPass) {
        return res
          .status(401) //Unauthorized
          .json({ success: false, message: "Invalid Password!" });
      }
      const tokenReturn = await jwtoken.getToken({ id: userFound.id });

      res.status(200).json({ tokenReturn });
    } catch (error) {
      console.error(error);
      next();
    }
  },
};
