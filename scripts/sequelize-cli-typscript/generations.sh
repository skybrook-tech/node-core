#!/usr/local/bin/bash

BASE_DIR=$PWD
MODEL_DIR="${BASE_DIR}/src/db/models"
MIGRATIONS_DIR="${BASE_DIR}/src/db/migrations"
CONTROLLER_DIR="${BASE_DIR}/src/controllers"

source  "${BASE_DIR}/scripts/type-maps.sh"
source  "${BASE_DIR}/scripts/func_generate-table-migration.sh"
source  "${BASE_DIR}/scripts/func_generate-empty-migration.sh"
source  "${BASE_DIR}/scripts/func_generate-model-file.sh"
source  "${BASE_DIR}/scripts/func_generate-model-types.sh"
source  "${BASE_DIR}/scripts/func_generate-db-type.sh"
source  "${BASE_DIR}/scripts/func_generate-controller.sh"
source  "${BASE_DIR}/scripts/func_generate-controllers-index.sh"

generationType=$1
migrationName=${2,,}
modelName=$2
modelNameCaps="${modelName^}"
modelDir="${MODEL_DIR}/${modelNameCaps}"


migrationFields=''
modelFields=''
typeDefs=''

for column in "${@:3}"
do

    IFS=: read -ra colSplit <<<"$column"
    colName="${colSplit[0]}"
    colType=$(echo "${colSplit[1]}" | tr '[a-z]' '[A-Z]')

    if [ ${sequelize[$colType]+abc}  ]
    then
      migrationFields+="${colName}:{type:sequelize.${sequelize[$colType]}},"
      modelFields+="${colName}:{type:DataTypes.${sequelize[$colType]}},"
      typeDefs+="${colName}:${types[$colType]};"
    else 
      echo -e "\033[31mERROR:\e[0m" Datatype "'${colSplit[1]}'" does not exist. 1>&2
      exit 1
    fi
done



if [ $generationType == model ]
then
  if [ ! -d "$modelDir" ]; then
    mkdir $modelDir
    generate_table_migration $MIGRATIONS_DIR $migrationName $modelNameCaps $migrationFields
    generate_model_types $modelDir $modelNameCaps $typeDefs
    generate_model_file $modelDir $modelNameCaps $modelFields
    generate_db_type $MODEL_DIR
  else
    echo -e "\033[31mERROR:\e[0m" Model "'${modelName}'" already exists. 1>&2
    exit 1
  fi

elif [ $generationType == 'migration' ]
then
  generate_empty_migration $MIGRATIONS_DIR $migrationName

elif [ $generationType == 'controller' ]
then
  if [ ! -d "$modelDir" ]; then
    mkdir $modelDir
    generate_table_migration $MIGRATIONS_DIR $migrationName $modelNameCaps $migrationFields
    generate_model_types $modelDir $modelNameCaps $typeDefs
    generate_model_file $modelDir $modelNameCaps $modelFields
    generate_model_controller $CONTROLLER_DIR $modelNameCaps $modelName
    generate_controllers_index $CONTROLLER_DIR $modelNameCaps $modelName
    generate_db_type $MODEL_DIR
  else
    echo -e "\033[31mERROR:\e[0m" Model "'${modelName}'" already exists. 1>&2
    exit 1
  fi
else
  exit 1
fi
