var socket = io(); //because we loaded we can call it, and that 
// we initilate the request from the client to open web socket and keep the connection open
// the verible socket is critical to our communicate with the server- lissten for data from the server , and send to the sever

function scrollToBottom(){
    // selectors
    var messages = jQuery('#messages'); 
    var newMessage = messages.children('li:last-child');// Last element
    // Height
    var clientHeight = messages.prop('clientHeight') // returns the viewable height of an element in pixels, including padding, but not the border, scrollbar or margin(what he actuly see on the ui)
    var scrollTop = messages.prop('scrollTop') // returns the number of pixels an element's content is scrolled vertically(how much we scroll down from the top)
    var scrollHeight = messages.prop('scrollHeight') //  the entire height of an element in pixels, including padding, but not the border, scrollbar or margin.(the height of all messeges)
    var newMessageHeight = newMessage.innerHeight(); //Last msg height
    var lastMessageHeight = newMessage.prev().innerHeight(); // Before last msg height

    if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight){ // check if by the coluclation we need to scrol down for the user in the chat
        messages.scrollTop(scrollHeight) //scroll down 
    }
}// whether or not we should scroll the user to the bottom, depend on their position

socket.on('connect',function (){ // this fired from the client side on the consone on F12 when the client get the connection
    console.log('Connected to the server')

    socket.on('disconnect',function (){
        console.log('Disconnected from server')
    })

    socket.on('newMsg',function(msg){
        var formattedTime = moment(msg.createdAt).format('h:mm a');
        var template = jQuery('#message-template').html(); // takes the html tags of the class id
        var html = Mustache.render(template,{
            from: msg.from,
            text: msg.text,
            createdAt: formattedTime
        }); // The mustache buid template
        jQuery('#messages').append(html)
        scrollToBottom();
    })

    socket.on('newLocationMsg',function(msg){
        var formattedTime = moment(msg.createdAt).format('h:mm a');
        var template = jQuery('#location-message-template').html(); // takes the html tags of the class id
        var html = Mustache.render(template,{
            from: msg.from,
            createdAt: formattedTime,
            url: msg.url
        }); // The mustache buid template
        jQuery('#messages').append(html)
        scrollToBottom();
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
