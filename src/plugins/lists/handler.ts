import { IPluginHandlerStrategy, TCommand } from "../../core/typings";

export class ListsHandler implements IPluginHandlerStrategy {
    private readonly command: TCommand

    constructor(command: TCommand) {
        this.command = command;
    }

    async handleMessage() {
        const response = `lists module`;
        this.command.originalMessage.channel.send(response);
    }
}