import { Bot } from './core/bot';
import { Data } from './core/data';
import * as dotenv from 'dotenv';

dotenv.config();

const data = new Data();
data.connect();
data.query();

const bot = new Bot();
bot.registerActions();
bot.start();