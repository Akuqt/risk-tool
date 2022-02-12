import cors from "cors";
import morgan from "morgan";
import config from "./config";
import routes from "./routes";
import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: config.CORS.ORIGIN,
    credentials: true,
  }),
);
if (config.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/v1", routes);

export default app;
