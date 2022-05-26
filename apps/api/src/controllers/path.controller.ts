import WebSocket from "../websocket";
import { errors, getBestRoutePath, getDistanceKm } from "../lib";
import { CompanyModel, RouteModel, DriverModel } from "../models";
import { Coord, BaseBestPath } from "types";
import { Response, Request } from "express";
import { WazeAPI } from "waze-api";

const waze = new WazeAPI();

type WazeAlt = Awaited<ReturnType<typeof waze.getPaths>>["alternatives"][0];

const createRoute = (fixed: Coord[], origin: Coord[], destination: Coord[]) => {
  let path: Coord[] = [];

  if (
    getDistanceKm(origin[origin.length - 1], fixed[fixed.length - 1]) >
    getDistanceKm(origin[0], fixed[fixed.length - 1])
  ) {
    path = [...fixed, ...origin];
  } else {
    path = [...fixed, ...origin.reverse()];
  }

  /* istanbul ignore next */
  if (
    getDistanceKm(destination[destination.length - 1], path[0]) >
    getDistanceKm(destination[0], path[0])
  ) {
    path = [...destination.reverse(), ...path];
  } else {
    path = [...destination, ...path];
  }

  return path.reverse();
};

/* istanbul ignore next */
const pathMap = (alt: WazeAlt) => ({
  coords: alt.coords.map((coord) => ({
    lat: coord.y,
    lng: coord.x,
  })) as Coord[],
  time: alt.response.totalSeconds,
  distance: alt.response.totalLength,
});

/* istanbul ignore next */
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

/* istanbul ignore next */
const randomColor = () =>
  "#" +
  Math.floor(Math.random() * 16777215)
    .toString(16)
    .padEnd(6, "0");

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

  /* istanbul ignore next */
  if (fixedPath.length === 0) {
    return res.status(400).json({ ok: false, error: errors.generic });
  }

  const originPath = await fetchPath(origin, nextOrigin, 3);
  const destinationPath = await fetchPath(destination, nextDestination, 3);

  const alternatives: BaseBestPath[] = [];

  const result = {
    fixedPath,
    originPath: originPath.alternatives.map(pathMap),
    destinationPath: destinationPath.alternatives.map(pathMap),
  };

  for (const fixed of result.fixedPath) {
    for (const org of result.originPath) {
      for (const dest of result.destinationPath) {
        alternatives.push({
          coords: createRoute(fixed.coords, org.coords, dest.coords),
          time: org.time + dest.time + fixed.time,
          distance: org.distance + dest.distance + fixed.distance,
        });
      }
    }
  }

  return res.status(200).json({
    ok: true,
    result: alternatives.sort(
      (a, b) => a.time + a.distance - b.time - b.distance,
    ),
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

export const addRoutePath = async (req: Request, res: Response) => {
  const id = req.id;
  const { fixed, risk, distance, time, material, driver, address, dlat, dlng } =
    req.body as {
      time: number;
      distance: number;
      risk: number;
      fixed: Coord[];
      material: string;
      driver: string;
      address: string;
      dlat: number;
      dlng: number;
    };

  /* istanbul ignore next */
  if (
    !fixed ||
    fixed.length === 0 ||
    !risk ||
    !distance ||
    !time ||
    !address ||
    !material ||
    !driver ||
    !dlat ||
    !dlng
  ) {
    return res.status(400).json({ ok: false, error: errors.badRequest });
  }
  const company = await CompanyModel.findById(id);
  const driver_ = await DriverModel.findById(driver);
  const routes_ = await RouteModel.find({ driver })
    .where("active")
    .equals(true);

  /* istanbul ignore next */
  if (routes_.length > 0) {
    for (const r of routes_) {
      r.active = false;
      await r.save();
    }
  }

  /* istanbul ignore next */
  if (!company || !driver_) {
    return res.status(404).json({ ok: false, error: errors.invalidAuth });
  }

  driver_.active = true;
  driver_.lat = company.lat;
  driver_.lng = company.lng;
  driver_.material = material;
  driver_.route = fixed;
  driver_.address = address;
  driver_.dlat = dlat;
  driver_.dlng = dlng;

  const route = new RouteModel({
    risk,
    distance,
    time,
    coords: fixed,
    material,
    driver,
    address,
    active: true,
  });

  company.routes.push(route);

  await route.save();
  await driver_.save();
  await company.save();

  WebSocket.emit("driver:route", {
    id: driver,
    data: { route: route.coords, material, address, dlat, dlng },
  });

  res.json({ ok: true });
};

export const getRoutePaths = async (req: Request, res: Response) => {
  const id = req.id;

  const company = await CompanyModel.findById(id).populate("routes");

  /* istanbul ignore next */
  if (!company) {
    return res.status(404).json({ ok: false, error: errors.invalidAuth });
  }

  /* istanbul ignore next */
  const result = company.routes.map((route) => ({
    color: randomColor(),
    risk: route.risk,
    distance: route.distance,
    time: route.time,
    material: route.material,
    driver: route.driver,
    coords: route.coords,
    createdAt: route.createdAt,
    updatedAt: route.updatedAt,
    id: route._id,
    address: route.address,
    active: route.active,
  }));

  res.json({ ok: true, result });
};

export const endRoute = async (req: Request, res: Response) => {
  const id = req.id;
  const { current, destination } = req.body as {
    current: Coord;
    destination: Coord;
  };

  if (!current || !destination) {
    return res.status(400).json({ ok: false, error: errors.badRequest });
  }
  const distance = getDistanceKm(current, destination);

  if (distance > 0.1) {
    return res.status(400).json({ ok: false, error: errors.invalidEndOfRoute });
  }

  const driver = await DriverModel.findById(id).populate("company");

  const route = await RouteModel.findOne({
    driver: id,
  })
    .where("active")
    .equals(true);

  /* istanbul ignore next */
  if (!driver || !route) {
    return res.status(401).json({ ok: false, error: errors.invalidAuth });
  }
  const company = await CompanyModel.findById(driver.company._id);

  /* istanbul ignore next */
  if (!company) {
    return res.status(401).json({ ok: false, error: errors.invalidAuth });
  }

  route.active = false;
  driver.active = false;
  driver.dlng = null;
  driver.dlat = null;
  driver.lat = company.lat;
  driver.lng = company.lng;
  driver.route = [];
  driver.material = "";
  driver.address = "";

  await route.save();
  await driver.save();

  WebSocket.emit("disable:route", {
    route: route.id,
    driver: id,
    company: company.id,
  });

  res.json({ ok: true });
};
