var Promise = TrelloPowerUp.Promise;

$(document).ready(function(){
    $('#meetingstart').datetimepicker({
        format: 'YYYY-MM-DD hh:mm a'
    });
    $('#meetingend').datetimepicker({
        format: 'hh:mm a'
    });
    $('#meetingForm').submit(function(event){
        var t = window.TrelloPowerUp.iframe();
        t.closeModal();
        event.preventDefault();
    })
});