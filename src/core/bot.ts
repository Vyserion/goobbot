import { Client, Message, TextChannel } from 'discord.js';
import { isPluginMessage, handlePluginMessage } from './pluginManager';
import logger from './logger';

export class Bot {

    client: Client;

    constructor() {
        this.client = new Client();
    };

    startup() {
        this.registerActions();
        this.start();
    };

    start() {
        logger.info('Logging into Discord API...');
        this.client.login(process.env.APP_KEY);
    };

    registerActions() {
        logger.info('Registering actions...');

        this.client.on('ready', this.onReady);
        this.client.on('message', this.onMessage);
    };

    onReady() {
        const showWelcomeMessage: boolean = (process.env.SEND_WELCOME_MESSAGE === 'true');

            if (showWelcomeMessage) {
                this.client.guilds.forEach(guild => {
                    guild.channels.forEach(channel => {
                        if (channel.name === 'bot_test') {
                            let chan: TextChannel = <TextChannel> this.client.channels.get(channel.id);
                            chan.send('Hello, ' + guild.name + '!');
                        }
                    });
                });
            } else {
                logger.debug('Bypassing channel welcome messages')
            }

            logger.info('VyBot is ready!');
    };

    onMessage(message: Message) {
        if (isPluginMessage(message.content)) {
            logger.debug('Command recieved: ');
            logger.debug('                 ' + message.content);

            handlePluginMessage(message);
        }
    }
};