const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "whois",
  description: "See someone's introduction.",
  options: [
    {
      name: "user",
      description: "The user to view the intro of.",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
  ],

  callback: async (client, interaction, db) => {
    const user = interaction.options.getUser("user") || interaction.user;

    const row = db
      .prepare("SELECT text FROM introductions WHERE user_id = ?")
      .get(user.id);

    if (!row) {
      return interaction.reply({
        content: `❌ ${user.username} has not set an introduction yet.`,
        flags: ["Ephemeral"],
      });
    }

    await interaction.reply({
      content: `📖 **${user.username}'s intro:**\n${row.text}`,
      flags: ["Ephemeral"],
    });
  },
};
