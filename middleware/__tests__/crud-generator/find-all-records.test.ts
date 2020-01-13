import findAllRecords from "../../crud-generator/find-all-records";
import db from "../../../db/models";
import createTestModel from "../../../factories/__testModel__";

afterAll(async () => {
  await db.__testModel__.destroy({ where: {} });
});

describe("crud-generator --- find-one-record -- basic", () => {
  it("returns all records", async () => {
    const expectedOne = await createTestModel();
    const expectedTwo = await createTestModel();
    const expectedThree = await createTestModel();
    const expectedRecordIds = [expectedOne.id, expectedTwo.id, expectedThree.id];

    const records = await findAllRecords({ Model: db.__testModel__ });

    const recordIds = records.map((record: any) => record.id);

    expect(records.length).toBe(3);
    expect(recordIds).toStrictEqual(expectedRecordIds);
  });
});

describe("crud-generator --- find-one-record -- which search criteria", () => {
  it("returns all records fitting a search criteria", async () => {
    const searchString = "same string";
    const searchCriteria = { attr1: searchString };

    await createTestModel();
    const expectedOne = await createTestModel({ props: { attr1: searchString } });
    const expectedThree = await createTestModel({ props: { attr1: searchString } });
    const expectedRecordIds = [expectedOne.id, expectedThree.id];

    const body = { criteria: searchCriteria };

    const records = await findAllRecords({ Model: db.__testModel__, body });

    const recordIds = records.map((record: any) => record.id);

    expect(records.length).toBe(2);
    expect(recordIds).toStrictEqual(expectedRecordIds);
  });
});
