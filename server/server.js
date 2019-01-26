const path = require('path');
const express = require('express');
const socketIo = require('socket.io');
const http = require('http') // built in node module, for building server (express: app.listen - use it to)

const publicPath = path.join(__dirname, '../public'); //conver path and add public extenion for the __dirname
const port = process.env.PORT || 3000 ;

var app = express();
var server = http.createServer(app) // app.listen call this funtion to. //for socket.io use
var io = socketIo(server) //The server we want to use in socketIo
// io is the web socket server - the io is the way we will comunicate bitween a server and a client

app.use(express.static(publicPath)); // add the public directory

io.on('connection',(socket)=>{ // the socket event is fired when we get new connection
    console.log('New connection is made')

    socket.emit('newUser', {
        from: "admin",
        text: "Welcome to the chat app",
        createdAt: new Date().getTime()
    }); //msg to the user itself

    socket.broadcast.emit('newUserIn', {
        from: "admin",
        text: "New user joined",
        createdAt: new Date().getTime()
    }); //msg o the rest of users

    socket.on('msgCreated', (msg)=>{
        console.log(`New msg created:`, msg)
        io.emit('newMsg', { 
            from: msg.from,
            text: msg.text,
            createdAt: new Date().getTime()
        }) // io.emit in contrast to socket.emit, this emit to every single connection in the server 
    
        // socket.broadcast.emit('newMsg', { // Broadcasting means sending a message to everyone else except for the socket that starts it.
        //     from: msg.from,
        //     text: msg.text,
        //     createdAt: new Date().getTime()
        // })
    })


    socket.on('disconnect',()=>{ // the socket event is fired when we get disconnection
        console.log('client disconnected from server')
    })

 
    
}) 

server.listen(port, ()=>{ // we change app to server for socket.io use
    console.log(`Server is running on port ${port}`);
})