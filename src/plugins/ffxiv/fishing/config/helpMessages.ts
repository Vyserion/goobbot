import { MessageEmbed } from "discord.js";
import { FishingActions } from "./actions";
import {
	GaladionBayAliases,
	GaladionBayCode,
	NorthernStraitAliases,
	NorthernStraitCode,
	RhotanoSeaAliases,
	RhotanoSeaCode,
	SouthernStraitAliases,
	SouthernStraitCode,
} from "./routeInfo";

const showAlLCommandMessage = `List all of the fishing locations.
${process.env.BOTPREFIX}ff fishing ${FishingActions.showAll}
`;

const routeCommandMessage = `Get a set of 3 locations.
${process.env.BOTPREFIX}ff fishing ${FishingActions.route} [spot1] [spot2] [spot3]
Example:
${process.env.BOTPREFIX}ff fishing ${FishingActions.route} ${GaladionBayCode} ${RhotanoSeaCode} ${SouthernStraitCode}
`;

const spotCommandMessage = `Get a single fishing location.
${process.env.BOTPREFIX}ff fishing ${FishingActions.spot} [spot]
Example:
${process.env.BOTPREFIX}ff fishing ${FishingActions.spot} ${NorthernStraitCode}`;

const locationsMessage = `- ${GaladionBayAliases.join(", ")}
- ${NorthernStraitAliases.join(", ")}
- ${SouthernStraitAliases.join(", ")}
- ${RhotanoSeaAliases.join(", ")}`;

/**
 * Get a MessageEmbed for the fishing commands.
 * @returns The message embed for fishing commands
 */
export const getHelpMessage = (): MessageEmbed => {
	const embed = new MessageEmbed().setColor("GREEN").setTitle("FF Fishing Plugin").addFields(
		{
			name: "Show All Fishing Spots",
			value: showAlLCommandMessage,
		},
		{
			name: "Show a Route of Fishing Spots",
			value: routeCommandMessage,
		},
		{
			name: "Show a Fishing Spot",
			value: spotCommandMessage,
		},
		{
			name: "Available Locations & Aliases",
			value: locationsMessage,
		}
	);

	return embed;
};
