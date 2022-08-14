const Reminder = require('../Structures/Reminder');

const rem = new Reminder();

async function handleReminders(client){
  const expiredReminders = await rem.getExpired();  
  if(!expiredReminders) return;
  for(const expired of expiredReminders){
    if(!expired) return;
    const sent = client.sendReminder(expired);
    if(sent){
      console.log(`Reminder handled , now removing content:${expired.content} Id: ${expired.id}`);
      const removed = rem.deleteReminder({id:expired.id});
      const { deletedCount = 0} = removed ;
      if(!deletedCount) return;
    }
  }
}

function tick(client,ms){
  setInterval(()=>handleReminders(client),ms);
}

module.exports = { tick };