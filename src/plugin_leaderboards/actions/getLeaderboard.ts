import { ErrorCodes } from "../config/errorCodes";
import { Command } from "../../core/command";
import { prettyPrintLeaderboard } from "../util/format";
import { Message } from "discord.js";
import { LeaderboardController } from "../controllers/LeaderboardController";

const getLeaderboard = async (command: Command, message: Message) => {
	let result = await LeaderboardController.getLeaderboard(command);

	let response;
	switch (result) {
		case ErrorCodes.LDBD_BAD_PARAM: {
			response = "No names were provided to get the leaderboard";
			break;
		}
		case ErrorCodes.LDBD_NOT_FOUND: {
			response = "A leaderboard with the name " + command.arguments[0] + " was not found";
			break;
		}
		default: {
			response = prettyPrintLeaderboard(result);
			break;
		}
	}

	message.channel.send(response);
};

export default getLeaderboard;
