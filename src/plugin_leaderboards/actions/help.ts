import { Command } from "../../core/command";
import { Message } from "discord.js";
import helpMessages from "../config/helpMessages";
import { commands } from "../config/commands";

const showHelp = async (command: Command, message: Message) => {
	if (command.arguments.length === 0) {
		message.channel.send(helpMessages.showCommands);
	} else {
		let requestedCommand = command.arguments[0].toLowerCase();

		let response = "";

		if (requestedCommand === commands.GET_LEADERBOARD) response = helpMessages.getLeaderboard;
		else if (requestedCommand === commands.CREATE_LEADERBOARD) response = helpMessages.createLeaderboard;
		else if (requestedCommand === commands.UPDATE_LEADERBOARD) response = helpMessages.updateLeaderboard;
		else if (requestedCommand === commands.DELETE_LEADERBOARD) response = helpMessages.deleteLeaderboard;
		else if (requestedCommand === commands.CREATE_COLUMN) response = helpMessages.createColumn;
		else if (requestedCommand === commands.UPDATE_COLUMN) response = helpMessages.updateColumn;
		else if (requestedCommand === commands.DELETE_COLUMN) response = helpMessages.deleteColumn;
		else if (requestedCommand === commands.CREATE_ROW) response = helpMessages.createRow;
		else if (requestedCommand === commands.UPDATE_ROW) response = helpMessages.updateRow;
		else if (requestedCommand === commands.DELETE_ROW) response = helpMessages.deleteRow;
		else response = helpMessages.getLeaderboards;

		message.channel.send(response);
	}
};

export default showHelp;
