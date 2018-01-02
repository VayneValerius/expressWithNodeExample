const baseUrl = "http://localhost:3000/api/";

let onSuccess = (response) => {
    return response.json();
};
let onError = (error) => {
    console.log(error);
};

function get(url) {
    return fetch(baseUrl + url).then(onSuccess, onError);
}   
function del(url) {
    const request = new Request(baseUrl + url, {
        method: "DELETE"
    });
    return fetch(request).then(onSuccess, onError);
}
function create(card, url) {
    const request = new Request(baseUrl + url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(card)
    });
    return fetch(request).then(onSuccess, onError);
}

export function createCard(card) {
    return create(card, "cardlist");
}
export function getCards() {
    return get("cardlist");
}
export function deleteCard(id) {
    return del(`cardlist/${id}`);
}