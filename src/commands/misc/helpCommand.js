const { Client, Interaction } = require("discord.js");

module.exports = {
  name: "help",
  description: "Shows help information about commands and Gerald.",
  // devOnly: Boolean
  // testOnly: Boolean
  // options: Object[]
  // deleted: Boolean

  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction, db) => {
    const embed = {
      description:
        "Hi, I'm Gerald. I'm a focused and dedicated person who takes pride in doing things thoroughly and responsibly. I approach challenges thoughtfully, value clear communication, and always strive to act with integrity.",
      fields: [
        {
          name: "General Commands",
          value: "```\ndelete-introduction\nhelp\nintroduce\nping\nwhois\n```",
          inline: true,
        },
        {
          name: "Admin Commands",
          value: "```\nban\nkick\nsetwelcome\ntimeout\n```",
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

    interaction.reply({
      embeds: [embed],
      flags: ["Ephemeral"],
    });
  },
};
