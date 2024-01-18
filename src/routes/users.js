import express from "express";

import { getAllUsers, getOneUser } from "../controller/user.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:userId", getOneUser);

export default router;
