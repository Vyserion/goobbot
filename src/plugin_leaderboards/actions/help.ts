import { Command } from "../../core/command";
import { Message } from "discord.js";
import helpMessages from "../config/helpMessages";

const showHelp = async (command: Command, message: Message) => {
    if (command.arguments.length === 0) {
        message.channel.send(helpMessages.showCommands);
        return;
    } else {
        let requestedCommand = command.arguments[0];
        message.channel.send(helpMessages.showCommands);
        return;
    }
}

export default showHelp;