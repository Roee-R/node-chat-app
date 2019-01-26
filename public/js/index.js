var socket = io(); //because we loaded we can call it, and that 
// we initilate the request from the client to open web socket and keep the connection open
// the verible socket is critical to our communicate with the server- lissten for data from the server , and send to the sever

socket.on('connect',function (){ // this fired from the client side on the consone on F12 when the client get the connection
    console.log('Connected to the server')

    socket.on('newMsg',(msg)=>{
        console.log('User get new msg', msg)
    })

    
    socket.on('disconnect',function (){
        console.log('Disconnected from server')
    })


})
