module.exports = class Util {
  constructor(client) {
    this.client = client;
  }
  async fetchChannel(channelID) {
    return await this.client.channels.fetch(channelID).catch(() =>false);
  }
  async fetchUser(id){
    return await this.client.users.fetch(id).catch(()=>false);
  }
};
