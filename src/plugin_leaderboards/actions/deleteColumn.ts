import { ReturnCodes } from "../config/ReturnCodes";
import { Command } from "../../core/command";
import { ColumnController } from "../controllers/ColumnController";

export async function deleteColumn(command: Command): Promise<string> {
	const result = await ColumnController.deleteLeaderboardColumn(command);

	let response;
	switch (result) {
		case ReturnCodes.INCORRECT_PARAM_LENGTH: {
			if (command.arguments.length < 2) {
				response = `Not enough parameters provided = please check you have a leaderboard name and a column name`;
			} else {
				response = `Too many arguments were provided`;
			}
			break;
		}
		case ReturnCodes.LEADERBOARD_NOT_FOUND: {
			response = `A leaderboard with the name ${command.arguments[0]} was not found`;
			break;
		}
		case ReturnCodes.COLUMN_NOT_FOUND: {
			response = `A leaderboard with the column ${command.arguments[1]} was not found`;
			break;
		}
		default: {
			response = `Successfully deleted the leaderboard column ${command.arguments[1]}`;
			break;
		}
	}

	return response;
}
