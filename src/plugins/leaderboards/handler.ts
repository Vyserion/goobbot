import { IPluginHandlerStrategy, TCommand } from "../../core/typings";
import { Actions, IActionHandlerStrategy } from "./config";
import {
    CreateLeaderboardHandler
} from "./actions";

export class LeaderboardHandler implements IPluginHandlerStrategy {
    private readonly command: TCommand;

    constructor(command: TCommand) {
        this.command = command;
    }

    async handleMessage() {
        console.log(this.command.plugin);

        const action: string = this.command.action ? this.command.action.toLowerCase() : "";
        const actionHandler: IActionHandlerStrategy = this.getActionHandlerStrategy(action);
        await actionHandler.handleAction();
    }

    getActionHandlerStrategy(action: string): IActionHandlerStrategy {
        switch (action) {
            case Actions.createLeaderboard:
                return new CreateLeaderboardHandler(this.command);
            
            default:
                return;
        }
    }
}