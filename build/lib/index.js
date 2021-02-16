"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = void 0;
const base_types_validation_1 = require("./base-types-validation");
const schema_utils_1 = require("./schema-utils");
// export { validate as validateSchema }
class Schema {
    constructor(schema) {
        this.schema = schema;
    }
    validate(val, definitions) {
        return base_types_validation_1.validateSchema(this.schema, val, definitions);
    }
    validateSchema(schema, val, definitions) {
        return base_types_validation_1.validateSchema(this.schema, val, definitions);
    }
    isMoreGeneralThan(schema) {
        return schema_utils_1.isSchemaCompatible(schema.schema, this.schema);
    }
    isMoreSpecificThan(schema) {
        return schema_utils_1.isSchemaCompatible(this.schema, schema.schema);
    }
}
exports.Schema = Schema;
//# sourceMappingURL=index.js.map