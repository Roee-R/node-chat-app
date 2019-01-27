var generateMessage = (from, text)=>{
    return {
        from,
        text,
        createdAt : new Date().getTime()
    }
};

var generateLocationMessage = (from, longitue, latitue)=>{
    return{
        from,
        url:`https://www.google.com/maps?q=${longitue},${latitue}`,
        createdAt: new Date().getTime()
    }
};
module.exports = {generateMessage,generateLocationMessage}; 