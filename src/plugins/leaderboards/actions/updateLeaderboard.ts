import { IActionHandlerStrategy } from "../config";
import { TCommand } from "../../../core/typings";
import { commandHasCorrectArgumentLength, leaderboardExists } from "../util/validators";
import { updateLeaderboard } from "../dao/leaderboards";
import logger from "../../../core/util/logger";

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

        const name = this.command.arguments[0];
        const newName = this.command.arguments[1];

        const exists = await leaderboardExists(name);
        if (!exists) {
            return `A leaderboard with the name ${name} could not be found.`;
        }

        const replacementExists = await leaderboardExists(newName);
        if (replacementExists) {
            return `A leaderboard with the name ${newName} already exists.`;
        }

        await updateLeaderboard(name, newName);
        logger.info(`Successfully updated leaderboard ${name} to ${newName}`);
        return `Successfully updated leaderboard ${name}.`;
    }
}