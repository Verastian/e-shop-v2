import { check } from "express-validator";
import passwordService from "../helpers/password.service";
// import validateFields from "../middlewares/validateFields";

export default {
  validateFieldsUser: [
    check("name")
      .trim()
      .exists()
      .not()
      .isEmpty({ ignore_whitespace: false })
      .withMessage("the name is required"),
    check("email", "the Email is required").exists().isEmail(),
    check("passwordHash")
      .exists()
      .not()
      .isEmpty({ ignore_whitespace: false })
      .withMessage("the password is required")
      .isLength({ min: 3 })
      .withMessage("password must be greater than 3")
      .custom((value = "") => {
        const rules = passwordService.passRules(value);
        if (!rules) {
          throw new Error("the password does not meet the requirements");
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
