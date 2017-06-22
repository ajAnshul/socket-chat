var moment = require('moment');

var genMessage = (from, text)=>{
  return {
    from,
    text,
    createdAt:moment().valueOf()
  }
}

var genLocationMessage= (from, latitude, longitude)=>{
  return {
    from,
    url:`https://www.google.co.in/maps?q=${latitude},${longitude}`,
    createdAt:moment().valueOf()
  }
}


module.exports = {genMessage, genLocationMessage}
