import { TCommand } from "../../../core/typings";
import { Actions } from "../config/actions";
import { CreateListHandler } from "./createList";
import { createMockedMessage } from "../../../test";
import { TList } from "../typings/lists";
import * as Guilds from "../../../core/guilds/guilds";
import * as Lists from "../dao/lists";

describe("plugins/lists/actions/createList", () => {
	describe("handleAction()", () => {
		it("should check for less than 1 argument", async () => {
			const command: TCommand = {
				plugin: "lists",
				action: Actions.createList,
				arguments: [],
				originalMessage: null,
			};

			const actionHandler = new CreateListHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = "No name was provided for the list.";
			expect(result).toEqual(expectedResult);
		});

		it("should return an error if a list with the same name is found", async () => {
			const listName = "My List";
			const mockedMessage = createMockedMessage();
			const command: TCommand = {
				plugin: "lists",
				action: Actions.createList,
				arguments: [listName],
				originalMessage: mockedMessage,
			};
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			const mockedList: TList = {
				name: "list",
			};
			jest.spyOn(Lists, "getList").mockReturnValueOnce(Promise.resolve(mockedList));

			const actionHandler = new CreateListHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A list with the name ${listName} already exists.`;
			expect(result).toEqual(expectedResult);
		});

		it("should return a success message when the list is created", async () => {
			const guildId = 1;
			const listName = "My List";
			const mockedMessage = createMockedMessage();
			const command: TCommand = {
				plugin: "lists",
				action: Actions.createList,
				arguments: [listName],
				originalMessage: mockedMessage,
			};
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(guildId));
			jest.spyOn(Lists, "getList").mockReturnValueOnce(Promise.resolve(null));
			const querySpy = jest.spyOn(Lists, "createList").mockReturnValueOnce(Promise.resolve());

			const actionHandler = new CreateListHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `Successfully created list ${listName}`;
			expect(result).toEqual(expectedResult);
			expect(querySpy).toHaveBeenCalledTimes(1);
			expect(querySpy).toHaveBeenCalledWith(guildId, listName);
		});
	});
});
