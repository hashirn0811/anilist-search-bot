const { EmbedBuilder } = require(`discord.js`);

const isEmpty = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object ;

function makeEmbed(
  {
    client,
    author = {},
    title= '',
    title_url ='',
    description = '',
    thumbnail_url='',
    image_url='',
    fields=[],
    footer = {},
    color=null,
    timestamp
  }={}){
  const embed = new EmbedBuilder()
    .setColor('Blurple')
    .setTimestamp();

  if(client && isEmpty(author)) embed.setAuthor({name:client.user.username,iconURL: client.user.displayAvatarURL()});
  if(color) embed.setColor(color);
  if(!isEmpty(author)) embed.setAuthor(author);
  if(title_url) embed.setURL(title_url);
  if(title) embed.setTitle(title);
  if(description) embed.setDescription(description);
  if(thumbnail_url) embed.setThumbnail(thumbnail_url);
  if(image_url) embed.setImage(image_url);
  if(fields.length !== 0) embed.setFields(fields);
  if(!isEmpty(footer)) embed.setFooter(footer);
  if(timestamp) embed.setTimestamp(timestamp);

  return embed;
}

function error_embed({
  client,
  title = 'Error',
  description = 'An Error Occured',
  color = 'Red',
  author = {},
}={}){
  return makeEmbed({
    client,
    title,
    description,
    author,
    color
  }
  );
}

function reminderEmbed({
  content,
  createdAt
} = {}){
  return makeEmbed({
    title:`Here's your reminder`,
    description:content,
    footer: {text:'Reminder was made at ',},
    timestamp: createdAt
  });
}

async function errorMessage({
  channel,
  description = 'An unknown error occured',
}= {}){
  const embed = error_embed({
    description,
  });
  return await channel.send({embeds:[embed]}).then(()=> setTimeout(async()=>{
    const message = channel.lastMessage;
    await message.delete() ;
  }),10000);
  
}
module.exports = {makeEmbed,error_embed,errorMessage , reminderEmbed};