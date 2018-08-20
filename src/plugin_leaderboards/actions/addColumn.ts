import { ReturnCodes } from "../config/ReturnCodes";
import { Command } from "../../core/command";
import { Message } from "discord.js";
import { ColumnController } from "../controllers/ColumnController";

const addColumn = async (command: Command, message: Message) => {
	let result = await ColumnController.insertLeaderboardColumn(command);

	let response;
	switch (result) {
		case ReturnCodes.LDBD_BAD_PARAM: {
			if (command.arguments.length < 2) {
				response = "No leaderboard or column name was provided";
			} else {
				response = "Too many arguments were provided";
			}
			break;
		}
		case ReturnCodes.LDBD_NOT_FOUND: {
			response = "A leaderboard with the name " + command.arguments[0] + " was not found";
			break;
		}
		case ReturnCodes.LDBD_DUP_NAME: {
			response =
				"A column with the name " +
				command.arguments[1] +
				" for leaderboard " +
				command.arguments[0] +
				" already exists";
			break;
		}
		case ReturnCodes.LDBD_BAD_TYPE: {
			response = "The column type " + command.arguments[2] + " is not allowed.";
			break;
		}
		default: {
			response = "Successfully created leaderboard column " + command.arguments[1];
			break;
		}
	}

	message.channel.send(response);
};

export default addColumn;
