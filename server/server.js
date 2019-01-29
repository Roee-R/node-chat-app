const path = require('path');
const express = require('express');
const socketIo = require('socket.io');
const http = require('http') // built in node module, for building server (express: app.listen - use it to)

const {generateMessage, generateLocationMessage} = require('./utils/message')
const {isRealString} = require('./utils/validation');
const {Users}=require('./utils/users')
const publicPath = path.join(__dirname, '../public'); //conver path and add public extenion for the __dirname
const port = process.env.PORT || 3000 ;

var app = express();
var server = http.createServer(app) // app.listen call this funtion to. //for socket.io use
var io = socketIo(server) //The server we want to use in socketIo
// io is the web socket server - the io is the way we will comunicate bitween a server and a client

var users = new Users();
app.use(express.static(publicPath)); // add the public directory

io.on('connection',(socket)=>{ // the socket event is fired when we get new connection
    console.log('New connection is made')


    socket.on('join',(params, collback)=>{ //collback is the ecknolodgment
        if(!isRealString(params.name) || !isRealString(params.room)){
            return collback('Name and room name are required')
        }
        socket.join(params.room) // Join the user to his selected room name (specific socket) from index.html
        // socket.leave(disconnect the user from the room)
        users.removeUser(socket.id); // ensure that there is no user with this id - remove from any potensial previous rooms 
        users.addUser(socket.id, params.name, params.room); //add new user to users class
        io.to(params.room).emit('updateUserList', users.getUserList(params.room)); // update the user list of the room
        socket.emit('newMsg',
        generateMessage("admin", "Welcome to the chat app")); //msg to the user itself
    
        socket.broadcast.to(params.room).emit('newMsg', // the to send the message just to the socket with the name of params.room
        generateMessage("admin", `${params.name} joined`)); //msg to the rest of users execpt the one who started
    
        collback() // successful
    })

    socket.on('msgCreated', (msg, collback)=>{
        console.log(`New msg created:`, msg)
        io.emit('newMsg',generateMessage(msg.from,msg.text)) // io.emit in contrast to socket.emit, this emit to every single connection in the server 
        collback('Data from the server'); // the collback from the index.js acknoledgment
    })

    socket.on('createLocationMessage', (coords)=>{
        console.log("new coords",`${coords.latitude}, ${coords.longitude}`)
        io.emit('newLocationMsg',generateLocationMessage('admin',coords.latitude, coords.longitude))
    })

    socket.on('disconnect',()=>{ // the socket event is fired when we get disconnection
        console.log('client disconnected from server');
        var user = users.removeUser(socket.id);
        if(user){
            console.log("user", user)
            io.to(user.room).emit('updateUserList', users.getUserList(user.room))
            io.to(user.room).emit('newMsg', generateMessage('admin', `${user.name} has left.`));
        }
    })

 
    
}) 

server.listen(port, ()=>{ // we change app to server for socket.io use
    console.log(`Server is running on port ${port}`);
})