import httpStatusCode from "http-status-codes";

import CustomError from "../helper/CustomError.js";

const permit = (...permittedRoles) => {
  return (req, res, next) => {
    const { user } = req;

    if (user && permittedRoles.includes(user.role)) {
      return next();
    }
    return next(new CustomError("User is forbidden", httpStatusCode.FORBIDDEN));
  };
};

export default permit;
