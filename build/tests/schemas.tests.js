"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert_1 = __importDefault(require("assert"));
const lib_1 = require("../lib");
describe('Schemas string tests', () => {
    it('Should validate the schema for strings', () => {
        const s = new lib_1.Schema({
            type: 'string'
        });
        assert_1.default(s.validate('test'), '"test" should be a valid string');
        assert_1.default(!s.validate(2), '2 should not be a valid string');
        assert_1.default(!s.validate({}), '{} should not be a valid string');
    });
    it('Should validate the schema for strings with min and max length', () => {
        const s = new lib_1.Schema({
            type: 'string',
            validators: [
                { min: 2, max: 5 }
            ]
        });
        assert_1.default(s.validate('test'), '"test" should be a valid string');
        assert_1.default(!s.validate('testtest'), '"testtest" should not be a valid string');
        assert_1.default(!s.validate('t'), '"t" should not be a valid string');
        assert_1.default(!s.validate(2), '2 should not be a valid string');
        assert_1.default(!s.validate({}), '{} should not be a valid string');
    });
    it('Should validate the schema for strings with regexp', () => {
        const s = new lib_1.Schema({
            type: 'string',
            validators: [
                { regex: '^test' }
            ]
        });
        assert_1.default(s.validate('test'), '"test" should be a valid string');
        assert_1.default(s.validate('testtest'), '"testtest" should be a valid string');
        assert_1.default(!s.validate('atest'), '"atest" should not be a valid string');
        assert_1.default(!s.validate('t'), '"t" should not be a valid string');
        assert_1.default(!s.validate(2), '2 should not be a valid string');
        assert_1.default(!s.validate({}), '{} should not be a valid string');
    });
});
describe('Schemas email tests', () => {
    it('Should validate the schema for emails', () => {
        const s = new lib_1.Schema({
            type: 'email'
        });
        assert_1.default(s.validate('test@gmail.com'), '"test@gmail.com" should be a valid email');
        assert_1.default(s.validate('test@gmail'), '"test@gmail" should be a valid email');
        assert_1.default(!s.validate('test#gmail.com'), '"test#gmail.com" should not be a valid email');
        assert_1.default(!s.validate('test'), '"test" should not be a valid email');
        assert_1.default(!s.validate(2), '2 should not be a valid email');
        assert_1.default(!s.validate({}), '{} should not be a valid email');
    });
});
describe('Schemas number tests', () => {
    it('Should validate the schema for numbers', () => {
        const s = new lib_1.Schema({
            type: 'number'
        });
        assert_1.default(s.validate(2), '2 should be a valid number');
        assert_1.default(s.validate(0), '0 should be a valid number');
        assert_1.default(s.validate(0x43444), '0x43444 should be a valid number');
        assert_1.default(s.validate(0b001101), '0b001101 should be a valid number');
        assert_1.default(s.validate(2.9990), '2.9990 should be a valid number');
        assert_1.default(!s.validate('test#gmail.com'), '"test#gmail.com" should not be a valid number');
        assert_1.default(!s.validate('test'), '"test" should not be a valid number');
        assert_1.default(!s.validate(NaN), 'NaN should not be a valid number');
        assert_1.default(!s.validate({}), '{} should not be a valid number');
    });
    it('Should validate the schema for numbers with min and max', () => {
        const s = new lib_1.Schema({
            type: 'number',
            validators: [
                { min: -3, max: 5 }
            ]
        });
        assert_1.default(s.validate(2), '2 should be a valid number');
        assert_1.default(s.validate(0), '0 should be a valid number');
        assert_1.default(!s.validate(-5), '-5 should not be a valid number');
        assert_1.default(s.validate(-3), '-3 should be a valid number');
        assert_1.default(s.validate(5), '-3 should be a valid number');
        assert_1.default(!s.validate(9), '-5 should not be a valid number');
        assert_1.default(!s.validate('test#gmail.com'), '"test#gmail.com" should not be a valid number');
        assert_1.default(!s.validate('test'), '"test" should not be a valid number');
        assert_1.default(!s.validate(NaN), 'NaN should not be a valid number');
        assert_1.default(!s.validate({}), '{} should not be a valid number');
    });
});
describe('Schemas integer tests', () => {
    it('Should validate the schema for integers', () => {
        const s = new lib_1.Schema({
            type: 'integer'
        });
        assert_1.default(s.validate(2), '2 should be a valid integer');
        assert_1.default(s.validate(-2), '0 should be a valid integer');
        assert_1.default(s.validate(0), '0 should be a valid integer');
        assert_1.default(s.validate(0x43444), '0x43444 should be a valid integer');
        assert_1.default(s.validate(0b001101), '0b001101 should be a valid integer');
        assert_1.default(!s.validate(2.9990), '2.9990 should not be a valid integer');
        assert_1.default(!s.validate('test#gmail.com'), '"test#gmail.com" should not be a valid integer');
        assert_1.default(!s.validate('test'), '"test" should not be a valid integer');
        assert_1.default(!s.validate(NaN), 'NaN should not be a valid integer');
        assert_1.default(!s.validate({}), '{} should not be a valid integer');
    });
    it('Should validate the schema for integers with min and max', () => {
        const s = new lib_1.Schema({
            type: 'integer',
            validators: [
                { min: -3, max: 5 }
            ]
        });
        assert_1.default(s.validate(2), '2 should be a valid integer');
        assert_1.default(s.validate(0), '0 should be a valid integer');
        assert_1.default(!s.validate(-5), '-5 should not be a valid integer');
        assert_1.default(s.validate(-3), '-3 should be a valid integer');
        assert_1.default(s.validate(5), '-3 should be a valid integer');
        assert_1.default(!s.validate(0.25), '0.25 should not be a valid integer');
        assert_1.default(!s.validate(9), '-5 should not be a valid integer');
        assert_1.default(!s.validate('test#gmail.com'), '"test#gmail.com" should not be a valid integer');
        assert_1.default(!s.validate('test'), '"test" should not be a valid integer');
        assert_1.default(!s.validate(NaN), 'NaN should not be a valid integer');
        assert_1.default(!s.validate({}), '{} should not be a valid integer');
    });
});
//# sourceMappingURL=schemas.tests.js.map