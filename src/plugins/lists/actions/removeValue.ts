import { ActionHandlerStrategy } from "../config/actions";
import { TCommand } from "../../../core/typings";
import { getGuildId } from "../../../core/guilds/guilds";
import { getList } from "../dao/lists";
import { getValue, removeValue } from "../dao/values";
import logger from "../../../core/util/logger";

export class RemoveValueHandler implements ActionHandlerStrategy {
	private readonly command: TCommand;

	constructor(command: TCommand) {
		this.command = command;
	}

	async handleAction(): Promise<string> {
		if (this.command.arguments.length < 2) {
			return "No list name or value was provided.";
		}

		const guildId = await getGuildId(this.command.originalMessage.guild);

		const listName = this.command.arguments[0];

		const list = await getList(guildId, listName);
		if (!list) {
			return `A list with the name ${listName} does not exist.`;
		}

		const valueText = this.command.arguments[1];
		const value = await getValue(list.id, valueText);
		if (!value) {
			return `A value ${valueText} for list ${listName} does not exist.`;
		}

		await removeValue(list.id, value.id);
		logger.info(`Successfully removed value ${valueText} from ${listName}`);
		return `Successfully removed value ${valueText} from ${listName}.`;
	}
}
