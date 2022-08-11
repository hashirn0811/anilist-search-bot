const Tweek = require(`./Tweek`);
const mongoose = require('mongoose');
const reminderCollection = require(`./models/Reminder`) ;



class Reminder extends Tweek{
  constructor(){
    super();
  }
  async sendReminder(id){
    const reminder = await fetchReminder(id) ;
    const embed = embed() ;

  }
  async fetchReminder(){
    const reminder = await reminderCollection.find({}) ;
  }
    
}