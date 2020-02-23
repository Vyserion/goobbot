import { PluginHandlerStrategy, TCommand } from "../../core/typings";
import { ActionHandlerStrategy, Actions } from "./config/actions";
import { CreateListHandler } from "./actions/createList";
import { RenameListHandler, DeleteListHandler, AddValueHandler, RemoveValueHandler } from "./actions";
import { GetListsHandler } from "./actions/getLists";
import { GetListHandler } from "./actions/getList";

/**
 * The Lists Plugin Handler, handles interactions with lists within the bot.
 */
export class ListsHandler implements PluginHandlerStrategy {
	private readonly command: TCommand;

	constructor(command: TCommand) {
		this.command = command;
	}

	/**
	 * Handles the main function of the Lists Plugin handler.
	 * Will parse the action and complete it, then return any text.
	 */
	async handleMessage(): Promise<void> {
		const action: string = this.command.action ? this.command.action.toLowerCase() : "";
		const actionHandler: ActionHandlerStrategy = this.getActionHandlerStrategy(action);
		const text = await actionHandler.handleAction();
		this.postMessage(text);
	}

	/**
	 * Gets the correct action strategy.
	 * @param action The action.
	 * @returns The ActionHandlerStrategy to run.
	 */
	getActionHandlerStrategy(action: string): ActionHandlerStrategy {
		switch (action) {
			case Actions.createList:
				return new CreateListHandler(this.command);

			case Actions.renameList:
				return new RenameListHandler(this.command);

			case Actions.deleteList:
				return new DeleteListHandler(this.command);

			case Actions.addValue:
				return new AddValueHandler(this.command);

			case Actions.removeValue:
				return new RemoveValueHandler(this.command);

			case Actions.getList:
				return new GetListHandler(this.command);

			default:
				return new GetListsHandler(this.command);
		}
	}

	/**
	 * Send a message to the discord channel.
	 * @param text The text to send.
	 */
	postMessage(text: string): void {
		this.command.originalMessage.channel.send(text);
	}
}
