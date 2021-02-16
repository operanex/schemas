"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TYPES = exports.validateSchema = exports.validateSchemaFromType = exports.getSchemaFromType = exports.TypesMap = void 0;
const isemail_1 = __importDefault(require("isemail"));
exports.TypesMap = new Map();
function getSchemaFromType(type, definitions) {
    // @ts-ignore
    if (!exports.TypesMap.has(type) && !(definitions === null || definitions === void 0 ? void 0 : definitions[type]))
        throw new Error('Unknown type');
    // @ts-ignore
    return exports.TypesMap.get(type) || definitions[type];
}
exports.getSchemaFromType = getSchemaFromType;
function validateSchemaFromType(type, schema, val, definitions) {
    const typeSchema = getSchemaFromType(type, definitions);
    if (typeSchema.validator)
        return typeSchema.validator(val, schema, definitions);
    return true;
}
exports.validateSchemaFromType = validateSchemaFromType;
function validateSchema(schema, val, definitions) {
    const deps = (schema.definitions || definitions) ? Object.assign({}, definitions) : undefined;
    if (deps && schema.definitions) {
        for (let def in schema.definitions) {
            deps[def] = {
                validator: (el, _schema, _definitions) => {
                    var _a, _b, _c, _d, _e, _f;
                    if (((_a = schema.definitions) === null || _a === void 0 ? void 0 : _a[def].type) === def)
                        throw new Error('Cycle definition');
                    if ((_c = (_b = schema.definitions) === null || _b === void 0 ? void 0 : _b[def]) === null || _c === void 0 ? void 0 : _c.type)
                        return validateSchemaFromType((_e = (_d = schema.definitions) === null || _d === void 0 ? void 0 : _d[def]) === null || _e === void 0 ? void 0 : _e.type, (_f = schema.definitions) === null || _f === void 0 ? void 0 : _f[def], el, _definitions);
                    return false;
                }
            };
        }
    }
    return validateSchemaFromType(schema.type, schema, val, deps);
}
exports.validateSchema = validateSchema;
const arrayType = {
    validator: (el, schema, definitions) => {
        if (!Array.isArray(el))
            return false;
        for (let item in el) {
            if (!validateSchema(schema.arrayType, el[item], definitions))
                return false;
        }
        return true;
    }
};
const objectType = {
    validator: (el, schema, definitions) => {
        var _a;
        if (Object.prototype.toString.call(el) !== '[object Object]')
            return false;
        if (schema.properties) {
            for (let key in schema.properties) {
                let propSchema = (_a = schema.properties) === null || _a === void 0 ? void 0 : _a[key];
                if (propSchema && propSchema.required && el[key] === undefined)
                    return false;
                if (propSchema && el[key] !== undefined && !validateSchema(propSchema, el[key], definitions))
                    return false;
            }
        }
        return true;
    }
};
const stringType = {
    validator: (el, schema, definitions) => {
        if (typeof el !== 'string')
            return false;
        if (schema.validators) {
            for (let validator of schema.validators) {
                if (validator.regex && !(new RegExp(validator.regex).test(el)))
                    return false;
                if (validator.min !== undefined && el.length < validator.min)
                    return false;
                if (validator.max !== undefined && el.length > validator.max)
                    return false;
            }
        }
        return true;
    }
};
const emailType = {
    specifies: 'string',
    validator: (el, schema, definitions) => {
        if (typeof el !== 'string')
            return false;
        return isemail_1.default.validate(el);
    }
};
const numberType = {
    validator: (el, schema, definitions) => {
        if (typeof el !== 'number' || isNaN(el))
            return false;
        if (schema.validators) {
            for (let validator of schema.validators) {
                if (validator.min && el < validator.min)
                    return false;
                if (validator.max && el > validator.max)
                    return false;
            }
        }
        return true;
    }
};
const integerType = {
    specifies: 'number',
    validator: (el, schema, definitions) => {
        if (typeof el !== 'number' || !Number.isInteger(el) || isNaN(el))
            return false;
        if (schema.validators) {
            for (let validator of schema.validators) {
                if (validator.min && el < validator.min)
                    return false;
                if (validator.max && el > validator.max)
                    return false;
            }
        }
        return true;
    }
};
const dateType = {
    validator: (el, schema, definitions) => {
        return el instanceof Date;
    }
};
const booleanType = {
    validator: (el, schema, definitions) => {
        return el === true || el === false;
    }
};
exports.TYPES = {
    array: arrayType,
    object: objectType,
    string: stringType,
    email: emailType,
    url: { specifies: 'string' },
    number: numberType,
    integer: integerType,
    date: dateType,
    boolean: booleanType
};
for (let typeDefinition in exports.TYPES) {
    exports.TypesMap.set(typeDefinition, exports.TYPES[typeDefinition]);
}
//# sourceMappingURL=base-types-validation.js.map