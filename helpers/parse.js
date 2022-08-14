const timeParser = require('time-parser');
// Matches `1 s` , `1s`,`1 w`.. 
const regEx = /^ *([0-9]+) *(s|m|h|d|w) *$/i;
const timeMS = {
  s:1000,
  m:60000,
  h:3600000,
  d:86400000,
  w:604800000
};

const replaceWith = {
  'sec':'second',
  'min':'minute',
  'mins':'minutes',
  'next':'one'
};

function parseTime(timeInput){
  timeInput = timeInput.toLowerCase();
  const matches = timeInput.match(regEx); //[ '1 S', '1', 'S', index: 0, input: '1 S', groups: undefined ] | null
  if(matches){
    const relTime = Number(matches[1]) * timeMS[matches[2]] ;
    const obj = {
      relative:relTime,
      absolute: relTime + Date.now()
    };
    // eslint-disable-next-line no-unused-vars
    const {relative = 'INVALID' , absolute = 'INVALID'} = obj;
    return absolute;
  }

  const possible = Object.keys(replaceWith);
  possible.map(key => {
    if(timeInput.includes(key)){
      timeInput = timeInput.replace(new RegExp(key,'gi'),replaceWith[key]);
    }
  });
  
  const parsedTime = timeParser(timeInput.trim());
  const { relative,mode ,absolute} = parsedTime ;
  const year = new Date().getFullYear();

  if(mode === 'error' || Number(timeInput)) return 'INVALID' ;
  if(relative < 0){
    if(mode === 'relative'){
      return 'Invalid Format' ;
    }else{
      return parseTime(`${timeInput} ${year + 1}`);
    }
  }
  return absolute;
}
/* function testParser(str){
  const parsed = parseTime(str);
  if(typeof parsed === 'number'){
    console.log('Success');
    const d = new Date(parsed);
    return console.log(`Parsed : ${parsed} , Date : ${d},type: ${typeof parsed}`);
  }
  console.log('Failed',typeof parsed);
}
testParser('jan 1'); */
module.exports = { parseTime };