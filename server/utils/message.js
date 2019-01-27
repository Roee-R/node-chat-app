var moment = require('moment');

var generateMessage = (from, text)=>{
     return {
        from,
        text,
        createdAt : new Date().valueOf()
    }
};

var generateLocationMessage = (from, longitue, latitue)=>{
    return{
        from,
        url:`https://www.google.com/maps?q=${longitue},${latitue}`,
        createdAt : new Date().valueOf()
    }
};
module.exports = {generateMessage,generateLocationMessage}; 