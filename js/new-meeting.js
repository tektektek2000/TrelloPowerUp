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
        var context = t.getContext();
        var api = t.getRestApi();
        api.getToken()
        .then(function(token){
            if(!token){
                console.log("No token");
            }
            else{
                console.log(api);
            }
        });
        t.closeModal();
        event.preventDefault();
    })
});