import { Command } from "../core/command";
import { DataManager } from "../core/dataManager";

export const handleCommand = async (dataManager: DataManager, command: Command) => {
    let results = await dataManager.query("SELECT NOW()");
    command.originalMessage.channel.send('hello ' + JSON.stringify(results[0]));

    return;
};