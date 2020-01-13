import errors from "../../errors";

const destroyRecord = async ({ Model, params = { id: null } }: { Model: any; params?: any }) => {
  const { id } = params;

  const entity = await Model.findOne({ where: { id } });

  if (!entity) {
    throw errors.crud.RECORD_NOT_FOUND;
  }

  return Model.destroy({ where: { id } });
};

export default destroyRecord;
