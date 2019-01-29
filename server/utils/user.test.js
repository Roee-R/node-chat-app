const expect = require('expect');

var {Users} = require('./users');


describe('User', ()=>{
    var users;
    beforeEach(()=>{
        users = new Users();
        users.users=[
            {
                id:'fghrthr334523',
                name:'Dani',
                room: 'Chess'
            },
            {
                id:'asdqwe213eqwd',
                name:'Yosi',
                room: 'Spiderman-XBOX_ONE'
            },
            {
                id:'zxcvfb23234',
                name:'Lee',
                room: 'FIFA_19-XBOX_ONE'
            },
            {
                id:'ascxvctrntn',
                name:'Nira',
                room: 'FIFA_19-XBOX_ONE'
            }
        ]
    })

    it('should add new user', ()=>{

        var users = new Users(); 
        var user = {
            id:'asdqwe213eqwd',
            name:'Misha',
            room: 'Chess'
        }
        var resUser = users.addUser(user.id,user.name,user.room);
        expect(users.users).toEqual([user]);
        expect(typeof users.users).toBe('object');
        expect(users.users[0]).toEqual(expect.objectContaining(user));
    })

    it('should remove a user', ()=>{
        var userId = 'fghrthr334523';
        var user = users.removeUser(userId)
        expect(user.id).toEqual(userId)
        expect(users.users.length).toBe(3);
    })
    it('should not remove a user', ()=>{
        var userId = '111';
        var user = users.removeUser(userId)

        expect(user).toEqual(undefined)
        expect(users.users.length).toBe(4);
    })

    it('should return a user', ()=>{
        var userId = 'fghrthr334523';
        var user = users.getUser(userId)

        expect(user.id).toEqual(userId)
    })

    it('should not return a user', ()=>{
        expect(users.getUser('1111')).toBeFalsy()
    })

    it('should return names for node course', ()=>{
        expect(users.getUserList('FIFA_19-XBOX_ONE').length).toBe(2)
    })

})

