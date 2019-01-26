var expect = require('expect')

var {generateMessage} = require('./message')

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