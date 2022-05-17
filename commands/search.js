const { SlashCommandBuilder } = require("@discordjs/builders");
const discordEmbed = require(`../discordEmbed`);
const { makeAnimembed } = require("../makembed");
const { request, GraphQLClient } = require("graphql-request");
const mediaquery = require(`../media/query`);
const { MessageEmbed } = require("discord.js");
const requestClient = new GraphQLClient("https://graphql.anilist.co", {
  redirect: "follow",
});
const striptags = require("striptags");

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
    } /* else {
      await interaction.reply(`\`\`\`json\n${JSON.stringify(res)}\`\`\``);
    } */
    const embed = makeAnimembed({
      color: "#0099ff",
      desc: striptags(res.Media.deescription),
      title: res.Media.title.english,
      thumbnail: res.Media.coverImage.large,
      avgScore: res.Media.averageScore,
      episodes: undefined,
      status: res.Media.status,
    });
    await interaction
      .reply({ embeds: [embed] })
      .then(() => console.log("sent"))
      .catch(console.error());
  },
};
