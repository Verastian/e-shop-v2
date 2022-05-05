import { Router } from "express";
import categoryControllers from "../controllers/category.controller";

const router = Router();

router.get("/", categoryControllers.findAll);
router.get("/:id", categoryControllers.findById);
router.post("/add", categoryControllers.create); //post
router.delete("/delete/:id", categoryControllers.delete); //delete
router.put("/update/:id", categoryControllers.update); //put

export default router;
