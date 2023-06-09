function addList(listName, boardID, apiKey, token){
    return fetch(`https://api.trello.com/1/lists?name=${listName}&idBoard=${boardID}&key=${apiKey}&token=${token}`, {
        method: 'POST'
    })
}

function addCard(cardName, cardDesc, listID, apiKey, token){
    return fetch(`https://api.trello.com/1/cards?idList=${listID}&name=${cardName}&desc=${cardDesc}&key=${apiKey}&token=${token}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        }
    })
}

function getCardsFromList(listID, apiKey, token){
    return fetch(`https://api.trello.com/1/lists/${listID}/cards?key=${apiKey}&token=${token}`, {
        method: 'GET',
        headers: {
        'Accept': 'application/json'
        }
    })
    .then(response => {
        return response.text();
    })
    .then(text => {
        var cards = JSON.parse(text);
        return cards;
    });
}

export {addList,addCard,getCardsFromList}