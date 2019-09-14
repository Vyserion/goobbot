import { IPluginHandlerStrategy, TCommand } from "../../core/typings";

export class MissingPluginHandler implements IPluginHandlerStrategy {
	private readonly command: TCommand;

	constructor(command: TCommand) {
		this.command = command;
	}

	async handleMessage() {
		const response = `That plugin was not found.`;
		this.command.originalMessage.channel.send(response);
	}
}
