const Event = require('../../Structures/Event');
const Reminder = require('../../Structures/Reminder');
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
    async function test(){
      const reminder = new Reminder();
      const one = await reminder.fetchOneById('');
      console.log(`Fetched `, one);
      await client.sendReminder(one);
    }
    await test();
  }
};
