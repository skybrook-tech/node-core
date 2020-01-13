import updateRecord from "../../crud-generator/update-record";
import db from "../../../db/models";
import createTestModel from "../../../factories/__testModel__";
import errors from "../../../errors";

afterAll(async () => {
  await db.__testModel__.destroy({ where: {} });
});

describe("crud-generator --- update-record -- basic", () => {
  it("returns updated record", async () => {
    const valueBeforeUpdate = "valueBeforeUpdate";
    const valueAfterUpdate = "valueAfterUpdate";

    const record = await createTestModel({ props: { attr1: valueBeforeUpdate } });

    const params = { id: record.id };
    const body = { attr1: valueAfterUpdate };

    const updatedRecord = await updateRecord({ Model: db.__testModel__, params, body });

    expect(updatedRecord.attr1).toBe(valueAfterUpdate);
  });
});

describe("crud-generator --- update-record -- record not found", () => {
  it("returns error", async () => {
    const params = { id: 1 };
    const body = { attr1: "mock update" };

    try {
      await updateRecord({ Model: db.__testModel__, params, body });
    } catch (error) {
      expect(error.status).toBe(errors.crud.RECORD_NOT_FOUND.status);
      expect(error).toStrictEqual(errors.crud.RECORD_NOT_FOUND);
    }
  });
});
