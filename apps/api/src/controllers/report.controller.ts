import axios from "axios";
import { Response, Request } from "express";

axios.defaults.adapter = require("axios/lib/adapters/http");

const query = (type: "traffic" | "alerts", lat: number, lng: number) => {
  const deltaV = lat * 0.012;
  const deltaH = lng * 0.0016;
  return axios.get(
    `https://www.waze.com/row-rtserver/web/TGeoRSS?bottom=${
      lat - deltaV
    }&left=${lng + deltaH}&ma=200&mj=200&mu=20&right=${lng - deltaH}&top=${
      lat + deltaV
    }&types=${type}`,
  );
};

export const getAlerts = async (req: Request, res: Response) => {
  const { lat, lng } = req.body;
  const resWaze = await query("alerts", lat, lng);
  const result = resWaze.data.alerts.map((el: any) => ({
    city: el.city,
    type: el.type,
    location: {
      lat: el.location.y,
      lng: el.location.x,
    },
    description: el.reportDescription || "",
    street: el.street || "",
    date: el.pubMillis,
  }));
  return res.json({
    result,
  });
};

export const getTraffic = async (req: Request, res: Response) => {
  const { lat, lng } = req.body;
  const resWaze = await query("traffic", lat, lng);
  const result = resWaze.data.jams
    .map((el: any) => ({
      city: el.city,
      speedKh: el.speedKMH,
      path: el.line.map((loc: any) => ({ lat: loc.y, lng: loc.x })),
      description: el.blockDescription || "",
      date: el.updateMillis,
      street: el.street || "",
      level: el.level,
      time: el.length / el.speed,
    }))
    .filter((el: any) => el.speedKh !== 0);
  return res.json({
    result,
  });
};
