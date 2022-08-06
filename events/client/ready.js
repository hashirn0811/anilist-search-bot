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
      `Logged in as ${client.user.username} with ${client.users.cache.size} users and ${client.guilds.cache.size} guilds`
    );
  }
};
