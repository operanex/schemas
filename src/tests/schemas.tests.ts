import "mocha"

import assert from 'assert'

import { Schema } from "../lib"


describe('Schemas string tests', () => {

    it('Should validate the schema for strings', () => {
        const s: Schema = new Schema({
            type : 'string'
        })

        assert(s.validate( 'test'), '"test" should be a valid string')
        assert(!s.validate( 2), '2 should not be a valid string')
        assert(!s.validate( {}), '{} should not be a valid string')
    })

    it('Should validate the schema for strings with min and max length', () => {
        const s: Schema = new Schema({
            type : 'string',
            validators : [
                { min : 2, max : 5}
            ]
        })

        assert(s.validate( 'test'), '"test" should be a valid string')
        assert(!s.validate( 'testtest'), '"testtest" should not be a valid string')
        assert(!s.validate( 't'), '"t" should not be a valid string')
        assert(!s.validate( 2), '2 should not be a valid string')
        assert(!s.validate( {}), '{} should not be a valid string')
    })
    it('Should validate the schema for strings with regexp', () => {
        const s: Schema = new Schema({
            type : 'string',
            validators : [
                { regex : '^test'}
            ]
        })

        assert(s.validate( 'test'), '"test" should be a valid string')
        assert(s.validate( 'testtest'), '"testtest" should be a valid string')
        assert(!s.validate( 'atest'), '"atest" should not be a valid string')
        assert(!s.validate( 't'), '"t" should not be a valid string')
        assert(!s.validate( 2), '2 should not be a valid string')
        assert(!s.validate( {}), '{} should not be a valid string')
    })
})

describe('Schemas email tests', () => {

    it('Should validate the schema for emails', () => {
        const s: Schema = new Schema({
            type : 'email'
        })

        assert(s.validate( 'test@gmail.com'), '"test@gmail.com" should be a valid email')
        assert(s.validate( 'test@gmail'), '"test@gmail" should be a valid email')
        assert(!s.validate( 'test#gmail.com'), '"test#gmail.com" should not be a valid email')
        assert(!s.validate( 'test'), '"test" should not be a valid email')
        assert(!s.validate( 2), '2 should not be a valid email')
        assert(!s.validate( {}), '{} should not be a valid email')
    })
})

describe('Schemas number tests', () => {

    it('Should validate the schema for numbers', () => {
        const s: Schema = new Schema({
            type : 'number'
        })

        assert(s.validate( 2), '2 should be a valid number')
        assert(s.validate( 0), '0 should be a valid number')
        assert(s.validate( 0x43444), '0x43444 should be a valid number')
        assert(s.validate( 0b001101), '0b001101 should be a valid number')
        assert(s.validate( 2.9990), '2.9990 should be a valid number')
        assert(!s.validate( 'test#gmail.com'), '"test#gmail.com" should not be a valid number')
        assert(!s.validate( 'test'), '"test" should not be a valid number')
        assert(!s.validate( NaN), 'NaN should not be a valid number')
        assert(!s.validate( {}), '{} should not be a valid number')
    })

    it('Should validate the schema for numbers with min and max', () => {
        const s: Schema = new Schema({
            type : 'number',
            validators : [
                { min : -3, max : 5 }
            ]
        })

        assert(s.validate( 2), '2 should be a valid number')
        assert(s.validate( 0), '0 should be a valid number')
        assert(!s.validate( -5), '-5 should not be a valid number')
        assert(s.validate( -3), '-3 should be a valid number')
        assert(s.validate( 5), '-3 should be a valid number')
        assert(!s.validate( 9), '-5 should not be a valid number')
        assert(!s.validate( 'test#gmail.com'), '"test#gmail.com" should not be a valid number')
        assert(!s.validate( 'test'), '"test" should not be a valid number')
        assert(!s.validate( NaN), 'NaN should not be a valid number')
        assert(!s.validate( {}), '{} should not be a valid number')
    })
})

describe('Schemas integer tests', () => {

    it('Should validate the schema for integers', () => {
        const s: Schema = new Schema({
            type : 'integer'
        })

        assert(s.validate( 2), '2 should be a valid integer')
        assert(s.validate( -2), '0 should be a valid integer')
        assert(s.validate( 0), '0 should be a valid integer')
        assert(s.validate( 0x43444), '0x43444 should be a valid integer')
        assert(s.validate( 0b001101), '0b001101 should be a valid integer')
        assert(!s.validate( 2.9990), '2.9990 should not be a valid integer')
        assert(!s.validate( 'test#gmail.com'), '"test#gmail.com" should not be a valid integer')
        assert(!s.validate( 'test'), '"test" should not be a valid integer')
        assert(!s.validate( NaN), 'NaN should not be a valid integer')
        assert(!s.validate( {}), '{} should not be a valid integer')
    })

    it('Should validate the schema for integers with min and max', () => {
        const s: Schema = new Schema({
            type : 'integer',
            validators : [
                { min : -3, max : 5 }
            ]
        })

        assert(s.validate( 2), '2 should be a valid integer')
        assert(s.validate( 0), '0 should be a valid integer')
        assert(!s.validate( -5), '-5 should not be a valid integer')
        assert(s.validate( -3), '-3 should be a valid integer')
        assert(s.validate( 5), '-3 should be a valid integer')
        assert(!s.validate( 0.25), '0.25 should not be a valid integer')
        assert(!s.validate( 9), '-5 should not be a valid integer')
        assert(!s.validate( 'test#gmail.com'), '"test#gmail.com" should not be a valid integer')
        assert(!s.validate( 'test'), '"test" should not be a valid integer')
        assert(!s.validate( NaN), 'NaN should not be a valid integer')
        assert(!s.validate( {}), '{} should not be a valid integer')
    })
})