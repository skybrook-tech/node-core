generate_controllers_index() {

CONTROLLER_DIR=$1

CONTROLLER_INDEX_FILENAME="${CONTROLLER_DIR}/index.ts"
controllerImports=''
controllerTypes=''
controllers=''


for d in $CONTROLLER_DIR/* ; do
    modelDir=$(basename $d)


    if [ "${modelDir}" != 'index.ts' ] && [ "${modelDir}" != '__tests__' ]; then 
      controllerName="${modelDir/'.ts'/''}"    
      controllerTypes+="$controllerName: any;"
      controllerImports+="import ${controllerName} from './${controllerName}';"
      controllers+="${controllerName},"
    fi

done

echo ""
echo "generating controllers index"

cat > $CONTROLLER_INDEX_FILENAME << EOF
  $controllerImports

interface Controllers {
  $controllerTypes
}

const controllers = {
  $controllers
} as Controllers;

export default controllers;

EOF

prettier --write $CONTROLLER_INDEX_FILENAME

}