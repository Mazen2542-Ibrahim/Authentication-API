import bcrypt from "bcrypt";
import httpStatusCode from "http-status-codes";

import User from "../models/User.js";
import CustomError from "../helper/CustomError.js";
import asyncErrorHandler from "../helper/asyncErrorHandler.js";
import { cookieOptions } from "../helper/constants.js";

/**
 * @route POST /api/v1/auth/register
 * @desc Register a user
 * @access Public
 */
const register = asyncErrorHandler(async (req, res, next) => {
  const isUserExists = await User.findOne({ email: req.validBody.email });
  if (isUserExists)
    return next(
      new CustomError(
        "It seems you already have an account with this email, please try log in instead.",
        httpStatusCode.CONFLICT
      )
    );

  const savedUser = await User(req.validBody).save();

  res.status(httpStatusCode.CREATED).json({
    status: "success",
    message:
      "Thank you for registering with us. Your account has been successfully created.",
    data: [
      {
        first_name: savedUser.first_name,
        last_name: savedUser.last_name,
        email: savedUser.email,
      },
    ],
  });
});

/**
 * @route POST /api/v1/auth/register
 * @desc Register a user
 * @access Public
 */
const login = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.validBody.email }).select(
    "+password"
  );
  if (!user)
    return next(
      new CustomError(
        "Invalid email or password. Please try again with the correct credentials.",
        httpStatusCode.UNAUTHORIZED
      )
    );

  const isPasswordValid = await bcrypt.compare(
    req.validBody.password,
    user.password
  );
  if (!isPasswordValid)
    return next(
      new CustomError(
        "Invalid email or password. Please try again with the correct credentials.",
        httpStatusCode.UNAUTHORIZED
      )
    );

  const token = user.generateAccessJWT();

  res.cookie("token", token, cookieOptions);

  res.status(200).json({
    status: "success",
    message: "You have successfully logged in.",
    data: [
      {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
      { token: token },
    ],
  });
});

export { register, login };
