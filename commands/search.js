const { SlashCommandBuilder } = require("@discordjs/builders");
const discordEmbed = require(`../discordEmbed`);
const { request, GraphQLClient } = require("graphql-request");
const mediaquery = require(`../media/query`);
const { MessageEmbed } = require("discord.js");
const requestClient = new GraphQLClient("https://graphql.anilist.co", {
  redirect: "follow",
});

const data = new SlashCommandBuilder()
  .setName("search")
  .setDescription("Search Query")
  .addStringOption((opt) => opt.setName("query").setDescription("enter query"));

module.exports = {
  data: data,
  async execute(interaction) {
    const query = interaction.options.getString("query") || "wrong";
    //await interaction.reply(`${query}`);
    let res = null;
    res = await requestClient.request(mediaquery, { search: query });
    if (res === null) {
      await interaction.reply("query failed");
      return;
    }
    const embed = makembed();
  },
};
