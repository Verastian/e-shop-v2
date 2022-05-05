import { Router } from "express";
import auth from "../middlewares/auth";
import authController from "../controllers/auth.controller";

const router = Router();

router.post("/signin", authController.signIn); //login
router.post("/signUp", authController.signUp); //register
router.get("/forgot", authController.forgotPassword);
router.get("/new-password", auth.verifyToken, authController.createNewPassword);
export default router;
