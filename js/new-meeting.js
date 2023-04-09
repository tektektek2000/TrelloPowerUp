var Promise = TrelloPowerUp.Promise;

$(document).ready(function(){
    $('#meetingstart').datetimepicker({
        format: 'YYYY-MM-DD hh:mm a'
    });
    $('#meetingend').datetimepicker({
        format: 'hh:mm a'
    });
    $('#meetingForm').submit(function(event){
        console.log(window.TrelloPowerUp);
        var t = window.TrelloPowerUp.iframe();
        console.log(t);
        t.closeModal();
        event.preventDefault();
    })
});