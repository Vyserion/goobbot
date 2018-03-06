"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const command_1 = require("./command");
const discord_js_1 = require("discord.js");
const ts_mockito_1 = require("ts-mockito");
describe('Command tests', () => {
    let env;
    beforeEach(() => {
        env = process.env;
        process.env = {
            PREFIX: '!'
        };
    });
    describe('assignParts', () => {
        it('should map the plugin correctly', () => {
            const message = ts_mockito_1.mock(discord_js_1.Message);
            let pluginMessage = '!pluginName';
            let expectedPlugin = 'pluginName';
            ts_mockito_1.when(message.content).thenReturn(pluginMessage);
            let command = new command_1.Command(ts_mockito_1.instance(message));
            chai_1.expect(command.plugin).to.equal(expectedPlugin);
            chai_1.expect(command.action).to.be.undefined;
            chai_1.expect(command.arguments).to.be.undefined;
        });
    });
});
//# sourceMappingURL=command.spec.js.map