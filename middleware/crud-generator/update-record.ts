import errors from "../../errors";

const updateRecord = async ({
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

  const entity = await Model.findOne({ where: { id, ...criteria }, ...sequelizeParams });

  if (!entity) {
    throw errors.crud.RECORD_NOT_FOUND;
  }

  return entity.update({ ...body });
};

export default updateRecord;
