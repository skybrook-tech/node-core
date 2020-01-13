const createRecord = ({ Model, locals, body }: { Model: any; locals: any; body: any }) => {
  const { parent = {}, sequelizeParams = {} } = locals;
  const { parentId } = parent;

  const newRecord = { ...body, ...parentId };

  return Model.create(newRecord, sequelizeParams);
};

export default createRecord;
