import jwt from "jsonwebtoken";
import User from "../models/user";

export default {
  getToken: (id, expires) => {
    const token = jwt.sign({ _id: id }, process.env.SECRET, {
      expiresIn: expires,
    });
    return token;
  },

  /* decode: async (token) => {
    try {
      const { _id } = jwt.verify(token, process.env.SECRET);
      const user = await User.findOne({ _id }, { passwordHash: 0 }); //, state: 1
      if (user) {
        return user;
      } else false;
    } catch (error) {
      console.error(error);
    }
  }, */
};
