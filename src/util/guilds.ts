import { UtilDao } from "./dao";
import { Guild } from "discord.js";
import logger from "../core/util/logger";

export async function getGuildId(guild: Guild): Promise<number> {
    let botGuild = await UtilDao.getGuild(guild.id);
    logger.info('got guild');
    logger.info(botGuild);
    if (!botGuild) {
        logger.info('making guild');
        botGuild = await UtilDao.createGuild(guild.id, guild.name)
        logger.info('made guild');
    }
    logger.info(botGuild);

    return botGuild.id;
}