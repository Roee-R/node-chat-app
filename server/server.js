const path = require('path');
const express = require('express');
const socketIo = require('socket.io');
const http = require('http') // built in node module, for building server (express: app.listen - use it to)

const {generateMessage} = require('./utils/message')
const publicPath = path.join(__dirname, '../public'); //conver path and add public extenion for the __dirname
const port = process.env.PORT || 3000 ;

var app = express();
var server = http.createServer(app) // app.listen call this funtion to. //for socket.io use
var io = socketIo(server) //The server we want to use in socketIo
// io is the web socket server - the io is the way we will comunicate bitween a server and a client

app.use(express.static(publicPath)); // add the public directory

io.on('connection',(socket)=>{ // the socket event is fired when we get new connection
    console.log('New connection is made')

    socket.emit('newUser',
    generateMessage("admin", "Welcome to the chat app")); //msg to the user itself

    socket.broadcast.emit('newUserIn',
    generateMessage("admin", "New user joined")); //msg to the rest of users

    socket.on('msgCreated', (msg, collback)=>{
        console.log(`New msg created:`, msg)
        io.emit('newMsg',generateMessage(msg.from,msg.text)) // io.emit in contrast to socket.emit, this emit to every single connection in the server 
        collback('Data from the server'); // the collback from the index.js acknoledgment
       
        socket.on('createLocationMessage', (coords)=>{
            io.emit('newMsg',generateMessage('admin',`${coords.latitude}, ${coords.lotitude}`))
        })
    })


    socket.on('disconnect',()=>{ // the socket event is fired when we get disconnection
        console.log('client disconnected from server')
    })

 
    
}) 

server.listen(port, ()=>{ // we change app to server for socket.io use
    console.log(`Server is running on port ${port}`);
})