import { TCommand } from "../core/typings";
import { Message, MessageOptions } from "discord.js";
import { Commands } from "./config/commands";

import {
	addColumn,
	addRow,
	deleteColumn,
	deleteRow,
	getLeaderboards,
	updateLeaderboardColumn,
	updateLeaderboardRow,
	upsertValue
} from "./actions";
import { showHelp } from "./actions";

export class LeaderboardHandler {
	name: string = "leaderboards";

	handleCommand = async (command: TCommand, message: Message): Promise<void> => {
		let action: string = command.action ? command.action : "";
		action = action.toLowerCase();

		let response: string;
		let embed: boolean = true;
		switch (action) {

			case Commands.UPDATE_ROW: {
				response = await updateLeaderboardRow(command);
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

		if (embed) {
			const options: MessageOptions = {
				embed: {
					title: "Vybot",
					description: response,
					color: 0xff0000 // Red
				}
			};
			message.channel.send(options);
		} else {
			message.channel.send(response);
		}
	};
}
