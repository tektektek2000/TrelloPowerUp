/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

var BLACK_ROCKET_ICON = 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421';

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