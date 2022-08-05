const { MessageEmbed } = require('discord.js');
const { bold } = require('@discordjs/builders');

const makeAnimembed = ({
	color,
	title,
	MediaUrl,
	description,
	thumbnail,
	avgScore,
	status,
	episodes,
	format,
	id,
	interaction,
}) => {
	const embed = new MessageEmbed();
	return (
		embed
			.setColor(color)
			.setTitle(`${title}`)
			.setURL(MediaUrl)
		/* .setAuthor({
      name: "Some name",
      iconURL: "https://i.imgur.com/AfFp7pu.png",
      url: "https://discord.js.org",
    }) */
			.setDescription(description)
			.setThumbnail(thumbnail)
			.addFields(
				{ name: 'Format', value: `${format}`, inline: true },
				{ name: 'Average Score', value: `${avgScore}`, inline: true },
				{ name: 'Status', value: `${status}`, inline: true },
				{ name: 'Episodes', value: `${episodes}`, inline: true }
			)
			.setImage(`https://img.anili.st/media/${id}`)
			.setTimestamp()
			.setFooter({
				text: `${interaction.user.tag}`,
				iconURL: `${interaction.user.avatarURL({ format: 'png', size: 32 })}`,
			})
	);
};

const makeErrEmbed = ({ statusCode, description, interaction }) => {
	const embed = new MessageEmbed();
	embed
		.setColor('#cc0000')
		.setTitle(`${bold('Search Failed')}`)
		.setDescription(
			`${bold('Error :')} ${bold(description)}\n ${bold('Code :')} ${bold(
				statusCode
			)}`
		)
		.setThumbnail('https://anilist.co/img/logo_al.png')
		.setTimestamp()
		.setFooter({
			text: `${interaction.user.tag}`,
			iconURL: `${interaction.user.avatarURL({ format: 'png', size: 32 })}`,
		});
	return embed;
};

const makeMangaEmbed = ({
	color,
	title,
	MediaUrl,
	description,
	format,
	status,
	chapters,
	avgScore,
	genres,
	thumbnail,
	id,
	interaction,
}) => {
	const embed = new MessageEmbed();
	embed
		.setTitle(`${title}`)
		.setURL(MediaUrl)
		.setColor(color)
		.setDescription(description)
		.setThumbnail(thumbnail)
		.addFields(
			{ name: 'Format', value: `${format}`, inline: true },
			{ name: 'Status', value: `${status}`, inline: true },
			{ name: 'Chapters', value: `${chapters}`, inline: true },
			{ name: 'Average Score', value: `${avgScore}%`, inline: true },
			{ name: 'Genres', value: `${genres}`, inline: true }
		)

		.setImage(`https://img.anili.st/media/${id}`)
		.setTimestamp()
		.setFooter({
			text: `${interaction.user.tag}`,
			iconURL: `${interaction.user.avatarURL({ format: 'png', size: 32 })}`,
		});
	return embed;
};

module.exports = { makeAnimembed, makeErrEmbed, makeMangaEmbed };
