import { Command } from "../core/command";
import { DataManager } from "../core/dataManager";

export const handleCommand = async (command: Command) => {
    let results = await DataManager.query("SELECT NOW()");
    command.originalMessage.channel.send('hello ' + JSON.stringify(results[0]));

    return;
};