import { TCommand } from "../../../core/typings";
import { Actions } from "../config/actions";
import { RemoveValueHandler } from "./removeValue";
import { createMockedMessage } from "../../../test";
import * as Guilds from "../../../core/guilds/guilds";
import * as Lists from "../dao/lists";
import * as Values from "../dao/values";
import { TList, TValue } from "../typings/lists";

describe("plugins/lists/actions/removeValue", () => {
	describe("handleAction()", () => {
		it("should check for less than 2 values", async () => {
			const mockedMessage = createMockedMessage();
			const command: TCommand = {
				plugin: "lists",
				action: Actions.removeValue,
				arguments: [],
				originalMessage: mockedMessage
			};

			const actionHandler = new RemoveValueHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = "No list name or value was provided.";
			expect(result).toEqual(expectedResult);
		});

		it("should return an error if the list does not exist", async () => {
			const listName = "My List";
			const mockedMessage = createMockedMessage();
			const command: TCommand = {
				plugin: "lists",
				action: Actions.removeValue,
				arguments: [listName, "values"],
				originalMessage: mockedMessage
			};
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			jest.spyOn(Lists, "getList").mockReturnValueOnce(Promise.resolve(null));

			const actionHandler = new RemoveValueHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A list with the name ${listName} does not exist.`;
			expect(result).toEqual(expectedResult);
		});

		it("should return an error if the value cannot be found", async () => {
			const listName = "My List";
			const value = "value";
			const mockedMessage = createMockedMessage();
			const command: TCommand = {
				plugin: "lists",
				action: Actions.removeValue,
				arguments: [listName, value],
				originalMessage: mockedMessage
			};
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			const list: TList = {
				name: listName
			};
			jest.spyOn(Lists, "getList").mockReturnValueOnce(Promise.resolve(list));
			jest.spyOn(Values, "getValue").mockReturnValueOnce(Promise.resolve(null));

			const actionHandler = new RemoveValueHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A value ${value} for list ${listName} does not exist.`;
			expect(result).toEqual(expectedResult);
		});

		it("should return a success message when removing a value", async () => {
			const listName = "My List";
			const valueText = "value";
			const mockedMessage = createMockedMessage();
			const command: TCommand = {
				plugin: "lists",
				action: Actions.removeValue,
				arguments: [listName, valueText],
				originalMessage: mockedMessage
			};
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			const list: TList = {
				id: 1,
				name: listName
			};
			jest.spyOn(Lists, "getList").mockReturnValueOnce(Promise.resolve(list));
			const value: TValue = {
				id: 1,
				// eslint-disable-next-line @typescript-eslint/camelcase
				list_id: 1,
				value: valueText
			};
			jest.spyOn(Values, "getValue").mockReturnValueOnce(Promise.resolve(value));
			const querySpy = jest.spyOn(Values, "removeValue");

			const actionHandler = new RemoveValueHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `Successfully removed value ${valueText} from ${listName}.`;
			expect(result).toEqual(expectedResult);

			expect(querySpy).toHaveBeenCalledTimes(1);
			expect(querySpy).toHaveBeenCalledWith(list.id, value.id);
		});
	});
});
