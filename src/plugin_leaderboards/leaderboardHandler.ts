import { Command } from "../core/command";
import { Message, MessageOptions } from "discord.js";
import { Commands } from "./config/commands";

import { addColumn, addLeaderboard, addRow, deleteColumn, deleteLeaderboard, deleteRow, getLeaderboard, getLeaderboards, updateLeaderboard, updateLeaderboardColumn, updateLeaderboardRow, upsertValue  } from "./actions";
import { showHelp } from "./actions";

export class LeaderboardHandler {
	name: string = "leaderboards";

	handleCommand = async (command: Command, message: Message): Promise<void> => {
		let action: string = command.action ? command.action : "";
		action = action.toLowerCase();

		let response: string;
		switch (action) {
			case Commands.CREATE_LEADERBOARD: {
				response = await addLeaderboard(command);
				break;
			}
			case Commands.CREATE_COLUMN: {
				response = await addColumn(command);
				break;
			}
			case Commands.CREATE_ROW: {
				response = await addRow(command);
				break;
			}

			case Commands.UPDATE_LEADERBOARD: {
				response = await updateLeaderboard(command);
				break;
			}
			case Commands.UPDATE_COLUMN: {
				response = await updateLeaderboardColumn(command);
				break;
			}
			case Commands.UPDATE_ROW: {
				response = await updateLeaderboardRow(command);
				break;
			}

			case Commands.DELETE_LEADERBOARD: {
				response = await deleteLeaderboard(command);
				break;
			}
			case Commands.DELETE_COLUMN: {
				response = await deleteColumn(command);
				break;
			}
			case Commands.DELETE_ROW: {
				response = await deleteRow(command);
				break;
			}

			case Commands.GET_LEADERBOARD: {
				response = await getLeaderboard(command);
				break;
			}

			case Commands.UPSERT_VALUE: {
				response = await upsertValue(command);
				break;
			}

			case Commands.HELP: {
				response = await showHelp(command);
				break;
			}

			default: {
				response = await getLeaderboards();
				break;
			}
		}

		const options: MessageOptions = {
			embed: {
				color: 'red'
			}
		}
		message.channel.send(response, options);
	};
}
