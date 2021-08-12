import { BitFieldResolvable, IntentsString } from "discord.js";

/**
 * Discord requires that a bot declare what intents it should access.
 * The full list of intents can be found at:
 * https://discord.com/developers/docs/topics/gateway#list-of-intents
 */
export const intents: BitFieldResolvable<IntentsString, number> = ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"];
