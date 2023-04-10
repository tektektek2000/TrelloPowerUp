/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

var authenticationSuccess = function() {
    console.log('Successful authentication');
};

var authenticationFailure = function() {
    console.log('Failed authentication');
};

window.Trello.authorize({
    type: 'popup',
    name: 'Getting Started Application',
    scope: {
        read: 'true',
        write: 'true' },
    expiration: 'never',
    success: authenticationSuccess,
    error: authenticationFailure
});

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
    }
});