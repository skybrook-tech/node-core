import createRecord from "../../crud-generator/create-record";
import db from "../../../db/models";

afterAll(async () => {
  await db.__testModel__.destroy({ where: {} });
});

describe("crud-generator --- create-record -- basic", () => {
  it("creates a new record for a model with seqelize create", async () => {
    const locals = {};

    const body = {
      attr1: "valueOne",
      attr2: 1,
      attr3: true
    };
    const expected = { id: 1, ...body };

    const record = await createRecord({ Model: db.__testModel__, locals, body });

    expect(record.attr1).toBe(expected.attr1);
    expect(record.attr2).toBe(expected.attr2);
    expect(record.attr3).toBe(expected.attr3);
    expect(record).toHaveProperty("createdAt");
    expect(record).toHaveProperty("updatedAt");
    expect(record).toHaveProperty("id");
  });
});

describe("crud-generator --- create-record -- with related and sequelizeParams", () => {
  it("creates a new record and nested models which were included", async () => {
    const include = [{ model: db.__testModelRelated__ }];

    const locals = { sequelizeParams: { include } };
    const expectedRelatedValue = "related Value one";

    const body = {
      attr1: "valueOne",
      attr2: 1,
      attr3: true,
      __testModelRelated__s: [{ attr1: expectedRelatedValue }],
      foo: "bar"
    };

    const record = await createRecord({ Model: db.__testModel__, locals, body });

    expect(record).toHaveProperty("__testModelRelated__s");
    expect(record.__testModelRelated__s[0]).toHaveProperty("id");
    expect(record.__testModelRelated__s[0].attr1).toBe(expectedRelatedValue);
  });
});
