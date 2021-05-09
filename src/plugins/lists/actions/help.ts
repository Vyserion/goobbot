import { ActionHandlerStrategy, Actions } from "../config/actions";
import { TCommand } from "../../../core/typings";
import {
	showCommandMessage,
	createListMessage,
	renameListMessage,
	deleteListMessage,
	addValueMessage,
	removeValueMessage,
	getListMessage,
	getListsMessage,
} from "../config/helpMessages";

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
			case Actions.createList:
				return createListMessage;
			case Actions.renameList:
				return renameListMessage;
			case Actions.deleteList:
				return deleteListMessage;
			case Actions.addValue:
				return addValueMessage;
			case Actions.removeValue:
				return removeValueMessage;
			case Actions.getList:
				return getListMessage;
			default:
				return getListsMessage;
		}
	}
}
