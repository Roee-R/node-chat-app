var socket = io(); //because we loaded we can call it, and that 
// we initilate the request from the client to open web socket and keep the connection open
// the verible socket is critical to our communicate with the server- lissten for data from the server , and send to the sever

socket.on('connect',function (){ // this fired from the client side on the consone on F12 when the client get the connection
    console.log('Connected to the server')

    socket.on('disconnect',function (){
        console.log('Disconnected from server')
    })

    socket.on('newMsg',function(msg){
        var formattedTime = moment(msg.createdAt).format('h:mm a');
        console.log('User get new msg', msg)
        var li = jQuery('<li></li>');
        li.text(`${msg.from} ${formattedTime}: ${msg.text}`)
        jQuery('#messages').append(li) // append after the last child of #message to the li array
    })

    socket.on('newLocationMsg',function(msg){
        var formattedTime = moment(msg.createdAt).format('h:mm a');

        console.log('User get new msg', msg)
        var li = jQuery('<li></li>');
        var a = jQuery('<a target="_blank">My current location</a>')

        li.text(`${msg.from} ${formattedTime} `);
        a.attr('href', msg.url);
        li.append(a);
        jQuery('#messages').append(li) // append after the last child of #message to the li array
    })

    // socket.emit('msgCreated',{ // automatacly emit msg
    //     from: "Robert",
    //     text: "Hello guys"
    // },function (data) { // the successful acknoledgment to the sever
    //     console.log('Got it! '+data)
    // })

    jQuery('#message-form').on('submit', function(e){ // jquery form by id 
        var messageTextBox = jQuery('[name=message]');                                                              
        var msg = messageTextBox.val();// get the input text of the user from UI
        e.preventDefault(); // to prevent page refresh
        socket.emit('msgCreated', {
            from: 'User',
            text: msg 
        }, function(){
            messageTextBox.val('')
        })
    })

    var locationB = jQuery('#getLocation');
    locationB.on('click', function(){
        if(!navigator.geolocation){
            return alert('Geolocaton do not support your browser')
        }
        locationB.attr('disabled', 'disabled').text('Sending location');
        navigator.geolocation.getCurrentPosition(function(position){
            locationB.removeAttr('disabled').text('Send location');
            socket.emit('createLocationMessage',{
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        }, function(){
            locationB.removeAttr('disabled').text('Send location');
            alert('Unable to fetch your locaton')
        })
    })

})
