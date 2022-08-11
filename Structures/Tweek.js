const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
} = require('discord.js');
const CommandHandler = require('../handlers/Command');
const EventHandler = require('../handlers/Event');
const mongoose = require(`mongoose`) ;
const Util = require('./Util');
require('dotenv').config();

class Tweek extends Client {
  constructor(props) {
    if (!props) props = {};
    props.partials = [
      Partials.GuildMember,
      Partials.Message,
      Partials.Channel,
      Partials.User,
    ];
    props.intents = [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.GuildBans,
      GatewayIntentBits.GuildEmojisAndStickers,
      GatewayIntentBits.GuildIntegrations,
      GatewayIntentBits.MessageContent,
    ];

    super(props);
    this.config = require('../config');
    this.token = process.env.TOKEN;
    this.dbURI = process.env.DB;
    this.commands = new Collection();
    this.events = new Collection();
    this.util = new Util(this);

    new EventHandler(this).load('../events/');
    new CommandHandler(this).load('../commands/');
    
  }
  async login() {
    return await super.login(process.env.TOKEN);
  }
  async initDB(){
    try {
      this.db = await mongoose.connect(this.dbURI,{
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true, 
      }) ;
      console.log(`Mongoose: DB connection established`) ;
    } catch (error) {
      console.error(`Error : ${error.message}`);
    }
  }
  fetchCommand(cmd) {
    return this.commands.get(cmd);
  }
  async sendMessage(target,content,User = false){
    if(content instanceof Object && !content.content){
      content = {embeds: [content]};
    }
    try {
      if(User){
        const user = await this.util.fetchUser(target);
        const DMchannel = await user.createDM() ;
        return await DMchannel.send(content) ;
      }
      const targetChannel = await this.util.fetchChannel(target);
      return await targetChannel.send(content);
    } catch (e) {
      console.error(`Error Sending Message: ${e.message}`);
    }
  }
}
module.exports.Tweek = Tweek;
