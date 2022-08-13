const Event = require('../../Structures/Event');
const { tick } = require(`../../helpers/handler`);
module.exports = class ReadyEvent extends Event {
  constructor(client) {
    super(client, {
      name: 'ready',
      once: false,
    });
  }
  async run(client) {
    console.log(
      `Logged in as ${client.user.username} in ${client.guilds.cache.size} guild(s) serving ${client.users.cache.size} users.`
    );
    tick(client,5000); //checks for reminders every 5000ms
  }
};