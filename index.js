const { Tweek } = require('./Structures/Tweek');

const client = new Tweek();

(async()=>{
  await client.initDB();
  await client.login();
})();
process.on('unhandledRejection', (err) => console.error(err.stack));
process.on('uncaughtException', (err) => console.error(err.stack));
