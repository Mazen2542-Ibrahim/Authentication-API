import httpStatusCodes from "http-status-codes";

import User from "../models/User.js";
import CustomError from "../helper/CustomError.js";
import asyncErrorHandler from "../helper/asyncErrorHandler.js";

export const getAllUsers = asyncErrorHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(httpStatusCodes.OK).json({ status: "success", data: [users] });
});

export const getOneUser = asyncErrorHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);

  if (!user) {
    return next(
      new CustomError(
        `User with id:${userId} not found`,
        httpStatusCodes.NOT_FOUND
      )
    );
  }

  res.status(httpStatusCodes.OK).json({ status: "success", data: [user] });
});
