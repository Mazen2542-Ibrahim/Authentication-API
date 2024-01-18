import express from "express";
import httpStatusCodes from "http-status-codes";
import helmet from "helmet";

// routers
import auth from "./auth.js";
import users from "./users.js";

import verifyToken from "../middlewares/verifyToken.js";
import User from "../models/User.js";

const api = express();

api.use(helmet());

api.get("/", (req, res, next) => {
  res.status(httpStatusCodes.OK).json({
    status: "success",
    message: "Welcome to my Authentication System",
  });
});

api.use("/auth", auth);
api.use("/users", verifyToken, users);

// api.get(
//   "/api/v1/dashboard",
//   verifyToken,
//   asyncErrorHandler(async (req, res, next) => {
//     const user = await User.findById(req.userId, "-password");

//     res.status(httpStatusCodes.OK).json({
//       status: "success",
//       message: `welcome ${user.first_name} ${user.last_name} to the Dashboard.`,
//       data: [user],
//     });
//   })
// );

export default api;
