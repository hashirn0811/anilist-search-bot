const Command = require(`../../Structures/Command`) ;
const { SlashCommandBuilder } = require(`discord.js`) ;
const { makeEmbed } = require(`../../helpers/embeds`) ;
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
    await interaction.deferReply();
    const user = await interaction.options.getUser('user');
    const avatarURl = user.displayAvatarURL({extension:'png',dynamic:true,size:2048});
    const embed = makeEmbed({
      author: {name:`${user.tag}`,iconURL:`${user.displayAvatarURL()}`},
      image_url: avatarURl,
      fields: [{name:'Links',value:`• [x2048](${avatarURl}) `,inline:true}]
    });
    return await interaction.followUp({embeds: [embed]});
  }
};