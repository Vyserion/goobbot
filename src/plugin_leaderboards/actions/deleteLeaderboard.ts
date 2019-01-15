import { ReturnCodes } from "../config/ReturnCodes";
import { TCommand } from "../../core/typings";
import { LeaderboardController } from "../controllers/LeaderboardController";

export async function deleteLeaderboard(command: TCommand): Promise<string> {
	const result = await LeaderboardController.deleteLeaderboard(command);

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
			response = `Successfully deleted leaderboard ${command.arguments[0]}`;
			break;
		}
	}

	return response;
}

export default deleteLeaderboard;
