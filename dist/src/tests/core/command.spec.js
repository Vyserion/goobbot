"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const command_1 = require("../../core/command");
const discord_js_1 = require("discord.js");
const ts_mockito_1 = require("ts-mockito");
describe('Command ::', () => {
    let env;
    beforeEach(() => {
        env = process.env;
        process.env = {
            PREFIX: '!'
        };
    });
    describe('assignParts()', () => {
        // Assumption: assignParts is called indirectly from the constructor.
        // There's no need to explicitly call it at this time.
        it('should map the plugin correctly.', () => {
            const message = ts_mockito_1.mock(discord_js_1.Message);
            const expectedPlugin = 'pluginName';
            const pluginMessage = process.env.PREFIX + expectedPlugin;
            ts_mockito_1.when(message.content).thenReturn(pluginMessage);
            const command = new command_1.Command(ts_mockito_1.instance(message));
            chai_1.expect(command.plugin).to.equal(expectedPlugin);
        });
        it('should not map an action when one is not provided.', () => {
            const message = ts_mockito_1.mock(discord_js_1.Message);
            const messageText = process.env.PREFIX + 'pluginName';
            ts_mockito_1.when(message.content).thenReturn(messageText);
            const command = new command_1.Command(ts_mockito_1.instance(message));
            chai_1.expect(command.action).to.be.undefined;
        });
        it('should map an action when one is provided.', () => {
            const message = ts_mockito_1.mock(discord_js_1.Message);
            const expectedAction = 'action';
            const messageText = process.env.PREFIX + 'pluginName ' + expectedAction;
            ts_mockito_1.when(message.content).thenReturn(messageText);
            const command = new command_1.Command(ts_mockito_1.instance(message));
            chai_1.expect(command.action).to.equal(expectedAction);
        });
        it('should map no arguments when none are provided.', () => {
            const message = ts_mockito_1.mock(discord_js_1.Message);
            const messageText = process.env.PREFIX + 'pluginName action';
            ts_mockito_1.when(message.content).thenReturn(messageText);
            const command = new command_1.Command(ts_mockito_1.instance(message));
            chai_1.expect(command.arguments.length).to.equal(0);
        });
        it('should map a single argument when one is provided.', () => {
            const message = ts_mockito_1.mock(discord_js_1.Message);
            const expectedArgument = 'argumentOne';
            const messageText = process.env.PREFIX + 'pluginName action ' + expectedArgument;
            ts_mockito_1.when(message.content).thenReturn(messageText);
            const command = new command_1.Command(ts_mockito_1.instance(message));
            chai_1.expect(command.arguments.length).to.equal(1);
            const returnedArgument = command.arguments[0];
            chai_1.expect(returnedArgument).to.equal(expectedArgument);
        });
        it('should map a single argument when a multi-word argument is provided', () => {
            const message = ts_mockito_1.mock(discord_js_1.Message);
            const expectedArgument = "three word argument";
            const arrangedArgument = "'" + expectedArgument + "'";
            const messageText = process.env.PREFIX + 'pluginName action ' + arrangedArgument;
            ts_mockito_1.when(message.content).thenReturn(messageText);
            const command = new command_1.Command(ts_mockito_1.instance(message));
            chai_1.expect(command.arguments.length).to.equal(1);
            const returnedArgument = command.arguments[0];
            chai_1.expect(returnedArgument).to.equal(expectedArgument);
        });
        it('should map multiple arguments when multiple are provided.', () => {
            const message = ts_mockito_1.mock(discord_js_1.Message);
            const expectedFirstArgument = 'argumentOne';
            const expectedSecondArgument = 'argumentTwo';
            const messageText = process.env.PREFIX + 'pluginName action ' + expectedFirstArgument + ' ' + expectedSecondArgument;
            ts_mockito_1.when(message.content).thenReturn(messageText);
            const command = new command_1.Command(ts_mockito_1.instance(message));
            chai_1.expect(command.arguments.length).to.equal(2);
            const returnedArgumentOne = command.arguments[0];
            chai_1.expect(returnedArgumentOne).to.equal(expectedFirstArgument);
            const returnedArgumentTwo = command.arguments[1];
            chai_1.expect(returnedArgumentTwo).to.equal(expectedSecondArgument);
        });
        it('should map multiple arguments when multiple are provided, as a mix of single and multi-word arguments', () => {
            const message = ts_mockito_1.mock(discord_js_1.Message);
            const expectedFirstArgument = 'argumentOne';
            const expectedSecondArgument = 'argument Two Multiword';
            const arrangedSecondArgument = "'" + expectedSecondArgument + "'";
            const expectedThirdArgument = 'argumentThree';
            const messageText = process.env.PREFIX + 'pluginName action ' + expectedFirstArgument + ' ' + arrangedSecondArgument + ' ' + expectedThirdArgument;
            ts_mockito_1.when(message.content).thenReturn(messageText);
            const command = new command_1.Command(ts_mockito_1.instance(message));
            chai_1.expect(command.arguments.length).to.equal(3);
            const returnedArgumentOne = command.arguments[0];
            chai_1.expect(returnedArgumentOne).to.equal(expectedFirstArgument);
            const returnedArgumentTwo = command.arguments[1];
            chai_1.expect(returnedArgumentTwo).to.equal(expectedSecondArgument);
            const returnedArgumentThree = command.arguments[2];
            chai_1.expect(returnedArgumentThree).to.equal(expectedThirdArgument);
        });
    });
    describe('stripPrefix()', () => {
        it('should strip a single character prefix.', () => {
            process.env.PREFIX = '!';
            const message = ts_mockito_1.mock(discord_js_1.Message);
            ts_mockito_1.when(message.content).thenReturn('');
            const command = new command_1.Command(ts_mockito_1.instance(message));
            const text = 'theinput';
            const input = process.env.PREFIX + text;
            const result = command.stripPrefix(input);
            chai_1.expect(result).to.equal(text);
        });
        it('should strip a multiple character prefix.', () => {
            process.env.PREFIX = 'theprefix';
            const message = ts_mockito_1.mock(discord_js_1.Message);
            ts_mockito_1.when(message.content).thenReturn('');
            const command = new command_1.Command(ts_mockito_1.instance(message));
            const text = 'theinput';
            const input = process.env.PREFIX + text;
            const result = command.stripPrefix(input);
            chai_1.expect(result).to.equal(text);
        });
    });
    describe('parseArguments()', () => {
        it('should return an array of single word arguments', () => {
            const message = ts_mockito_1.mock(discord_js_1.Message);
            ts_mockito_1.when(message.content).thenReturn('');
            const command = new command_1.Command(ts_mockito_1.instance(message));
            const input = [
                'one',
                'two',
                'three'
            ];
            let results = command.parseArguments(input);
            chai_1.expect(results.length).to.equal(input.length);
            for (let i = 0; i < input.length; i++) {
                chai_1.expect(results[i]).to.equal(input[i]);
            }
        });
        it('should return an array of multi word arguments', () => {
            const message = ts_mockito_1.mock(discord_js_1.Message);
            ts_mockito_1.when(message.content).thenReturn('');
            const command = new command_1.Command(ts_mockito_1.instance(message));
            const input = [
                "'one", "two", "three'",
                "'four", "five", "six'"
            ];
            const expectedOutput = [
                'one two three',
                'four five six'
            ];
            let results = command.parseArguments(input);
            chai_1.expect(results.length).to.equal(expectedOutput.length);
            for (let i = 0; i < expectedOutput.length; i++) {
                chai_1.expect(results[i]).to.equal(expectedOutput[i]);
            }
        });
        it('should return an array of single and multi word arguments', () => {
            const message = ts_mockito_1.mock(discord_js_1.Message);
            ts_mockito_1.when(message.content).thenReturn('');
            const command = new command_1.Command(ts_mockito_1.instance(message));
            const input = [
                "one",
                "'two", "three", "four'",
                "five",
                "'six", "seven'",
                "eight"
            ];
            const expectedOutput = [
                'one',
                'two three four',
                'five',
                'six seven',
                'eight'
            ];
            let results = command.parseArguments(input);
            chai_1.expect(results.length).to.equal(expectedOutput.length);
            for (let i = 0; i < expectedOutput.length; i++) {
                chai_1.expect(results[i]).to.equal(expectedOutput[i]);
            }
        });
    });
});
//# sourceMappingURL=command.spec.js.map