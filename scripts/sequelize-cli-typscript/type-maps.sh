declare -A sequelize
declare -A types
#  number, string, boolean, enum, void, null, undefined, any, never, Array and tuple.
sequelize["STRING"]="STRING"
types["STRING"]="string"

sequelize["TEXT"]="TEXT"
types["TEXT"]="string"

sequelize["CITEXT"]="CITEXT"
types["CITEXT"]="string"

sequelize["INTEGER"]="INTEGER"
types["INTEGER"]="number"

sequelize["BIGINT"]="BIGINT"
types["BIGINT"]="number"

sequelize["FLOAT"]="FLOAT"
types["FLOAT"]="number"

sequelize["REAL"]="REAL"
types["REAL"]="number"

sequelize["DOUBLE"]="DOUBLE"
types["DOUBLE"]="number"

sequelize["DECIMAL"]="DECIMAL"
types["DECIMAL"]="number"

sequelize["DATE"]="DATE"
types["DATE"]="Date"

sequelize["DATEONLY"]="DATEONLY"
types["DATEONLY"]="Date"

sequelize["BOOLEAN"]="BOOLEAN"
types["BOOLEAN"]="boolean"

sequelize["ENUM"]="ENUM"
types["ENUM"]="enum"

sequelize["ARRAY"]="ARRAY"
types["ARRAY"]="any[]"

# Further research required for typing JSON?
sequelize["JSON"]="JSON"
types["JSON"]="string"

sequelize["JSONB"]="JSONB"
types["JSONB"]="string"

sequelize["BLOB"]="BLOB"
types["BLOB"]="Buffer"

sequelize["UUID"]="UUID"
types["UUID"]="string"

                  