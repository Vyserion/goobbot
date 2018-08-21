import { Command } from "../../core/command";
import helpMessages from "../config/helpMessages";
import { Commands } from "../config/commands";

export async function showHelp(command: Command): Promise<string> {
	if (command.arguments.length === 0) {
		return helpMessages.showCommands;
	} else {
		const requestedCommand = command.arguments[0].toLowerCase();

		let response = "";

		if (requestedCommand === Commands.GET_LEADERBOARD) response = helpMessages.getLeaderboard;
		else if (requestedCommand === Commands.CREATE_LEADERBOARD) response = helpMessages.createLeaderboard;
		else if (requestedCommand === Commands.UPDATE_LEADERBOARD) response = helpMessages.updateLeaderboard;
		else if (requestedCommand === Commands.DELETE_LEADERBOARD) response = helpMessages.deleteLeaderboard;
		else if (requestedCommand === Commands.CREATE_COLUMN) response = helpMessages.createColumn;
		else if (requestedCommand === Commands.UPDATE_COLUMN) response = helpMessages.updateColumn;
		else if (requestedCommand === Commands.DELETE_COLUMN) response = helpMessages.deleteColumn;
		else if (requestedCommand === Commands.CREATE_ROW) response = helpMessages.createRow;
		else if (requestedCommand === Commands.UPDATE_ROW) response = helpMessages.updateRow;
		else if (requestedCommand === Commands.DELETE_ROW) response = helpMessages.deleteRow;
		else response = helpMessages.getLeaderboards;

		return response;
	}
}
