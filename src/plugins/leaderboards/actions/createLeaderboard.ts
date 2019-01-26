import { IActionHandlerStrategy } from "../config";
import { TCommand } from "../../../core/typings";
import { commandHasCorrectArgumentLength, leaderboardExists } from "../util/validators";
import { Leaderboards } from "../dao/leaderboards";
import logger from "../../../core/util/logger";

export class CreateLeaderboardHandler implements IActionHandlerStrategy {
    private readonly command: TCommand;

    constructor(command: TCommand) {
        this.command = command;
    }

    async handleAction(): Promise<string> {
        const correctArguments = commandHasCorrectArgumentLength(this.command, 1);
        if (!correctArguments) {
            return "No name was provided for the leaderboard.";
        }

        const name = this.command.arguments[0];

        const exists = await leaderboardExists(name);
        if (exists) {
            return `A leaderboard with the name ${name} already exists.`;
        }

        await Leaderboards.createLeaderboard(name);
        logger.info(`Created new leaderboard ${name}`);
        return `Successfully created leaderboard ${name}.`;
    }
}