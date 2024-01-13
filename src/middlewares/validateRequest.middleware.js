import CustomError from "../helper/CustomError.js";
import httpStatusCode from "http-status-codes";

const validateRequest = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error)
      return next(
        new CustomError(
          result.error.details[0].message,
          httpStatusCode.UNPROCESSABLE_ENTITY
        )
      );

    if (!req.validBody) {
      req.value = {};
    }
    req.validBody = result.value;
    next();
  };
};

export default validateRequest;
