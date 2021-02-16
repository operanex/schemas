"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const assert_1 = __importDefault(require("assert"));
const lib_1 = require("../lib");
describe('Schemas definition tests', () => {
    it('Should validate the schema for object with definitions', () => {
        const s = new lib_1.Schema({
            type: 'object',
            definitions: {
                position: {
                    type: 'object',
                    properties: {
                        x: { type: 'number' },
                        y: { type: 'number' },
                    }
                }
            },
            properties: {
                positions: { type: 'array', arrayType: { type: 'position' }
                },
                name: { type: 'string' }
            }
        });
        assert_1.default(s.validate({ name: 'test', positions: [{ x: 5, y: 8 }] }), "{ name : 'test', positions : [{ x : 5, y: 8 }] } should be a valid object");
        assert_1.default(!s.validate({ name: 'test', positions: [{ x: 'test', y: 8 }] }), "{ name : 'test', positions : [{ x : 'test', y: 8 }] } should not be a valid object");
    });
    it('Should validate the schema for deep nested object with definitions', () => {
        const s = new lib_1.Schema({
            type: 'object',
            definitions: {
                node: {
                    type: 'object',
                    properties: {
                        value: { required: true, type: 'number' },
                        child: { type: 'node' },
                    }
                }
            },
            properties: {
                head: { type: 'node' }
            }
        });
        assert_1.default(s.validate({
            head: { value: 5, child: { value: 6, child: { value: 7 } } }
        }), "{head : { value : 5, child : { value : 6, child : { value : 7 } } }} should be a valid object");
        assert_1.default(!s.validate({
            head: { value: 5, child: { value: 6, child: { value: 'test' } } }
        }), "{head : { value : 5, child : { value : 6, child : { value : 'test } } }} should not be a valid object");
    });
});
//# sourceMappingURL=dynamic-type.tests.js.map