const expect = require('expect');

const {isRealString} = require('./validation');

describe('Is real string', ()=>{
    it('should reject non-string values', ()=>{
        expect(isRealString(1232)).toBe(false);
    })
    it('should reject string with only spaces', ()=>{
        expect(isRealString('  ')).toBe(false);
    })
    it('should allow stirng with non-space characters', ()=>{
        expect(isRealString('  hEllo World  ')).toBe(true);
    })
})