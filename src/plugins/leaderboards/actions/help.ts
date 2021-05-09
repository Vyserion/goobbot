import {
	ActionHandlerStrategy,
	Actions,
	createLeaderboardMessage,
	updateLeaderboardMessage,
	deleteLeaderboardMessage,
	createColumnMessage,
	updateColumnMessage,
	deleteColumnMessage,
	createRowMessage,
	updateRowMessage,
	deleteRowMessage,
	getLeaderboardMessage,
	getLeaderboardsMessage,
	upsertValueMessage,
	showCommandMessage,
} from "../config";
import { TCommand } from "../../../core/typings";

export class HelpHandler implements ActionHandlerStrategy {
	private readonly command: TCommand;

	constructor(command: TCommand) {
		this.command = command;
	}

	async handleAction(): Promise<string> {
		if (this.command.arguments.length === 0) {
			return showCommandMessage;
		}

		switch (this.command.arguments[0].toLowerCase()) {
			case Actions.createLeaderboard:
				return createLeaderboardMessage;
			case Actions.updateLeaderboard:
				return updateLeaderboardMessage;
			case Actions.deleteLeaderboard:
				return deleteLeaderboardMessage;

			case Actions.createColumn:
				return createColumnMessage;
			case Actions.updateColumn:
				return updateColumnMessage;
			case Actions.deleteColumn:
				return deleteColumnMessage;

			case Actions.createRow:
				return createRowMessage;
			case Actions.updateRow:
				return updateRowMessage;
			case Actions.deleteRow:
				return deleteRowMessage;

			case Actions.getLeaderboard:
				return getLeaderboardMessage;
			case Actions.upsertValue:
				return upsertValueMessage;

			default:
				return getLeaderboardsMessage;
		}
	}
}
