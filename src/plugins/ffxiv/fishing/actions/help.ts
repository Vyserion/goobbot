import { MessageEmbed } from "discord.js";
import { TCommand } from "../../../../core/typings";
import { ActionHandlerStrategy } from "../../config/actions";
import { getHelpMessage } from "../config/helpMessages";

export class HelpHandler implements ActionHandlerStrategy {
	private readonly command: TCommand;

	constructor(command: TCommand) {
		this.command = command;
	}

	async handleAction(): Promise<void> {
		const helpEmbed = getHelpMessage();
		this.postMessage(helpEmbed);
	}

	/**
	 * Send a message to the discord channel.
	 * @param text The text to send.
	 */
	postMessage(text: MessageEmbed): void {
		this.command.originalMessage.channel.send(text);
	}
}
