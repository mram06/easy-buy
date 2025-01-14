import { Router } from "express";
const router = Router();

import usersRoutes from "./usersRoutes.mjs";
import authRoutes from "./authRoutes.mjs";
import productsRoutes from "./productsRoutes.mjs";
import categoriesRoutes from "./categoriesRoutes.mjs";
import subcategoriesRoutes from "./subcategoriesRoutes.mjs";
import featuresRoutes from "./featuresRoutes.mjs";
import cartsRoutes from "./cartsRoutes.mjs";
import ordersRoutes from "./ordersRoutes.mjs";

router.use("/users", usersRoutes);
router.use("/auth", authRoutes);
router.use("/products", productsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/subcategories", subcategoriesRoutes);
router.use("/features", featuresRoutes);
router.use("/carts", cartsRoutes);
router.use("/orders", ordersRoutes);

export default router;
