import { ReturnCodes } from "../config/ReturnCodes";
import { TCommand } from "../../new_core/command";
import { ColumnController } from "../controllers/ColumnController";

export async function addColumn(command: TCommand): Promise<string> {
	const result = await ColumnController.insertLeaderboardColumn(command);

	let response: string;
	switch (result) {
		case ReturnCodes.INCORRECT_PARAM_LENGTH: {
			if (command.arguments.length < 2) {
				response = `No leaderboard or column name was provided`;
			} else {
				response = `Too many arguments were provided`;
			}
			break;
		}
		case ReturnCodes.LEADERBOARD_NOT_FOUND: {
			response = `A leaderboard with the name ${command.arguments[0]} was not found`;
			break;
		}
		case ReturnCodes.LEADERBOARD_DUPLICATE_NAME: {
			response = `A column with the name ${command.arguments[1]} for leaderboard ${
				command.arguments[0]
			} already exists`;
			break;
		}
		case ReturnCodes.BAD_PARAMETER_TYPE: {
			response = `The column type ${command.arguments[2]} is not allowed.`;
			break;
		}
		default: {
			response = `Successfully created leaderboard column ${command.arguments[1]}`;
			break;
		}
	}

	return response;
}
