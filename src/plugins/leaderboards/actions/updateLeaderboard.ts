import { IActionHandlerStrategy } from "../config";
import { TCommand } from "../../../core/typings";
import { commandHasCorrectArgumentLength, leaderboardExists } from "../util/validators";
import { updateLeaderboard } from "../dao/leaderboards";
import logger from "../../../core/util/logger";
import { getGuildId } from "../../../core/guilds/guilds";

export class UpdateLeaderboardHandler implements IActionHandlerStrategy {
	private readonly command: TCommand;

	constructor(command: TCommand) {
		this.command = command;
	}

	async handleAction(): Promise<string> {
		const correctArguments = commandHasCorrectArgumentLength(this.command, 2);
		if (!correctArguments) {
			return "No names were provided for the leaderboard.";
		}

		const guildId = await getGuildId(this.command.originalMessage.guild);
		const name = this.command.arguments[0];
		const newName = this.command.arguments[1];

		const exists = await leaderboardExists(name, guildId);
		if (!exists) {
			return `A leaderboard with the name ${name} could not be found.`;
		}

		const replacementExists = await leaderboardExists(newName, guildId);
		if (replacementExists) {
			return `A leaderboard with the name ${newName} already exists.`;
		}

		await updateLeaderboard(guildId, name, newName);
		logger.info(`Successfully updated leaderboard ${name} to ${newName}`);
		return `Successfully updated leaderboard ${name}.`;
	}
}
