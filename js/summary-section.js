function eventHandler(date, oldDate){
    console.log("Something");
}

$(document).ready(function(){  
    var t = window.TrelloPowerUp.iframe({
        appKey: '2905a45608f989a24bf26e3d92edcf80',
        appName: 'Test'
    });
    t.get('card', 'shared', 'meetingCard')
    .then(cardRole => {
        if (cardRole && cardRole.role === "Summary") {
            console.log(cardRole);
            $('#meetingstart').datetimepicker({
                format: 'HH:mm',
                date: new Date(2016, 9 , 17, cardRole.startHour, cardRole.startMinutes)
            }).on('dp.change',eventHandler);
            $('#meetingend').datetimepicker({
                format: 'HH:mm',
                date: new Date(2016, 9 , 17, cardRole.endHour, cardRole.endMinutes)
            }).on('dp.change',eventHandler);;
        }
    })
});