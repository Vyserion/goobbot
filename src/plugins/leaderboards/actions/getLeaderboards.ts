import { IActionHandlerStrategy } from "../config";
import { TCommand } from "../../../core/typings";
import { getLeaderboards } from "../dao/leaderboards";

export class GetLeaderboardsHandler implements IActionHandlerStrategy {
    private readonly command: TCommand;

    constructor(command: TCommand) {
        this.command = command;
    }

    async handleAction(): Promise<string> {
        const leaderboards = await getLeaderboards();

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