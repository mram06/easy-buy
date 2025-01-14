import express from "express";
import CartController from "../controllers/cartController.mjs";

const router = express.Router();

router.get("/:locale/:id", CartController.getCartItemsWithLocaleByUserId);
router.post("/add/:id", CartController.addToCart);
router.post("/decrease/:id", CartController.decreaseCount);

export default router;
