var Promise = TrelloPowerUp.Promise;

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
        t.closeModal();
        event.preventDefault();
    })
});