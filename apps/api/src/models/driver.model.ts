import { Schema, model } from "mongoose";
import { IDriver } from "types";

const driverSchema = new Schema(
  {
    name: String,
    lastname: String,
    plate: String,
    company: {
      ref: "Company",
      type: Schema.Types.ObjectId,
    },
    lat: Number,
    lng: Number,
    dlat: Number,
    dlng: Number,
    material: String,
    address: String,
    gender: String,
    active: {
      type: Boolean,
      default: false,
    },
    route: [
      {
        lat: Number,
        lng: Number,
      },
    ],
    role: {
      ref: "Role",
      type: Schema.Types.ObjectId,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    tokenVersion: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const DriverModel = model<IDriver>("Driver", driverSchema);
