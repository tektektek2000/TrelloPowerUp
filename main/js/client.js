/* global TrelloPowerUp */
var Promise = TrelloPowerUp.Promise;

function ToTwoDigit(num){
    return num < 10 ? `0${num}` : num;
}

function showIframe(t) {
    return t.popup({
      title: 'Authorize to continue',
      url: 'views/authorize.html'
    });
  }
  
  function showNewMenu(t) {
    return t.modal({
        title: 'New Meeting',
        url: t.signUrl('views/new-meeting.html'),
        fullscreen: false
    });
  }

TrelloPowerUp.initialize({
    // Start adding handlers for your capabilities here!
    "card-badges": function (t, opts) {
        return t
            .card("all")
            .then(function (card) {
                return t.get(card.id, 'shared', 'meetingCard')
                .then( cardRole => {
                    if(cardRole && cardRole.role === "Summary"){
                        var durationHours = cardRole.startHour < cardRole.endHour ? cardRole.endHour - cardRole.startHour : 24 - cardRole.startHour + cardRole.endHour;
                        var durationMinutes = cardRole.endMinutes - cardRole.startMinutes;
                        if(durationMinutes < 0){
                            durationHours--;
                            durationMinutes += 60;
                        }
                        console.log(cardRole);
                        return [
                            {
                                text: `🕒 ${ToTwoDigit(cardRole.startHour)}:${ToTwoDigit(cardRole.startMinutes)}-${ToTwoDigit(cardRole.endHour)}:${ToTwoDigit(cardRole.endMinutes)}`,
                                color: "light-gray"
                            },
                            {
                                text: `Length: ${durationHours} h ${durationMinutes} m`,
                                color: "light-gray"
                            }
                        ];
                    }
                    return [];
                });
            });
    },
    'board-buttons': function (t, opts) {
        return t.getRestApi()
    	// We now have an instance of the API client.
        .isAuthorized()
        .then(function(isAuthorized) {
            if (isAuthorized) {
                return [{
                // we can either provide a button that has a callback function
                text: 'New Meeting',
                condition: "edit",
                callback: showNewMenu
            }];
        } else {
            return [{
                text: 'New Meeting',
                condition: "edit",
                callback: showIframe
            }];
        }
        })
    }
},{
    appKey: '2905a45608f989a24bf26e3d92edcf80',
    appName: 'Test'
});