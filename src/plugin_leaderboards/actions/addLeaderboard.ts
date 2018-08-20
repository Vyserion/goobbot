import { ReturnCodes } from "../config/ReturnCodes";
import { Command } from "../../core/command";
import { Message } from "discord.js";
import { LeaderboardController } from "../controllers/LeaderboardController";

const addLeaderboard = async (command: Command, message: Message) => {
	let result = await LeaderboardController.insertLeaderboard(command);

	let response;
	switch (result) {
		case ReturnCodes.INCORRECT_PARAM_LENGTH: {
			response = "No name was provided for the leaderboard";
			break;
		}
		case ReturnCodes.LEADERBOARD_DUPLICATE_NAME: {
			response = "A leaderboard with the name " + command.arguments[0] + " already exists";
			break;
		}
		default: {
			response = "Successfully created leaderboard " + command.arguments[0];
			break;
		}
	}

	message.channel.send(response);
};

export default addLeaderboard;
