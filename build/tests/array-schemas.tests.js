"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert_1 = __importDefault(require("assert"));
const lib_1 = require("../lib");
describe('Schemas Array tests', () => {
    it('Should validate the schema for array of number', () => {
        const s = new lib_1.Schema({
            type: 'array',
            arrayType: {
                type: 'number',
                validators: [
                    { min: 1900, max: 2021 }
                ]
            }
        });
        assert_1.default(s.validate([]), '[] should be a valid array');
        assert_1.default(s.validate([2000]), '[2000] should be a valid array');
        assert_1.default(s.validate([2000, 2005, 2009]), '[2000,2005,2009] should be a valid array');
        assert_1.default(!s.validate([200, 2005, 2009]), '[200,2005,2009] should not be a valid array');
        assert_1.default(!s.validate([2000, 2005, 'test']), '[200,2005,"test] should not be a valid array');
        assert_1.default(!s.validate([2000, 2005, 2025]), '[200,2005,2025] should not be a valid array');
        assert_1.default(!s.validate('test'), '"test" should not be a valid array');
        assert_1.default(!s.validate(2), '2 should not be a valid array');
        assert_1.default(!s.validate({}), '{} should not be a valid array');
    });
    it('Should validate the schema for array of strings', () => {
        const s = new lib_1.Schema({
            type: 'array',
            arrayType: {
                type: 'string',
                validators: [
                    {}
                ]
            }
        });
        assert_1.default(s.validate([]), '[] should be a valid array');
        assert_1.default(s.validate(['test']), '["test"] should be a valid array');
        assert_1.default(s.validate(['test', 'test2']), '["test", "test2"] should be a valid array');
        assert_1.default(!s.validate([200, 2005, 2009]), '[200,2005,2009] should not be a valid array');
        assert_1.default(!s.validate([2000, 2005, 'test']), '[200,2005,"test] should not be a valid array');
        assert_1.default(!s.validate([2000, 2005, 2025]), '[200,2005,2025] should not be a valid array');
        assert_1.default(!s.validate('test'), '"test" should not be a valid array');
        assert_1.default(!s.validate(2), '2 should not be a valid array');
        assert_1.default(!s.validate({}), '{} should not be a valid array');
    });
});
//# sourceMappingURL=array-schemas.tests.js.map