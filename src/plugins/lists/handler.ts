import { IPluginHandlerStrategy, TCommand } from "../../core/typings";
import { IActionHandlerStrategy, Actions } from "./config/actions";
import { CreateListHandler } from "./actions/createList";
import { Message } from "discord.js";
import { 
    RenameListHandler,
    DeleteListHandler,
    AddValueHandler,
    RemoveValueHandler
 } from "./actions";
import { GetListsHandler } from "./actions/getLists";
import { GetListHandler } from "./actions/getList";

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

            case Actions.deleteList:
                return new DeleteListHandler(this.command);

            case Actions.addValue:
                return new AddValueHandler(this.command);

            case Actions.removeValue:
                return new RemoveValueHandler(this.command);

            case Actions.getList:
                return new GetListHandler(this.command);

            default:
                return new GetListsHandler(this.command);
        }
    }

    postMessage(originalMessage: Message, text: string) {
        originalMessage.channel.send(text);
    }
}