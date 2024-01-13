import { NODE_ENV } from "../config/index.js";

export const Roles = {
  ADMIN: "admin",
  EDITOR: "editor",
  VIEWER: "viewer",
  USER: "user",
};

export const saltRound = 10;
export const tokenExpire = 1; // mins

const IN_PROD = NODE_ENV === "production";

export const cookieOptions = {
  path: "/",
  maxAge: tokenExpire * 60 * 1000, // would expire in 20 mins
  httpOnly: true, // The cookie is only accessible by the web server
  secure: true,
  sameSite: "lax",
};
