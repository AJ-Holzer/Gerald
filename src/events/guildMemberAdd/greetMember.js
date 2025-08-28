module.exports = async (client, member, db) => {
  try {
    const row = db
      .prepare("SELECT channel_id FROM welcome_channels WHERE guild_id = ?")
      .get(member.guild.id);

    if (!row) return; // no welcome channel set

    const channel = member.guild.channels.cache.get(row.channel_id);
    if (!channel || !channel.isTextBased()) return;

    await channel.send(
      `👋 Hello ${member.user}, welcome to **${member.guild.name}**!`
    );
  } catch (err) {
    console.error("Error sending welcome:", err);
  }
};
