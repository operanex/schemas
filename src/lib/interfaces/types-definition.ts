import { Schema } from './schema'

export interface TypeDefinition<T extends { array : any, object: any } = { array : any, object: any }, ExtendType extends string|number|symbol = keyof T> {
    specifies ?: string,
    validator ?: (val: any, schema: Schema<T, ExtendType>, definitions ?: Record<string, TypeDefinition<T, ExtendType>>) => boolean
}