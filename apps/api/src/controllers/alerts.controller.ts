import Websocket from "../websocket";
import { CompanyModel, DriverModel, LogModel } from "../models";
import { Request, Response } from "express";
import { errors } from "../lib";

export const newAlert = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const id = req.id;
  const { reason, description, company, lat, lng } = req.body;
  const driver_ = await DriverModel.findById(id);
  const company_ = await CompanyModel.findById(company);
  if (!driver_ || !company_) {
    return res.status(404).json({ ok: false, msg: errors.badRequest });
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
  });
  company_.logs.push(log);
  await log.save();
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
      createdAt: log.createdAt,
      updatedAt: log.updatedAt,
    },
    company,
    id: log._id,
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
    return res.status(404).json({ ok: false, msg: errors.badRequest });
  }
  return res.status(200).json({
    ok: true,
    logs: company_.logs.map((l) => ({
      ...l,
      id: l._id,
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
    return res.status(404).json({ ok: false, msg: errors.badRequest });
  }
  log_.action = action;
  await log_.save();
  return res.status(200).json({ ok: true });
};
