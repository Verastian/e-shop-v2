// import routerx from "express-promise-router";
import { Router } from "express";
import productControllers from "../controllers/productController";
import uploadImages from "../middlewares/uploadImages";

// const router = routerx();
const router = Router();

router.get("/", productControllers.findAll);
router.get("/:id", productControllers.findById);
router.post("/add", uploadImages.single("image"), productControllers.create); //post
router.delete("/delete/:id", productControllers.delete); //delete
router.put("/update/:id", productControllers.update); //put
router.get("/get/count", productControllers.count);
router.get("/get/featured/:count", productControllers.featuredCount);
router.put(
  "/upload-images/:id",
  uploadImages.array("images", 10),
  productControllers.uploadImages
); //put

export default router;
