const BaseEvent = require('../Structures/Event');
const { join, resolve } = require('path');
const { readdir, lstat } = require('fs/promises');

module.exports = class EventClass {
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
				const Evt = require(resolve(filePath, file));

				if (Evt.prototype instanceof BaseEvent) {
					const evt = new Evt(this.client);

					this.client.events.set(evt.name, evt);
					evt.once
						? this.client.once(evt.name, evt.run.bind(evt))
						: this.client.on(evt.name, evt.run.bind(evt));
				}
			}
		}
	}
};
