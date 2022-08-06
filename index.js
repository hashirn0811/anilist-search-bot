const { Tweek } = require('./Structures/Client');

const client = new Tweek();

client.login();
process.on('unhandledRejection', (err) => console.error(err.stack));
process.on('uncaughtException', (err) => console.error(err.stack));
