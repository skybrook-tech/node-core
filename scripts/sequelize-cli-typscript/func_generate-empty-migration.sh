generate_empty_migration() {

migrationFileName="${1}/$(date +'%Y%m%d%H%M%S')-${2}.js"


echo $3
echo ""
echo "generating migration"

cat > $migrationFileName << EOF
"use strict"
module.exports = {
  up: async (queryInterface, sequelize) => {
    // up migration goes here
  },
  down: async (queryInterface) => {
    // down migration goes here
  }
};

EOF

prettier --write $migrationFileName

}