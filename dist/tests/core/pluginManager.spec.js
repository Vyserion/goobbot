"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const ts_mockito_1 = require("ts-mockito");
const pluginManager_1 = require("../../core/pluginManager");
const command_1 = require("../../core/command");
const discord_js_1 = require("discord.js");
const leaderboardHandler_1 = require("../../plugin_leaderboards/leaderboardHandler");
describe("PluginManager ::", () => {
    // @ts-ignore - Reads as unused variable.
    let env;
    beforeEach(() => {
        env = process.env;
        process.env = {
            PREFIX: "!"
        };
    });
    describe("isPluginMessage()", () => {
        it("should return true when the prefix and a length is found.", () => {
            const input = process.env.PREFIX + "message";
            const result = pluginManager_1.default.isPluginMessage(input);
            chai_1.expect(result).to.be.true;
        });
        it("should return false when just the prefix is provided.", () => {
            const input = process.env.PREFIX;
            const result = pluginManager_1.default.isPluginMessage(input);
            chai_1.expect(result).to.be.false;
        });
        it("should return false when a string without the prefix is provided.", () => {
            const input = "message";
            const result = pluginManager_1.default.isPluginMessage(input);
            chai_1.expect(result).to.be.false;
        });
    });
    describe("isPluginValid()", () => {
        it("should return true when the leaderboards plugin is provided.", () => {
            const input = "leaderboards";
            const result = pluginManager_1.default.isPluginValid(input);
            chai_1.expect(result).to.be.true;
        });
        it("should return false when the value provided is not a plugin", () => {
            const input = "notaplugin";
            const result = pluginManager_1.default.isPluginValid(input);
            chai_1.expect(result).to.be.false;
        });
    });
    describe("handleMessage()", () => {
        it("should handle the command if the plugin is found.", () => {
            const message = ts_mockito_1.mock(discord_js_1.Message);
            const command = ts_mockito_1.mock(command_1.Command);
            const pluginName = "leaderboards";
            ts_mockito_1.when(command.plugin).thenReturn(pluginName);
            const handler = ts_mockito_1.mock(leaderboardHandler_1.LeaderboardHandler);
            ts_mockito_1.when(handler.name).thenReturn(pluginName);
            ts_mockito_1.when(handler.handleCommand).thenReturn();
            pluginManager_1.default.plugins.pop();
            pluginManager_1.default.plugins.push(ts_mockito_1.instance(handler));
            pluginManager_1.default.handleMessage(ts_mockito_1.instance(command), ts_mockito_1.instance(message));
            ts_mockito_1.verify(handler.handleCommand(ts_mockito_1.instance(command), ts_mockito_1.instance(message))).called();
        });
    });
});
//# sourceMappingURL=pluginManager.spec.js.map