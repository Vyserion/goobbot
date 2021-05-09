import { FishingLocation, OceanBait, SpectralTriggerBait } from "../../typings";

export const GaladionBayCode = "GaladionBay";
export const GaladionBayAliases = [GaladionBayCode, "GB", "Galadion"];

export const NorthernStraitCode = "NorthernStrait";
export const NorthernStraitAliases = [NorthernStraitCode, "NS", "Northern"];

export const SouthernStraitCode = "SouthernStrait";
export const SouthernStraitAliases = [SouthernStraitCode, "SS", "Southern"];

export const RhotanoSeaCode = "RhotanoSea";
export const RhotanoSeaAliases = [RhotanoSeaCode, "RS", "Rhotano"];

export const LocationNames = [
	...GaladionBayAliases,
	...NorthernStraitAliases,
	...SouthernStraitAliases,
	...RhotanoSeaAliases,
];

/**
 * Return all location keys.
 * @returns an array of all location keys
 */
export const getAllLocations = (): string[] => {
	return [GaladionBayCode, NorthernStraitCode, SouthernStraitCode, RhotanoSeaCode];
};

/**
 * Confirms whether the input is a valid fishing location.
 * @param input The input to parse
 * @returns True if a valid location, false otherwise
 */
export const isALocation = (input: string): boolean => {
	return LocationNames.includes(input);
};

/**
 * Get the matching key from the given input.
 * isALocation should be used to validate input before calling this.
 * @param input The input to get the code from
 * @returns The code for the location
 * @throws An error if the input is unknown
 */
export const getLocationKeyFromInput = (input: string): string => {
	if (GaladionBayAliases.includes(input)) {
		return GaladionBayCode;
	}

	if (NorthernStraitAliases.includes(input)) {
		return NorthernStraitCode;
	}

	if (SouthernStraitAliases.includes(input)) {
		return SouthernStraitCode;
	}

	if (RhotanoSeaAliases.includes(input)) {
		return RhotanoSeaCode;
	}

	throw new Error(`Unknown location key ${input}, unable to parse`);
};

/**
 * Configuration object containing all of the information on each fishing location.
 */
export const FishingLocations: Record<string, FishingLocation> = {
	GaladionBay: {
		name: "Galadion Bay",
		intuitionTriggers: ["Galdion Chovy", "Galdion Chovy", "Galdion Chovy"],
		intuitionBait: OceanBait.Krill,
		intuitionFish: "Drunkfish",
		spectralBait: OceanBait.PlumpWorm,
		spectralTriggerFish: "Spectral Megalodon",
		spectralIntuitionTriggers: [
			`Heavenskey|${OceanBait.Ragworm}`,
			"Heavenskey",
			`Navigator's Print|${OceanBait.Krill}`,
		],
		spectralIntuitionBait: SpectralTriggerBait.Glowworm,
		spectralIntuitionFish: "Shooting Star",
	},
	NorthernStrait: {
		name: "The Northern Strait of Merlthor",
		intuitionTriggers: [`Tossed Dagger|${OceanBait.Ragworm}`, "Elder Dinichthys (Mooched)"],
		intuitionBait: OceanBait.Ragworm,
		intuitionFish: "Shooting Star",
		spectralBait: OceanBait.Ragworm,
		spectralTriggerFish: "Spectral Sea Bo",
		spectralIntuitionTriggers: [`Gugrusaurus|${OceanBait.PlumpWorm}`, `Gugrusaurus|${OceanBait.PlumpWorm}`],
		spectralIntuitionBait: SpectralTriggerBait.HeavySteelJig,
		spectralIntuitionFish: "Elasmosaurus",
	},
	SouthernStrait: {
		name: "The Southern Strait of Merlthor",
		intuitionTriggers: [`Ghoul Barracuda|${OceanBait.Ragworm}`, "Gladius (Mooched)"],
		intuitionBait: OceanBait.PlumpWorm,
		intuitionFish: "Little Leviathan",
		spectralBait: OceanBait.Krill,
		spectralTriggerFish: "Spectral Discus",
		spectralIntuitionTriggers: [
			`Hi-Aetherlouse|${OceanBait.Ragworm}`,
			"Great Grandmarlin (Mooched)",
			"Great Grandmarlin",
		],
		spectralIntuitionBait: SpectralTriggerBait.ShrimpCageFeeder,
		spectralIntuitionFish: "Coral Manta",
	},
	RhotanoSea: {
		name: "Rhotano Sea",
		intuitionTriggers: [`Crimson Monkfish|${OceanBait.PlumpWorm}`, `Crimson Monkfish|${OceanBait.PlumpWorm}`],
		intuitionBait: OceanBait.Krill,
		intuitionFish: "Sabaton",
		spectralBait: OceanBait.PlumpWorm,
		spectralTriggerFish: "Spectral Bass",
		spectralIntuitionTriggers: [`Silencer|${OceanBait.PlumpWorm}`, `Crimson Monkfish|${OceanBait.PlumpWorm}`],
		spectralIntuitionBait: SpectralTriggerBait.RatTail,
		spectralIntuitionFish: "Stonescale",
	},
};
