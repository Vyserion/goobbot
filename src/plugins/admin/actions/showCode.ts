import { MessageEmbed } from "discord.js";
import { ActionHandlerStrategy } from "../config/actions";
import { TCommand } from "../../../core/typings";

export class ShowCode implements ActionHandlerStrategy {
	private readonly command: TCommand;

	constructor(command: TCommand) {
		this.command = command;
	}

	async handleAction(): Promise<boolean> {
		const code = this.command.arguments[0];
		const embed = new MessageEmbed()
			.setColor("AQUA")
			.setTitle("Among Us Lobby")
			.addField("Code", code);
		this.command.originalMessage.channel.send(embed);
		return true;
	}
}
