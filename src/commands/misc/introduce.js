const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "introduce",
  description: "Set or update your personal introduction.",
  options: [
    {
      name: "text",
      description: "Your introduction text.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  callback: async (client, interaction, db) => {
    const text = interaction.options.getString("text");
    const userId = interaction.user.id;
    const guildId = interaction.guild.id;

    const stmt = db.prepare(`
      INSERT INTO introductions (guild_id, user_id, text)
      VALUES (?, ?, ?)
      ON CONFLICT(guild_id, user_id) DO UPDATE SET text=excluded.text
    `);

    stmt.run(guildId, userId, text);

    await interaction.reply(
      `✅ I noted down your introduction! View with \`/whois\`!`
    );
  },
};
