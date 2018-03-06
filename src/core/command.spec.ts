import 'mocha';
import { expect } from 'chai';
import { Command } from "./command";
import { Message } from 'discord.js';
import { mock, instance, when } from 'ts-mockito';

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
            const message: Message = mock(Message);
            const expectedPlugin: string = 'pluginName';
            const pluginMessage: string = process.env.PREFIX + expectedPlugin;
            
            when(message.content).thenReturn(pluginMessage);

            const command: Command = new Command(instance(message));

            expect(command.plugin).to.equal(expectedPlugin);
        });

        it('should not map an action when one is not provided.', () => {
            const message: Message = mock(Message);
            const messageText: string = process.env.PREFIX + 'pluginName';
            when(message.content).thenReturn(messageText);

            const command:Command = new Command(instance(message));

            expect(command.action).to.be.undefined;
        });

        it('should map an action when one is provided.', () => {
            const message: Message = mock(Message);
            const expectedAction: string = 'action';
            const messageText: string = process.env.PREFIX + 'pluginName ' + expectedAction;
            when(message.content).thenReturn(messageText);

            const command: Command = new Command(instance(message));

            expect(command.action).to.equal(expectedAction);
        });

        it('should map no arguments when none are provided.', () => {
            const message: Message = mock(Message);
            const messageText: string = process.env.PREFIX + 'pluginName action';
            when(message.content).thenReturn(messageText);

            const command: Command = new Command(instance(message));

            expect(command.arguments).to.be.undefined;
        });

        it('should map a single argument when one is provided.', () => {
            const message: Message = mock(Message);
            const expectedArgument: string = 'argumentOne';
            const messageText: string = process.env.PREFIX + 'pluginName action ' + expectedArgument;
            when(message.content).thenReturn(messageText);

            const command: Command = new Command(instance(message));

            expect(command.arguments.length).to.equal(1);
            const returnedArgument: string = command.arguments[0];
            expect(returnedArgument).to.equal(expectedArgument);
        });

        it('should map multiple arguments when multiple are provided.', () => {
            const message: Message = mock(Message);
            const expectedFirstArgument: string = 'argumentOne';
            const expectedSecondArgument: string = 'argumentTwo';
            const messageText: string = process.env.PREFIX + 'pluginName action ' + expectedFirstArgument + ' ' + expectedSecondArgument;
            when(message.content).thenReturn(messageText);

            const command: Command = new Command(instance(message));

            expect(command.arguments.length).to.equal(2);
            const returnedArgumentOne: string = command.arguments[0];
            expect(returnedArgumentOne).to.equal(expectedFirstArgument);
            const returnedArgumentTwo: string = command.arguments[1];
            expect(returnedArgumentTwo).to.equal(expectedSecondArgument);
        });

    });

    describe('stripPrefix()', () => {

        it('should strip a single character prefix.', () => {
            process.env.PREFIX = '!';

            const message: Message = mock(Message);
            when(message.content).thenReturn('');
            const command: Command = new Command(instance(message));

            const text: string = 'theinput';
            const input: string = process.env.PREFIX + text;
            const result: string = command.stripPrefix(input);

            expect(result).to.equal(text);
        });

        it('should strip a multiple character prefix.', () => {
            process.env.PREFIX = 'theprefix';

            const message: Message = mock(Message);
            when(message.content).thenReturn('');
            const command: Command = new Command(instance(message));

            const text: string = 'theinput';
            const input: string = process.env.PREFIX + text;
            const result: string = command.stripPrefix(input);

            expect(result).to.equal(text);
        });

    });

});