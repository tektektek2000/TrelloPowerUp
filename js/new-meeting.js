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
        event.preventDefault();   
        var context = t.getContext();
        var listName =  $("#meetingstart")[0].value  + "-" + $("#meetingend")[0].value ;
        const regex = /(\d\d\d\d)-(\d\d)-(\d\d) (\d\d):(\d\d) ([ap]m)-(\d\d):(\d\d) ([ap]m)/i;
        const match = listName.match(regex);
        var starthour = match[4] === "12" ? (match[6] === "am" ? 0 : 12) : (match[6] === "am" ? parseInt(match[4]) : parseInt(match[4]) + 12);
        var endhour = match[7] === "12" ? (match[9] === "am" ? 0 : 12) : (match[9] === "am" ? parseInt(match[7]) : parseInt(match[7]) + 12);
        listName = $("#meetingName")[0].value + " " + `${match[1]}/${match[2]}/${match[3]} ${starthour}:${match[5]}-${endhour}:${match[8]}`;
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
                })
                .catch(err => console.error(err));
            }
        });
    })
});