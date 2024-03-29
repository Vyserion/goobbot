import { Interaction } from "discord.js";
import {
	handleSlashCommands as handleRoleAssignmentSlashCommands,
	slashCommands as roleAssignmentCommandData,
} from "../../plugins/role-assigner";
import { handleSlashCommands as handleLFGSlashCommands, slashCommands as lfgCommandData } from "../../plugins/lfg";

const roleAssignmentCommands = roleAssignmentCommandData.map((cmd) => cmd.name);
const raidPlannerCommands = lfgCommandData.map((cmd) => cmd.name);

/**
 * Handler function for interactions with the bot.
 * @param interaction The interaction from the user
 */
export async function onInteraction(interaction: Interaction): Promise<void> {
	if (!interaction.isCommand()) {
		return;
	}

	if (roleAssignmentCommands.includes(interaction.commandName)) {
		await handleRoleAssignmentSlashCommands(interaction);
	}
	if (raidPlannerCommands.includes(interaction.commandName)) {
		await handleLFGSlashCommands(interaction);
	}
}
