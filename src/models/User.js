import mongoose from "mongoose";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET_ACCESS_TOKEN } from "../config/index.js";
import { saltRound, tokenExpire } from "../helper/constants.js";

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: "Your name is required",
      trim: true,
      max: 25,
    },
    last_name: {
      type: String,
      required: "Your name is required",
      trim: true,
      max: 25,
    },
    email: {
      type: String,
      required: "Your email is required",
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: "Your password is required",
      select: false,
      max: 200,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "editor", "viewer", "user"],
      default: "user",
      lowercase: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();
  bcrypt.genSalt(saltRound, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.generateAccessJWT = function () {
  let payload = {
    id: this._id,
  };
  return jwt.sign(payload, SECRET_ACCESS_TOKEN, {
    expiresIn: `${tokenExpire}m`,
  });
};

export default mongoose.model("users", UserSchema);
