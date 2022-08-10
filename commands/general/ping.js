const Command = require('../../Structures/Command');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = class Ping extends Command {
  constructor(client) {
    super(client, {
      data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Returns bot ping'),
      usage: 'ping',
      category: 'Info',
      permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
    });
  }
  async run(client,interaction){
    const now = Date.now();
    await interaction.deferReply() ;
    
    const embed = new EmbedBuilder()
      .setAuthor({name:`${client.user.username}'s ping`,
        iconURL:client.user.displayAvatarURL()})
      .setColor('Blue')
      .setDescription(stripIndents`
      **Roundtrip:** ${Math.round(Date.now() - now)} ms
      **API:** ${Math.round(client.ws.ping)} ms
      `);

    return await interaction.followUp({embeds: [embed]});
  }
};
