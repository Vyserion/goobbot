import { ActionHandlerStrategy } from "../config";
import { TCommand } from "../../../core/typings";
import { commandHasCorrectArgumentLength } from "../util/validators";
import { deleteValuesByLeaderboard } from "../dao/values";
import { getLeaderboard, deleteLeaderboard } from "../dao/leaderboards";
import logger from "../../../core/util/logger";
import { deleteRows } from "../dao/rows";
import { deleteColumns } from "../dao/columns";
import { getGuildId } from "../../../core/guilds/guilds";

export class DeleteLeaderboardHandler implements ActionHandlerStrategy {
	private readonly command: TCommand;

	constructor(command: TCommand) {
		this.command = command;
	}

	async handleAction(): Promise<string> {
		const correctArguments = commandHasCorrectArgumentLength(this.command, 1);
		if (!correctArguments) {
			return "No names were provided for the leaderboard.";
		}

		const guildId = await getGuildId(this.command.originalMessage.guild);
		const name = this.command.arguments[0];

		const leaderboard = await getLeaderboard(name, guildId);
		if (!leaderboard) {
			return `A leaderboard with the name ${name} could not be found.`;
		}

		await deleteValuesByLeaderboard(leaderboard.id);
		await deleteRows(leaderboard.id);
		await deleteColumns(leaderboard.id);
		await deleteLeaderboard(leaderboard.id);
		logger.info(`Successfully deleted leaderboard ${name}`);
		return `Successfully deleted leaderboard ${name}`;
	}
}
