import express from "express";
import validateRequest from "../middlewares/validateRequest.middleware.js";
import {
  UserRegisterValidation,
  UserLoginValidation,
} from "../validations/validationSchema.js";

import { register, login } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/register", validateRequest(UserRegisterValidation), register);
router.post("/login", validateRequest(UserLoginValidation), login);

export default router;
