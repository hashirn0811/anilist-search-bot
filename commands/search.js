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
      await interaction.reply(
        interaction.user.avatarURL({ format: "png", size: 256 })
      ); */

    const media = res.Media;
    let fixDisc = striptags(media.description);
    fixDisc =
      fixDisc.length > 200
        ? `${fixDisc.substring(0, 200).trim()}...`
        : `${fixDisc}`;
    const embed = makeAnimembed({
      color: media.coverImage.color,
      title: media.title.english,
      MediaUrl: media.siteUrl,
      description: fixDisc,
      thumbnail: media.coverImage.large,
      avgScore: media.averageScore,
      status: media.status,
      episodes: media.episodes,
      id: media.id,
      interaction: interaction,
    });
    await interaction
      .reply({ embeds: [embed] })
      .then(() => console.log("sent"))
      .catch(console.error());
  },
};
