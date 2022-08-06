const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
} = require('discord.js');
const CommandHandler = require('../handlers/Command');
const EventHandler = require('../handlers/Event');
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
    this.dbID = process.env.DB;
    this.commands = new Collection();
    this.events = new Collection();
    this.util = new Util(this);

    new EventHandler(this).load('../events/');
    new CommandHandler(this).load('../commands/');
  }
  async login() {
    return super.login(process.env.TOKEN);
  }
  fetchCommand(cmd) {
    return this.commands.get(cmd);
  }
}
module.exports.Tweek = Tweek;
