const fs = require(`node:fs`);
module.exports = async (client) => {
  const command = fs.readdirSync(`./misc`).map((cmd) => {
    let file = require(`../misc/${cmd}`);
    client.commands.set(file.name, file);
    if (file.aliases) {
      file.aliases.map((p) => client.aliases.set(p, file));
    }
  });
};
