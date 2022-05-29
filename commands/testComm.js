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
    if (type === "MANGA") {
      const res = await makeRequest(mangaQuery, query);
      console.log(res);
    } else {
      try {
        const res = await makeRequest(animeQuery, query);
        //console.log(res);
        if (res.status !== 200) {
          console.warn(`err : ${res.response.errors}`);
          return;
        }
        const media = res.Media;
        console.log(media);
        let fixDisc = striptags(media.description);
        fixDisc =
          fixDisc.length > 400
            ? `${fixDisc
                .substring(0, 400)
                .trim()
                .replace(/(&quot\;)/g, '"')}...`
            : `${fixDisc}`;
        let embed = "";
        embed = makeAnimembed({
          color: media.coverImage.color,
          title: media.title.english ?? media.title.romaji,
          MediaUrl: media.siteUrl,
          description: fixDisc,
          thumbnail: media.coverImage.large,
          avgScore: media.averageScore,
          status: media.status,
          episodes: media.episodes,
          format: media.format,
          id: media.id,
          interaction: interaction,
        });
        await interaction
          .reply({ embeds: [embed] })
          .catch((err) => console.warn(err));
      } catch (e) {
        console.warn(e);
      }
    }
  },
};
