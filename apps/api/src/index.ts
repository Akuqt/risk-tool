/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
import app from "./app";
import config from "./config";
import { connect } from "./database";

app.listen(config.PORT, async () => {
  console.log(`Local: http://localhost:${config.PORT}/api/v1/`);
  await connect();
});
