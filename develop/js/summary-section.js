function ToTwoDigit(num) {
    return num < 10 ? `0${num}` : num;
}

$(document).ready(function(){
    $('#meetingstart').datetimepicker({
        format: 'hh:mm'
    });
    $('#meetingend').datetimepicker({
        format: 'hh:mm'
    });
    var t = window.TrelloPowerUp.iframe({
        appKey: '2905a45608f989a24bf26e3d92edcf80',
        appName: 'Test'
    });
    $("#meetingstart")[0].value = `23:00`
    console.log(t.getContext());
    t.get(t.getContext().card.id, 'shared', 'meetingCard')
    .then(cardRole => {
        if (cardRole && cardRole.role === "Summary") {
            console.log(cardRole);
            $("#meetingstart")[0].value = `${ToTwoDigit(cardRole.startHour)}:${ToTwoDigit(cardRole.startMinutes)}`
            $("#meetingend")[0].value = `${ToTwoDigit(cardRole.endHour)}:${ToTwoDigit(cardRole.endMinutes)}`
        }
    })
});