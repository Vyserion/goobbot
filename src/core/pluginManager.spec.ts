import 'mocha';
import { expect } from 'chai';
import { mock, instance, when, verify } from 'ts-mockito';
import PluginManager from './pluginManager';
import { Command } from "./command";
import { Message } from 'discord.js';
import { LeaderboardHandler } from '../plugin_leaderboards/leaderboardHandler';

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
            const input: string = process.env.PREFIX + 'message';
            const result: boolean = PluginManager.isPluginMessage(input);
            expect(result).to.be.true;
        });

        it('should return false when just the prefix is provided.', () => {
            const input: string = process.env.PREFIX;
            const result: boolean = PluginManager.isPluginMessage(input);
            expect(result).to.be.false;
        });

        it('should return false when a string without the prefix is provided.', () => {
            const input: string = 'message';
            const result: boolean = PluginManager.isPluginMessage(input);
            expect(result).to.be.false;
        });

    });

    describe('isPluginValid()', () => {

        it('should return true when the leaderboards plugin is provided.', () => {
            const input: string = 'leaderboards';
            const result: boolean = PluginManager.isPluginValid(input);
            expect(result).to.be.true;
        })

        it('should return false when the value provided is not a plugin', () => {
            const input: string = 'notaplugin';
            const result: boolean = PluginManager.isPluginValid(input);
            expect(result).to.be.false;
        });

    });

    describe('handleMessage()', () => {

        it('should handle the command if the plugin is found.', () => {
            const message: Message = mock(Message);
            const command: Command = mock(Command);
            const pluginName: string = 'leaderboards';
            when(command.plugin).thenReturn(pluginName);
            
            const handler: LeaderboardHandler = mock(LeaderboardHandler);
            when(handler.name).thenReturn(pluginName);
            when(handler.handleCommand).thenReturn();
            PluginManager.plugins.pop();
            PluginManager.plugins.push(instance(handler));

            PluginManager.handleMessage(instance(command), instance(message));
            verify(handler.handleCommand(instance(command), instance(message))).called();
        });

    });

});