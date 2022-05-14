import { errors, getBestRoutePath } from "../lib";
import { Response, Request } from "express";
import { WazeAPI } from "waze-api";
import { Coord } from "types";

const waze = new WazeAPI();

type WazeAlt = Awaited<ReturnType<typeof waze.getPaths>>["alternatives"][0];

const pathMap = (alt: WazeAlt) => ({
  coords: alt.coords.map((coord) => ({
    lat: coord.y,
    lng: coord.x,
  })) as Coord[],
  time: alt.response.totalSeconds,
  distance: alt.response.totalLength,
});

const fetchPath = async (from: Coord, to: Coord, n = 1) => {
  const path = await waze.getPaths({
    from: {
      y: from.lat,
      x: from.lng,
    },
    to: {
      y: to.lat,
      x: to.lng,
    },
    nPaths: n,
    interval: 15,
    arriveAt: true,
    useCase: "LIVEMAP_PLANNING",
  });

  return path;
};

export const getBestPath = async (req: Request, res: Response) => {
  const { origin, destination } = req.body as {
    origin: Coord;
    destination: Coord;
  };

  if (!origin || !destination) {
    return res.status(400).json({ ok: false, error: errors.badRequest });
  }

  const { fixedPath, nextDestination, nextOrigin } = getBestRoutePath(
    origin,
    destination,
  );

  if (!fixedPath) {
    return res.status(400).json({ ok: false, error: errors.generic });
  }

  const originPath = await fetchPath(origin, nextOrigin, 3);
  const destinationPath = await fetchPath(destination, nextDestination, 3);

  const result = {
    fixedPath,
    originPath: originPath.alternatives.map(pathMap),
    destinationPath: destinationPath.alternatives.map(pathMap),
  };

  for (const a of result.originPath) {
    console.log(a.distance);
  }
  for (const a of result.destinationPath) {
    console.log(a.distance);
  }

  return res.status(200).json({
    ok: true,
    result,
  });
};

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
  } catch (error: any) {
    /* istanbul ignore next */
    return res.json({ ok: false, error: errors.generic });
  }

  res.json({
    distance,
    time,
    coords,
  });
};
