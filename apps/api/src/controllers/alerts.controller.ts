import Websocket from "../websocket";
import { CompanyModel, DriverModel, LogModel } from "../models";
import { Request, Response } from "express";
import { errors } from "../lib";

export const newAlert = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const id = req.id;
  const { reason, description, company, lat, lng, material, destination } =
    req.body;
  const driver_ = await DriverModel.findById(id);
  const company_ = await CompanyModel.findById(company);
  if (!driver_ || !company_) {
    return res.status(400).json({ ok: false, msg: errors.badRequest });
  }
  const log = new LogModel({
    alert: {
      reason,
      description,
    },
    action: "None",
    lat,
    lng,
    driver: id,
    material,
    destination,
  });
  company_.logs.push(log);
  const log_ = await log.save();
  await company_.save();
  Websocket.emit("company:newAlert", {
    log: {
      alert: {
        reason,
        description,
      },
      action: "None",
      lat,
      lng,
      driver: id,
      createdAt: log_.createdAt,
      updatedAt: log_.updatedAt,
      id: log_._id,
      material,
      destination,
    },
    company,
  });
  return res.status(200).json({ ok: true });
};

export const getCompanyAlerts = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const id = req.id;
  const company_ = await CompanyModel.findById(id).populate("logs");
  if (!company_) {
    return res.status(400).json({ ok: false, msg: errors.badRequest });
  }

  return res.status(200).json({
    ok: true,
    logs: company_.logs.reverse().map((l) => ({
      id: l._id,
      alert: {
        reason: l.alert.reason,
        description: l.alert.description,
      },
      action: l.action,
      lat: l.lat,
      lng: l.lng,
      driver: l.driver,
      createdAt: l.createdAt,
      updatedAt: l.updatedAt,
      material: l.material,
      destination: l.destination,
    })),
  });
};

export const setLogAction = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const id = req.id;
  const { action, log } = req.body;
  const company_ = await CompanyModel.findById(id);
  const log_ = await LogModel.findById(log);
  if (!company_ || !log_) {
    return res.status(400).json({ ok: false, msg: errors.badRequest });
  }
  log_.action = action;
  await log_.save();
  return res.status(200).json({ ok: true });
};

export const getDriverLogs = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const id = req.id;
  const logs_ = await LogModel.find({ driver: id });
  if (!logs_) {
    return res.status(400).json({ ok: false, msg: errors.badRequest });
  }

  return res.status(200).json({
    ok: true,
    result: logs_.reverse().map((l) => ({
      id: l._id,
      alert: {
        reason: l.alert.reason,
        description: l.alert.description,
      },
      action: l.action,
      lat: l.lat,
      lng: l.lng,
      driver: l.driver,
      createdAt: l.createdAt,
      updatedAt: l.updatedAt,
      material: l.material,
      destination: l.destination,
    })),
  });
};
