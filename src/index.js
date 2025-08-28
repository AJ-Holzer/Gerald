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
  console.log(msg);
});

// Login the bot
client.login(token);
