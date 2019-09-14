import "mocha";
import { expect } from "chai";
import { stub, SinonStub } from "sinon";
import { mock, when } from "ts-mockito";
import { TCommand } from "../../../core/typings";
import { Actions } from "../config/actions";
import { AddValueHandler } from "./addValue";
import { Message, Guild } from "discord.js";
import { TGuild } from "../../../util/typings/guilds";
import { UtilDao } from "../../../util/dao";
import { Lists } from "../dao/lists";
import { TList } from "../typings/lists";
import { Values } from "../dao/values";

describe("plugins/lists/actions/addValue", () => {
	describe("handleAction()", () => {
		it("should check for less than 2 arguments", async () => {
			const command: TCommand = {
				plugin: "lists",
				action: Actions.addValue,
				arguments: [],
				originalMessage: null
			};

			const actionHandler = new AddValueHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = "No list name or value was provided.";
			expect(result).to.equal(expectedResult);
		});

		it("should return an error if the list does not exist", async () => {
			const listName = "My List";
			const originalMessage = mock(Message);
			const mockedGuild = mock(Guild);
			when(mockedGuild.id).thenReturn("1234");
			when(originalMessage.guild).thenReturn(mockedGuild);
			const command: TCommand = {
				plugin: "lists",
				action: Actions.addValue,
				arguments: [listName, "value"],
				originalMessage: originalMessage
			};

			const guild: TGuild = {
				discord_id: "1234",
				name: "Test"
			};
			stub(UtilDao, "getGuild").resolves(guild);
			stub(Lists, "getList").resolves(null);

			const actionHandler = new AddValueHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A list with the name ${listName} does not exist.`;
			expect(result).to.equal(expectedResult);

			(UtilDao.getGuild as SinonStub).restore();
			(Lists.getList as SinonStub).restore();
		});

		it("should return a success message when adding a value", async () => {
			const listName = "My List";
			const originalMessage = mock(Message);
			const mockedGuild = mock(Guild);
			when(mockedGuild.id).thenReturn("1234");
			when(originalMessage.guild).thenReturn(mockedGuild);
			const value = "value";
			const command: TCommand = {
				plugin: "lists",
				action: Actions.addValue,
				arguments: [listName, value],
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
			stub(Values, "addValue");

			const actionHandler = new AddValueHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `Successfully added value ${value}.`;
			expect(result).to.equal(expectedResult);

			(UtilDao.getGuild as SinonStub).restore();
			(Lists.getList as SinonStub).restore();
			(Values.addValue as SinonStub).restore();
		});
	});
});
