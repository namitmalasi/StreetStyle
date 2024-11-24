import express from "express";
import authMiddleware from "../config/authMiddleware.js";
import {
  getCart,
  addToCart,
  updateCartQuantity,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/", authMiddleware, getCart);
router.post("/add", authMiddleware, addToCart);
router.put("/update", authMiddleware, updateCartQuantity);

export default router;
