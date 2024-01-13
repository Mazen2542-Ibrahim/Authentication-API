import httpStatusCodes from "http-status-codes";

import { NODE_ENV } from "../config/index.js";
import CustomError from "../helper/CustomError.js";

const devErrors = (res, err) => {
  res.status(err.statusCode).json({
    status: err.status,
    statusCode: err.statusCode,
    message: err.message,
    stackTrace: err.stack,
    error: err,
  });
};

const prodErrors = (res, err) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      statusCode: err.statusCode,
      message: err.message,
    });
  } else {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Something went wrong! Please try again later",
    });
  }
};

const castErrorHandler = (error) => {
  const msg = `Invelid value for ${error.path}: ${error.value}`;
  return new CustomError(msg, httpStatusCodes.BAD_REQUEST);
};

const fieldErrorValidatorHandler = (error) => {
  const msg = `${error.msg}`;
  return new CustomError(msg, httpStatusCodes.UNPROCESSABLE_ENTITY);
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR;
  err.status = err.status || "error";
  if (NODE_ENV === "development") {
    devErrors(res, err);
  } else if (NODE_ENV === "production") {
    if (err.name === "CastError") {
      err = castErrorHandler(err);
    }

    if (err.type == "field") {
      err = fieldErrorValidatorHandler(err);
    }

    prodErrors(res, err);
  }
};

export default globalErrorHandler;
