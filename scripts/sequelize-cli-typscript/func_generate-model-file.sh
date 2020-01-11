generate_model_file() {

modelFileName="${1}/index.ts"
modelNameCaps=$2
migrationFields=$3

typeNameStatic="${modelNameCaps}ModelStatic"


echo $modelFileName
echo ""
echo "generating model definition"


cat > $modelFileName << EOF
"use strict";
import { DataTypes, Model, Sequelize } from "sequelize";
import { $typeNameStatic } from "./types";

module.exports = (sequelize: Sequelize) => {
  const $modelNameCaps = sequelize.define(
    "$modelNameCaps",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },      
      $migrationFields
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {}
  ) as $typeNameStatic & { associate: (models: Model) => void };

  $modelNameCaps.associate = (models) => {
    // associations go here
  };

  return $modelNameCaps;
};

EOF

prettier --write $modelFileName

}