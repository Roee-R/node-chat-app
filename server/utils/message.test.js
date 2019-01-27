var expect = require('expect')

var {generateMessage, generateLocationMessage} = require('./message')

describe('Generate message', ()=>{
    it('should generate correct message object', ()=>{
        var from = 'Roee';
        var text = "Hello World";
        var message = generateMessage(from,text );
        expect(message.from).toBe(from);
        expect(message.text).toBe(text);

        expect(typeof message.createdAt).toBe('number')
    })
})

describe('Generate location messages', ()=>{
    it('should generate correct location object',()=>{
        var latitude = 123;
        var longitude = -55;
        var coords = generateLocationMessage("admin", latitude, longitude);
        expect(coords.url).toMatch(`${latitude},${longitude}`);
        expect(typeof coords.createdAt).toBe('number')
        expect(coords.from).toBe("admin")
    })

})