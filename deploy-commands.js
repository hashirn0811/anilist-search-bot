require("dotenv").config();
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("node:fs");
const path = require("path");
const clientId = process.env.clientId;
const guildId = process.env.guildId;
const token = process.env.TOKEN;
const commands = [];

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
}
const rest = new REST({ version: "9" }).setToken(token);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log(`Commands Registered`))
  .catch(console.error);

(async () => {
  try {
    console.log(`[API] Commands loading (\)`);
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });
    console.log(`[API] commands reloaded `);
  } catch (error) {
    console.error(error);
  }
})();
