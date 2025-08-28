const { PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "clear-channel",
  description:
    "Instantly clear this channel by deleting & recreating it. (Owner only)",
  permissionsRequired: [PermissionFlagsBits.ManageChannels],
  botPermissions: [PermissionFlagsBits.ManageChannels],

  callback: async (client, interaction, db) => {
    // Check if the user is the guild owner
    if (interaction.user.id !== interaction.guild.ownerId) {
      return interaction.reply({
        content: "❌ Only the **server owner** can use this command.",
        ephemeral: true,
      });
    }

    const channel = interaction.channel;

    await interaction.reply({
      content: "🗑 Recreating channel…",
      ephemeral: true,
    });

    try {
      const newChannel = await channel.clone({
        name: channel.name,
        type: channel.type,
        topic: channel.topic,
        nsfw: channel.nsfw,
        parent: channel.parent, // keep category
        position: channel.position,
        rateLimitPerUser: channel.rateLimitPerUser,
        permissionOverwrites: channel.permissionOverwrites.cache.map((po) => ({
          id: po.id,
          allow: po.allow.bitfield,
          deny: po.deny.bitfield,
          type: po.type,
        })),
      });

      await channel.delete();

      await interaction.editReply({
        content: `✅ Channel cleared: ${newChannel}`,
      });
    } catch (error) {
      console.error(error);
      await interaction.editReply("❌ Failed to clear channel.");
    }
  },
};
