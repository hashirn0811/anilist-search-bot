const { Tweek } = require('./Structures/Tweek');

const client = new Tweek();

(async()=>{
  await client.initDB();
  await client.login();
  await client.sendMessage(`955296933705044018`,`test`,true);
})();
process.on('unhandledRejection', (err) => console.error(err.stack));
process.on('uncaughtException', (err) => console.error(err.stack));
