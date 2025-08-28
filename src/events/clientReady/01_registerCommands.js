const { development, testServer } = require("../../../config.json");
const areCommandsDifferent = require("../../utils/areCommandsDifferent");
const getApplicationCommands = require("../../utils/getApplicationCommands");
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = async (client) => {
  try {
    const localCommands = getLocalCommands();

    if (development === true && testServer) {
      // Register commands only in the dev/test server
      const guildCommands = await getApplicationCommands(client, testServer);
      for (const localCommand of localCommands) {
        await handleCommand(localCommand, guildCommands);
      }
      console.log(
        "🛠 Development mode: commands registered only in test server."
      );
    } else if (development === false) {
      // Register commands globally
      const globalCommands = await getApplicationCommands(client, null);
      for (const localCommand of localCommands) {
        await handleCommand(localCommand, globalCommands);
      }
      console.log("🚀 Production mode: commands registered globally.");
    }
  } catch (error) {
    console.log(`❌ Error registering commands: ${error}`);
  }
};

// Helper function
async function handleCommand(localCommand, applicationCommands) {
  const { name, description, options } = localCommand;

  const existingCommand = applicationCommands.cache.find(
    (cmd) => cmd.name === name
  );

  if (existingCommand) {
    if (localCommand.deleted) {
      await applicationCommands.delete(existingCommand.id);
      console.log(`🗑 Deleted command "${name}".`);
      return;
    }

    if (areCommandsDifferent(existingCommand, localCommand)) {
      await applicationCommands.edit(existingCommand.id, {
        description,
        options,
      });

      console.log(`🔁 Edited command "${name}".`);
    }
  } else {
    if (localCommand.deleted) {
      console.log(
        `⏩ Skipping registering command "${name}" as it's set to delete.`
      );
      return;
    }

    await applicationCommands.create({
      name,
      description,
      options,
    });

    console.log(`👍 Registered command "${name}".`);
  }
}
