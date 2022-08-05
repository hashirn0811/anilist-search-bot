module.exports = {
  name: "interactionCreate",
  execute(interaction) {
    console.log(
      `${interaction.user.tag} triggered the interaction ${interaction.id} in #${interaction.channel.name}`
    );
    if (!interaction.isCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      command.execute(interaction);
    } catch (error) {
      console.error(error);
      interaction.reply({
        content: "Interaction failed",
        ephemeral: false,
      });
    }
  },
};
