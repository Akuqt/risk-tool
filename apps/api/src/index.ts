// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
import app from "./app";
import config from "./config";
import { connect } from "./database";

app.listen(config.PORT, () => {
  console.log(`Local: http://localhost:${config.PORT}/api/v1/`);
  connect();
});
