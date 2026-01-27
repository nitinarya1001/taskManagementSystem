import { Router } from "express";
import {
  loginForm,
  registerForm,
  loginUser,
  registerUser,
  logoutUser,
  updatePassword,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register-form").get(registerForm);
router.route("/login-form").get(loginForm);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

//securedroutes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/updatePassword").post(verifyJWT, updatePassword);

export default router;
