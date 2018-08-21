import { ReturnCodes } from "../config/ReturnCodes";
import { Command } from "../../core/command";
import { LeaderboardController } from "../controllers/LeaderboardController";

export async function updateLeaderboard(command: Command): Promise<string> {
	const result = await LeaderboardController.updateLeaderboard(command);

	let response;
	switch (result) {
		case ReturnCodes.INCORRECT_PARAM_LENGTH: {
			response = `No names were provided for the leaderboard`;
			break;
		}
		case ReturnCodes.LEADERBOARD_NOT_FOUND: {
			response = `A leaderboard with the name ${command.arguments[0]} was not found`;
			break;
		}
		default: {
			response = `Successfully updated leaderboard ${command.arguments[0]}`;
			break;
		}
	}

	return response;
}