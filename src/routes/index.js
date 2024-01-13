import express from "express";
import httpStatusCodes from "http-status-codes";
import helmet from "helmet";

import authRouter from "./auth.js";
import asyncErrorHandler from "../helper/asyncErrorHandler.js";
import verifyToken from "../middlewares/verifyToken.js";
import User from "../models/User.js";

const app = express();

app.use(helmet());

app.get(
  "/",
  asyncErrorHandler(async (req, res, next) => {
    res.status(httpStatusCodes.OK).json({
      status: "success",
      message: "Welcome to my Authentication System",
    });
  })
);

app.use("/api/v1/auth", authRouter);
app.get(
  "/api/v1/dashboard",
  verifyToken,
  asyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.userId, "-password");

    res.status(httpStatusCodes.OK).json({
      status: "success",
      message: `welcome ${user.first_name} ${user.last_name} to the Dashboard.`,
      data: [user],
    });
  })
);

export default app;
