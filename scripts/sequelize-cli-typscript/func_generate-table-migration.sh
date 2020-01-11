generate_table_migration() {

migrationFileName="${1}/$(date +'%Y%m%d%H%M%S')-create-${2}.js"
modelNameCaps=$3
migrationFields=$4



echo $3
echo ""
echo "generating migration"

cat > $migrationFileName << EOF
"use strict"
module.exports = {
  up: async (queryInterface, sequelize) => {
    return queryInterface.createTable("$modelNameCaps", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize.INTEGER
      },
      $migrationFields
      createdAt: {
        allowNull: false,
        type: sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: sequelize.DATE
      }
    });
  },
  down: async (queryInterface, sequelize) => {
    return queryInterface.dropTable("$modelNameCaps");
  }
};

EOF

prettier --write $migrationFileName

}