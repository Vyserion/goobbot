import { ReturnCodes } from "../config/ReturnCodes";
import { Command } from "../../core/command";
import { ColumnController } from "../controllers/ColumnController";
import { Message } from "discord.js";

const updateLeaderboardColumn = async (command: Command, message: Message) => {
	let result = await ColumnController.updateLeaderboardColumn(command);

	let response;
	switch (result) {
		case ReturnCodes.LDBD_BAD_PARAM: {
			if (command.arguments.length < 4) {
				response =
					"Not enough parameters provided - please check you have a Leaderboard Name, Column Name, Action, and value.";
			} else {
				response = "Too many arguments were provided";
			}
			break;
		}
		case ReturnCodes.LDBD_NOT_FOUND: {
			response = "A leaderboard with the name " + command.arguments[0] + " was not found";
			break;
		}
		case ReturnCodes.LDBD_COL_NOT_FOUND: {
			response = "A leaderboard with the column " + command.arguments[1] + " was not found";
			break;
		}
		case ReturnCodes.LDBD_INVALID_PARAM: {
			response = "The action " + command.arguments[2] + " cannot be performed on this column";
			break;
		}
		case ReturnCodes.LDBD_BAD_TYPE: {
			response = "The column type " + command.arguments[3] + " is not allowed.";
			break;
		}
		default: {
			response = "Succesfully updated the leaderboard column " + command.arguments[2];
			break;
		}
	}

	message.channel.send(response);
};

export default updateLeaderboardColumn;
