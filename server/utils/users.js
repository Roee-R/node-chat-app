// JS ES6 CLASS SYNTAX

class Users {
    constructor(){
        this.users=[];
    }
    addUser(id,name,room){
        var user={id,name,room};
        this.users.push(user);
        return user;
    }
    removeUser(id){
        //return user that removes
        var user=this.getUser(id);
        if(user){
            this.users = this.users.filter((user)=>user.id!==id);}
        return user;
    }
    getUser(id){
        // get user by id
        return this.users.filter((user)=>user.id===id)[0]
    }
    getUserList(room){
        //get all the users inside the room
        var usersInRoom = this.users.filter((user)=>user.room===room);
        var usersNameArray = usersInRoom.map((user)=>user.name) // return all the names of a user
    
        return usersNameArray
    }
    getAllUsers(){
        return this.users.map((user)=>user.name)
    }
    findUserByName(name){
        return this.users.filter((user)=>user.name.trim()===name)[0];
    }
}

module.exports = {Users}