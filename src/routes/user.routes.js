import { Router } from "express";
import { registerUser, login, logout } from "../controllers/user.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/logout").get(authenticateToken, logout);

export default router;
