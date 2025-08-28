const { Client, Interaction } = require("discord.js");
const getLocalCommands = require("../../utils/getLocalCommands"); // adjust path if needed

module.exports = {
  name: "help",
  description: "Shows help information about commands and Gerald.",

  /**
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction, db) => {
    const localCommands = getLocalCommands();

    // Separate admin vs general based on required permissions
    const generalCommands = [];
    const adminCommands = [];

    for (const cmd of localCommands) {
      if (cmd.permissionsRequired && cmd.permissionsRequired.length > 0) {
        adminCommands.push(cmd.name);
      } else {
        generalCommands.push(cmd.name);
      }
    }

    const embed = {
      description:
        "Hi, I'm Gerald. I'm a focused and dedicated person who takes pride in doing things thoroughly and responsibly. I approach challenges thoughtfully, value clear communication, and always strive to act with integrity.",
      fields: [
        {
          name: "General Commands",
          value:
            generalCommands.length > 0
              ? "```\n" + generalCommands.join("\n") + "\n```"
              : "*(none)*",
          inline: true,
        },
        {
          name: "Admin Commands",
          value:
            adminCommands.length > 0
              ? "```\n" + adminCommands.join("\n") + "\n```"
              : "*(none)*",
          inline: true,
        },
      ],
      author: {
        name: "Gerald",
        url: "https://github.com/AJ-Holzer/Gerald",
      },
      title: "Help",
      color: 65535,
      footer: {
        text: "Made with ❤️ by Devs",
      },
    };

    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
