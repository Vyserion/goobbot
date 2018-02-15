import { Client, Message } from 'discord.js';
import { isPluginMessage, handlePluginMessage } from './pluginManager';
import { DataManager } from './dataManager';

export class Bot {

    client: Client;
    dataManager: DataManager;

    constructor(dataManager: DataManager) {
        this.client = new Client();
        this.dataManager = dataManager;
    };

    startup() {
        this.registerActions();
        this.start();
    };

    start() {
        this.client.login(process.env.APP_KEY);
    };

    registerActions() {
        this.client.on('ready', () => {
            console.log('I am ready!');
        });

        this.client.on('message', message => {
            if (isPluginMessage(message.content)) {
                handlePluginMessage(this.dataManager, message);
            }
        });
    };
};