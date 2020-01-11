generate_model_controller() {

  

fileName="${1}/${3}.ts"


echo ""
echo "generating controllers"

cat > $fileName << EOF
"use strict";
import createController from "../utils/create-controller";
import middleware from "../middleware";
import db from "../db/models";

const $2Crud = middleware.createCrudMiddleware(db.$2);

export default createController({
  model: "$2",
  Model: db.$2,
  middleware: {
    create: [$2Crud.create],
    getOne: [$2Crud.findOne],
    getAll: [$2Crud.findAll],
    update: [$2Crud.update],
    destroy: [$2Crud.destroy]
  },
  nestedControllers: []
});


EOF

prettier --write $fileName

}