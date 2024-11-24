import express from "express";
import authMiddleware from "../config/authMiddleware.js";
import {
  RegisterUser,
  LoginUser,
  LogoutUser,
  getProfile,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.post("/logout", LogoutUser);
router.get("/profile", authMiddleware, getProfile);

export default router;
