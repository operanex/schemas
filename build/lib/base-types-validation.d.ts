import { TypeDefinition as TypeSchema, BaseTypeDefinitions, Schema } from './interfaces';
export declare const TypesMap: Map<string, TypeSchema<BaseTypeDefinitions, "object" | "array">>;
export declare function getSchemaFromType<T extends BaseTypeDefinitions = BaseTypeDefinitions>(type: keyof T | symbol | string | number, definitions?: Record<string, TypeSchema<T>>): TypeSchema<T>;
export declare function validateSchemaFromType<T extends BaseTypeDefinitions = BaseTypeDefinitions>(type: keyof T | symbol | string | number, schema: Schema<T>, val: any, definitions?: Record<string, TypeSchema<T>>): boolean;
export declare function validateSchema<T extends BaseTypeDefinitions>(schema: Schema<T>, val: any, definitions?: Record<string, TypeSchema<T>>): boolean;
export declare const TYPES: {
    array: TypeSchema<BaseTypeDefinitions, "object" | "array">;
    object: TypeSchema<BaseTypeDefinitions, "object" | "array">;
    string: TypeSchema<BaseTypeDefinitions, "object" | "array">;
    email: TypeSchema<BaseTypeDefinitions, "object" | "array">;
    url: {
        specifies: string;
    };
    number: TypeSchema<BaseTypeDefinitions, "object" | "array">;
    integer: TypeSchema<BaseTypeDefinitions, "object" | "array">;
    date: TypeSchema<BaseTypeDefinitions, "object" | "array">;
    boolean: TypeSchema<BaseTypeDefinitions, "object" | "array">;
};
//# sourceMappingURL=base-types-validation.d.ts.map