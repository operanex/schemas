import { BaseSchema } from './base-schema';
import { Schema } from './schema';
export interface ArraySchema<T extends {
    array: any;
    object: any;
}, ExtendType = keyof T> extends BaseSchema<T, ExtendType> {
    type: 'array';
    arrayType?: Schema<T, ExtendType>;
}
//# sourceMappingURL=array-schema.d.ts.map