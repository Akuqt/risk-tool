import { Response, Request } from "express";
import { WazeAPI } from "waze-api";

const waze = new WazeAPI();

export const getAlerts = async (req: Request, res: Response) => {
  const { lat, lng } = req.body;
  const resWaze = await waze.getInfo(lat, lng, {
    hideTraffic: true,
    hideUsers: true,
  });
  /* istanbul ignore next */
  const result = resWaze.alerts?.map((el) => ({
    city: el.city,
    type: el.type,
    location: {
      lat: el.location.y,
      lng: el.location.x,
    },
    description: el.reportDescription || "",
    street: el.street,
    date: el.pubMillis,
  }));
  return res.json({
    result,
  });
};

export const getTraffic = async (req: Request, res: Response) => {
  const { lat, lng } = req.body;
  const resWaze = await waze.getInfo(lat, lng, {
    hideAlerts: true,
    hideUsers: true,
  });
  /* istanbul ignore next */
  const result = resWaze.jams
    ?.map((el) => ({
      city: el.city,
      speedKh: el.speedKMH,
      path: el.line.map((loc) => ({ lat: loc.y, lng: loc.x })),
      description: el.blockDescription || "",
      date: el.updateMillis,
      street: el.street,
      level: el.level,
      time: el.length / el.speed,
      d: el.length,
    }))
    .filter((el: any) => el.speedKh !== 0);
  return res.json({
    result,
  });
};
