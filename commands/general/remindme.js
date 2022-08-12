const Command = require(`../../Structures/Command`);
const { SlashCommandBuilder } = require(`discord.js`);
const ms = require('ms');
const Reminder = require(`../../Structures/models/Reminder`) ;
const { makeEmbed,error_embed } = require(`../../helpers/embeds`) ;
module.exports = class Remindme extends Command{
  constructor(client){
    super(client,{
      data: new SlashCommandBuilder()
        .setName('remindme')
        .setDescription('set a reminder')
        .addStringOption(opt=>
          opt.setName('content')
            .setDescription('reminder content')
            .setRequired(true)
        )
        .addStringOption(opt=>
          opt.setName('duration')
            .setDescription('time until the reminder fires')
            .setRequired(true)
        )
        
      ,
      usage:'/remindme',
      category:'General',
      permissions: ['Use Application Commands', 'Send Messages', 'Embed Links'],    
    });
  }
  async run(client,interaction){
    await interaction.deferReply();
    // console.log(interaction);
    const content = await interaction.options.getString('content');
    const duration = await interaction.options.getString('duration');
    const guildId = interaction.guildId;
    const userId = interaction.user.id;
    const channelId = interaction.channelId;
    const timeMs = ms(duration);
    const errEmbed = error_embed({
      client,
      description: 'Invalid Duration',
    });
    
    if(!timeMs) return await interaction.followUp({embeds:[errEmbed]})
      .then(()=> new Promise(resolve => setTimeout(resolve,30000)))
      .then(async()=>await interaction.deleteReply());
    console.log({
      guildId,
      userId,
      channelId,
      content,
      dueDate:timeMs
    });
    try {
      const reminder = await Reminder.create({
        guild:guildId,
        userId,
        channelId,
        content,
        dueDate:timeMs
      });
      const {id = 'err'} = reminder ;
      const successEmbed = makeEmbed({
        author: {
          name:interaction.user.username,
          iconURL: interaction.user.displayAvatarURL()
        },
        description: `I will remind you about **${content}** in <t:${timeMs / 1000}:R>`,
        fields:[
          {name:'id',value:id,inline:false},
          {name:'Content',value:content,inline:false}
        ]
      });
      await interaction.followUp({embeds:[successEmbed]}); 
    }catch (error) {
      console.error(`Error saving to DB : ${error.message}`);
    }
  }
}; 

