import { CompanyModel, DriverModel, RoleModel } from "../models";
import { ICompany, IDriver, IRole } from "types";
import { Request, Response } from "express";
import {
  cookieConf,
  encryptPassword,
  comparePassword,
  createAcessToken,
  createRefreshToken,
} from "../lib";

export const signIn = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { username, password, type } = req.body;

  if (type === "driver") {
    const _driver: IDriver | null = await DriverModel.findOne({
      username,
    })
      .populate("role")
      .populate("company");

    if (!_driver || _driver?.role.name !== type) return res.json({ ok: false });

    const matchPass = await comparePassword(_driver.password, password);

    if (!matchPass) return res.json({ ok: false });

    res.cookie("jid", createRefreshToken(_driver), cookieConf);

    return res.json({ data: _driver, token: createAcessToken(_driver) });
  }

  if (type === "company") {
    const _company: IDriver | null = await CompanyModel.findOne({
      username,
    }).populate("role");

    if (!_company || _company?.role.name !== type)
      return res.json({ ok: false });

    const matchPass = await comparePassword(_company.password, password);

    if (!matchPass) return res.json({ ok: false });

    res.cookie("jid", createRefreshToken(_company), cookieConf);

    return res.json({ data: _company, token: createAcessToken(_company) });
  }

  return res.json({ ok: false });
};

export const signUp = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const {
    lat,
    lng,
    type,
    name,
    plate,
    company,
    address,
    material,
    username,
    password,
    materials,
  } = req.body;

  if (type === "driver") {
    const _driver2: IDriver | null = await DriverModel.findOne({ username });
    const _company2: ICompany | null = await CompanyModel.findOne({
      name: company,
    });
    const _role2: IRole | null = await RoleModel.findOne({ name: type });

    if (_driver2 || !_company2 || !_role2) {
      return res.json({ ok: false });
    }

    const _driver = new DriverModel({
      lat,
      lng,
      name,
      plate,
      material,
      username,
      password: await encryptPassword(password),
    });

    _driver.company = _company2;
    _driver.role = _role2;

    const driver_ = await _driver.save();

    res.cookie("jid", createRefreshToken(driver_), cookieConf);

    return res.json({ data: driver_ });
  }

  if (type === "company") {
    const _company2: ICompany | null = await CompanyModel.findOne({
      username,
    });
    const _role2: IRole | null = await RoleModel.findOne({ name: type });

    if (_company2 || !_role2) {
      return res.json({ ok: false });
    }

    const _company = new CompanyModel({
      lat,
      lng,
      name,
      address,
      username,
      materials,
      password: await encryptPassword(password),
    });

    _company.role = _role2;

    const company_ = await _company.save();

    res.cookie("jid", createRefreshToken(company_), cookieConf);

    return res.json({ data: company_, token: createAcessToken(company_) });
  }

  return res.json({ ok: false });
};
