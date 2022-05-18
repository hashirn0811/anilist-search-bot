const fs = require("node:fs");
const path = require("node:path");

require("dotenv").config();
const { Client, Collection, Intents } = require("discord.js");

const prefix = process.env.PREFIX || "!";
const token = process.env.TOKEN;
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

//load commands from /commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

//load events

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    /* rest param & spread operator used to pack the 
      args that can be taken by the event and passed them to event.execute() where
      the args array is unpacked by the spread operator */
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

["handler"].forEach((handler) => require(`./handlers/${handler}.js`)(client));

//load commands dynamically
/* client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "Interaction failed",
      ephemeral: false,
    });
  }
}); */

client.login(token);
