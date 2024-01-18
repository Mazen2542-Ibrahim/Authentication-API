import express from "express";

import validateRequest from "../middlewares/validateRequest.middleware.js";
import {
  UserRegisterValidation,
  UserLoginValidation,
} from "../validations/validationSchema.js";
import verifyToken from "../middlewares/verifyToken.js";

import { register, login, logout } from "../controller/auth.js";

const router = express.Router();

router.post("/register", validateRequest(UserRegisterValidation), register);
router.post("/login", validateRequest(UserLoginValidation), login);

router.get("/logout", verifyToken, logout);

export default router;
