import { MessageEmbed } from "discord.js";

const fishingPluginMessage = `A plugin for ocean fishing.
${process.env.BOTPREFIX}ff fishing`;

/**
 * Get a help message for the ff plugins.
 * @returns A help embed for the ff plugins
 */
export const getPluginHelpMessage = (): MessageEmbed => {
	const embed = new MessageEmbed()
		.setColor("GREEN")
		.setTitle("FF Plugin")
		.addFields({
			name: "Fishing",
			value: fishingPluginMessage
		});

	return embed;
};
