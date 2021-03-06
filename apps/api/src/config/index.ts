/* istanbul ignore next */
export default {
  PORT: process.env.PORT || 4000,
  NODE_ENV: process.env.NODE_ENV,
  JWT: {
    ACCESS: process.env.JWT_ACCESS || "acc",
    REFRESH: process.env.JWT_REFRESH || "ref",
  },
  MONGODB: {
    URI: process.env.MONGODB_URI || "mongodb://localhost/risk",
    TEST_URI: process.env.MONGODB_URI_TEST || "mongodb://localhost/risk2",
  },
  CORS: {
    ORIGIN: ["*", "http://localhost:3000", "https://risk-tool.xyz"],
  },
};
