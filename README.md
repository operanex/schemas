# Schemas
Object schema definition for data validation and schema compatibility checks

## Usage

### Schema definition
The library has a helper to create a schemas, schemas are created using the schema class

```typescript
// example of string definition
import {Schema} from 'yuschema'

const schema = new Schema({
    type : 'string'
})
```

Currently the available types are the following : *email number integer url object array boolean*, each schema type has its own rules, and will be described further down.

#### string
The string schema represents a string, it allows for additional validation rules

```typescript
// example of string definition
import {Schema} from 'yuschema'

const schema = new Schema({
    type : 'string',
    validators : [
        {
            min : 0,                // minimum string length
            max : 10,               // maximum string length
            regex : '^(a-Z)+$'      // regular expression for validation
        }
    ]
})
```
#### number
The number schema represents a number, it allows for additional validation rules

```typescript
// example of string definition
import {Schema} from 'yuschema'

const schema = new Schema({
    type : 'number',
    validators : [
        {
            min : 0,                // minimum value
            max : 10,               // maximum value
        }
    ]
})
```

#### integer
The number schema represents an integer, it allows for the same validation rules than number

```typescript
// example of string definition
import {Schema} from 'yuschema'

const schema = new Schema({
    type : 'number',
    validators : [
        {
            min : 0,                // minimum value
            max : 10,               // maximum value
        }
    ]
})
```

#### email
The email schema represents an email and has currently no additional properties

```typescript
// example of string definition
import {Schema} from 'yuschema'

const schema = new Schema({
    type : 'email',
})
```

#### boolean
The boolean schema represents a boolean and has currently no additional properties

```typescript
// example of string definition
import {Schema} from 'yuschema'

const schema = new Schema({
    type : 'boolean',
})
```

#### object
The object schema is a bit particular since it contains child schema and allows to represent more complex structures

```typescript
// example of string definition
import {Schema} from 'yuschema'

const schema = new Schema({
    type : 'object',
    properties : {
        name : { type: 'string' },              // to define a property name of type strings
        other_prop : { type : 'number'}         // to define a property other_prop of type strings
    }
})

```
#### array
The array schema is a bit particular since it contains child schema and allows to represent more complex structures

```typescript
// example of string definition
import {Schema} from 'yuschema'

const schema = new Schema({
    type : 'array',
    arrayType : { type : 'string' }     // to define an array of strings 
})
```

### Custom types
Sometimes you might want to create more complex data structure like a three for example, for this we created the definition options.

```typescript
// example of string definition
import {Schema} from 'yuschema'

const schema = new Schema<'node'>({         // We extend the allowed types
    definitions : {
        node : {                            // we define a new type 'node'
            type : 'object',                // a node represents an object
            properties : {
                children : {
                    type : 'array',
                    arrayType : 'node'      // the schema might reference itself
                }
            }
        }
    } 
    type : 'object',
    properties : { 
        head : 'node'                   // we reference the head of the three 
    } 
})
```
### Validation of values
Schema allow you to validate values by checking if they correspond to the schema, for objects and arrays validation occurs recursively

```typescript
// example 1

new Schema({ type : 'string' }).validate('this is a string') // will return true
new Schema({ type : 'string' }).validate(5) // will return false
```

### Schema comparison
The library was primarily build to compare schemas and to check compatibility. In order to allow this we introduced the concept of specificity

#### Specificity
Specificity is a way to determine if a schema is more accurate than another one in its definition, for example the type *email* is more specific than *string* or the type *integer* is more specific than the type *number*.

Specificity allows applies for strings and more complex types like a string with a regexp is more specific than as string without regex, or a string with a min length of zero is more specific that a string with a min length of 2 (this is debatable for strings, but in our use case, where we compare strings to insert them into a database for example it makes sense). For Objects we call the most specific object the one that has the most parameters defined and for which is parameter is defined more specifically.

In order to compare schema you can use the following methods:

```typescript
// example 1

new Schema({ type : 'string' }).isMoreSpecificThan(new Schema({ type : 'email' })) // will return false
new Schema({ type : 'string' }).isMoreGeneralThan(new Schema({ type : 'email' }))  // will return true
```







## Install
The package is types, in order to install it just enter the following command line

```
yarn add yuschema
```

or 

```
npm install yuschema
```