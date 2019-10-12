import { TCommand } from "../../../core/typings";
import { Actions } from "../config/actions";
import { AddValueHandler } from "./addValue";
import { createMockedMessage } from "../../../test";
import { TList } from "../typings/lists";
import * as Guilds from "../../../core/guilds/guilds";
import * as Lists from "../dao/lists";
import * as Values from "../dao/values";

describe("plugins/lists/actions/addValue", () => {

	afterEach(() => {
		jest.resetAllMocks();
	});

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
			expect(result).toEqual(expectedResult);
		});

		it("should return an error if the list does not exist", async () => {
			const listName = "My List";
			const mockedMessage = createMockedMessage();
			const command: TCommand = {
				plugin: "lists",
				action: Actions.addValue,
				arguments: [listName, "value"],
				originalMessage: mockedMessage
			};
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			jest.spyOn(Lists, "getList").mockReturnValueOnce(Promise.resolve(null));

			const actionHandler = new AddValueHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A list with the name ${listName} does not exist.`;
			expect(result).toEqual(expectedResult);
		});

		it("should return a success message when adding a value", async () => {
			const listName = "My List";
			const value = "value";
			const mockedMessage = createMockedMessage();
			const command: TCommand = {
				plugin: "lists",
				action: Actions.addValue,
				arguments: [listName, value],
				originalMessage: mockedMessage
			};
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			const mockedList: TList = {
				id: 1,
				name: listName
			};
			jest.spyOn(Lists, "getList").mockReturnValueOnce(Promise.resolve(mockedList));
			const querySpy = jest.spyOn(Values, "addValue").mockReturnValueOnce(Promise.resolve());

			const actionHandler = new AddValueHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `Successfully added value ${value}.`;
			expect(result).toEqual(expectedResult);
			expect(querySpy).toHaveBeenCalledTimes(1);
			expect(querySpy).toHaveBeenCalledWith(
				mockedList.id,
				value
			);
		});
	});
});
