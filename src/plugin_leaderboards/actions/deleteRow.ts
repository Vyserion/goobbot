import { Message } from "discord.js";
import { Command } from "../../core/command";
import { RowController } from "../controllers/RowController";
import { ErrorCodes } from "../config/errorCodes";

const deleteRow = async (command: Command, message: Message) => {
	let result = await RowController.deleteLeaderboardRow(command);

	let response;
	switch (result) {
		case ErrorCodes.LDBD_BAD_PARAM: {
			if (command.arguments.length < 2) {
				response = "Not enough parameters provided = please check you have a leaderboard name and a row name";
			} else {
				response = "Too many arguments were provided";
			}
			break;
		}
		case ErrorCodes.LDBD_NOT_FOUND: {
			response = `A leaderbaord with the name ${command.arguments[0]} could now be found`;
			break;
		}
		case ErrorCodes.LDBD_ROW_NOT_FOUND: {
			response = `A row with the name ${command.arguments[1]} could not be found`;
			break;
		}
		default: {
			response = `Successfully deleted the leaderboard row ${command.arguments[1]}`;
			break;
		}
	}

	message.channel.send(response);
};

export default deleteRow;
