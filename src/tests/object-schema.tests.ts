import "mocha"

import assert from 'assert'

import { Schema } from "../lib"


describe('Schemas Object tests', () => {

    it('Should validate the schema for object', () => {
        const s: Schema = new Schema({
            type : 'object',
            properties : {
                x : { required : true, type : 'number' },
                y : { required : true, type : 'number' },
                z : { type : 'number' },
                year : { type : 'number', validators : [{ min: 1900, max : 2021 }] },
                name : { type : 'string' }
            }
        })

        assert(s.validate( { x : 2, y: -5, year : 2019, name : 'test' }), "{ x : 2, y: -5, year : 2019, name : 'test' } should be a valid object")
        assert(!s.validate( { x : 'test', y: -5, year : 2019, name : 'test' }), "{ x : 'test', y: -5, year : 2019, name : 'test' } should not be a valid object")
        assert(!s.validate( { x : 2, y: -5, year : 2025, name : 'test' }), "{ x : 2, y: -5, year : 2025, name : 'test' } should not be a valid object")
        assert(!s.validate( [2000,2005,2025]), '[200,2005,2025] should not be a valid object')
        assert(!s.validate( 'test'), '"test" should not be a valid object')
        assert(!s.validate( 2), '2 should not be a valid object')
        assert(!s.validate( {}), '{} should not be a valid object')
    })

    it('Should validate the schema for object with embed object and array', () => {
        const s: Schema = new Schema({
            type : 'object',
            properties : {
                x : { required : true, type : 'number' },
                y : { required : true, type : 'number' },
                name : { required : true, type : 'string' },
                children : {
                    type : 'array',
                    arrayType : {
                        type : 'object',
                        properties : {
                            x : { required : true, type : 'number' },
                            y : { required : true, type : 'number' },
                            name : { type : 'string' }
                        }
                    }
                }
            }
        })

        assert(s.validate( { x : 4, y: 9, name : 'test', children : [ { x : 9, y: 10, name : 'test-child-1' }, { x : -9, y: -10, name : 'test-child-2' }] }), "{ x : 4, y: 9, name : 'test', children : [ { x : 9, y: 10, name : 'test-child-1' }, { x : -9, y: -10, name : 'test-child-2' }] } should be a valid object")
        assert(!s.validate( { x : 4, y: 9, name : 'test', children : [ { x : 9, y: 'test', name : 'test-child-1' }, { x : -9, y: -10, name : 'test-child-2' }] }), "{ x : 4, y: 9, name : 'test', children : [ { x : 9, y: 'test, name : 'test-child-1' }, { x : -9, y: -10, name : 'test-child-2' }] } should not be a valid object")
        assert(!s.validate( [2000,2005,2025]), '[200,2005,2025] should not be a valid object')
        assert(!s.validate( 'test'), '"test" should not be a valid object')
        assert(!s.validate( 2), '2 should not be a valid object')
        assert(!s.validate( {}), '{} should not be a valid object')
    })
})
