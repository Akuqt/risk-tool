import { Schema, model } from "mongoose";
import { ILog } from "types";

const logSchema = new Schema(
  {
    alert: {
      reason: String,
      description: String,
    },
    action: String,
    lat: Number,
    lng: Number,
    driver: String,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const LogModel = model<ILog>("Log", logSchema);
