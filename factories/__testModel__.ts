import createRecord from "../middleware/crud-generator/create-record";
import db from "../../db/models";
import faker from "faker";

const createTestModelRecord = (options?: any) => {
  const { props = {} } = options || {};

  const include = [{ model: db.__testModelRelated__ }];

  const locals = { sequelizeParams: { include } };

  const body = {
    attr1: faker.random.word(),
    attr2: faker.random.number(),
    attr3: faker.random.boolean(),
    ...props
  };

  return createRecord({ Model: db.__testModel__, locals, body });
};

export default createTestModelRecord;
