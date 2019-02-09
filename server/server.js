const path = require('path');
const express = require('express');
const socketIo = require('socket.io');
const http = require('http') // built in node module, for building server (express: app.listen - use it to)

const {generateMessage, generateLocationMessage} = require('./utils/message')
const {isRealString} = require('./utils/validation');
const {Users}=require('./utils/users')
const {Rooms}=require('./utils/rooms')
const publicPath = path.join(__dirname, '../public'); //conver path and add public extenion for the __dirname
const port = process.env.PORT || 3000 ;

var app = express();
var server = http.createServer(app) // app.listen call this funtion to. //for socket.io use
var io = socketIo(server) //The server we want to use in socketIo
// io is the web socket server - the io is the way we will comunicate bitween a server and a client
var rooms = new Rooms();
var users = new Users();

app.use(express.static(publicPath)); // add the public directory
    
io.on('connection',(socket)=>{ // the socket event is fired when we get new connection
    console.log('New connection is made')

    socket.on('join',(params, collback)=>{ //collback is the ecknolodgment
        
        let user = users.getUserList(params.room).filter((name)=>name.toLowerCase().trim()===params.name.toLowerCase().trim())

        if(!isRealString(params.name) || (!isRealString(params.room)&&!isRealString(params.selectedRoom))){
            return collback(`Name and room name are required: ${params.name} ${params.room}`) //err msg
        }
        else if(user.length>0){
            return collback("name is already taken",user)}
        
        
        if(rooms.getRoom(params.room).length === 0){ // add new room to Rooms
            var room = rooms.addRoom(params.room,params.name,0)
            if(room){
                io.emit('UpdateUiRoomList',rooms); // update new room in select element
                console.log('New room added',rooms.getRoom(params.room)[0].roomName)
            }
        }
        // console.log(`Rooms: ${rooms.getRooms()}`);
        rooms.updateUsers(params.room,1);
        socket.join(params.room) // Join the user to his selected room name (specific socket) from index.html
        // socket.leave(disconnect the user from the room)
        users.removeUser(socket.id); // ensure that there is no user with this id - remove from any potensial previous rooms 
        users.addUser(socket.id, params.name, params.room); //add new user to users class
        if(params.name!==rooms.getRoom(params.room)[0].admin){ // if statement for update the regular users list
            let admin = rooms.findAdmin(params.room);
            userId = users.findUserByName(admin.toString()).id
            io.to(params.room).emit('updateUserList',rooms.getRoom(params.room)[0].admin, users.getUserList(params.room)); // update the user list of the room
            socket.broadcast.to(userId).emit('updateAdminList', rooms.getRoom(params.room)[0].admin, users.getUserList(params.room));
        } 
        else{ // else statement for update the admin user list
            try{
                let admin = rooms.findAdmin(params.room);
                userId = users.findUserByName(admin.toString()).id
                socket.broadcast.to(params.room).emit('updateUserList',rooms.getRoom(params.room)[0].admin, users.getUserList(params.room)); // update the user list of the room
                socket.emit('updateAdminList',rooms.getRoom(params.room)[0].admin, users.getUserList(params.room)); // update the user list of the room
            }
            catch{
                throw new Error("Failed to find admin room")
            }
        }


        socket.emit('newMsg',
        generateMessage("admin", "Welcome to the chat app")); //msg to the user itself
        socket.broadcast.to(params.room).emit('newMsg', // the to send the message just to the socket with the name of params.room
        generateMessage("admin", `${params.name} joined`)); //msg to the rest of users execpt the one who started
        collback() // successful
    })

    socket.on('msgCreated', (msg, collback)=>{
        var user =users.getUser(socket.id);
        if(user && isRealString(msg.text)){
            io.to(user.room).emit('newMsg',generateMessage(user.name,msg.text)) // io.emit in contrast to socket.emit, this emit to every single connection in the server 
        }
        collback('Data from the server'); // the collback from the index.js acknoledgment function
    })

    socket.on('createLocationMessage', (coords)=>{
        var user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMsg',generateLocationMessage(user.name,coords.latitude, coords.longitude))
        }
    })

    socket.on('UpdatenewUserRoomList',()=>{
        if(rooms.getRooms().length>0){
            io.emit('UpdateUiRoomList',rooms); // update new room in select element
        }
    })

    socket.on('removeUser',(userId)=>{ //userId == name for chat.js
        let user = users.findUserByName(userId.trim())
        if(user){
            socket.broadcast.to(user.id).emit('redirectToIndex');
            io.sockets.connected[user.id].disconnect();
            socket.emit('updateAdminList',rooms.getRoom(user.room)[0].admin, users.getUserList(user.room)); // update the user list of the room    
        }
        else{
            console.log('Unable remove user')
        } 
    })

    socket.on('disconnect',()=>{ // the socket event is fired when we get disconnection
        console.log('client disconnected from server');
        var user = users.removeUser(socket.id);
        if(user){
            rooms.updateUsers(user.room,-1); // remove one user from room
            if(rooms.numOfUsers(user.room)===0){ // check if roo is empty
                rooms.removeRoom(user.room);
                console.log("room Removed:",JSON.stringify(rooms))
                io.emit('UpdateUiRoomList',rooms); // update new room in select element
            }
            else{
                io.to(user.room).emit('updateUserList',rooms.getRoom(user.room)[0].admin, users.getUserList(user.room))
                io.to(user.room).emit('newMsg', generateMessage('admin', `${user.name} has left.`));    
            }
        }
    })
    
}) 

server.listen(port, ()=>{ // we change app to server for socket.io use
    console.log(`Server is running on port ${port}`);
})

module.exports = {users}
