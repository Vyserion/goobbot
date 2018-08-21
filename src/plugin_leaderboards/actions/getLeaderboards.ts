import { LeaderboardController } from "../controllers/LeaderboardController";

export async function getLeaderboards(): Promise<string> {
	const results = await LeaderboardController.getLeaderboards();

	let response = ``;

	if (results.length === 0) {
		response = `There are currently no leaderboards`;
	} else {
		for (let leaderboardIdx in results) {
			let leaderboard = results[leaderboardIdx];
			response += leaderboard.name;
			response += "\n";
		}
	}

	return response;
}