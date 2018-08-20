import { ReturnCodes } from "../config/ReturnCodes";
import { Command } from "../../core/command";
import { RowController } from "../controllers/RowController";
import { Message } from "discord.js";

const updateLeaderboardRow = async (command: Command, message: Message) => {
	let result = await RowController.updateLeaderboardRow(command);

	let response;
	switch (result) {
		case ReturnCodes.LDBD_BAD_PARAM: {
			if (command.arguments.length < 3) {
				response =
					"Not enough parameters provided - please check you have a Leaderboard Name, Column Name, and the new Column Name";
			} else {
				response = "Too many parameters were provided";
			}
			break;
		}
		case ReturnCodes.LDBD_NOT_FOUND: {
			response = `A leaderboard with the name ${command.arguments[0]} was not found`;
			break;
		}
		case ReturnCodes.LDBD_ROW_NOT_FOUND: {
			response = `A leaderboard with the name ${command.arguments[1]} was not found`;
			break;
		}
		default: {
			response = `Successfully updates the leaderboard row ${command.arguments[1]}`;
			break;
		}
	}

	message.channel.send(response);
};

export default updateLeaderboardRow;
