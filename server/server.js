const path = require('path');
const express = require('express');
const socketIo = require('socket.io');
const http = require('http') // built in node module, for building server (express: app.listen - use it to)

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000 ;

var app = express();
var server = http.createServer(app) // app.listen call this funtion to. //for socket.io use
var io = socketIo(server) //The server we want to use in socketIo
// io is the web socket server - the io is the way we will comunicate bitween a server and a client

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('New connection is made')

    socket.on('disconnect',()=>{
        console.log('client disconnected from server')
    })
}) // the socket event is fired when we get new connection

server.listen(port, ()=>{ // we change app to server for socket.io use
    console.log(`Server is running on port ${port}`);
})