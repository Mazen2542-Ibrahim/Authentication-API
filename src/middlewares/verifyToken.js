import jwt from "jsonwebtoken";
import httpStatusCode from "http-status-codes";

import Blacklist from "../models/Blacklist.js";
import CustomError from "../helper/CustomError.js";
import { SECRET_ACCESS_TOKEN } from "../config/index.js";

const verifyToken = async (req, res, next) => {
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
  // Check if that token is blacklisted
  const checkIfBlacklisted = await Blacklist.findOne({ token });
  // if true, send an unathorized message, asking for a re-authentication.
  // if (checkIfBlacklisted)
  //   return next(
  //     new CustomError(
  //       "This session has expired. Please login",
  //       httpStatusCode.UNAUTHORIZED
  //     )
  //   );

  jwt.verify(String(token), SECRET_ACCESS_TOKEN, (err, user) => {
    if (err)
      return next(
        new CustomError(
          "Please try to log in to access this resource",
          httpStatusCode.UNAUTHORIZED
        )
      );
    req.user = { id: user.id, role: user.role };
  });
  next();
};

export default verifyToken;
