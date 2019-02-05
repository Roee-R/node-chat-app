var socket = io();

socket.on('connect', function(){
    socket.emit('UpdatenewUserRoomList');
})

socket.on('UpdateUiRoomList',(myRooms)=>{
    $( "select" ).remove();
    $( "label#rooms" ).remove();
    if(myRooms.rooms.length>0){
        let select = $('<select name="selectedRoom"></select>');
        select.append($('<option selected value>none</option>'));
        myRooms.rooms.forEach(function(room){
            select.append($('<option></option>').text(room.roomName));
        })
        let labal = $('<label id="rooms" for="">Available Rooms</label>');
        $('#rooms').append(labal).append(select);    
    }
})






