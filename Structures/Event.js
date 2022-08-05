module.exports = class Event {
  constructor(client, options = {}) {
    this.client = client;
    this.name = options.name;
    this.raw = options.raw || false;
    this.once = options.once || false;
  }
  async run() {
    throw new Error(`The event ${this.name} doesn't provide a run method `);
  }
};
