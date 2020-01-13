import createCrudMiddleware from "./crud-generator";
import defaults from "./defaults";

interface MiddlewareObject {
  defaults: any;
  createCrudMiddleware: any;
}

export default { createCrudMiddleware, defaults } as MiddlewareObject;
