import express from "express";
// import session from "express-session";
import cookieParser from "cookie-parser";
import httpStatusCodes from "http-status-codes";

import api from "./src/routes/index.js";
import CustomError from "./src/helper/CustomError.js";
import { PORT } from "./src/config/index.js";
import globalErrorHandler from "./src/controller/error.controller.js";

import connectToMongoDB from "./src/config/dbConn.js";
connectToMongoDB();

const server = express();

// Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());

// routes
server.use("/api/v1", api);

// catch 404 and forward to error handler
server.all("*", (req, res, next) => {
  next(
    new CustomError(
      `Can't find ${req.originalUrl} on the server`,
      httpStatusCodes.NOT_FOUND
    )
  );
});

// Error Handler
server.use(globalErrorHandler);

const port = PORT || 5005;
server.listen(
  port,
  console.log(`server is listening on "http://localhost:${port}"`)
);
