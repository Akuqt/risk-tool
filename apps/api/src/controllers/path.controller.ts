import { Response, Request } from "express";
import { WazeAPI } from "waze-api";
import { Coord } from "types";

const waze = new WazeAPI();

export const getPath = async (
  req: Request<any, any, { points: { lat: number; lng: number }[] }>,
  res: Response,
) => {
  const { points } = req.body;
  const routes: { origin: Coord; destination: Coord }[] = [];
  for (let i = 0; i < points.length; i++) {
    if (points[i + 1]) {
      routes.push({ origin: points[i], destination: points[i + 1] });
    }
  }
  const coords = [];
  let distance = 0;
  let time = 0;

  try {
    const proms: ReturnType<typeof waze.getPaths>[] = [];
    for (const route of routes) {
      proms.push(
        waze.getPaths({
          from: { y: route.origin.lat, x: route.origin.lng },
          to: { y: route.destination.lat, x: route.destination.lng },
          nPaths: 1,
          useCase: "LIVEMAP_PLANNING",
          interval: 15,
          arriveAt: true,
        }),
      );
    }

    const resolved = await Promise.all(proms);

    for (const r of resolved) {
      distance += r.alternatives[0].response.totalLength;
      time += r.alternatives[0].response.totalSeconds;
      coords.push(
        ...r.alternatives[0].coords.map((el) => ({
          lat: el.y,
          lng: el.x,
        })),
      );
    }
  } catch (error) {
    console.log(error);
  }

  res.json({
    distance,
    time,
    coords,
  });
};
