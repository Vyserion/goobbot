import "mocha";
import { expect } from "chai";
import { stub, SinonStub } from "sinon";
import { mock, when } from "ts-mockito";
import { TCommand } from "../../../core/typings";
import { Actions } from "../config/actions";
import { CreateListHandler } from "./createList";
import { Message, Guild } from "discord.js";
import { TGuild } from "../../../util/typings/guilds";
import { UtilDao } from "../../../util/dao";
import { TList } from "../typings/lists";
import { Lists } from "../dao/lists";

describe("plugins/lists/actions/createList", () => {
    describe("handleAction()", () => {
        it("should check for less than 1 argument", async () => {
            const command: TCommand = {
                plugin: "lists",
                action: Actions.createList,
                arguments: [],
                originalMessage: null
            };

            const actionHandler = new CreateListHandler(command);
            const result = await actionHandler.handleAction();
            const expectedResult = "No name was provided for the list.";
            expect(result).to.equal(expectedResult);
        });

        it("should return an error if a list with the same name is found", async () => {
            const listName = "My List";
            const originalMessage = mock(Message);
            const mockedGuild = mock(Guild);
            when(mockedGuild.id).thenReturn("1234");
            when(originalMessage.guild).thenReturn(mockedGuild);
            const command: TCommand = {
                plugin: "lists",
                action: Actions.createList,
                arguments: [listName],
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

            const actionHandler = new CreateListHandler(command);
            const result = await actionHandler.handleAction();
            const expectedResult = `A list with the name ${listName} already exists.`;
            expect(result).to.equal(expectedResult);

            (UtilDao.getGuild as SinonStub).restore();
            (Lists.getList as SinonStub).restore();
        });

        it("should return a success message when the list is created", async () => {
            const listName = "My List";
            const originalMessage = mock(Message);
            const mockedGuild = mock(Guild);
            when(mockedGuild.id).thenReturn("1234");
            when(originalMessage.guild).thenReturn(mockedGuild);
            const command: TCommand = {
                plugin: "lists",
                action: Actions.createList,
                arguments: [listName],
                originalMessage: originalMessage
            };

            const guild: TGuild = {
                discord_id: "1234",
                name: "Test"
            };
            stub(UtilDao, "getGuild").resolves(guild);
            stub(Lists, "getList").resolves(null);
            stub(Lists, "createList");

            const actionHandler = new CreateListHandler(command);
            const result = await actionHandler.handleAction();
            const expectedResult = `Successfully created list ${listName}`;
            expect(result).to.equal(expectedResult);

            (UtilDao.getGuild as SinonStub).restore();
            (Lists.getList as SinonStub).restore();
            (Lists.createList as SinonStub).restore();
        });
    });
});