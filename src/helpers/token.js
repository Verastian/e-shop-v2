import jwt from "jsonwebtoken";
import config from "../config";
export default {
  getToken: (id) => {
    const token = jwt.sign({ _id: id }, config.SECRET, { expiresIn: 86400 });
    return token;
  },
};
