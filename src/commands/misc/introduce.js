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

    const stmt = db.prepare(`
      INSERT INTO introductions (user_id, text)
      VALUES (?, ?)
      ON CONFLICT(user_id) DO UPDATE SET text=excluded.text
    `);

    stmt.run(interaction.user.id, text);

    await interaction.reply(
      `✅ Your introduction has been set! View with \`/whois\`!`
    );
  },
};
