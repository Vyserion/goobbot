import { ReturnCodes } from "../config/ReturnCodes";
import { TCommand } from "../../new_core/command";
import { ColumnController } from "../controllers/ColumnController";

export async function updateLeaderboardColumn(command: TCommand): Promise<string> {
	const result = await ColumnController.updateLeaderboardColumn(command);

	let response;
	switch (result) {
		case ReturnCodes.INCORRECT_PARAM_LENGTH: {
			if (command.arguments.length < 4) {
				response = `Not enough parameters provided - please check you have a Leaderboard Name, Column Name, Action, and value`;
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
			response = `A leaderboard with the column ${command.arguments[1]} + " was not found`;
			break;
		}
		case ReturnCodes.INVALID_PARAMETER: {
			response = `The action ${command.arguments[2]} cannot be performed on this column`;
			break;
		}
		case ReturnCodes.BAD_PARAMETER_TYPE: {
			response = `The column type ${command.arguments[3]} is not allowed`;
			break;
		}
		default: {
			response = `Succesfully updated the leaderboard column ${command.arguments[2]}`;
			break;
		}
	}

	return response;
}
