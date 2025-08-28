require("dotenv").config();
const eventHandler = require("./handlers/eventHandler");
const Database = require("better-sqlite3");
const { Client, IntentsBitField } = require("discord.js");
const { dbFile } = require("../config.json");

// Open or create a local SQLite file
const db = new Database(dbFile);

// Example: create a table if it doesn’t exist
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS welcome_channels (
    guild_id TEXT PRIMARY KEY,
    channel_id TEXT NOT NULL
  );
  `
).run();
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS introductions (
    user_id TEXT PRIMARY KEY,
    text TEXT NOT NULL
  );
  `
).run();

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

eventHandler(client, db);

// Login the bot
client.login(process.env.BOT_TOKEN);
