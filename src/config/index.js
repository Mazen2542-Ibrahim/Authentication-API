import * as dotenv from "dotenv";
dotenv.config();

const { MONGO_URI, PORT, SESSION_SECRET, SECRET_ACCESS_TOKEN, NODE_ENV } =
  process.env;

export { MONGO_URI, PORT, SESSION_SECRET, SECRET_ACCESS_TOKEN, NODE_ENV };
