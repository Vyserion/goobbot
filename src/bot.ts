import { Client } from 'discord.js';

export class Bot {

    client: Client;

    constructor() {
        this.client = new Client();
    }

    startup() {
        this.registerActions();
        this.start();
    }

    start() {
        this.client.login('');
    }

    registerActions() {
        this.client.on('ready', () => {
            console.log('I am ready!');
        });

        this.client.on('message', message => {
            if (message.content === 'ping') {
                message.channel.send('pong');
            }
        });
    }
}

