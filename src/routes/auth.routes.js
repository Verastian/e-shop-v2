import { Router } from "express";
import authController from "../controllers/auth.Controller";

const router = Router();

router.post("/login", authController.login);

export default router;