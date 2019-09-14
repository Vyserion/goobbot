import "mocha";
import { expect } from "chai";
import { stub, SinonStub } from "sinon";
import { mock, when } from "ts-mockito";
import { TCommand } from "../../../core/typings";
import { Actions } from "../config/actions";
import { RemoveValueHandler } from "./removeValue";
import { Message, Guild } from "discord.js";
import { TGuild } from "../../../util/typings/guilds";
import { UtilDao } from "../../../util/dao";
import { Lists } from "../dao/lists";
import { TList, TValue } from "../typings/lists";
import { Values } from "../dao/values";

describe("plugins/lists/actions/removeValue", () => {
	describe("handleAction()", () => {
		it("should check for less than 2 values", async () => {
			const command: TCommand = {
				plugin: "lists",
				action: Actions.removeValue,
				arguments: [],
				originalMessage: null
			};

			const actionHandler = new RemoveValueHandler(command);
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
				action: Actions.removeValue,
				arguments: [listName, "values"],
				originalMessage: originalMessage
			};

			const guild: TGuild = {
				discord_id: "1234",
				name: "Test"
			};
			stub(UtilDao, "getGuild").resolves(guild);
			stub(Lists, "getList").resolves(null);

			const actionHandler = new RemoveValueHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A list with the name ${listName} does not exist.`;
			expect(result).to.equal(expectedResult);

			(UtilDao.getGuild as SinonStub).restore();
			(Lists.getList as SinonStub).restore();
		});

		it("should return an error if the value cannot be found", async () => {
			const listName = "My List";
			const value = "value";
			const originalMessage = mock(Message);
			const mockedGuild = mock(Guild);
			when(mockedGuild.id).thenReturn("1234");
			when(originalMessage.guild).thenReturn(mockedGuild);
			const command: TCommand = {
				plugin: "lists",
				action: Actions.removeValue,
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
			stub(Values, "getValue").resolves(null);

			const actionHandler = new RemoveValueHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A value ${value} for list ${listName} does not exist.`;
			expect(result).to.equal(expectedResult);

			(UtilDao.getGuild as SinonStub).restore();
			(Lists.getList as SinonStub).restore();
			(Values.getValue as SinonStub).restore();
		});

		it("should return a success message when removing a value", async () => {
			const listName = "My List";
			const valueText = "value";
			const originalMessage = mock(Message);
			const mockedGuild = mock(Guild);
			when(mockedGuild.id).thenReturn("1234");
			when(originalMessage.guild).thenReturn(mockedGuild);
			const command: TCommand = {
				plugin: "lists",
				action: Actions.removeValue,
				arguments: [listName, valueText],
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
			const value: TValue = {
				list_id: 1,
				value: valueText
			};
			stub(Values, "getValue").resolves(value);
			stub(Values, "removeValue");

			const actionHandler = new RemoveValueHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `Successfully removed value ${valueText} from ${listName}.`;
			expect(result).to.equal(expectedResult);

			(UtilDao.getGuild as SinonStub).restore();
			(Lists.getList as SinonStub).restore();
			(Values.getValue as SinonStub).restore();
			(Values.removeValue as SinonStub).restore();
		});
	});
});
