import { TCommand } from "../../new_core/command";
import { Commands } from "../config/commands";

import {
	createColumn,
	createLeaderboard,
	createRow,
	deleteColumn,
	deleteLeaderboard,
	deleteRow,
	getLeaderboard,
	getLeaderboards,
	showCommands,
	updateColumn,
	updateLeaderboard,
	updateRow,
	upsertValue
} from "../config/helptext";

export async function showHelp(command: TCommand): Promise<string> {
	if (command.arguments.length === 0) {
		return showCommands;
	} else {
		const requestedCommand = command.arguments[0].toLowerCase();

		let response = "";

		if (requestedCommand === Commands.GET_LEADERBOARD) response = getLeaderboard;
		else if (requestedCommand === Commands.CREATE_LEADERBOARD) response = createLeaderboard;
		else if (requestedCommand === Commands.UPDATE_LEADERBOARD) response = updateLeaderboard;
		else if (requestedCommand === Commands.DELETE_LEADERBOARD) response = deleteLeaderboard;
		else if (requestedCommand === Commands.CREATE_COLUMN) response = createColumn;
		else if (requestedCommand === Commands.UPDATE_COLUMN) response = updateColumn;
		else if (requestedCommand === Commands.DELETE_COLUMN) response = deleteColumn;
		else if (requestedCommand === Commands.CREATE_ROW) response = createRow;
		else if (requestedCommand === Commands.UPDATE_ROW) response = updateRow;
		else if (requestedCommand === Commands.DELETE_ROW) response = deleteRow;
		else if (requestedCommand === Commands.UPSERT_VALUE) response = upsertValue;
		else response = getLeaderboards;

		return response;
	}
}
