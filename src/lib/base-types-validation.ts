import { 
    TypeDefinition as TypeSchema,
    BaseTypeDefinitions,
    ObjectSchema, 
    ArraySchema, 
    Schema 
} from './interfaces'

import isemail from 'isemail';

export const TypesMap = new Map<string, TypeSchema<BaseTypeDefinitions>>()

export function getSchemaFromType<T extends BaseTypeDefinitions = BaseTypeDefinitions>(type: keyof T| symbol|string|number, definitions ?: Record<string, TypeSchema<T>>): TypeSchema<T> {
    // @ts-ignore
    if(!TypesMap.has(type) && !definitions?.[type]) throw new Error('Unknown type')

    // @ts-ignore
    return TypesMap.get(type) || definitions[type]
}

export function validateSchemaFromType<T extends BaseTypeDefinitions = BaseTypeDefinitions> (type: keyof T| symbol|string|number, schema: Schema<T>,  val: any, definitions ?: Record<string, TypeSchema<T>>): boolean {
    const typeSchema = getSchemaFromType(type, definitions)
    if(typeSchema.validator) return typeSchema.validator(val, schema, definitions)
    return true
}

export function validateSchema<T extends BaseTypeDefinitions>(schema: Schema<T>, val: any, definitions ?: Record<string, TypeSchema<T>>): boolean {
    const deps = (schema.definitions || definitions) ? {...definitions} : undefined
    
    if(deps && schema.definitions) {
        for( let def in schema.definitions) {
            deps[def] = { 
                validator : (el: any, _schema: Schema<T>, _definitions ?: Record<string, TypeSchema<T>>) => {
                    if(schema.definitions?.[def].type === def) throw new Error('Cycle definition' )
                    if(schema.definitions?.[def]?.type)
                        return validateSchemaFromType(schema.definitions?.[def]?.type, schema.definitions?.[def], el, _definitions)
                    return false
                }
            }
        }
    }
    return validateSchemaFromType(schema.type, schema, val, deps)
}

const arrayType : TypeSchema<BaseTypeDefinitions> = {
    validator : (el: any, schema: Schema<BaseTypeDefinitions>, definitions ?: Record<string, TypeSchema<BaseTypeDefinitions>>) => {
        if(!Array.isArray(el)) return false

        for(let item in el) {
            if(!validateSchema((schema as ArraySchema<BaseTypeDefinitions>).arrayType as Schema<BaseTypeDefinitions>, el[item], definitions)) return false
        }

        return true 
    }
}

const objectType: TypeSchema<BaseTypeDefinitions> = {
    validator : (el: any, schema: Schema<BaseTypeDefinitions>, definitions ?: Record<string, TypeSchema<BaseTypeDefinitions>>) => {
        if(Object.prototype.toString.call(el) !== '[object Object]') return false
        if((schema as ObjectSchema<BaseTypeDefinitions>).properties) {
            for( let key in (schema as ObjectSchema<BaseTypeDefinitions>).properties ) {
                let propSchema = (schema as ObjectSchema<BaseTypeDefinitions>).properties?.[key]

                if(propSchema && propSchema.required && el[key] === undefined) return false
                if(propSchema && el[key] !== undefined && !validateSchema(propSchema, el[key], definitions)) return false
            }
        }
        return true
    }
}

const stringType: TypeSchema<BaseTypeDefinitions> = {
    validator : (el: any, schema: Schema<BaseTypeDefinitions>, definitions ?: Record<string, TypeSchema<BaseTypeDefinitions>>) => {
        if(typeof el !== 'string') return false

        if (schema.validators) {
            for(let validator of schema.validators) {
                if (validator.regex && !(new RegExp(validator.regex).test(el))) return false
                if (validator.min !== undefined && el.length < validator.min) return false 
                if (validator.max !== undefined && el.length > validator.max) return false 
            }
        }
        return true
    }
}

const emailType: TypeSchema<BaseTypeDefinitions> = {
    specifies: 'string' ,
    validator : (el: any, schema: Schema<BaseTypeDefinitions>, definitions ?: Record<string, TypeSchema<BaseTypeDefinitions>>) => {
        if(typeof el !== 'string') return false

        return isemail.validate(el)

    }
}

const numberType: TypeSchema<BaseTypeDefinitions> = {
    validator : (el: any, schema: Schema<BaseTypeDefinitions>, definitions ?: Record<string, TypeSchema<BaseTypeDefinitions>>) => {
        if(typeof el !== 'number' || isNaN(el)) return false
        if(schema.validators) {
            for(let validator of schema.validators) {
                if(validator.min && el < validator.min) return false
                if(validator.max && el > validator.max) return false
            }
        }
        return true
    }
}

const integerType: TypeSchema<BaseTypeDefinitions> = {
    specifies: 'number',
    validator : (el: any, schema: Schema<BaseTypeDefinitions>, definitions ?: Record<string, TypeSchema<BaseTypeDefinitions>>) => {
        if(typeof el !== 'number' || !Number.isInteger(el) || isNaN(el)) return false
        if(schema.validators) {
            for(let validator of schema.validators) {
                if(validator.min && el < validator.min) return false
                if(validator.max && el > validator.max) return false
            }
        }
        return true
    }
}

const dateType: TypeSchema<BaseTypeDefinitions> = {
    validator : (el: any, schema: Schema<BaseTypeDefinitions>, definitions ?: Record<string, TypeSchema<BaseTypeDefinitions>>) => {
        return el instanceof Date
    }
}

const booleanType: TypeSchema<BaseTypeDefinitions> = {
    validator : (el: any, schema: Schema<BaseTypeDefinitions>, definitions ?: Record<string, TypeSchema<BaseTypeDefinitions>>) => {
        return el === true || el === false
    }
}



export const TYPES = {
    array : arrayType,
    object : objectType,
    string : stringType,
        email : emailType,
        url : { specifies: 'string' },
    number : numberType,
        integer : integerType,
    date : dateType,
    boolean : booleanType
}

for(let typeDefinition in TYPES) {
    TypesMap.set(typeDefinition, (TYPES as any)[typeDefinition])
}
