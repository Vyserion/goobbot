import { Bot } from './core/bot';
import * as dotenv from 'dotenv';

dotenv.config();

const bot = new Bot();
bot.registerActions();
bot.start();