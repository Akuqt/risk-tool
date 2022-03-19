import { Schema, model } from "mongoose";
import { ILog } from "types";

const logSchema = new Schema(
  {
    event: String,
    action: String,
    timestamp: Number,
    lat: Number,
    lng: Number,
  },
  {
    timestamps: false,
    versionKey: false,
  },
);

export const LogModel = model<ILog>("Log", logSchema);
