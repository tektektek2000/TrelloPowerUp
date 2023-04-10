var Promise = TrelloPowerUp.Promise;
const fetch = require('node-fetch');

$(document).ready(function(){
    $('#meetingstart').datetimepicker({
        format: 'YYYY-MM-DD hh:mm a'
    });
    $('#meetingend').datetimepicker({
        format: 'hh:mm a'
    });
    $('#meetingForm').submit(function(event){
        var t = window.TrelloPowerUp.iframe({
            appKey: '2905a45608f989a24bf26e3d92edcf80',
            appName: 'Test'
        });
        var context = t.getContext();
        var newList = {
            name: 'Test',
            desc: 'This is the description of our new card.',
            // Place this card at the top of our list
            idList: myList,
            pos: 'top'
        };
        t.getRestApi()
        .getToken()
        .then(function(token) {
            if (!token) {
                console.log("No token")
            }
            else{
                console.log(token);
            }
        });
        t.closeModal();
        event.preventDefault();
    })
});