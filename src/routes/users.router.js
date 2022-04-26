import { Router } from "express";
import userControllers from "../controllers/userControllers";

const router = Router();

router.get("/", userControllers.findAll);
router.get("/:id", userControllers.findById);
router.post("/add", userControllers.create); //post
router.delete("/delete/:id", userControllers.delete); //delete
router.put("/update/:id", userControllers.update); //put
router.get("/get/count", userControllers.count);

export default router;
