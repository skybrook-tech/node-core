generate_db_type() {

MODEL_DIR=$1
modelTypeFileName="${MODEL_DIR}/db.types.ts"
modelTypes=''
modelImports=''


for d in $MODEL_DIR/*/ ; do
    echo $d
    modelDir=$(basename $d)
    modelName="${modelDir^}"
    modelType="${modelName}ModelStatic"
    modelTypes+="$modelName: ${modelType};"
    modelImports+="import { ${modelType} } from './${modelDir}/types';";

done

echo $modelTypes
echo ""
echo "generating DB type"

cat > $modelTypeFileName << EOF
import { Sequelize } from "sequelize";
$modelImports

export interface Db {
  sequelize: Sequelize;
  Sequelize: any;
  $modelTypes
}

EOF

prettier --write $modelTypeFileName

}