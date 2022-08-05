const Command = require('../../Structures/Command');
const { InteractionType } = require('discord.js');

module.exports = class InteractionCreate extends Command {
	constructor(client) {
		super(client, {
			name: 'interactionCreate',
		});
	}
	async run(client, interaction) {
		if (interaction.type === InteractionType.ApplicationCommand) {
			const command = client.commands.get(interaction.commandName);

			if (interaction.user.bot) return;
			if (
				!interaction.inGuild() &&
        interaction.type === InteractionType.ApplicationCommand
			)
				return interaction.reply({
					content: 'You must be in a server to use commands.',
				});
			if (!command)
				return (
					(await interaction.reply('Command Unavailable')) &&
          client.commands.delete(interaction.commandName)
				);
			try {
				command.run(client, interaction);
			} catch (error) {
				console.log(error);
				await interaction.reply({
					content: `An error occurred.\n\n**\`${error.message}\`**`,
				});
			}
		}
	}
};
