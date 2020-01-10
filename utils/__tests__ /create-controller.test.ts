import express from "express";
import { MiddlewareFunction } from "../create-controller.types";
import db from "../../db/models";
import request from "supertest";
import createController from "../create-controller";

const app = express();

const createResponseMiddleware = (response: any): MiddlewareFunction => (req, res, next) => {
  res.locals.response = response;
  next();
};

describe("createController normal and nested", () => {
  const nestedController = createController({
    Model: db.__testModelRelated__,
    middleware: {
      getOne: [createResponseMiddleware("getOne nested")],
      getAll: [createResponseMiddleware("getAll nested")],
      create: [createResponseMiddleware("create nested")],
      destroy: [createResponseMiddleware("destroy nested")],
      update: [createResponseMiddleware("update nested")]
    }
  });

  const testController = createController({
    Model: db.__testModel__,
    middleware: {
      getOne: [createResponseMiddleware("getOne")],
      getAll: [createResponseMiddleware("getAll")],
      create: [createResponseMiddleware("create")],
      destroy: [createResponseMiddleware("destroy")],
      update: [createResponseMiddleware("update")]
    },
    nestedControllers: [nestedController]
  });

  app.use("/test_model", testController.router);

  [
    {
      path: "/test_model",
      expected: "getAll",
      description: "GET /test_model",
      method: request(app).get
    },
    {
      path: "/test_model/122",
      expected: "getOne",
      description: "GET /test_model/122",
      method: request(app).get
    },
    {
      path: "/test_model",
      expected: "create",
      description: "POST /test_model",
      method: request(app).post
    },
    {
      path: "/test_model/122",
      expected: "destroy",
      description: "DELETE /test_model/122",
      method: request(app).delete
    },
    {
      path: "/test_model/122",
      expected: "update",
      description: "PATCH /test_model/122",
      method: request(app).patch
    },
    {
      path: "/test_model/122/test_model_nested",
      expected: "getAll nested",
      description: "GET /test_model/122/test_model_nested",
      method: request(app).get
    },
    {
      path: "/test_model/122/test_model_nested/122",
      expected: "getOne nested",
      description: "GET /test_model/122/test_model_nested/122",
      method: request(app).get
    },
    {
      path: "/test_model/122/test_model_nested",
      expected: "create nested",
      description: "POST /test_model/122/test_model_nested",
      method: request(app).post
    },
    {
      path: "/test_model/122/test_model_nested/122",
      expected: "destroy nested",
      description: "DELETE /test_model/122/test_model_nested/122",
      method: request(app).delete
    },
    {
      path: "/test_model/122/test_model_nested/122",
      expected: "update nested",
      description: "PATCH /test_model/122/test_model_nested/122",
      method: request(app).patch
    }
  ].forEach(({ path, expected, description, method }) => {
    describe(description, () => {
      it("returns expected response", async done => {
        method(path)
          .expect(200, expected)
          .end(() => {
            done();
          });
      });
    });
  });
});
