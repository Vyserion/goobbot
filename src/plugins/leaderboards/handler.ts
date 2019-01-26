import { IPluginHandlerStrategy, TCommand } from "../../core/typings";
import { Actions, IActionHandlerStrategy } from "./config";
import {
    CreateLeaderboardHandler,
    UpdateLeaderboardHandler,
    DeleteLeaderboardHandler,
    GetLeaderboardHandler,
    CreateColumnHandler,
    UpdateColumnHandler,
    DeleteColumnHandler,
    CreateRowHandler,
    UpdateRowHandler,
    DeleteRowHandler,
    UpdateValueHandler,
    HelpHandler,
    GetLeaderboardsHandler
} from "./actions";
import { Message } from "discord.js";

export class LeaderboardHandler implements IPluginHandlerStrategy {
    private readonly command: TCommand;

    constructor(command: TCommand) {
        this.command = command;
    }

    async handleMessage() {
        const action: string = this.command.action ? this.command.action.toLowerCase() : "";
        const actionHandler: IActionHandlerStrategy = this.getActionHandlerStrategy(action);
        const text = await actionHandler.handleAction();
        this.postMessage(this.command.originalMessage, text);
    }

    getActionHandlerStrategy(action: string): IActionHandlerStrategy {
        switch (action) {
            case Actions.getLeaderboard:
                return new GetLeaderboardHandler(this.command);

            case Actions.createLeaderboard:
                return new CreateLeaderboardHandler(this.command);

            case Actions.updateLeaderboard:
                return new UpdateLeaderboardHandler(this.command);

            case Actions.deleteLeaderboard:
                return new DeleteLeaderboardHandler(this.command);

            case Actions.createColumn:
                return new CreateColumnHandler(this.command);

            case Actions.updateColumn:
                return new UpdateColumnHandler(this.command);

            case Actions.deleteColumn:
                return new DeleteColumnHandler(this.command);
                
            case Actions.createRow:
                return new CreateRowHandler(this.command);

            case Actions.updateRow:
                return new UpdateRowHandler(this.command);

            case Actions.deleteRow:
                return new DeleteRowHandler(this.command);

            case Actions.upsertValue:
                return new UpdateValueHandler(this.command);

            case Actions.help:  
                return new HelpHandler(this.command);

            default:
                return new GetLeaderboardsHandler();
        }
    }

    postMessage(originalMessage: Message, text: string) {
        // TODO: Message embedding
        originalMessage.channel.send(text);
    }
}