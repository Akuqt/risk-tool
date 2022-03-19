import swaggerUI from "swagger-ui-express";
import swaggerJsDoc, { Options } from "swagger-jsdoc";

const swaggerOpts: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Risk Tool API",
      version: "1.0.0",
      description: "Core API for the Risk Tool project",
    },
    servers: [
      {
        url: "http://localhost:4000/api/v1",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpecs = swaggerJsDoc(swaggerOpts);

export { swaggerUI, swaggerSpecs };
