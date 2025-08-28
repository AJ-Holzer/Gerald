const { PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "setwelcome",
  description: "Set the channel where welcome messages are sent.",
  options: [
    {
      name: "channel",
      description: "The channel to send welcome messages in.",
      type: 7, // CHANNEL type
      required: true,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],

  callback: async (client, interaction, db) => {
    const channel = interaction.options.getChannel("channel");

    // Insert or update
    const stmt = db.prepare(`
      INSERT INTO welcome_channels (guild_id, channel_id)
      VALUES (?, ?)
      ON CONFLICT(guild_id) DO UPDATE SET channel_id=excluded.channel_id
    `);

    stmt.run(interaction.guild.id, channel.id);

    await interaction.reply(
      `✅ Welcome channel set to ${channel} for this server.`
    );
  },
};
