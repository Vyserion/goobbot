import { TCommand } from "../../core/command";
import { RowController } from "../controllers/RowController";
import { ReturnCodes } from "../config/ReturnCodes";

export async function deleteRow(command: TCommand): Promise<string> {
	const result = await RowController.deleteLeaderboardRow(command);

	let response;
	switch (result) {
		case ReturnCodes.INCORRECT_PARAM_LENGTH: {
			if (command.arguments.length < 2) {
				response = `Not enough parameters provided = please check you have a leaderboard name and a row name`;
			} else {
				response = `Too many arguments were provided`;
			}
			break;
		}
		case ReturnCodes.LEADERBOARD_NOT_FOUND: {
			response = `A leaderbaord with the name ${command.arguments[0]} could now be found`;
			break;
		}
		case ReturnCodes.ROW_NOT_FOUND: {
			response = `A row with the name ${command.arguments[1]} could not be found`;
			break;
		}
		default: {
			response = `Successfully deleted the leaderboard row ${command.arguments[1]}`;
			break;
		}
	}

	return response;
}
