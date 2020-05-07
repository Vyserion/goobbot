export enum OceanBait {
	"Krill" = "Krill  <:krill:707934351467348019>",
	"Ragworm" = "Ragworm <:ragworm:707934377753051156>",
	"PlumpWorm" = "Plump Worm <:plumpworm:707934387483836428>"
}

export enum SpectralTriggerBait {
	"RatTail" = "Rat Tail",
	"HeavySteelJig" = "Heavy Steel Jig",
	"ShrimpCageFeeder" = "Shrimp Cage Feeder",
	"Glowworm" = "Glowworm"
}

export enum LocationName {
	"GaladionBay",
	"NorthernStrait",
	"SouthernStrait",
	"RhontanoSea"
}

export const getAllLocations = (): string[] => {
	return Object.keys(LocationName).filter(key => {
		return Number.isNaN(parseInt(key, 10));
	});
};

export const isALocation = (input: string): boolean => {
	return Object.values(LocationName).includes(input);
};

export interface FishingLocation {
	name: string;
	intuitionTriggers: string[];
	intuitionBait: OceanBait;
	intuitionFish: string;
	spectralBait: OceanBait;
	spectralTriggerFish: string;
	spectralIntuitionTriggers: string[];
	spectralIntuitionBait: SpectralTriggerBait;
	spectralIntuitionFish: string;
}

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
			`Navigator's Print|${OceanBait.Krill}`
		],
		spectralIntuitionBait: SpectralTriggerBait.Glowworm,
		spectralIntuitionFish: "Shooting Star"
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
		spectralIntuitionFish: "Elasmosaurus"
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
			"Great Grandmarlin"
		],
		spectralIntuitionBait: SpectralTriggerBait.ShrimpCageFeeder,
		spectralIntuitionFish: "Coral Manta"
	},
	RhontanoSea: {
		name: "Rhontano Sea",
		intuitionTriggers: [`Crimson Monkfish|${OceanBait.PlumpWorm}`, `Crimson Monkfish|${OceanBait.PlumpWorm}`],
		intuitionBait: OceanBait.Krill,
		intuitionFish: "Sabaton",
		spectralBait: OceanBait.PlumpWorm,
		spectralTriggerFish: "Spectral Bass",
		spectralIntuitionTriggers: [`Silencer|${OceanBait.PlumpWorm}`, `Crimson Monkfish|${OceanBait.PlumpWorm}`],
		spectralIntuitionBait: SpectralTriggerBait.RatTail,
		spectralIntuitionFish: "Stonescale"
	}
};
