import destroyRecord from "../../crud-generator/destroy-record";
import findOneRecord from "../../crud-generator/find-one-record";
import db from "../../../db/models";
import createTestModel from "../../../factories/__testModel__";
import errors from "../../../errors";

afterAll(async () => {
  await db.__testModel__.destroy({ where: {} });
});

describe("crud-generator --- destroy-record -- basic", () => {
  it("destroys a record provided an id", async () => {
    const record = await createTestModel();

    const params = { id: record.id };

    const destroyResponse = await destroyRecord({ Model: db.__testModel__, params });

    const expected = await findOneRecord({ Model: db.__testModel__, params });

    expect(destroyResponse).toBe(1);
    expect(expected).toBe(null);
  });
});

describe("crud-generator --- destroy-record -- record not found", () => {
  it("returns error", async () => {
    const params = { id: 1 };

    try {
      await destroyRecord({ Model: db.__testModel__, params });
    } catch (error) {
      expect(error.status).toBe(errors.crud.RECORD_NOT_FOUND.status);
      expect(error).toStrictEqual(errors.crud.RECORD_NOT_FOUND);
    }
  });
});
