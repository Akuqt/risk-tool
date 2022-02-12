import config from "../config";
import mongoose from "mongoose";

const uri =
  process.env.NODE_ENV === "test"
    ? config.MONGODB.TEST_URI
    : config.MONGODB.URI;

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Mongodb Connection stablished.");
});

connection.on("error", (err) => {
  console.log("Mongodb connection error:", err);
  process.exit(0);
});

export const connect = () => {
  mongoose.connect(uri);
};
