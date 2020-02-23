import { ActionHandlerStrategy } from "../config";
import { TCommand } from "../../../core/typings";
import { getLeaderboards } from "../dao/leaderboards";
import { getGuildId } from "../../../core/guilds/guilds";

export class GetLeaderboardsHandler implements ActionHandlerStrategy {
	private readonly command: TCommand;

	constructor(command: TCommand) {
		this.command = command;
	}

	async handleAction(): Promise<string> {
		const guildId = await getGuildId(this.command.originalMessage.guild);
		const leaderboards = await getLeaderboards(guildId);

		if (leaderboards.length === 0) {
			return `There are currently no leaderboards`;
		}

		let response = ``;

		leaderboards.forEach(l => {
			response += l.name;
			response += `\n`;
		});

		return response;
	}
}
