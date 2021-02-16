import "mocha"

import assert from 'assert'

import { Schema } from "../lib"


describe('Schemas definition tests', () => {

    it('Should validate the schema for object with definitions', () => {
        const s: Schema<'position'> = new Schema<'position'>({
            type : 'object',
            definitions : {
                position : {
                    type: 'object',
                    properties : {
                        x : { type : 'number' },
                        y : { type : 'number' },
                    }
                }
            },
            properties : {
                positions : { type : 'array', arrayType : { type : 'position' } 
                },
                name : { type : 'string' }
            }
        })

        assert(s.validate( { name : 'test', positions : [{ x : 5, y: 8 }] }), "{ name : 'test', positions : [{ x : 5, y: 8 }] } should be a valid object")
        assert(!s.validate( { name : 'test', positions : [{ x : 'test', y: 8 }] }), "{ name : 'test', positions : [{ x : 'test', y: 8 }] } should not be a valid object")
    })

    it('Should validate the schema for deep nested object with definitions', () => {
        const s: Schema<'node'> = new Schema<'node'>({
            type : 'object',
            definitions : {
                node : {
                    type: 'object',
                    properties : {
                        value : { required: true, type : 'number' },
                        child : { type : 'node' },
                    }
                }
            },
            properties : {
                head : { type : 'node'}
            }
        })

        assert(s.validate( { 
            head : { value : 5, child : { value : 6, child : { value : 7 } } } 
            }), "{head : { value : 5, child : { value : 6, child : { value : 7 } } }} should be a valid object")
        assert(!s.validate( { 
            head : { value : 5, child : { value : 6, child : { value : 'test' } } } 
            }), "{head : { value : 5, child : { value : 6, child : { value : 'test } } }} should not be a valid object")
    })

})