import { DiscordRole } from "../typings";

/**
 * Details for the general FFXIV role.
 */
export const FFXIVRole: DiscordRole = {
	id: "700396763009515560",
	key: "ffxiv",
	name: "FFXIV",
	description: "General FC Member",
};

/**
 * Details for the endgamer role.
 */
export const RaiderRole: DiscordRole = {
	id: "866370413554434088",
	key: "raider",
	name: "Raider",
	description: "Someone interested in running end-game content",
};

/**
 * Details for the crafter role.
 */
export const CrafterRole: DiscordRole = {
	id: "866370418508038154",
	key: "crafter",
	name: "Crafter",
	description: "Someone interested in crafting and gathering.",
};
