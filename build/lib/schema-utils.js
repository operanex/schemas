"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSchemaCompatible = void 0;
const base_types_validation_1 = require("./base-types-validation");
function isSchemaCompatible(schema, definition) {
    var _a, _b, _c, _d, _e;
    // @ts-ignore
    if (schema.type !== definition.type && !isMoreSpecificThan(schema.type, definition.type))
        return false; // different type and not a generic type
    if (definition.required && !schema.required)
        return false; // definition required but not in schema
    // @ts-ignore
    if (definition.type == 'object') {
        let def = definition;
        for (let key in (def.properties || {})) {
            if (!((_b = (_a = schema) === null || _a === void 0 ? void 0 : _a.properties) === null || _b === void 0 ? void 0 : _b[key]) ||
                !((_c = def === null || def === void 0 ? void 0 : def.properties) === null || _c === void 0 ? void 0 : _c[key]) ||
                !isSchemaCompatible((_d = schema.properties) === null || _d === void 0 ? void 0 : _d[key], (_e = def.properties) === null || _e === void 0 ? void 0 : _e[key])) {
                return false;
            }
        }
    }
    else if (definition.type == 'array') {
        let def = definition;
        if (def.arrayType && (!schema.arrayType || (!isSchemaCompatible(schema.arrayType, def.arrayType))))
            return false;
    }
    else {
        if (definition.validators) {
            for (let validator of definition.validators) {
                if (!hasValidator(validator, schema))
                    return false;
            }
        }
    }
    return true;
}
exports.isSchemaCompatible = isSchemaCompatible;
function isMoreSpecificThan(type, compareTo) {
    let schema = base_types_validation_1.TypesMap.get(type);
    if (!schema)
        throw new Error('Unknown type');
    let found = schema.specifies === compareTo;
    let cycle = [type, schema.specifies];
    while (schema.specifies && !found) {
        schema = base_types_validation_1.TypesMap.get(schema.specifies);
        if (!schema)
            throw new Error('Unknown type');
        found = compareTo === schema.specifies;
        if (cycle.indexOf(schema.specifies) > 0)
            throw new Error('Cycle found in types specification');
        cycle.push(schema.specifies);
    }
    return found;
}
function hasValidator(validator, schema) {
    if (!schema.validators)
        return false;
    for (let v of schema.validators) {
        let bool = true;
        if (validator.min !== undefined && (!v.min || v.min < validator.min))
            bool = false;
        if (validator.max !== undefined && (!v.max || v.max > validator.max))
            bool = false;
        if (validator.regex !== undefined && (v.regex != validator.regex))
            bool = false;
        if (bool)
            return true;
    }
    return false;
}
//# sourceMappingURL=schema-utils.js.map