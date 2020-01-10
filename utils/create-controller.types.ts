import * as express from "express";

export type MiddlewareFunction = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => void;

interface CreateControllerMiddleware {
  create?: MiddlewareFunction[];
  destroy?: MiddlewareFunction[];
  getAll?: MiddlewareFunction[];
  getOne?: MiddlewareFunction[];
  update?: MiddlewareFunction[];
}

export interface CreateControllerResult {
  config: CreateControllerConfig;
  router?: express.Router;
}

export interface CustomRoute {
  method: string;
  endpoint: string;
  middleware: MiddlewareFunction[];
}

export interface CreateControllerConfig {
  Model: any;
  middleware: CreateControllerMiddleware;
  path?: string;
  customRoutes?: CustomRoute[];
  nestedControllers?: CreateControllerResult[];
}
