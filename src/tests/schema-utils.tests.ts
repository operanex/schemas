import "mocha"

import assert from 'assert'

import { Schema } from "../lib"


describe('Schemas check compatibility', () => {

    it('Similar type should be compatible', () => {
        const s: Schema = new Schema({
            type : 'string'
        })

        assert(s.isMoreSpecificThan(new Schema({type : 'string'})), "{type : 'string'} should be compatible")
        assert(!s.isMoreSpecificThan(new Schema({type : 'number'})), "{type : 'string'} should not be compatible")
    })

    it('Generic type should be compatible', () => {
        const s: Schema = new Schema({
            type : 'email'
        })

        assert(s.isMoreSpecificThan(new Schema({type : 'string'})), "{type : 'string'} should be compatible")
        assert(!s.isMoreSpecificThan(new Schema({type : 'number'})), "{type : 'string'} should not be compatible")
    })

    it('Check for min values compatibility', () => {
        const s: Schema = new Schema({
            type : 'string',
            validators : [{
                min : 1
            }]
        })

        assert(s.isMoreSpecificThan(new Schema({type : 'string', validators : [{ min : 0}]})), "{type : 'string', validators : [{ min : 0}]} should be compatible")
        assert(!s.isMoreSpecificThan(new Schema({type : 'string', validators : [{ min : 2}]})), "{type : 'string', validators : [{ min : 2}]} should not be compatible")
    })
    it('Check for max values compatibility', () => {
        const s: Schema = new Schema({
            type : 'string',
            validators : [{
                max : 1
            }]
        })

        assert(s.isMoreSpecificThan(new Schema({type : 'string', validators : [{ max : 2}]})), "{type : 'string', validators : [{ max : 2}]} should be compatible")
        assert(!s.isMoreSpecificThan(new Schema({type : 'string', validators : [{ max : 0}]})), "{type : 'string', validators : [{ max : 0}]} should not be compatible")
    })

    it('Check for regex values compatibility', () => {
        const s: Schema = new Schema({
            type : 'string',
            validators : [{
                regex : '^a'
            }]
        })

        assert(s.isMoreSpecificThan(new Schema({type : 'string', validators : [{ regex : '^a' }]})), "{type : 'string', validators : [{ regex : '^a' }]} should be compatible")
        assert(!s.isMoreSpecificThan(new Schema({type : 'string', validators : [{ regex : '^b' }]})), "{type : 'string', validators : [{ regex : '^b'}]} should not be compatible")
    })
    it('Check for multiple validators compatibility', () => {
        const s: Schema = new Schema({
            type : 'string',
            validators : [
                {regex : '^a'},{ min: 1, max : 10 }
            ]
        })

        assert(s.isMoreSpecificThan(new Schema({type : 'string', validators : [{regex : '^a'},{ min: 0, max : 50 }]})), "{type : 'string', validators : [{regex : '^a'},{ min: 0, max : 50 }]} should be compatible")
        assert(s.isMoreSpecificThan(new Schema({type : 'string', validators : [{ min: 1, max : 10 }, {regex : '^a'}]})), "{type : 'string', validators : [{ min: 1, max : 10 }, {regex : '^a'}]} should be compatible")
        assert(s.isMoreSpecificThan(new Schema({type : 'string', validators : [{ min: 0, max : 50 }, {regex : '^a'}]})), "{type : 'string', validators : [{ min: 0, max : 50 }, {regex : '^a'}]} should be compatible")
        assert(!s.isMoreSpecificThan(new Schema({type : 'string', validators : [{ min: 5, max : 50 }, {regex : '^a'}]})), "{type : 'string', validators : [{ min: 5, max : 50 }, {regex : '^a'}]} should be compatible")
        assert(!s.isMoreSpecificThan(new Schema({type : 'string', validators : [{ regex : '^b' }]})), "{type : 'string', validators : [{ regex : '^b'}]} should not be compatible")
    })

})