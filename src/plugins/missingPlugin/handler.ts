import { PluginHandlerStrategy, TCommand } from "../../core/typings";

/**
 * A Plugin handler, designed to handle cases where this bot is given an incorrect command.
 */
export class MissingPluginHandler implements PluginHandlerStrategy {
	private readonly command: TCommand;

	constructor(command: TCommand) {
		this.command = command;
	}

	/**
	 * Handles the main function of the Missing Plugin handler.
	 * In this simple case, will just return a help message stating that the plugin was not found.
	 */
	async handleMessage(): Promise<void> {
		const response = `That plugin was not found.`;
		this.command.originalMessage.channel.send(response);
	}
}
