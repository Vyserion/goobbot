import { Command } from "../../core/command";
import { Message } from "discord.js";
import { RowController } from "../controllers/RowController";
import { ReturnCodes } from "../config/ReturnCodes";

const addRow = async (command: Command, message: Message) => {
	let result = await RowController.insertLeaderboardRow(command);

	let response;
	switch (result) {
		case ReturnCodes.LDBD_BAD_PARAM: {
			if (command.arguments.length < 2) {
				response = `No leaderboard or row name was provided`;
			} else {
				response = `Too many arguments were provided`;
			}
			break;
		}
		case ReturnCodes.LDBD_NOT_FOUND: {
			response = `A leaderboard with the name ${command.arguments[0]} was not found`;
			break;
		}
		case ReturnCodes.LDBD_DUP_NAME: {
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

	message.channel.send(response);
};

export default addRow;
