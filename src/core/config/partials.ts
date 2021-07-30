import { PartialTypes } from "discord.js";

/**
 * The partials array allows us to declare what objects the bot is allowed
 * to fetch from discord's cache.
 */
export const partials: PartialTypes[] = ["MESSAGE", "CHANNEL", "REACTION"];
