module.exports = class Command {
  constructor(client, meta = {}) {
    this.client = client;
    this.data = meta.data;
    this.usage = meta.usage || this.name;
    this.description = meta.description || null;
    this.permissions = meta.permissions || [
      'Use Application Commands',
      'Embed Links',
      'Send Message',
    ];
    this.category = meta.category;
  }
  async run() {
    throw new Error(`The Command ${this.name} doesn't provide a run method.`);
  }
};
