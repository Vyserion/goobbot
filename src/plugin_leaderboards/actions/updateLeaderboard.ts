import { ErrorCodes } from "../config/errorCodes";
import { Command } from "../../core/command";
import { LeaderboardController } from "../controllers/LeaderboardController";
import { Message } from "discord.js";

const updateLeaderboard = async (command: Command, message: Message) => {
	let result = await LeaderboardController.updateLeaderboard(command);

	let response;
	switch (result) {
		case ErrorCodes.LDBD_BAD_PARAM: {
			response = "No names were provided for the leaderboard";
			break;
		}
		case ErrorCodes.LDBD_NOT_FOUND: {
			response = "A leaderboard with the name " + command.arguments[0] + " was not found";
			break;
		}
		default: {
			response = "Successfully updated leaderboard " + command.arguments[0];
			break;
		}
	}

	message.channel.send(response);
};

export default updateLeaderboard;
