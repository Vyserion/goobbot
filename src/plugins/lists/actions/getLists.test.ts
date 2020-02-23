import { TCommand } from "../../../core/typings";
import { Actions } from "../config/actions";
import { createMockedMessage } from "../../../test";
import { GetListsHandler } from "./getLists";
import * as Guilds from "../../../core/guilds/guilds";
import * as Lists from "../dao/lists";
import { TList } from "../typings/lists";

describe("plugins/lists/actions/getLists", () => {
	describe("handleAction()", () => {
		it("should return a message when there are no lists", async () => {
			const mockedMessage = createMockedMessage();
			const command: TCommand = {
				plugin: "lists",
				action: Actions.addValue,
				arguments: [],
				originalMessage: mockedMessage
			};
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			jest.spyOn(Lists, "getLists").mockReturnValueOnce(Promise.resolve([]));

			const actionHandler = new GetListsHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `There are currently no lists`;
			expect(result).toEqual(expectedResult);
		});

		it("should return a formatted messaged when there are some lists", async () => {
			const mockedMessage = createMockedMessage();
			const command: TCommand = {
				plugin: "lists",
				action: Actions.addValue,
				arguments: [],
				originalMessage: mockedMessage
			};
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			const lists: TList[] = [
				{
					name: "My List"
				},
				{
					name: "List Two"
				}
			];
			jest.spyOn(Lists, "getLists").mockReturnValueOnce(Promise.resolve(lists));

			const actionHandler = new GetListsHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `My List
List Two
`;
			expect(result).toEqual(expectedResult);
		});
	});
});
