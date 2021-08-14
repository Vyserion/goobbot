import {
	ButtonInteraction,
	CommandInteraction,
	GuildMember,
	InteractionReplyOptions,
	MessageActionRow,
	MessageButton,
} from "discord.js";
import { CrafterRole, RaiderRole, giveRoleSelectedMessage, giveRoleSelectMessage } from "../config";
import { DiscordRole } from "../typings";

/**
 * The role command key.
 */
export const giveRoleCommand = "giverole";

/**
 * Gather the buttons for each of the available roles
 * @returns The list of roles as buttons
 */
const getRoleButtons = (): MessageButton[] => {
	const raiderButton: MessageButton = new MessageButton()
		.setCustomId(RaiderRole.key)
		.setLabel(RaiderRole.name)
		.setStyle("PRIMARY");
	const crafterButton: MessageButton = new MessageButton()
		.setCustomId(CrafterRole.key)
		.setLabel(CrafterRole.name)
		.setStyle("PRIMARY");
	return [raiderButton, crafterButton];
};

/**
 * Apply the role from the interaction to the member in the interaction.
 * @param interaction The user interaction from the button press
 */
const applyRoles = async (interaction: ButtonInteraction): Promise<void> => {
	const { member } = interaction;
	const guildMember = member as GuildMember;

	let role: DiscordRole;
	if (interaction.customId === CrafterRole.key) {
		role = CrafterRole;
	} else if (interaction.customId === RaiderRole.key) {
		role = RaiderRole;
	}

	if (!role) {
		await interaction.update("Something has gone wrong!");
		return;
	}

	// Apply the role if the user doesn't have it
	const serverRole = interaction.guild.roles.cache.get(role.id);
	if (!guildMember.roles.cache.has(serverRole.id)) {
		guildMember.roles.add(serverRole.id);
	}

	await interaction.update({ content: giveRoleSelectedMessage });
};

/**
 * Handle role slash commands, assigning the given role to the user if it does not exist.
 * @param interaction The user interaction from the slash command
 */
export const handleGiveRoleCommand = async (interaction: CommandInteraction): Promise<void> => {
	const messageAction = new MessageActionRow().addComponents(getRoleButtons());
	const messageOptions: InteractionReplyOptions = {
		content: giveRoleSelectMessage,
		ephemeral: true,
		components: [messageAction],
	};
	await interaction.reply(messageOptions);

	const { member } = interaction;
	const roleResponseFilter = (i) => i.user.id === member.user.id;
	const roleCollector = interaction.channel.createMessageComponentCollector({
		filter: roleResponseFilter,
		time: 15000,
	});
	roleCollector.on("collect", applyRoles);
};
