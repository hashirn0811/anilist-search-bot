const Event = require('../../Structures/Event');

module.exports = class ReadyEvent extends Event {
  constructor(client) {
    super(client, {
      name: 'ready',
      once: true,
    });
  }
  async run(client) {
    console.log(
      `Logged in as ${client.user.username} in ${client.guilds.cache.size} guild(s) serving ${client.users.cache.size} users.`
    );
  }
};
