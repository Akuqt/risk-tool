import { Schema, model } from "mongoose";
import { ICompany } from "types";

const companySchema = new Schema(
  {
    name: String,
    address: String,
    lat: Number,
    lng: Number,
    materials: [String],
    logs: {
      ref: "Log",
      type: Schema.Types.ObjectId,
    },
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

export const CompanyModel = model<ICompany>("Company", companySchema);
