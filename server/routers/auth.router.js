import express from "express";
const router = express.Router();
import authController from "../controllers/auth.controller.js";

// POST: http://localhost:5000/api/v1/register
router.post("/register", authController.Register);

router.post("/signin", authController.signIn);

export default router;
