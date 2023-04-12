import * as api from "./api.js"

var Promise = TrelloPowerUp.Promise;
const key = "2905a45608f989a24bf26e3d92edcf80"

function inputChanged(e) {
    var t = window.TrelloPowerUp.iframe({
        appKey: '2905a45608f989a24bf26e3d92edcf80',
        appName: 'Test'
    });
    t.set('card', 'shared', 'meetingCard', {
        role: "Topic",
        hours: parseInt($('#topichours')[0].value),
        minutes: parseInt($('#topicminutes')[0].value),
    })
}

$(document).ready(function(){
    $('#topichours')[0].addEventListener("input", inputChanged);
    $('#topicminutes')[0].addEventListener("input", inputChanged);
});