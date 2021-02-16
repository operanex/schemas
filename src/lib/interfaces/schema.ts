import { BaseSchema } from './base-schema'
import { ObjectSchema } from './object-schema'
import { ArraySchema } from './array-schema'


export type Schema<T extends {array: any, object: any }, ExtendType = keyof T> = ArraySchema<T, ExtendType> | ObjectSchema<T, ExtendType> | BaseSchema<T, ExtendType>