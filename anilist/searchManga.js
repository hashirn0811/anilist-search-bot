const { SlashCommandBuilder } = require(`@discordjs/builders`);
const { request, GraphQLClient } = require('graphql-request');
const { makeMangaEmbed, makeErrEmbed } = require(`../makembed`);
const { execute } = require('./searchAnime');
const mediaquery = require(`../media/queryManga`);
const { codeBlock } = require(`@discordjs/builders`);
const striptags = require('striptags');

const slashData = new SlashCommandBuilder()
  .setName('manga')
  .setDescription('Search for a manga')
  .addStringOption((opt) =>
    opt.setName('query').setDescription('enter the manga to search for')
  );

const requestClient = new GraphQLClient('https://graphql.anilist.co', {
  redirect: 'follow',
});

module.exports = {
  data: slashData,
  async execute(interaction) {
    const query = interaction.options.getString(`query`) || 'EROORRR';
    let res = null;
    res = await requestClient
      .request(mediaquery, { search: query })
      .then(async (res) => {
        console.log(`200 OK\n${JSON.stringify(res)}`);
        const media = res.Media;
        console.log(`media obj => ${media}`);
        let embed = '';
        let fixDisc = striptags(media.description);
        fixDisc =
          fixDisc.length > 400
            ? `${fixDisc
                .substring(0, 400)
                .trim()
                .replace(/(&quot\;)/g, '"')}...` //removes quotes
            : `${fixDisc}`;
        console.log(`description => ${fixDisc}`);
        embed = makeMangaEmbed({
          color: media.coverImage.color,
          title: media.title.english ?? media.title.romaji,
          MediaUrl: media.siteUrl,
          description: fixDisc,
          format: media.format,
          status: media.status,
          chapters: media.chapters ?? `Site doesn't have any entries`,
          avgScore: media.averageScore,
          genres: media.genres, //[...media.genres],
          thumbnail: media.coverImage.medium,
          id: media.id,
          interaction: interaction,
        });
        await interaction
          .reply({ embeds: [embed] })
          .then(() => console.log(`Embed Fulfilled`))
          .catch((e) => console.error(e));
      })
      .catch(async (e) => {
        //TODO : Refactor this code.
        // await interaction.channel.send(`Query failed ${e}`);
        // console.error(e);
        const resErr = e.response?.errors;
        let status, msg;
        resErr.forEach((ele) => {
          status = ele.status;
          msg = ele.message;
        });
        const myEmbed = makeErrEmbed({
          statusCode: `${status}`,
          description: `**${msg}**`,
          interaction: interaction,
        });
        await interaction
          .reply({ embeds: [myEmbed] })
          .then(() => console.log('sent'))
          .catch((e) => {
            interaction.reply(`Failed \n ${e}`);
          });
      });
  },
};
