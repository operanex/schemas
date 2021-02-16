import { BaseSchema } from './base-schema'

import { Schema } from './schema'

export interface ObjectSchema<T extends { object : any, array : any }, ExtendType = keyof T> extends BaseSchema<T, ExtendType> {
    type : 'object'
    properties ?: {[key: string] : Schema<T, ExtendType>}
}
