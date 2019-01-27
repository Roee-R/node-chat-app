var socket = io(); //because we loaded we can call it, and that 
// we initilate the request from the client to open web socket and keep the connection open
// the verible socket is critical to our communicate with the server- lissten for data from the server , and send to the sever

socket.on('connect',function (){ // this fired from the client side on the consone on F12 when the client get the connection
    console.log('Connected to the server')

    socket.on('disconnect',function (){
        console.log('Disconnected from server')
    })

    socket.on('newUser',function(msg){ // msg just to the user that have connected
        console.log(msg);
        var li = jQuery('<li></li>');
        li.text(`${msg}`)
        jQuery('#message').append(li)
    })

    socket.on('newUserIn', function(msg){ //msg to all users expect the one who connect
        console.log(msg);
        var li = jQuery('<li></li>');
        li.text(`${msg}`)
        jQuery('#message').append(li)
    })

    socket.on('newMsg',function(msg){
        console.log('User get new msg', msg)
        var li = jQuery('<li></li>');
        li.text(`${msg.from}: ${msg.text}`)
        jQuery('#message').append(li) // append after the last child of #message to the li array
    })

    // socket.emit('msgCreated',{ // automatacly emit msg
    //     from: "Robert",
    //     text: "Hello guys"
    // },function (data) { // the successful acknoledgment to the sever
    //     console.log('Got it! '+data)
    // })

    jQuery('#message-form').on('submit', function(e){ // jquery form by id 
        e.preventDefault(); // to prevent page refresh

        socket.emit('msgCreated', {
            from: 'User',
            text: jQuery('[name=message]').val() // get the input text of the user from UI
        }, function(){

        })
    })


})
