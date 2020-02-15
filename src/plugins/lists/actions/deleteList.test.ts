import { TCommand } from "../../../core/typings";
import { Actions } from "../config/actions";
import { DeleteListHandler } from "./deleteList";
import { createMockedMessage } from "../../../test";
import * as Guilds from "../../../core/guilds/guilds";
import * as Lists from "../dao/lists";
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
			expect(result).toEqual(expectedResult);
		});

		it("should return an error if a list is not found", async () => {
			const listName = "My List";
			const mockedMessage = createMockedMessage();
			const command: TCommand = {
				plugin: "lists",
				action: Actions.deleteList,
				arguments: [listName],
				originalMessage: mockedMessage
			};
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			jest.spyOn(Lists, "getList").mockReturnValueOnce(Promise.resolve(null));

			const actionHandler = new DeleteListHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A list with the name ${listName} does not exist.`;
			expect(result).toEqual(expectedResult);
		});

		it("should return a success message when the list is deleted", async () => {
			const guildId = 1;
			const listName = "My List";
			const mockedMessage = createMockedMessage();
			const command: TCommand = {
				plugin: "lists",
				action: Actions.deleteList,
				arguments: [listName],
				originalMessage: mockedMessage
			};
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(guildId));
			const mockedList: TList = {
				name: listName
			};
			jest.spyOn(Lists, "getList").mockReturnValueOnce(Promise.resolve(mockedList));
			const querySpy = jest.spyOn(Lists, "deleteList").mockReturnValueOnce(Promise.resolve());

			const actionHandler = new DeleteListHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `Successfully delete list ${listName}.`;
			expect(result).toEqual(expectedResult);
			expect(querySpy).toHaveBeenCalledTimes(1);
			expect(querySpy).toHaveBeenCalledWith(
				guildId, listName
			);
		});
	});
});
