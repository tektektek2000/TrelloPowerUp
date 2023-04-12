function ToTwoDigit(num) {
    return num < 10 ? `0${num}` : num;
}

function startEventHandler(e){
    var match = e.srcElement.value.match(/(\d\d):(\d\d)/i)
    savedCardRole.startHour = parseInt(match[1]);
    savedCardRole.startMinutes = parseInt(match[2]);
    refreshCardRole();
}

function endEventHandler(e){
    var match = e.srcElement.value.match(/(\d\d):(\d\d)/i)
    savedCardRole.endHour = parseInt(match[1]);
    savedCardRole.endMinutes = parseInt(match[2]);
    refreshCardRole();
}

function refreshCardRole(){
    console.log(savedCardRole);
    t.set('card', 'shared', 'meetingCard', savedCardRole);
}

var savedCardRole;

$(document).ready(function(){  
    $('#meetingstart')[0].addEventListener("change", startEventHandler);
    $('#meetingend')[0].addEventListener("change", startEventHandler);
    var t = window.TrelloPowerUp.iframe({
        appKey: '2905a45608f989a24bf26e3d92edcf80',
        appName: 'Test'
    });
    t.get('card', 'shared', 'meetingCard')
    .then(cardRole => {
        if (cardRole && cardRole.role === "Summary") {
            savedCardRole = cardRole;
            console.log(cardRole);
            $('#meetingstart')[0].value=`${cardRole.startHour}:${cardRole.startMinutes}`;
            $('#meetingend')[0].value=`${cardRole.endHour}:${cardRole.endMinutes}`;
        }
    })
});