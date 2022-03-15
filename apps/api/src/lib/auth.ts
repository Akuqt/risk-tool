import config from "../config";
import { ICompany, IDriver } from "types";
import { CookieOptions } from "express";
import { hash, verify } from "argon2";
import { RoleModel } from "../models";
import { sign } from "jsonwebtoken";

export const createAcessToken = (user: IDriver | ICompany): string => {
  return sign(
    {
      user: user.username,
      _id: user._id,
      role: user.role.name,
      tokenVersion: user.tokenVersion,
    },
    config.JWT.ACCESS,
    {
      expiresIn: "1d",
    },
  );
};

export const createRefreshToken = (user: IDriver | ICompany): string => {
  return sign(
    {
      user: user.username,
      _id: user._id,
      role: user.role.name,
      tokenVersion: user.tokenVersion,
    },
    config.JWT.REFRESH,
    {
      expiresIn: "1d",
    },
  );
};

export const cookieConf: CookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  path: "/api/v1/refresh_token",
};

export const encryptPassword = async (password: string): Promise<string> =>
  await hash(password);

export const comparePassword = async (
  hash: string,
  password: string,
): Promise<boolean> => await verify(hash, password);

export const initRoles = async (): Promise<void> => {
  try {
    const count = await RoleModel.estimatedDocumentCount();
    if (count > 0) {
      return;
    }
    const values = await Promise.all([
      new RoleModel({ name: "driver" }).save(),
      new RoleModel({ name: "company" }).save(),
    ]);
    console.log(values);
  } catch (error) {
    console.error(error);
  }
};
