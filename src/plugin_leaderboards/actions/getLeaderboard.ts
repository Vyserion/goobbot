import { ReturnCodes } from "../config/ReturnCodes";
import { TCommand } from "../../core/command";
import { prettyPrintLeaderboard } from "../util/format";
import { LeaderboardController } from "../controllers/LeaderboardController";

export async function getLeaderboard(command: TCommand): Promise<string> {
	const result = await LeaderboardController.getLeaderboard(command);

	let response;
	switch (result) {
		case ReturnCodes.INCORRECT_PARAM_LENGTH: {
			response = `No names were provided to get the leaderboard`;
			break;
		}
		case ReturnCodes.LEADERBOARD_NOT_FOUND: {
			response = `A leaderboard with the name ${command.arguments[0]} was not found`;
			break;
		}
		default: {
			response = prettyPrintLeaderboard(result);
			break;
		}
	}

	return response;
}
