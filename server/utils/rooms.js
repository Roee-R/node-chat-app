// add room
// remove room
// getRooms
// getRoom

class Rooms{
    constructor(){
        this.rooms = [];
    }

    addRoom(roomName, admin, users){
        var room = new Room(roomName, admin,users);
        if(this.getRoom(room.roomName).length===0){
            this.rooms.push(room);
        }
        return room
    }
    removeRoom(roomName){
        var foundRoom = this.getRoom(roomName)[0];
        if(foundRoom){
            this.rooms = this.rooms.filter((room)=>room.roomName!==foundRoom.roomName)
        }
        return foundRoom
    }
    getRoom(roomName){
        return this.rooms.filter((room)=>room.roomName===roomName);
    }
    getRooms(){
        return this.rooms.map((room)=>room.roomName);
    }
    updateUsers(roomName,updateNum){
        var room = this.rooms.filter((room)=>room.roomName===roomName);
        if(room.length===1){
            room[0].users+=updateNum;}
    }
    numOfUsers(roomName){
        var room = this.rooms.filter((room)=>room.roomName===roomName);
        if(room.length===1){
            return room[0].users
        }
    }
    findAdmin(roomName){
        let room= this.rooms.filter((room)=>room.roomName===roomName);
        return room[0].admin
    }

}

class Room{
    constructor(roomName,admin,users){
        this.roomName =roomName;
        this.admin=admin;
        this.users=users;
    }

}

module.exports = {Rooms,Room}