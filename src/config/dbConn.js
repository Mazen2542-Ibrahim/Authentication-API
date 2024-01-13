import mongoose from "mongoose";
import { MONGO_URI } from "./index.js";

const connectToMongoDB = () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Mongodb connected.");
    })
    .catch((err) => console.log(err));

  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to db");
  });

  mongoose.connection.on("error", (err) => {
    console.log(err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose connected is disconnected");
  });

  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
};

export default connectToMongoDB;
