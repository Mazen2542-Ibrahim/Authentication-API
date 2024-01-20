import express from "express";

import { getAllUsers, getOneUser, deleteUser } from "../controller/user.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:userId", getOneUser);
router.delete("/:userId", deleteUser);

export default router;
