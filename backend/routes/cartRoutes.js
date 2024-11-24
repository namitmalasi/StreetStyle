import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getCart, addToCart } from "../controllers/cartController.js";

const router = express.Router();

router.get("/api/cart", authMiddleware, getCart);
router.post("/api/cart/add", authMiddleware, addToCart);

export default router;
