import jwt from "jsonwebtoken";
import httpStatusCode from "http-status-codes";

import CustomError from "../helper/CustomError.js";
import { SECRET_ACCESS_TOKEN } from "../config/index.js";

const verifyToken = (req, res, next) => {
  const cookie = req.headers.cookie;
  if (!cookie)
    return next(
      new CustomError(
        "You are unauthorized to view this resource",
        httpStatusCode.UNAUTHORIZED
      )
    );

  const token = cookie.split("=")[1];
  if (!token)
    return next(
      new CustomError(
        "You are unauthorized to view this resource",
        httpStatusCode.UNAUTHORIZED
      )
    );

  jwt.verify(String(token), SECRET_ACCESS_TOKEN, (err, user) => {
    if (err)
      return next(
        new CustomError(
          "Please try to log in to access this resource",
          httpStatusCode.UNAUTHORIZED
        )
      );

    req.userId = user.id;
  });
  next();
};

export default verifyToken;
