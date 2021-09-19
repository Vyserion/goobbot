import { CommandInteraction, GuildMember, MessageEmbed, TextChannel } from "discord.js";
import { sendDefaultDeferredError, FFXIV_ROLE_ID, LFG_CHANNEL_ID, getUserNickname } from "../../../core";
import logger from "../../../core/util/logger";

/**
 * Handle the lfg slash command.
 * Will respond to the original request, then set up the embed and party features
 * @param interaction The command interaction
 */
export const handleLFGCommand = async (interaction: CommandInteraction): Promise<void> => {
	logger.info("LFG command received");

	await interaction.deferReply({
		ephemeral: true,
	});

	const ffxivRole = interaction.guild.roles.cache.get(FFXIV_ROLE_ID);
	if (!ffxivRole) {
		logger.error("Could not get the FFXIV role from cache");
		await sendDefaultDeferredError(interaction);
		return;
	}

	const guildMember = interaction.member as GuildMember;
	if (!guildMember.roles.cache.has(ffxivRole.id)) {
		logger.debug("User without the FFXIV role tried to use /lfg");
		interaction.editReply("Sorry, only members of the FFXIV role can set up a group!");
		return;
	}

	const partyLeaderNickname = await getUserNickname(interaction);
	const embed = new MessageEmbed()
		.setTitle(interaction.options.getString("title"))
		.setDescription("Please react to this message and your party leader will be in touch!")
		.setColor("RANDOM")
		.addFields(
			{
				name: "Date",
				value: interaction.options.getString("date"),
				inline: true,
			},
			{
				name: "Time",
				value: `${interaction.options.getInteger("time")} ST`,
				inline: true,
			},
			{
				name: "Party Leader",
				value: partyLeaderNickname,
			}
		);

	const numberOfTanks = interaction.options.getInteger("tanks");
	if (numberOfTanks && numberOfTanks > 0) {
		embed.addField("Tanks", numberOfTanks.toString(), true);
	}
	const numberOfHealers = interaction.options.getInteger("healers");
	if (numberOfHealers && numberOfHealers > 0) {
		embed.addField("Healers", numberOfHealers.toString(), true);
	}
	const numberofDps = interaction.options.getInteger("dps");
	if (numberofDps && numberofDps > 0) {
		embed.addField("DPS", numberofDps.toString(), true);
	}

	const lfgChannel = interaction.client.channels.cache.get(LFG_CHANNEL_ID);
	const message = await (lfgChannel as TextChannel).send({ embeds: [embed] });

	const tankEmoji = interaction.guild.emojis.cache.find((emoji) => emoji.name === "tank");
	await message.react(tankEmoji);
	const healerEmoji = interaction.guild.emojis.cache.find((emoji) => emoji.name === "healer");
	await message.react(healerEmoji);
	const dpsEmoji = interaction.guild.emojis.cache.find((emoji) => emoji.name === "meleedps");
	await message.react(dpsEmoji);

	await interaction.editReply("All done! Make sure to check the reactions for your party members.");
};
