import { Schema, ObjectSchema, ArraySchema, Validator, BaseTypeDefinitions} from './interfaces'
import { TypesMap } from './base-types-validation'

type DefaultSchemaType = Schema<BaseTypeDefinitions>

export function isSchemaCompatible(schema: DefaultSchemaType, definition: DefaultSchemaType) {
    // @ts-ignore
    if(schema.type !== definition.type && !isMoreSpecificThan(schema.type, definition.type)) return false // different type and not a generic type
    if(definition.required && ! schema.required) return false // definition required but not in schema
    
    // @ts-ignore
    if(definition.type == 'object') {
        let def = definition as ObjectSchema<{object: any, array: any}>
        for( let key in (def.properties || {})) {
            if(
                !(schema as ObjectSchema<{object: any, array: any}>)?.properties?.[key] ||
                !def?.properties?.[key] ||
                !isSchemaCompatible((schema as Required<ObjectSchema<BaseTypeDefinitions>>).properties?.[key], def.properties?.[key] as DefaultSchemaType)
            ) {
                return false
            }
        }
    }
    else if(definition.type == 'array') {
        let def = definition as ArraySchema<BaseTypeDefinitions>
        if(def.arrayType && (!(schema as ArraySchema<BaseTypeDefinitions>).arrayType || ( !isSchemaCompatible((schema as ArraySchema<BaseTypeDefinitions>).arrayType as any, def.arrayType)))) return false
    } else {

        if(definition.validators) {
            for(let validator of definition.validators) {
                if(!hasValidator(validator, schema)) return false
            }
        }

    }
    return true
}

function isMoreSpecificThan(type: string, compareTo: string) {
    
    let schema = TypesMap.get(type)
    if(!schema) throw new Error('Unknown type')

    let found = schema.specifies === compareTo
    let cycle = [type, schema.specifies]

    while(schema.specifies && !found) {
        schema = TypesMap.get(schema.specifies)
        if(!schema) throw new Error('Unknown type')

        found = compareTo === schema.specifies
        if(cycle.indexOf(schema.specifies) > 0) throw new Error('Cycle found in types specification')
        cycle.push(schema.specifies)
    }

    return found
}

function hasValidator(validator: Validator, schema: DefaultSchemaType): boolean {
    if(!schema.validators) return false


    for(let v of schema.validators) {
        let bool = true
        if(validator.min !== undefined && (!v.min || v.min < validator.min)) bool = false
        if(validator.max !== undefined && (!v.max || v.max > validator.max)) bool = false
        if(validator.regex !== undefined && (v.regex != validator.regex)) bool = false

        if(bool) return true
    }
    return false
}