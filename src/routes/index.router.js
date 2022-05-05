// import routerx from "express-promise-router";
import { Router } from "express";
import productRouter from "./products.router";
import categoryRouter from "./category.router";
import orderRouter from "./orders.router";
import userRouter from "./users.router";
import authRouter from "./auth.routes";

// const router = routerx();
const router = Router();

router.use(`/products`, productRouter);
router.use(`/categories`, categoryRouter);
router.use(`/orders`, orderRouter);
router.use(`/users`, userRouter);
router.use(`/auth`, authRouter);

export default router;
