import { IActionHandlerStrategy } from "../config";
import { TCommand } from "../../../core/typings";

export class CreateLeaderboardHandler implements IActionHandlerStrategy {
    private readonly command: TCommand;

    constructor(command: TCommand) {
        this.command = command;
    }

    async handleAction() {
        console.log(this.command.plugin);
    }
}