import { Command } from "../../core/command";

export const handleCommand = (command: Command) => {
    command.originalMessage.channel.send('command got to plugin');
};