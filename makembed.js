const { MessageEmbed } = require("discord.js");

const embed = new MessageEmbed();

const makeAnimembed = (
  color,
  desc,
  title,
  thumbnail,
  avgScore,
  episodes,
  status
) => {
  embed
    .setColor(color)
    .setDescription(desc)
    .setTitle(title)
    .setThumbnail(thumbnail)
    .addField("Avg. score: ", `${avgScore}%`, true)
    .addField("# of episodes: ", `${episodes}`, true)
    .addField("Status: ", `\`${status}\``, true);
  /* embed.setFooter({
    text: `${format} • ${seasons} ${seasonYear}`,
    iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png`, */
};

module.exports = { makeAnimembed };
