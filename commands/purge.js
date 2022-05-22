const { SlashCommandBuilder } = require("@discordjs/builders");
const wait = require("node:timers/promises").setTimeout;

const slashData = new SlashCommandBuilder()
  .setName("purge")
  .setDescription("Purge messages")
  .addIntegerOption((opt) =>
    opt
      .setName("amount")
      .setDescription("Amount to purge")
      .setMinValue(1)
      .setMaxValue(100)
      .setRequired(true)
  );
module.exports = {
  data: slashData,
  async execute(interaction) {
    const amount = interaction.options.getInteger("amount");
    let messages = await interaction.channel.messages.fetch({ limit: amount });
    messages.forEach((msg) => msg.delete());
    interaction.reply(`✅ Deleted ${amount} messages`);
    await wait(4000);
    await interaction.deleteReply();
  },
};
