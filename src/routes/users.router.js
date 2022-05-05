import { Router } from "express";
import userControllers from "../controllers/user.controllers";
import auth from "../middlewares/auth";
import validateFields from "../middlewares/validateFields";
import verifySignUp from "../middlewares/verifySignUp";
import usersValidators from "../validators/users.validators";
const router = Router();

router.get("/", userControllers.findAll);
router.get("/:id", userControllers.findById);
router.post(
  "/add",
  [
    auth.verifyToken,
    usersValidators.validateFieldsUser,
    validateFields.validateFields,
    verifySignUp.checkDuplicatedUserOrEmail,
  ],
  auth.isAdmin,
  userControllers.create
); //post
router.delete("/delete/:id", userControllers.delete); //delete
router.put("/update/:id", userControllers.update); //put
router.get("/get/count", userControllers.count);

export default router;
