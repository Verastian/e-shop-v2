import { Router } from "express";
import orderControllers from "../controllers/order.controllers";

const router = Router();

router.get("/", orderControllers.findAll);
router.get("/:id", orderControllers.findById);
router.post("/add", orderControllers.create); //post
router.delete("/delete/:id", orderControllers.delete); //delete
router.put("/update/:id", orderControllers.update); //put
router.get("/get/count", orderControllers.count);
router.get("/get/user-orders/:userid", orderControllers.findOrderByUserId);

export default router;
