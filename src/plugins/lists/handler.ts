import { IPluginHandlerStrategy, TCommand } from "../../core/typings";
import { IActionHandlerStrategy, Actions } from "./config/actions";
import { CreateListHandler } from "./actions/createList";
import { Message } from "discord.js";
import { RenameListHandler } from "./actions/renameList";

export class ListsHandler implements IPluginHandlerStrategy {
    private readonly command: TCommand

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
            case Actions.createList:
                return new CreateListHandler(this.command);

            case Actions.renameList:
                return new RenameListHandler(this.command);

            default:
                return;
        }
    }

    postMessage(originalMessage: Message, text: string) {
        originalMessage.channel.send(text);
    }
}