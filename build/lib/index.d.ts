import { Schema as SchemaGeneric, TypeDefinition } from './interfaces';
import { TYPES } from './base-types-validation';
export declare type SchemaDefinition<Keys = keyof typeof TYPES, T extends typeof TYPES = typeof TYPES> = SchemaGeneric<T, Keys>;
export declare class Schema<Keys = keyof typeof TYPES, T extends typeof TYPES = typeof TYPES> {
    schema: SchemaDefinition<Keys, T>;
    validate(val: any, definitions?: Record<string, TypeDefinition<T>>): boolean;
    validateSchema(schema: SchemaDefinition<Keys, T>, val: any, definitions?: Record<string, TypeDefinition<T>>): boolean;
    constructor(schema: SchemaDefinition<Keys, T>);
    isMoreGeneralThan(schema: Schema<Keys, T>): boolean;
    isMoreSpecificThan(schema: Schema): boolean;
}
//# sourceMappingURL=index.d.ts.map