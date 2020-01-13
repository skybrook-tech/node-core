import express, { Request, Response, NextFunction } from "express";
import defaultResponse from "../middleware/defaults/response";
import pluralize from "pluralize";
import { CreateControllerConfig, CreateControllerResult } from "./create-controller.types";

const addParentId = (parentIdKey: string) => (req: Request, res: Response, next: NextFunction) => {
  res.locals.parent = { parentId: { [parentIdKey]: req.params[parentIdKey] } };
  res.locals.context.pathIds = { ...req.params };

  next();
};

const getIncluded = (Model: any) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sequelizeParams = {}, context = {} } = res.locals;

    if (Model.getIncluded) {
      res.locals.sequelizeParams = { ...sequelizeParams, include: Model.getIncluded(context.db) };
    }

    next();
  } catch (error) {
    next(error);
  }
};

const createController = (config: CreateControllerConfig): CreateControllerResult => {
  const { Model = {}, path, middleware, customRoutes = [], nestedControllers = [] } = config;

  const router = express.Router({ mergeParams: true });

  const BASE_ROUTE = `/`;
  const BASE_ROUTE_ID = "/:id";

  const { create, getOne, getAll, update, destroy } = middleware;

  const sharedMiddleware = [getIncluded(Model)];

  if (create) {
    router.post(BASE_ROUTE, sharedMiddleware, create, defaultResponse);
  }

  if (getOne) {
    router.get(BASE_ROUTE_ID, sharedMiddleware, getOne, defaultResponse);
  }

  if (getAll) {
    router.get(BASE_ROUTE, sharedMiddleware, getAll, defaultResponse);
  }

  if (update) {
    router.patch(BASE_ROUTE_ID, sharedMiddleware, update, defaultResponse);
  }

  if (destroy) {
    router.delete(BASE_ROUTE_ID, sharedMiddleware, destroy, defaultResponse);
  }

  customRoutes.forEach(route => {
    // @ts-ignore
    router[route.method](route.endpoint, sharedMiddleware, route.middleware, defaultResponse);
  });

  nestedControllers.forEach(nestedController => {
    const { path: nestedPath, Model: nestedModel } = nestedController.config;

    const parentIdParam = `${pluralize.singular(Model.name.toLowerCase())}Id`;
    const pathWithParentParams = `/:${parentIdParam}/${nestedPath ||
      nestedModel.name.toLowerCase()}`;

    router.use(pathWithParentParams, addParentId(parentIdParam), nestedController.router);
  });

  return { router, config };
};

export default createController;
