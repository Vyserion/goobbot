import { ReturnCodes } from "../config/ReturnCodes";
import { Command } from "../../core/command";
import { ValueController } from "../controllers/ValueController";

export async function upsertValue(command: Command): Promise<string> {
	const result = await ValueController.upsertValue(command);

	let response;
	switch (result) {
		case ReturnCodes.INCORRECT_PARAM_LENGTH: {
			if (command.arguments.length < 4) {
				response = `Not enough parameters provided - please check you have a Leaderboard Name, Column Name, Row Name, and the value`;
			} else {
				response = `Too many parameters were provided`;
			}
			break;
		}
		case ReturnCodes.LEADERBOARD_NOT_FOUND: {
			response = `A leaderboard with the name ${command.arguments[0]} was not found`;
			break;
		}
		case ReturnCodes.COLUMN_NOT_FOUND: {
			response = `A column with the name ${command.arguments[1]} was not found`;
			break;
		}
		case ReturnCodes.ROW_NOT_FOUND: {
			response = `A row with the name ${command.arguments[2]} was not found`;
			break;
		}
		default: {
			response = `Successfully updated the value in column ${command.arguments[1]} and row ${
				command.arguments[2]
			}`;
			break;
		}
	}

	return response;
}
