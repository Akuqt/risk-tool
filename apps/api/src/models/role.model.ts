import { Schema, model } from "mongoose";
import { IRole } from "types";

const roleSchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: false,
    versionKey: false,
  },
);

export const RoleModel = model<IRole>("Role", roleSchema);
