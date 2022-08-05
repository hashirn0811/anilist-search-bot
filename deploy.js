require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const { readdirSync } = require('node:fs');

async function deploy() {
	const commandData = [];

	readdirSync('./commands').forEach(async (category) => {
		const commands = readdirSync(`./commands/${category}`).filter((cmd) =>
			cmd.endsWith('.js')
		);

		for (const command of commands) {
			const Command = require(`./commands/${category}/${command}`);
			const cmd = new Command();
			const cmdData = cmd.data.toJSON();

			commandData.push(cmdData);
		}
	});

	const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

	try {
		const guildId = process.env.guildId;
		const clientId = process.env.clientId;

		await rest
			.put(Routes.applicationGuildCommands(clientId, guildId), {
				body: commandData,
			})
			.then(() => console.log('Slash Commands are successfully deployed'));
	} catch (error) {
		console.error(error);
	}
}

deploy();
