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

    if (!_driver) return res.status(401).json({ ok: false });

    const matchPass = await comparePassword(_driver.password, password);

    if (!matchPass) return res.status(401).json({ ok: false });

    res.cookie("jid", createRefreshToken(_driver), cookieConf);

    return res.json({
      ok: true,
      result: {
        data: {
          name: _driver.name,
          id: _driver._id,
          username: _driver.username,
          plate: _driver.plate,
          lat: _driver.lat,
          lng: _driver.lng,
          role: _driver.role.name,
          company: {
            name: _driver.company.name,
            id: _driver.company._id,
            address: _driver.company.address,
            lat: _driver.company.lat,
            lng: _driver.company.lng,
          },
        },
        token: createAcessToken(_driver),
      },
    });
  }

  if (type === "company") {
    const _company: ICompany | null = await CompanyModel.findOne({
      username,
    }).populate("role");

    if (!_company) return res.status(401).json({ ok: false });

    const matchPass = await comparePassword(_company.password, password);

    if (!matchPass) return res.status(401).json({ ok: false });

    const _drivers: IDriver[] = await DriverModel.find()
      .populate("company")
      .where({
        company: _company,
      });

    res.cookie("jid", createRefreshToken(_company), cookieConf);

    return res.json({
      ok: true,
      result: {
        data: {
          name: _company.name,
          id: _company._id,
          username: _company.username,
          lat: _company.lat,
          lng: _company.lng,
          address: _company.address,
          materials: _company.materials,
          role: _company.role.name,
          drivers: _drivers.map((d) => ({
            name: d.name,
            id: d._id,
            plate: d.plate,
          })),
        },
        token: createAcessToken(_company),
      },
    });
  }

  return res.status(401).json({ ok: false });
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
      return res.status(401).json({ ok: false });
    }

    const _driver = new DriverModel({
      lat: _company2.lat,
      lng: _company2.lng,
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

    return res.json({
      ok: true,
      result: {
        data: {
          name: driver_.name,
          id: driver_._id,
          username: driver_.username,
          plate: driver_.plate,
          lat: driver_.lat,
          lng: driver_.lng,
          role: driver_.role.name,
          company: {
            name: driver_.company.name,
            id: driver_.company._id,
            address: driver_.company.address,
            lat: driver_.company.lat,
            lng: driver_.company.lng,
          },
        },
        token: createAcessToken(driver_),
      },
    });
  }

  if (type === "company") {
    const _company2: ICompany | null = await CompanyModel.findOne({
      username,
    });
    const _role2: IRole | null = await RoleModel.findOne({ name: type });

    if (_company2 || !_role2) {
      return res.status(401).json({ ok: false });
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

    return res.json({
      ok: true,
      result: {
        data: {
          name: company_.name,
          id: company_._id,
          username: company_.username,
          lat: company_.lat,
          lng: company_.lng,
          address: company_.address,
          materials: company_.materials,
          role: company_.role.name,
          drivers: [],
        },
        token: createAcessToken(company_),
      },
    });
  }

  return res.status(401).json({ ok: false });
};
