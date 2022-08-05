require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('node:fs');

async function deploy() {
  const commandData = [];

  fs.readdirSync('./commands').forEach(async (category) => {
    const commands = fs
      .readdirSync(`./commands/${category}`)
      .filter((cmd) => cmd.endsWith('.js'));

    for (const command of command) {
      const Command = require(`./commands/${category}/${command}`);
      const cmd = new Command();
      const cmdData = cmd.data.toJSON();

      commandData.push(cmdData);
    }
  });

  const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

  try {
    const guildId = process.env.guildId;
    const clientId = process.env.clientId;

    await rest
      .put(Routes.applicationGuildCommands(clientId, guildId), {
        body: commandData,
      })
      .then(() => console.log(`Slash Commands are successfully deployed`));
  } catch (error) {
    console.error(error);
  }
}

deploy();
