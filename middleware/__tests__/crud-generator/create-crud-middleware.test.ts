"use strict";
import createCrudMiddleware from "../../crud-generator/create-crud-middleware";
import db from "../../../db/models";
import setupServerDefaults from "../../../utils/setup-server-defaults";
import express from "express";
import createController from "../../../utils/create-controller";
import request from "supertest";
import createTestModel from "../../../factories/__testModel__";
import findOneRecord from "../../crud-generator/find-one-record";

const router = express.Router();

const testModelCrudMiddleware = createCrudMiddleware(db.__testModel__);
const testModelEndpoint = "/testModel";

const testController = createController({
  Model: db.__testModel__,
  middleware: {
    create: [testModelCrudMiddleware.create],
    getOne: [testModelCrudMiddleware.findOne],
    getAll: [testModelCrudMiddleware.findAll],
    update: [testModelCrudMiddleware.update],
    destroy: [testModelCrudMiddleware.destroy]
  }
});

const app = setupServerDefaults({ routes: router.use(testModelEndpoint, testController.router) });

afterEach(async () => {
  await db.__testModel__.destroy({ where: {} });
});

describe(`crud-generator --- createCrudMiddleware -- object keys`, () => {
  it("return an object with the correct properties", async () => {
    const expectedProperties = ["create", "findOne", "findAll", "update", "destroy"];
    const actualProperties = Object.keys(testModelCrudMiddleware);

    expect(actualProperties).toStrictEqual(expectedProperties);
  });
});

describe(`crud-generator --- createCrudMiddleware -- create`, () => {
  it("returns status 200 and a newly created record", done => {
    const requestBody = { attr1: "foo", attr2: 3, attr3: true };
    const endpoint = testModelEndpoint;

    request(app)
      .post(endpoint)
      .set("Accept", "application/json")
      .send(requestBody)
      .expect("Content-Type", /json/)
      .expect(res => {
        const expected = requestBody;
        const actual = res.body.data;

        expect(actual.attr1).toBe(expected.attr1);
        expect(actual.attr2).toBe(expected.attr2);
        expect(actual.attr3).toBe(expected.attr3);
        expect(actual).toHaveProperty("createdAt");
        expect(actual).toHaveProperty("updatedAt");
        expect(actual).toHaveProperty("id");
      })
      .expect(200)
      .end(done);
  });
});

describe(`crud-generator --- createCrudMiddleware -- findOne`, () => {
  it("returns status 200 and a record by id", async done => {
    const expected = await createTestModel({ attr1: "foo", attr2: 3, attr3: true });
    const endpoint = `${testModelEndpoint}/${expected.id}`;

    request(app)
      .get(endpoint)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(res => {
        const actual = res.body.data.id;
        expect(actual).toBe(expected.id);
      })
      .expect(200)
      .end(done);
  });
});

describe(`crud-generator --- createCrudMiddleware -- findAll`, () => {
  it("returns status 200 and an array of records", async done => {
    await createTestModel();
    await createTestModel();
    await createTestModel();

    const endpoint = `${testModelEndpoint}`;

    request(app)
      .get(endpoint)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(res => {
        const actual = res.body.data;

        expect(Array.isArray(actual)).toBe(true);

        expect(actual.length).toBe(3);
      })
      .expect(200)
      .end(done);
  });
});

describe(`crud-generator --- createCrudMiddleware -- update`, () => {
  it("returns status 200 and updated record", async done => {
    const recordId = await createTestModel({ attr1: "foo", attr2: 3, attr3: true });
    const endpoint = `${testModelEndpoint}/${recordId.id}`;

    const updatedAttributes = { attr1: "updated", attr2: 42 };

    request(app)
      .patch(endpoint)
      .send(updatedAttributes)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(async res => {
        const expected = updatedAttributes;
        const actual = res.body.data;

        expect(actual.attr1).toBe(expected.attr1);
        expect(actual.attr2).toBe(expected.attr2);
      })
      .expect(200)
      .end(done);
  });
});

describe(`crud-generator --- createCrudMiddleware -- destroy`, () => {
  it("deletes record and returns status 200 and success", async done => {
    const expected = await createTestModel({ attr1: "foo", attr2: 3, attr3: true });
    const endpoint = `${testModelEndpoint}/${expected.id}`;

    request(app)
      .delete(endpoint)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(async res => {
        const recordDeleted = await findOneRecord({
          Model: db.__testModel__,
          params: { id: expected.id }
        });

        expect(recordDeleted).toBe(null);
        expect(res.body.success).toBe(true);
      })
      .expect(200)
      .end(done);
  });
});
