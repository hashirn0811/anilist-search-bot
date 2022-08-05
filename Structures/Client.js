const { Client, Collection, Intents } = require(`discord.js`);
const CommandHandler = require(`../Structures/Command`);
const EventHandler = require(`../Structures/Event`);
const Util = require(`../Structures/Util`);

class Tweek extends Client {
  constructor(props) {
    if (!props) props = {};
    props.partials = ['MESSAGE', 'CHANNEL', 'REACTION'];
    props.intents = [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_INVITES,
      Intents.FLAGS.GUILD_BANS,
      Intents.FLAGS.GUILD_INVITES,
      Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
      Intents.FLAGS.GUILD_VOICE_STATES,
    ];

    super(props);
    this.config = require(`dotenv`).config();
    this.token = process.env.TOKEN;
    this.dbID = process.env.DB;
    this.commands = new Collection();

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
