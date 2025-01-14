import express from "express";
import OrdersController from "../controllers/ordersController.mjs";

const router = express.Router();

router.post("/", OrdersController.makeOrder);

export default router;
