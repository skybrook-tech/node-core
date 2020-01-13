const findAllRecords = ({
  Model,
  locals = {},
  body = {}
}: {
  Model: any;
  locals?: any;
  body?: any;
}) => {
  const { parent = {}, sequelizeParams = {} } = locals;
  const { parentId } = parent;
  const { criteria = { ...parentId } } = body;

  return Model.findAll({ where: { ...criteria }, ...sequelizeParams });
};

export default findAllRecords;
