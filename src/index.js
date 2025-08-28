require("dotenv").config();

// Variables
const token = process.env.BOT_TOKEN;

const { Client, IntentsBitField } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

// Log if bot is online
client.on("clientReady", (cli) => {
  console.log(`✅ ${cli.user.username} is online.`);
});

// Log messages entered in the dc chat for testing purpose
client.on("messageCreate", (msg) => {
  // Skip if author is a bot
  if (msg.author.bot) {
    return;
  }

  console.log(msg.content);
});

// Login the bot
client.login(token);
