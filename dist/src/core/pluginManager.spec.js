"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const pluginManager_1 = require("./pluginManager");
describe('PluginManager ::', () => {
    let env;
    beforeEach(() => {
        env = process.env;
        process.env = {
            PREFIX: '!'
        };
    });
    describe('isPluginMessage()', () => {
        it('should return true when the prefix and a length is found.', () => {
            const input = process.env.PREFIX + 'message';
            const result = pluginManager_1.isPluginMessage(input);
            chai_1.expect(result).to.equal(true);
        });
        it('should return false when just the prefix is provided.', () => {
            const input = process.env.PREFIX;
            const result = pluginManager_1.isPluginMessage(input);
            chai_1.expect(result).to.equal(false);
        });
        it('should return false when a string without the prefix is provided.', () => {
            const input = 'message';
            const result = pluginManager_1.isPluginMessage(input);
            chai_1.expect(result).to.equal(false);
        });
    });
});
//# sourceMappingURL=pluginManager.spec.js.map