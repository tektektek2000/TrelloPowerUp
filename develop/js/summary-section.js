function startEventHandler(e){
    savedCardRole.startHour = e.date._d.getHours();
    savedCardRole.startMinutes = e.date._d.getMinutes();
    refreshCardRole();
}

function endEventHandler(e){
    savedCardRole.endHour = e.date._d.getHours();
    savedCardRole.endMinutes = e.date._d.getMinutes();
    refreshCardRole();
}

function refreshCardRole(){
    console.log(savedCardRole);
    t.set('card', 'shared', 'meetingCard', savedCardRole);
}

var savedCardRole;
var t = window.TrelloPowerUp.iframe({
    appKey: '2905a45608f989a24bf26e3d92edcf80',
    appName: 'Test'
});

$(document).ready(function(){  
    t.get('card', 'shared', 'meetingCard')
    .then(cardRole => {
        if (cardRole && cardRole.role === "Summary") {
            savedCardRole = cardRole;
            console.log(cardRole);
            $('#meetingstart').datetimepicker({
                format: 'HH:mm',
                date: new Date(2016, 9 , 17, cardRole.startHour, cardRole.startMinutes)
            }).on('dp.change',startEventHandler);
            $('#meetingend').datetimepicker({
                format: 'HH:mm',
                date: new Date(2016, 9 , 17, cardRole.endHour, cardRole.endMinutes)
            }).on('dp.change',endEventHandler);;
        }
    })
});