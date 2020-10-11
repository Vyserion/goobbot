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
