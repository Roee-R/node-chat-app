export function generateUserList(admin,users) {
    var ol = jQuery('<ol></ol>');

    users.forEach(function(user){ // set the admin tab to yellow background
        let li=jQuery('<li></li>').text(user);
        if(admin===user){
            li.css("background-color", "#F5F5DC");
        }
        ol.append(li);
    })
    jQuery('#users').html(ol);
}

export function generateAdminList(admin,users) {
    var ol = jQuery('<ol></ol>');

    users.forEach(function(user){ // set the admin tab to yellow background
        let li=jQuery('<li></li>').text(user);
        if(admin===user){
            li.css("background-color", "#F5F5DC");
            ol.append(li);
        }
        else{
            var button = $(`<button id="${user}" class="remove" style="float: right; margin-right:10px;height:40px;background-color: darkcyan;">X</button>`);
            ol.append(button).append(li); //add button- remove user from room 
        }

    })
    jQuery('#users').html(ol);
}

