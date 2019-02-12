import "mocha";
import { expect } from "chai";
import { stub, SinonStub } from "sinon";
import { mock, when } from "ts-mockito";
import { TCommand } from "../../../core/typings";
import { Actions } from "../config/actions";
import { DeleteListHandler } from "./deleteList";
import { Message, Guild } from "discord.js";
import { TGuild } from "../../../util/typings/guilds";
import { UtilDao } from "../../../util/dao";
import { Lists } from "../dao/lists";
import { TList } from "../typings/lists";

describe("plugins/lists/actions/deleteList", () => {
    describe("handleAction()", () => {
        it("should check for less than 1 argument", async () => {
            const command: TCommand = {
                plugin: "lists",
                action: Actions.deleteList,
                arguments: [],
                originalMessage: null
            };

            const actionHandler = new DeleteListHandler(command);
            const result = await actionHandler.handleAction();
            const expectedResult = "No names were provided for the list.";
            expect(result).to.equal(expectedResult);
        });

        it("should return an error if a list is not found", async () => {
            const listName = "My List";
            const originalMessage = mock(Message);
            const mockedGuild = mock(Guild);
            when(mockedGuild.id).thenReturn("1234");
            when(originalMessage.guild).thenReturn(mockedGuild);
            const command: TCommand = {
                plugin: "lists",
                action: Actions.deleteList,
                arguments: [ listName ],
                originalMessage: originalMessage
            };

            const guild: TGuild = {
                discord_id: "1234",
                name: "Test"
            };
            stub(UtilDao, "getGuild").resolves(guild);
            stub(Lists, "getList").resolves(null);

            const actionHandler = new DeleteListHandler(command);
            const result = await actionHandler.handleAction();
            const expectedResult = `A list with the name ${listName} does not exist.`;
            expect(result).to.equal(expectedResult);

            (UtilDao.getGuild as SinonStub).restore();
            (Lists.getList as SinonStub).restore();
        });

        it("should return a success message when the list is deleted", async () => {
            const listName = "My List";
            const originalMessage = mock(Message);
            const mockedGuild = mock(Guild);
            when(mockedGuild.id).thenReturn("1234");
            when(originalMessage.guild).thenReturn(mockedGuild);
            const command: TCommand = {
                plugin: "lists",
                action: Actions.deleteList,
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
            stub(Lists, "deleteList");

            const actionHandler = new DeleteListHandler(command);
            const result = await actionHandler.handleAction();
            const expectedResult = `Successfully delete list ${listName}.`;
            expect(result).to.equal(expectedResult);

            (UtilDao.getGuild as SinonStub).restore();
            (Lists.getList as SinonStub).restore();
            (Lists.deleteList as SinonStub).restore();
        });
    });
});