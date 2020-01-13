import isInteger from "lodash/isInteger";

const findOneRecord = ({
  Model,
  locals = {},
  body = {},
  params = { id: null }
}: {
  Model: any;
  locals?: any;
  body?: any;
  params?: any;
}) => {
  const { parent = {}, sequelizeParams = {} } = locals;
  const { parentId } = parent;
  const { id } = params;

  const { criteria = { ...parentId } } = body;

  if (isInteger(parseInt(id, 10))) {
    criteria.id = id;
  } else {
    criteria.uuid = id;
  }

  return Model.findOne({ where: { ...criteria }, ...sequelizeParams });
};

export default findOneRecord;
