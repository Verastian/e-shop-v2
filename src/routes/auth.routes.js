import { Router } from "express";
import auth from "../middlewares/auth";
import authController from "../controllers/auth.controller";
import validateFields from "../middlewares/validateFields";
import signinValidators from "../validators/signin.validators";
const router = Router();

router.post(
  "/signin",
  [signinValidators.validateFieldsSignIn, validateFields.validateFields],
  authController.signIn
); //login
router.post("/signUp", authController.signUp); //register
router.get("/forgot", authController.forgotPassword);
router.put("/new-password", auth.verifyToken, authController.createNewPassword);
export default router;
