const mongoose= require(`mongoose`) ;

const reminderSchema = new mongoose.Schema({
  guild: {
    type:String,
    required:true
  },
  userId : {
    type:String,
    required:true
  },
  channelId: {
    type:String,
    required:true
  },
  createdAt: {
    type:Number,
    default: ()=> Date.now()
  },
  id:{
    type:String,
    //improve this as the probability of collision is not null :P
    default: ()=> String(Math.floor(Math.random() * Date.now())).substring(1,5)
  },
  content: {
    type:String,
    required:true
  },
  dueDate: {
    type:String,
    required:true
  }
});

module.exports = mongoose.model('Reminders',reminderSchema);