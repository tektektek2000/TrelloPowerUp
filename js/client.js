/* global TrelloPowerUp */
var Promise = TrelloPowerUp.Promise;

function showIframe(t) {
    return t.popup({
      title: 'Authorize to continue',
      url: './views/authorize.html'
    });
  }
  
  function showNewMenu(t) {
    return t.modal({
        title: 'New Meeting',
        url: t.signUrl('./views/new-meeting.html'),
        fullscreen: false
    });
  }

TrelloPowerUp.initialize({
    // Start adding handlers for your capabilities here!
    "card-badges": function (t, opts) {
        let cardAttachments = opts.attachments; // Trello passes you the attachments on the card
        console.log(cardAttachments);
        return t
            .card("all")
            .then(function (card) {
                let cardRole = t.get(card.id, 'shared', 'meetingCard');
                if(cardRole && cardRole.role === "summary"){
                    return [
                        {
                            text: "Summary",
                            color: "grey"
                        },
                    ];
                }
                return [];
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