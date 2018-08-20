import { ReturnCodes } from "../config/ReturnCodes";
import { Command } from "../../core/command";
import { Message } from "discord.js";
import { LeaderboardController } from "../controllers/LeaderboardController";

const deleteLeaderboard = async (command: Command, message: Message) => {
	let result = await LeaderboardController.deleteLeaderboard(command);

	let response;
	switch (result) {
		case ReturnCodes.LDBD_BAD_PARAM: {
			response = "No names were provided for the leaderboard";
			break;
		}
		case ReturnCodes.LDBD_NOT_FOUND: {
			response = "A leaderboard with the name " + command.arguments[0] + " was not found";
			break;
		}
		default: {
			response = "Successfully deleted leaderboard " + command.arguments[0];
			break;
		}
	}

	message.channel.send(response);
};

export default deleteLeaderboard;
