import "mocha";
import { expect } from "chai";
import { stub, SinonStub } from "sinon";
import { mock, when } from "ts-mockito";
import { TCommand } from "../../../core/typings";
import { Actions } from "../config/actions";
import { RenameListHandler } from "./renameList";
import { Guild, Message } from "discord.js";
import { TGuild } from "../../../util/typings/guilds";
import { UtilDao } from "../../../util/dao";
import { Lists } from "../dao/lists";
import { TList } from "../typings/lists";

function getListStub(guildId: number, name: string): Promise<TList> {
	const list: TList = {
		guild_id: guildId,
		name: name
	};

	return new Promise(resolve => {
		if (name === "My List") {
			resolve(list);
		} else {
			resolve(null);
		}
	});
}

describe("plugins/lists/actions/renameList", () => {
	describe("handleAction()", () => {
		it("should check for less than 2 arguments", async () => {
			const command: TCommand = {
				plugin: "lists",
				action: Actions.renameList,
				arguments: [],
				originalMessage: null
			};

			const actionHandler = new RenameListHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = "No names were provided to rename the list";
			expect(result).to.equal(expectedResult);
		});

		it("should return an error if a list does not exist", async () => {
			const listName = "My List";
			const newListName = "New List";
			const originalMessage = mock(Message);
			const mockedGuild = mock(Guild);
			when(mockedGuild.id).thenReturn("1234");
			when(originalMessage.guild).thenReturn(mockedGuild);
			const command: TCommand = {
				plugin: "lists",
				action: Actions.renameList,
				arguments: [listName, newListName],
				originalMessage: originalMessage
			};

			const guild: TGuild = {
				discord_id: "1234",
				name: "Test"
			};
			stub(UtilDao, "getGuild").resolves(guild);
			stub(Lists, "getList").resolves(null);

			const actionHandler = new RenameListHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A list with the name ${listName} does not exist.`;
			expect(result).to.equal(expectedResult);

			(UtilDao.getGuild as SinonStub).restore();
			(Lists.getList as SinonStub).restore();
		});

		it("should return an error if a list with the same name is found", async () => {
			const listName = "My List";
			const newListName = "New List";
			const originalMessage = mock(Message);
			const mockedGuild = mock(Guild);
			when(mockedGuild.id).thenReturn("1234");
			when(originalMessage.guild).thenReturn(mockedGuild);
			const command: TCommand = {
				plugin: "lists",
				action: Actions.renameList,
				arguments: [listName, newListName],
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

			const actionHandler = new RenameListHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A list with the name ${newListName} already exists.`;
			expect(result).to.equal(expectedResult);

			(UtilDao.getGuild as SinonStub).restore();
			(Lists.getList as SinonStub).restore();
		});

		it("should return a success message when renaming the list", async () => {
			const listName = "My List";
			const newListName = "New List";
			const originalMessage = mock(Message);
			const mockedGuild = mock(Guild);
			when(mockedGuild.id).thenReturn("1234");
			when(originalMessage.guild).thenReturn(mockedGuild);
			const command: TCommand = {
				plugin: "lists",
				action: Actions.renameList,
				arguments: [listName, newListName],
				originalMessage: originalMessage
			};

			const guild: TGuild = {
				discord_id: "1234",
				name: "Test"
			};
			stub(UtilDao, "getGuild").resolves(guild);
			stub(Lists, "getList").callsFake(getListStub);
			stub(Lists, "updateListName");

			const actionHandler = new RenameListHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `Successfully renamed ${listName} to ${newListName}.`;
			expect(result).to.equal(expectedResult);

			(UtilDao.getGuild as SinonStub).restore();
			(Lists.getList as SinonStub).restore();
			(Lists.updateListName as SinonStub).restore();
		});
	});
});
