const { SlashCommandBuilder } = require("@discordjs/builders");
const { makeRequest } = require("../media/makeQueries");
const animeQuery = require("../media/queryAnime");
const mangaQuery = require("../media/queryManga");
const { makeAnimembed, makeErrEmbed } = require("../makembed");
const striptags = require("striptags");

const slashData = new SlashCommandBuilder()
  .setName("search")
  .setDescription("search")
  .addStringOption((stropt) =>
    stropt.setName("query").setDescription("Enter term").setRequired(true)
  )
  .addStringOption((opt) =>
    opt
      .setName("option")
      .setDescription("opt desc")
      .addChoices(
        {
          name: "anime",
          value: "ANIME",
        },
        { name: "manga", value: "MANGA" }
      )
      .setRequired(true)
  );
module.exports = {
  data: slashData,
  async execute(interaction) {
    const type = interaction.options.getString("option") || "null";
    const query = interaction.options.getString("query") || "null";
    console.log(`query :${query} type:${type}`);
    let res = "";
    if (type === "MANGA") {
      res = await makeRequest(mangaQuery, query);
      interaction.reply(`${JSON.stringify(res)}`);
    } else {
      res = await makeRequest(animeQuery, query);
      interaction.reply(`${JSON.stringify(res)}`);
    }
  },
};
