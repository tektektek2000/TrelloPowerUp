var Promise = TrelloPowerUp.Promise;
const key = "2905a45608f989a24bf26e3d92edcf80"

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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
                fetch(`https://api.trello.com/1/lists?name=${listName}&idBoard=${context.board}&key=${key}&token=${token}`, {
                    method: 'POST'
                })
                .then(response => {
                    return response.text();
                })
                .then(text => {
                    const id = text.match(/"id":"([\da-z]*)"/i)[1]
                    fetch(`https://api.trello.com/1/cards?idList=${id}&name=Summary&desc=<Summary>&key=${key}&token=${token}`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json'
                    }
                    })
                    .then(response => {
                        return response.text();
                    })
                    .then(text => {
                        var cardJson = text;
                        sleep(200) //The Api is slow and i need to wait otherwise i get no card with this id error.
                        .then(() => {
                            console.log(cardJson);
                            const id = cardJson.match(/"id":"([\da-z]*)"/i)[1];
                            console.log(id);
                            t.set(id, 'shared', 'meetingCard', {
                                role: "Summary",
                                startDate: `${match[1]}/${match[2]}/${match[3]}`,
                                startHour: starthour,
                                startMinutes: parseInt(match[5]),
                                endHour: endhour,
                                endMinutes: parseInt(match[8])
                            })
                            .then(idk => {
                                t.closeModal();
                            })
                            .catch(err => {
                                console.error(err)
                                t.closeModal();
                            });
                        });
                    })
                    .catch(err => {
                        console.error(err)
                        t.closeModal();
                    });
                })
                .catch(err => console.error(err));
            }
        });
    })
});