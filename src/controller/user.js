import httpStatusCodes from "http-status-codes";

import User from "../models/User.js";
import CustomError from "../helper/CustomError.js";
import asyncErrorHandler from "../helper/asyncErrorHandler.js";

/**
 * @route GET /api/v1/users/
 * @desc return a list of users
 * @access Private, for admin
 */
export const getAllUsers = asyncErrorHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(httpStatusCodes.OK).json({ status: "success", data: [users] });
});

/**
 * @route GET /api/v1/users/:id
 * @desc return one user
 * @access Private, for admin
 */
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

/**
 * @route DELETE /api/v1/users/:id
 * @desc delete a user
 * @access Private, for admin
 */
export const deleteUser = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    return next(
      new CustomError(
        `User with id:${userId} not found`,
        httpStatusCodes.NOT_FOUND
      )
    );
  }

  if (req.user.id === user.id) {
    return next(
      new CustomError("You can not delete your own account"),
      httpStatusCodes.FORBIDDEN
    );
  }

  const result = await User.deleteOne({ _id: user.id });

  if (!(result.deletedCount === 1)) {
    return next(new CustomError("No user matched"), httpStatusCodes.FORBIDDEN);
  }

  res.status(httpStatusCodes.OK).json({
    status: "success",
    message: `The user with the email: ${user.email} has been successfully removed.`,
    data: [user],
  });
});
