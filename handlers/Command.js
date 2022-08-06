const BaseCommand = require('../Structures/Command');
const { join, resolve } = require('path');
const { readdir, lstat } = require('fs/promises');

module.exports = class CommandClass {
  constructor(client) {
    this.client = client;
  }
  async load(dir) {
    const filePath = join(__dirname, dir);
    const files = await readdir(filePath);

    for (const file of files) {
      const stat = await lstat(join(filePath, file));
      if (stat.isDirectory()) this.load(join(dir, file));
      if (file.endsWith('.js')) {
        const Cmd = require(resolve(filePath, file));

        if (Cmd.prototype instanceof BaseCommand) {
          const cmd = new Cmd(this.client);

          const cmdData = cmd.data.toJSON();

          const cmdSet = {
            name: cmdData.name,
            description: cmdData.description,
            options: cmdData.options,
            defaultPermission: cmdData.default_permission,
            contextDescription: cmd.contextDescription,
            usage: cmd.usage,
            category: cmd.category,
            permissions: cmd.permissions,
            run: cmd.run
          };
          this.client.commands.set(cmdSet.name, cmdSet);
        }
      }
    }
  }
};
