import { PluginHandlerStrategy, TCommand } from "../../core/typings";
import { HelpHandler } from "./actions";
import { Actions, ActionHandlerStrategy } from "./config/actions";
import { FishingHandler } from "./fishing";

export class FFHandler implements PluginHandlerStrategy {
	private readonly command: TCommand;

	constructor(command: TCommand) {
		this.command = command;
	}

	/**
	 * Handles the main function of the FF XIV Plugin handler.
	 * Will parse the action and complete it, then return any text.
	 */
	async handleMessage(): Promise<void> {
		const action: string = this.command.action ? this.command.action.toLowerCase() : "";
		const actionHandler: ActionHandlerStrategy = this.getActionHandlerStrategy(action);
		await actionHandler.handleAction();
	}

	/**
	 * Gets the correct action strategy.
	 * @param action The action.
	 * @returns The ActionHandlerStrategy to run.
	 */
	getActionHandlerStrategy(action: string): ActionHandlerStrategy {
		switch (action) {
			case Actions.fishing:
				return new FishingHandler(this.command);
			case Actions.help:
				return new HelpHandler(this.command);
			default:
				throw new Error("unknown plugin");
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
