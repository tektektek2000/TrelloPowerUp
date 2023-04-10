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
        var listName = "test";
        t.getRestApi()
        .getToken()
        .then(function(token) {
            if (!token) {
                console.log("No token")
            }
            else{
                fetch(`https://api.trello.com/1/lists?name=${listName}&idBoard=${context.board}&key=2905a45608f989a24bf26e3d92edcf80&token=${token}`, {
                method: 'POST'
                })
                .then(response => {
                    console.log(
                    `Response: ${response.status} ${response.statusText}`
                    );
                    return response.text();
                })
                .then(text => {
                    console.log(text);
                    t.closeModal();
                    event.preventDefault();   
                })
                .catch(err => console.error(err));
            }
        });
    })
});