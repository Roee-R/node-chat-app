const expect = require('expect');

var {Rooms,Room} = require('./rooms');

describe('Rooms', ()=>{
    let testRooms;
    beforeEach(()=>{
        testRooms = new Rooms();
        let room1 = new Room("Fifa 19", "Roee", 2);
        let room2 = new Room("Trips", "Yosi", 9);
        let room3 = new Room("Information System studys", "Haim", 33);
        let room4 = new Room("Football", "Dana", 44);
        testRooms.rooms = [room1,room2,room3,room4]
    })

    it('should get room from list',()=>{
        let room=testRooms.getRoom("Football");
        expect(room).toEqual([testRooms.rooms[3]]);
    })

    it('should get rooms from list',()=>{
        let rooms=testRooms.getRooms();
        expect(rooms.length).toBe(4);
        expect(rooms).toEqual(testRooms.rooms.map((rooms)=>rooms.roomName));
    })

    it('should add new room',()=>{
        let room = new Room("Tennis", "lior", 51);
        testRooms.addRoom(room.roomName,room.admin,room.users);
        expect(testRooms.rooms.length).toBe(5);
        expect(testRooms.rooms).toEqual(expect.arrayContaining([room]));
    })
    it('should not add new room',()=>{
        let room = new Room("Football", "Esty", 44);
        testRooms.addRoom(room.roomName,room.admin,room.users);
        expect(testRooms.rooms.length).toBe(4);
        expect(testRooms.rooms).not.toEqual(expect.arrayContaining([room]));
    })
    it('should remove a room',()=>{
        let room = new Room("Football", "Dana", 44);
        testRooms.removeRoom(room.roomName);
        expect(testRooms.rooms.length).toBe(3);
        expect(testRooms.rooms).not.toEqual(expect.arrayContaining([room]));
    })
    it('should update users in room',()=>{
        testRooms.updateUsers("Football",1);
        let footballUser = testRooms.rooms.find((room)=>room.roomName==="Football")
        expect(footballUser.users).toBe(testRooms.numOfUsers("Football"));
        testRooms.updateUsers("Football",-1);
        let footballUser1 = testRooms.rooms.find((room)=>room.roomName==="Football")
        expect(footballUser1.users).toBe(44);
    })
    it('should find admin',()=>{
        admin = testRooms.findAdmin('Trips')
        expect(admin).toBe('Yosi');
    })
})

