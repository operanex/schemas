import "mocha"

import assert from 'assert'

import { Schema } from "../lib"

describe('Schemas Array tests', () => {

    it('Should validate the schema for array of number', () => {
        const s =  new Schema({
            type : 'array',
            arrayType : {
                type : 'number',
                validators: [
                    { min : 1900, max : 2021 }
                ]
            }
        })

        assert(s.validate([]), '[] should be a valid array')
        assert(s.validate([2000]), '[2000] should be a valid array')
        assert(s.validate([2000,2005,2009]), '[2000,2005,2009] should be a valid array')
        assert(!s.validate([200,2005,2009]), '[200,2005,2009] should not be a valid array')
        assert(!s.validate([2000,2005,'test']), '[200,2005,"test] should not be a valid array')
        assert(!s.validate([2000,2005,2025]), '[200,2005,2025] should not be a valid array')
        assert(!s.validate('test'), '"test" should not be a valid array')
        assert(!s.validate(2), '2 should not be a valid array')
        assert(!s.validate({}), '{} should not be a valid array')
    })

    it('Should validate the schema for array of strings', () => {
        const s: Schema = new Schema({
            type : 'array',
            arrayType : {
                type : 'string',
                validators: [
                    { }
                ]
            }
        })

        assert(s.validate([]), '[] should be a valid array')
        assert(s.validate(['test']), '["test"] should be a valid array')
        assert(s.validate(['test', 'test2']), '["test", "test2"] should be a valid array')
        assert(!s.validate([200,2005,2009]), '[200,2005,2009] should not be a valid array')
        assert(!s.validate([2000,2005,'test']), '[200,2005,"test] should not be a valid array')
        assert(!s.validate([2000,2005,2025]), '[200,2005,2025] should not be a valid array')
        assert(!s.validate('test'), '"test" should not be a valid array')
        assert(!s.validate(2), '2 should not be a valid array')
        assert(!s.validate({}), '{} should not be a valid array')
    })
})
