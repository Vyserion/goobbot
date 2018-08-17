import { ErrorCodes } from "../config/errorCodes";
import { Command } from "../../core/command";
import { Message } from "discord.js";
import { ValueController } from "../controllers/ValueController";
import { ERANGE } from "constants";

const upsertValue = async (command: Command, message: Message) => {
	let result = await ValueController.upsertValue(command);

	let response;
	switch (result) {
		case ErrorCodes.LDBD_BAD_PARAM: {
			if (command.arguments.length < 4) {
				response =
					"Not enough parameters provided - please check you have a Leaderboard Name, Column Name, Row Name, and the value.";
			} else {
				response = "Too many parameters were provided";
			}
			break;
		}
		case ErrorCodes.LDBD_NOT_FOUND: {
			response = `A leaderboard with the name ${command.arguments[0]} was not found`;
			break;
		}
		case ErrorCodes.LDBD_COL_NOT_FOUND: {
			response = `A column with the name ${command.arguments[1]} was not found`;
			break;
		}
		case ErrorCodes.LDBD_ROW_NOT_FOUND: {
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

	message.channel.send(response);
};

export default upsertValue;
