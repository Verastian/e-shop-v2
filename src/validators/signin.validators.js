import { check } from "express-validator";
import passwordService from "../helpers/password.service";
import User from "../models/user";
// import validateFields from "../middlewares/validateFields";

export default {
  validateFieldsSignIn: [
    check("email", "the Email is required")
      .exists()
      .isEmail()
      .custom(async (value = "") => {
        const existingUser = await User.findOne({ email: value });
        if (!existingUser) {
          throw new Error("The user does not exist");
        }
        return true;
      }),
    check("passwordHash")
      .exists()
      .not()
      .isEmpty({ ignore_whitespace: false })
      .withMessage("the password is required")
      .isLength({ min: 3 })
      .withMessage("password must be greater than 3")
      .custom(async (value = "") => {
        const existingUser = await User.findOne({ passwordHash: value });
        if (!existingUser) {
          throw new Error("The user already in use");
        }
        return true;
      }),
  ],
};

/* 
password requirements:

Length between 8 and 32 characters.

One or more uppercase letters.

One or more lowercase letters.

One or more numbers.

One or more special characters (ASCII punctuation or space characters).
 */
