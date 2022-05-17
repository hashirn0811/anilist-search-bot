const { MessageEmbed } = require("discord.js");

const embed = new MessageEmbed();

const makeAnimembed = ({
  color,
  title,
  MediaUrl,
  description,
  thumbnail,
  avgScore,
  status,
  episodes,
  id,
  interaction,
}) => {
  return (
    embed
      .setColor(color)
      .setTitle(title)
      .setURL(MediaUrl)
      /* .setAuthor({
      name: "Some name",
      iconURL: "https://i.imgur.com/AfFp7pu.png",
      url: "https://discord.js.org",
    }) */
      .setDescription(description)
      .setThumbnail(thumbnail)
      .addFields(
        { name: "Average Score", value: `${avgScore}`, inline: true },
        { name: "Status", value: `${status}`, inline: true },
        { name: "Episodes", value: `${episodes}`, inline: true }
      )
      .setImage(`https://img.anili.st/media/${id}`)
      .setTimestamp()
      .setFooter({
        text: `${interaction.user.tag}`,
        iconURL: `${interaction.user.avatarURL({ format: "png", size: 32 })}`,
      })
  );
};

module.exports = { makeAnimembed };
