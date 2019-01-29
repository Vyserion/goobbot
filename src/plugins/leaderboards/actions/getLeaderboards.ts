import { IActionHandlerStrategy } from "../config";
import { Leaderboards } from "../dao/leaderboards";

export class GetLeaderboardsHandler implements IActionHandlerStrategy {
	async handleAction(): Promise<string> {
		const leaderboards = await Leaderboards.getLeaderboards();

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
