import http from "http";
import cors from "cors";
import morgan from "morgan";
import config from "./config";
import routes from "./routes";
import events from "./events";
import express from "express";
import WebSocket from "./websocket";
import cookieParser from "cookie-parser";
import { swaggerUI, swaggerSpecs } from "./swagger";

const app = express();

app.use(
  cors({
    origin: config.CORS.ORIGIN,
    credentials: true,
  }),
);
/* istanbul ignore next */
if (config.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/v1", routes);
app.use(
  "/api/v1/docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpecs, {
    customSiteTitle: "Risk Tool Public Docs",
  }),
);

const httpServer = http.createServer(app);

const socket = new WebSocket(httpServer, {
  cors: { origin: "*" },
  path: "/api/v1/ws",
});

socket.init(events);

export default httpServer;
