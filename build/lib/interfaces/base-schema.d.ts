import { Validator } from './validator';
import { Schema } from './schema';
export interface BaseSchema<T extends {
    object: any;
    array: any;
}, ExtendType = keyof T> {
    type: keyof T | ExtendType;
    definitions?: {
        [name: string]: Schema<T, ExtendType>;
    };
    required?: boolean;
    validators?: Array<Validator>;
}
//# sourceMappingURL=base-schema.d.ts.map