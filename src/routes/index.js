import express from "express";
import httpStatusCodes from "http-status-codes";
import helmet from "helmet";

// routers
import auth from "./auth.js";
import users from "./users.js";

import verifyToken from "../middlewares/verifyToken.js";
import permit from "../middlewares/permit.js";
import { Roles } from "../helper/constants.js";

const api = express();

api.use(helmet());

api.get("/", (req, res, next) => {
  res.status(httpStatusCodes.OK).json({
    status: "success",
    message: "Welcome to my Authentication System",
  });
});

api.use("/auth", auth);
api.use("/users", verifyToken, permit(Roles.ADMIN), users);

export default api;
