import { Bot } from './core/bot';
import { DataManager } from './core/dataManager';
import * as dotenv from 'dotenv';

dotenv.config();

const dataManager = new DataManager();

const bot = new Bot(dataManager);
bot.registerActions();
bot.start();