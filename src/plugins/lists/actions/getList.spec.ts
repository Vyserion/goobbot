import "mocha";
import { expect } from "chai";
import { stub, SinonStub } from "sinon";
import { mock, when } from "ts-mockito";
import { TCommand } from "../../../core/typings";
import { Actions } from "../config/actions";
import { GetListHandler } from "./getList";
import { Message, Guild } from "discord.js";
import { TGuild } from "../../../util/typings/guilds";
import { UtilDao } from "../../../util/dao";
import { Lists } from "../dao/lists";
import { TList, TValue } from "../typings/lists";
import { Values } from "../dao/values";

describe("plugins/lists/actions/getList", () => {
    describe("handleAction()", () => {
        it("should check for less than 1 argument", async () => {
            const command: TCommand = {
                plugin: "lists",
                action: Actions.getList,
                arguments: [],
                originalMessage: null
            };

            const actionHandler = new GetListHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = "No name was provided for the list.";
			expect(result).to.equal(expectedResult);
        });

        it("should return an error if no list is found", async () => {
            const listName = "My List";
            const originalMessage = mock(Message);
            const mockedGuild = mock(Guild);
            when(mockedGuild.id).thenReturn("1234");
            when(originalMessage.guild).thenReturn(mockedGuild);
            const command: TCommand = {
                plugin: "lists",
                action: Actions.getList,
                arguments: [ listName ],
                originalMessage: originalMessage
            };

            const guild: TGuild = {
                discord_id: "1234",
                name: "Test"
            };
            stub(UtilDao, "getGuild").resolves(guild);
            stub(Lists, "getList").resolves(null);

            const actionHandler = new GetListHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A list with the name ${listName} does not exist.`;
			expect(result).to.equal(expectedResult);

            (UtilDao.getGuild as SinonStub).restore();
            (Lists.getList as SinonStub).restore();
        });

        it("should return a message with just the list name if there are no values", async () => {
            const listName = "My List";
            const originalMessage = mock(Message);
            const mockedGuild = mock(Guild);
            when(mockedGuild.id).thenReturn("1234");
            when(originalMessage.guild).thenReturn(mockedGuild);
            const command: TCommand = {
                plugin: "lists",
                action: Actions.getList,
                arguments: [ listName ],
                originalMessage: originalMessage
            };

            const guild: TGuild = {
                discord_id: "1234",
                name: "Test"
            };
            stub(UtilDao, "getGuild").resolves(guild);
            const list: TList = {
                name: listName
            };
            stub(Lists, "getList").resolves(list);
            stub(Values, "getValues").resolves([]);

            const actionHandler = new GetListHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `${listName} 

This list has no content.`;
			expect(result).to.equal(expectedResult);

            (UtilDao.getGuild as SinonStub).restore();
            (Lists.getList as SinonStub).restore();
            (Values.getValues as SinonStub).restore();
        });

        it("should return a message with just the list name if there are values", async () => {
            const listName = "My List";
            const originalMessage = mock(Message);
            const mockedGuild = mock(Guild);
            when(mockedGuild.id).thenReturn("1234");
            when(originalMessage.guild).thenReturn(mockedGuild);
            const command: TCommand = {
                plugin: "lists",
                action: Actions.getList,
                arguments: [ listName ],
                originalMessage: originalMessage
            };

            const guild: TGuild = {
                discord_id: "1234",
                name: "Test"
            };
            stub(UtilDao, "getGuild").resolves(guild);
            const list: TList = {
                name: listName
            };
            stub(Lists, "getList").resolves(list);
            const values: TValue[] = [
                {
                    list_id: 1,
                    value: "one"
                },
                {
                    list_id: 1,
                    value: "two"
                }
            ];
            stub(Values, "getValues").resolves(values);

            const actionHandler = new GetListHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `${listName} 

one
two
`;
			expect(result).to.equal(expectedResult);

            (UtilDao.getGuild as SinonStub).restore();
            (Lists.getList as SinonStub).restore();
            (Values.getValues as SinonStub).restore();
        });
    })
});