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