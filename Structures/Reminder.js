const reminderCollection = require(`./models/Reminder`) ;

module.exports = class Reminder {
  constructor(){
    this.collection = reminderCollection;
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
      const reminder = await this.collection.find({id});
      return reminder;
    } catch (e) {
      console.error(`Error fetching reminder : ${e.message}`);
    }
  }
  async fetchUserReminder(userId){
    try {
      const userReminders = await this.collection.find({userId});
      console.log(userReminders);
      return userReminders;
    } catch (e) {
      console.error(`Error fetching user reminders: ${e.message}`);
    }
  }
};