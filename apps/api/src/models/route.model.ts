import { Schema, model } from "mongoose";
import { IRoute } from "types";

const routeSchema = new Schema(
  {
    material: String,
    driver: String,
    distance: Number,
    time: Number,
    risk: Number,
    address: String,
    active: Boolean,
    coords: [
      {
        lat: Number,
        lng: Number,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const RouteModel = model<IRoute>("Route", routeSchema);
