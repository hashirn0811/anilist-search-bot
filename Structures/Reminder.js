const reminderCollection = require(`./models/Reminder`) ;
module.exports = class Reminder {
  constructor(){
    this.collection = reminderCollection;
  }
  async addReminder({
    guild,
    userId,
    channelId,
    content,
    dueDate
  }={}){
    try {
      const created = await this.collection.create({
        guild,
        userId,
        channelId,
        content,
        dueDate
      });
      return created;
    } catch (e) {
      console.error(`Error adding reminder: ${e.message}`);
    }
  }
  async fetchAllReminders(){
    try {
      const reminders = await this.collection.find({}) ;
      console.log(reminders);
      return reminders;
    } catch (e) {
      console.error(`Error fetching reminders: ${e.message}`);
    }
  }
  async fetchOneById(id){
    try {
      const reminder = await this.collection.findOne({id});
      return reminder;
    } catch (e) {
      console.error(`Error fetching reminder : ${e.message}`);
    }
  }
  //test
  async fetchUserReminder(userId){
    try {
      const userReminders = await this.collection.find({userId});
      console.log(userReminders);
      return userReminders;
    } catch (e) {
      console.error(`Error fetching user reminders: ${e.message}`);
    }
  }
  async getExpired(){
    try {
      const expired = await this.collection.find({dueDate:{$lt:Date.now()}});
      if(!expired.length) return false;
      return expired;
    } catch (e) {
      console.error(`Error fetching expired : ${e.message}`);
      return false;
    }
  }
  async deleteReminder({
    id,
    userId,
  }={}){
    try {
      if(id){
        return await this.collection.deleteOne({id});
        //const {deletedCount = 0,acknowledged = false} = removed;
      }
      return await this.collection.deleteMany({userId});
      //const { deletedCount = 0, acknowledged = false } = removed ;
      //return deletedCount;
    } catch (e) {
      console.log(`Error deleting reminder(s): ${e.message}`);
      return false;
    }
  }
};