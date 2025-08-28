module.exports = {
  name: "delete-introduction",
  description: "Deletes your personal introduction.",

  callback: async (client, interaction, db) => {
    const stmt = db.prepare(
      "DELETE FROM introductions WHERE guild_id = ? AND user_id = ?"
    );
    const result = stmt.run(interaction.guild.id, interaction.user.id);

    if (result.changes === 0) {
      await interaction.reply({
        content: "❌ You don’t have an introduction set to delete.",
        flags: ["Ephemeral"],
      });
    } else {
      await interaction.reply({
        content: "🗑️ Your introduction has been deleted.",
        flags: ["Ephemeral"],
      });
    }
  },
};
