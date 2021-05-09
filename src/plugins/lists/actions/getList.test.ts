import { TCommand } from "../../../core/typings";
import { Actions } from "../config/actions";
import { GetListHandler } from "./getList";
import { createMockedMessage } from "../../../test";
import * as Guilds from "../../../core/guilds/guilds";
import * as Lists from "../dao/lists";
import * as Values from "../dao/values";
import { TList, TValue } from "../typings/lists";

describe("plugins/lists/actions/getList", () => {
	describe("handleAction()", () => {
		it("should check for less than 1 argument", async () => {
			const command: TCommand = {
				plugin: "lists",
				action: Actions.getList,
				arguments: [],
				originalMessage: null,
			};

			const actionHandler = new GetListHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = "No name was provided for the list.";
			expect(result).toEqual(expectedResult);
		});

		it("should return an error if no list is found", async () => {
			const listName = "My List";
			const mockedMessage = createMockedMessage();
			const command: TCommand = {
				plugin: "lists",
				action: Actions.getList,
				arguments: [listName],
				originalMessage: mockedMessage,
			};
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			jest.spyOn(Lists, "getList").mockReturnValueOnce(Promise.resolve(null));

			const actionHandler = new GetListHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A list with the name ${listName} does not exist.`;
			expect(result).toEqual(expectedResult);
		});

		it("should return a message with just the list name if there are no values", async () => {
			const listName = "My List";
			const mockedMessage = createMockedMessage();
			const command: TCommand = {
				plugin: "lists",
				action: Actions.getList,
				arguments: [listName],
				originalMessage: mockedMessage,
			};
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			const mockedList: TList = {
				name: listName,
			};
			jest.spyOn(Lists, "getList").mockReturnValueOnce(Promise.resolve(mockedList));
			jest.spyOn(Values, "getValues").mockReturnValueOnce(Promise.resolve([]));

			const actionHandler = new GetListHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `${listName} 

This list has no content.`;
			expect(result).toEqual(expectedResult);
		});

		it("should return a message with just the list name if there are values", async () => {
			const listName = "My List";
			const mockedMessage = createMockedMessage();
			const command: TCommand = {
				plugin: "lists",
				action: Actions.getList,
				arguments: [listName],
				originalMessage: mockedMessage,
			};
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			const mockedList: TList = {
				name: listName,
			};
			jest.spyOn(Lists, "getList").mockReturnValueOnce(Promise.resolve(mockedList));
			const values: TValue[] = [
				{
					list_id: 1,
					value: "one",
				},
				{
					list_id: 2,
					value: "two",
				},
			];
			jest.spyOn(Values, "getValues").mockReturnValueOnce(Promise.resolve(values));

			const actionHandler = new GetListHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `${listName} 

one
two
`;
			expect(result).toEqual(expectedResult);
		});
	});
});
