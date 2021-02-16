import { Schema as SchemaGeneric, TypeDefinition } from './interfaces'
import { TYPES, validateSchema} from './base-types-validation'

import { isSchemaCompatible } from './schema-utils'

export type SchemaDefinition<Keys = keyof typeof TYPES, T extends typeof TYPES = typeof TYPES> = SchemaGeneric<T, Keys> 

// export { validate as validateSchema }

export class Schema<Keys = keyof typeof TYPES, T extends typeof TYPES = typeof TYPES> {
    schema : SchemaDefinition<Keys, T>

    validate(val: any, definitions ?: Record<string, TypeDefinition<T>>): boolean {
        return validateSchema<T>(this.schema as any, val, definitions)
    }

    validateSchema(schema: SchemaDefinition<Keys, T>, val: any, definitions ?: Record<string, TypeDefinition<T>>): boolean {
        return validateSchema<T>(this.schema as any, val, definitions)
    }

    constructor(schema : SchemaDefinition<Keys, T>) {
        this.schema = schema
    }

    isMoreGeneralThan(schema: Schema<Keys, T>): boolean {
        return isSchemaCompatible(schema.schema as any, this.schema as any)
    }
    
    isMoreSpecificThan(schema: Schema): boolean {
        return isSchemaCompatible(this.schema as any, schema.schema as any)
    }
}