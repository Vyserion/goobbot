import { Guild, Snowflake } from "discord.js";

function convertToSnowflake(input: string): Snowflake {
	const val = BigInt(input);
	return `${val}` as Snowflake;
}

/**
 * Creates a mocked Guild, setting the id.
 * @param {string} id The id to set on the mocked guild.
 * @returns {Guild} The mocked out guild.
 */
export function createMockedGuild(id: string): Guild {
	const mockedGuild = {} as Guild;

	Object.keys(mockedGuild).forEach((key) => {
		mockedGuild[key] = undefined;
	});

	mockedGuild.id = convertToSnowflake(id);
	return mockedGuild;
}
