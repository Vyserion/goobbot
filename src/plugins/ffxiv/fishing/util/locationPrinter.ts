import { MessageEmbed } from "discord.js";
import { FishingLocations, FishingLocation, LocationName } from "../config/routeInfo";

export const embedPrintLocation = (location: string): MessageEmbed => {
	if (!Object.keys(LocationName).includes(location)) {
		throw new Error("Unknown fishing location");
	}

	const info: FishingLocation = FishingLocations[location];

	const spectralBaitValue = `Use: **${info.spectralBait}**\nCatches: ${info.spectralTriggerFish}`;

	const intutionTriggers = info.intuitionTriggers
		.map((trigger: string): string => {
			const parts = trigger.split("|");
			if (parts.length > 1) {
				return `- ${parts[0]}, using ${parts[1]}`;
			}

			return `- ${trigger}`;
		})
		.join("\n");
	const intuitionValue = `Bait: ${info.intuitionBait}\nIntuition Fish: ${info.intuitionFish}\nTriggers:\n${intutionTriggers}`;

	const spectralIntuitionTriggers = info.spectralIntuitionTriggers
		.map((trigger: string): string => {
			const parts = trigger.split("|");
			if (parts.length > 1) {
				return `- ${parts[0]}, using ${parts[1]}`;
			}

			return `- ${trigger}`;
		})
		.join("\n");
	const spectralIntuitionValue = `Bait: ${info.spectralIntuitionBait}\nIntuition Fish: ${info.spectralIntuitionFish}\nTriggers:\n${spectralIntuitionTriggers}`;

	const embed = new MessageEmbed()
		.setColor("AQUA")
		.setTitle(info.name)
		.addFields(
			{
				name: "Spectral Bait",
				value: spectralBaitValue
			},
			{
				name: "Fisherman's Intuition",
				value: intuitionValue,
				inline: true
			},
			{
				name: "Spectral Intuition",
				value: spectralIntuitionValue,
				inline: true
			}
		);

	return embed;
};
