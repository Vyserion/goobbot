import { IActionHandlerStrategy } from "../config/actions";
import { TCommand } from "../../../core/typings";
import { getGuildId } from "../../../util/guilds";
import { listExists } from "../utils/validators";
import { Lists } from "../dao/lists";
import logger from "../../../core/util/logger";

export class RenameListHandler implements IActionHandlerStrategy {
	private readonly command: TCommand;

	constructor(command: TCommand) {
		this.command = command;
	}

	async handleAction(): Promise<string> {
		if (this.command.arguments.length < 2) {
			return "No names were provided to rename the list";
		}

		const guildId = await getGuildId(this.command.originalMessage.guild);

		const name = this.command.arguments[0];
		const exists = await listExists(name, guildId);
		if (!exists) {
			return `A list with the name ${name} does not exist.`;
		}

		const newName = this.command.arguments[1];
		const newNameExists = await listExists(newName, guildId);
		if (newNameExists) {
			return `A list with the name ${newName} already exists.`;
		}

		await Lists.updateListName(guildId, name, newName);
		logger.info(`Renamed list ${name} to ${newName}.`);
		return `Successfully renamed ${name} to ${newName}.`;
	}
}
