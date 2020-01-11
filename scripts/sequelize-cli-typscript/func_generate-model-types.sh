generate_model_types() {

modelTypesFileName="${1}/types.ts"
modelNameCaps=$2
typeDefs=$3

typeName="${modelNameCaps}Model"
typeNameStatic="${modelNameCaps}ModelStatic"

echo ""
echo "generating model types"

cat > $modelTypesFileName << EOF
import { BuildOptions, Model } from "sequelize";

export interface $typeName extends Model {
  readonly id: number;
  readonly dataValues: any;
  $typeDefs
  createdAt: Date;
  updatedAt: Date;
}

export type $typeNameStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => $typeName);

EOF

prettier --write $modelTypesFileName

}