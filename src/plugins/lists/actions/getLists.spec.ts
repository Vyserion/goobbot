import "mocha";
import { expect } from "chai";
import { stub, SinonStub } from "sinon";
import { mock, when } from "ts-mockito";
import { Message, Guild } from "discord.js";
import { TCommand } from "../../../core/typings";
import { Actions } from "../config/actions";
import { TGuild } from "../../../util/typings/guilds";
import { UtilDao } from "../../../util/dao";
import { Lists } from "../dao/lists";
import { GetListsHandler } from "./getLists";
import { TList } from "../typings/lists";

describe("plugins/lists/actions/getLists", () => {
	describe("handleAction()", () => {
		it("should return a message when there are no lists", async () => {
			const originalMessage = mock(Message);
			const mockedGuild = mock(Guild);
			when(mockedGuild.id).thenReturn("1234");
			when(originalMessage.guild).thenReturn(mockedGuild);
			const command: TCommand = {
				plugin: "lists",
				action: Actions.addValue,
				arguments: [],
				originalMessage: originalMessage
			};

			const guild: TGuild = {
				discord_id: "1234",
				name: "Test"
			};
			stub(UtilDao, "getGuild").resolves(guild);
			stub(Lists, "getLists").resolves([]);

			const actionHandler = new GetListsHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `There are currently no lists`;
			expect(result).to.equal(expectedResult);

			(UtilDao.getGuild as SinonStub).restore();
			(Lists.getLists as SinonStub).restore();
		});

		it("should return a formatted messaged when there are some lists", async () => {
			const originalMessage = mock(Message);
			const mockedGuild = mock(Guild);
			when(mockedGuild.id).thenReturn("1234");
			when(originalMessage.guild).thenReturn(mockedGuild);
			const command: TCommand = {
				plugin: "lists",
				action: Actions.addValue,
				arguments: [],
				originalMessage: originalMessage
			};

			const guild: TGuild = {
				discord_id: "1234",
				name: "Test"
			};
			stub(UtilDao, "getGuild").resolves(guild);
			const lists: TList[] = [
				{
					name: "My List"
				},
				{
					name: "List Two"
				}
			];
			stub(Lists, "getLists").resolves(lists);

			const actionHandler = new GetListsHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `My List
List Two
`;
			expect(result).to.equal(expectedResult);

			(UtilDao.getGuild as SinonStub).restore();
			(Lists.getLists as SinonStub).restore();
		});
	});
});
