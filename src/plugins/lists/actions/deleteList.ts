import { IActionHandlerStrategy } from "../config/actions";
import { TCommand } from "../../../core/typings";
import { getGuildId } from "../../../core/guilds/guilds";
import { listExists } from "../utils/validators";
import { deleteList } from "../dao/lists";
import logger from "../../../core/util/logger";

export class DeleteListHandler implements IActionHandlerStrategy {
	private readonly command: TCommand;

	constructor(command: TCommand) {
		this.command = command;
	}

	async handleAction(): Promise<string> {
		if (this.command.arguments.length < 1) {
			return "No names were provided for the list.";
		}

		const guildId = await getGuildId(this.command.originalMessage.guild);

		const name = this.command.arguments[0];

		const exists = await listExists(name, guildId);
		if (!exists) {
			return `A list with the name ${name} does not exist.`;
		}

		await deleteList(guildId, name);
		logger.info(`Deleted list ${name}`);
		return `Successfully delete list ${name}.`;
	}
}
