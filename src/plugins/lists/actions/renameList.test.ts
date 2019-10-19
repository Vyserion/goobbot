import { TCommand } from "../../../core/typings";
import { Actions } from "../config/actions";
import { RenameListHandler } from "./renameList";
import { createMockedMessage } from "../../../test";
import * as Guilds from "../../../core/guilds/guilds";
import * as Lists from "../dao/lists";
import { TList } from "../typings/lists";

// import { Guild, Message } from "discord.js";
// import { TGuild } from "../../../util/typings/guilds";
// import { UtilDao } from "../../../util/dao";
// import { Lists } from "../dao/lists";
// import { TList } from "../typings/lists";

// function getListStub(guildId: number, name: string): Promise<TList> {
// 	const list: TList = {
// 		guild_id: guildId,
// 		name: name
// 	};

// 	return new Promise(resolve => {
// 		if (name === "My List") {
// 			resolve(list);
// 		} else {
// 			resolve(null);
// 		}
// 	});
// }

describe("plugins/lists/actions/renameList", () => {

	describe("handleAction()", () => {

		it("should check for less than 2 arguments", async () => {
            const mockedMessage = createMockedMessage();
			const command: TCommand = {
				plugin: "lists",
				action: Actions.renameList,
				arguments: [],
				originalMessage: mockedMessage
			};

			const actionHandler = new RenameListHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = "No names were provided to rename the list";
			expect(result).toEqual(expectedResult);
		});

		it("should return an error if a list does not exist", async () => {
			const listName = "My List";
			const newListName = "New List";
			const mockedMessage = createMockedMessage();
			const command: TCommand = {
				plugin: "lists",
				action: Actions.renameList,
				arguments: [listName, newListName],
				originalMessage: mockedMessage
            };
            jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
            jest.spyOn(Lists, "getList").mockReturnValueOnce(Promise.resolve(null));

			const actionHandler = new RenameListHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A list with the name ${listName} does not exist.`;
			expect(result).toEqual(expectedResult);
		});

		it("should return an error if a list with the same name is found", async () => {
			const listName = "My List";
			const newListName = "New List";
			const mockedMessage = createMockedMessage();
			const command: TCommand = {
				plugin: "lists",
				action: Actions.renameList,
				arguments: [listName, newListName],
				originalMessage: mockedMessage
            };
            jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
            jest.spyOn(Lists, "getList").mockImplementation((_guildId: number, name: string): Promise<TList> => {
                return Promise.resolve({
                    name: name === listName ? listName : newListName
                });
            });

			const actionHandler = new RenameListHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A list with the name ${newListName} already exists.`;
			expect(result).toEqual(expectedResult);
		});

		it("should return a success message when renaming the list", async () => {
			const listName = "My List";
			const newListName = "New List";
			const mockedMessage = createMockedMessage();
			const command: TCommand = {
				plugin: "lists",
				action: Actions.renameList,
				arguments: [listName, newListName],
				originalMessage: mockedMessage
            };
            jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
            jest.spyOn(Lists, "getList").mockImplementation((_guildId: number, name: string): Promise<TList> => {
                if (name === listName) {
                    return Promise.resolve({
                        name: listName
                    });
                } else {
                    Promise.resolve(null);
                }
            });
            const querySpy = jest.spyOn(Lists, "updateListName");

			const actionHandler = new RenameListHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `Successfully renamed ${listName} to ${newListName}.`;
            expect(result).toEqual(expectedResult);
            
			expect(querySpy).toHaveBeenCalledTimes(1);
			expect(querySpy).toHaveBeenCalledWith(1, listName, newListName);
		});
	});
});
