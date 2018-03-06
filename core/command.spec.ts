import 'mocha';
import { expect } from 'chai';
import { Command } from "./command";
import { Message, TextChannel } from 'discord.js';
import {mock, instance, when, verify} from 'ts-mockito';

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
            const message:Message = mock(Message);
            let pluginMessage:string = '!pluginName'
            let expectedPlugin:string = 'pluginName';
            when(message.content).thenReturn(pluginMessage);

            let command:Command = new Command(instance(message));

            expect(command.plugin).to.equal(expectedPlugin);
            expect(command.action).to.be.undefined;
            expect(command.arguments).to.be.undefined;
        });

    });

});