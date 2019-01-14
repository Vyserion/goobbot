import { TCommand } from "../../core/command";
import { RowController } from "../controllers/RowController";
import { ReturnCodes } from "../config/ReturnCodes";

export async function addRow(command: TCommand): Promise<string> {
	const result = await RowController.insertLeaderboardRow(command);

	let response;
	switch (result) {
		case ReturnCodes.INCORRECT_PARAM_LENGTH: {
			if (command.arguments.length < 2) {
				response = `No leaderboard or row name was provided`;
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
			response = `A row with the name ${command.arguments[1]} for leaderboard ${
				command.arguments[0]
			} already exists`;
			break;
		}
		default: {
			response = `Successfully created leaderboard row ${command.arguments[1]}`;
			break;
		}
	}

	return response;
}
