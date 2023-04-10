/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

var authenticationSuccess = function() {
    console.log('Successful authentication');
};

var authenticationFailure = function() {
    console.log('Failed authentication');
};

TrelloPowerUp.initialize({
    // Start adding handlers for your capabilities here!
    "card-badges": function (t, opts) {
        let cardAttachments = opts.attachments; // Trello passes you the attachments on the card
        console.log(cardAttachments);
        return t
            .card("all")
            .then(function (card) {
                console.log(card);
                return [
                    {
                        text: "Static",
                        color: "green"
                    },
                ];
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
                callback: (tc) => {
                    return tc.modal({
                        title: 'New Meeting',
                        url: tc.signUrl('./views/new-meeting.html'),
                        fullscreen: false
                    });
                },
                condition: 'edit'
            }];
        } else {
            return [{
            text: 'Authorize Test',
            //callback: showIframe
            }];
        }
        })
    }
},{
    appKey: '2905a45608f989a24bf26e3d92edcf80',
    appName: 'Test'
});