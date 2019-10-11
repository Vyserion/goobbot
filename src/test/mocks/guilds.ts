import { Guild } from "discord.js";

/**
 * Creates a mocked Guild, setting the id.
 * @param id The id of the guild to set
 * 
 * @returns The Guild
 */
export function createMockedGuild(id: string): Guild {
    let mockedGuild = {} as Guild;

    Object.keys(mockedGuild).forEach(key => {
        mockedGuild[key] = undefined;
    });

    mockedGuild.id = id;
    return mockedGuild;
}