import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import middleware from "../middleware";
import bodyParser from "body-parser";

interface Config {
  routes?: any;
  globalMiddleware?: any;
}

interface Locals {
  context: any;
  response: { data: any };
}

const locals = {
  context: {},
  response: { data: null }
} as Locals;

const setupServerDefaults = (config: Config = {}) => {
  const { routes, globalMiddleware } = config;

  const app = express();

  dotenv.config();

  app.use((req, res, next) => {
    res.locals = { ...locals };
    next();
  });

  app.use(express.json());
  app.use(bodyParser.json());

  app.use(cors());
  app.use(middleware.defaults.authentication.initializePassport);

  if (globalMiddleware) {
    app.use(globalMiddleware);
  }

  if (routes) {
    app.use(routes);
  }

  app.use(middleware.defaults.errorHandler);

  return app;
};

export default setupServerDefaults;
