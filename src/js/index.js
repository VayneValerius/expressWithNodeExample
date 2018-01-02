import {getCards, deleteCard, createCard} from "./api/cardapi.js"
let cardIDCount = 1;

function deleteCardFromTableAndDB(event) {
    const element = event.target;
    event.preventDefault();
    deleteCard(element.attributes["data-id"].value);
    const row = element.parentNode.parentNode;
    row
        .parentNode
        .removeChild(row);
}


function loadCardsToScreen(cardList) {
    
    let cardsBody = "";
    cardList.forEach((card) => {
        cardsBody += createTableDataFromCard(card);
        cardIDCount++;
    });
    document
        .getElementById("cardDetails")
        .innerHTML = cardsBody;
    applyDeleteEvents();
}


function applyDeleteEvents() {
    
    const deleteLinks = document.getElementsByClassName("deleteCard");
    Array.from(deleteLinks, (link) => {
        link.onclick = deleteCardFromTableAndDB;
    });
}


function createTableDataFromCard({id, name, level, attribute, type}) {
    return `
    <tr>
        <td> <a href = "#" data-id="${id}" class="deleteCard"> X </a> </td>
        <td>${id}</td>
        <td>${name}</td>
        <td>${level}</td>
        <td>${attribute}</td>
        <td>${type}</td>
    </tr>`;
}


function createAndAppendCard() {
    const cardInput = getCardFromInputs();
    clearInputs();
    if (isValidCard(cardInput)) {
        Promise
            .resolve(createCard(cardInput))
            .then((newCard) => {
                document
                    .getElementById("cardDetails")
                    .innerHTML += createTableDataFromCard(newCard);
                applyDeleteEvents();
            });
    }
}

function isValidCard(card) {
    alert(JSON.stringify(card));
    return card.name && card.level && card.attribute && card.type;
}

function clearInputs() {
    document
        .getElementById("cardName")
        .value = "";
    document
        .getElementById("cardLevel")
        .value = "";
    document
        .getElementById("cardAttribute")
        .value = "";
    document
        .getElementById("cardType")
        .value = "";
}

function getCardFromInputs() {
    return {
        id: cardIDCount++,
        name: document
            .getElementById("cardName")
            .value,
        level: document
            .getElementById("cardLevel")
            .value,
        attribute: document
            .getElementById("cardAttribute")
            .value,
        type: document
            .getElementById("cardType")
            .value
    }
}


window.createAndAppendCard = createAndAppendCard;


window.onload = function () {
    
    const cardList = getCards().then(loadCardsToScreen);
}