const Command = require(`../../Structures/Command`) ;
const { EmbedBuilder,SlashCommandBuilder } = require(`discord.js`) ;

module.exports = class PFP extends Command{
  constructor(client){
    super(client,{
      data: new SlashCommandBuilder()
        .setName('pfp')
        .setDescription(`Returns a user's pfp`)
        .addUserOption(opt=>
          opt.setName('user')
            .setDescription('user to fetch <@id>')
            .setRequired(true)
        )
      ,
      usage: 'pfp <@userid>',
      category: 'Info',
      permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],
    });
  }
  async run(client,interaction){
    const user = await interaction.options.getUser('user');
    console.log(user);
    const avatarURl = user.displayAvatarURL({extension:'png',dynamic:true,size:2048});

    const embed = new EmbedBuilder()
      .setTitle(`**${user.username}'s Avatar**`)
      .setColor('Blue')
      .setImage(avatarURl)
      .setDescription(
        `Links : • [x2048](${avatarURl}) `
      );

    return await interaction.reply({embeds: [embed]});
  }
};