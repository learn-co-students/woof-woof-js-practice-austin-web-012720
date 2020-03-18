const DOGS_URL = "http://localhost:3000/pups";

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Loaded");
    const dogsDiv = document.getElementById('dog-bar');
    // console.log(dogsDiv);
    fetchDogs(DOGS_URL);
});

function fetchDogs(url) {
    fetch(url)
    .then(resp => resp.json())
    .then(json => dogsHTML(json));
}

function dogsHTML(json) {
    const dogsDiv = document.getElementById('dog-bar');
    // console.log(json);
    for(const dog in json) {
        const name = json[dog].name;
        const id = json[dog].id;
        // console.log(id);

        const span = document.createElement('span');
        span.dataset.id = id
        span.innerText = name;
        span.addEventListener("click", dogInfo)
        dogsDiv.appendChild(span);
    }
}

function dogInfo(event) {
    const id = event.target.dataset.id;
    console.log(id);
    const div = document.getElementById('dog-info');

    fetch(`${DOGS_URL}/${id}`)
    .then(resp => resp.json())
    .then(json => {
        console.log(json);
        const id = json.id
        const name = json.name;
        const imageUrl = json.image;
        const bool = json.isGoodDog;
        let goodBad = "";
        console.log(imageUrl)

        bool ? goodBad = "Bad Dog!" : goodBad = "Good Dog!"
        
        div.innerHTML = `<img src="${imageUrl}">
        <h2>${name}</h2>
        <button data-dog-id="${id}">${goodBad}</button>`;

        const button = document.querySelector(`button[data-dog-id="${id}"]`);
        button.addEventListener("click", toggle);
    });
}

function toggle(event) {
    event.preventDefault();
    const id = event.target.dataset.dogId;
    const button = event.target;
    const goodBad = button.innerText
    let bool = true;
    console.log(goodBad);

    goodBad === "Good Dog!" ? bool = true : bool = false;
    goodBad === "Good Dog!" ? button.innerText = "Bad Dog!" : button.innerText = "Good Dog!";
    console.log(bool);

    const body = {
        isGoodDog: bool
    }

    const configObj = {
        method: "PATCH",
        headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        body: JSON.stringify(body)
    }

    fetch(`${DOGS_URL}/${id}`, configObj)
    .then(resp => resp.json())
    .then(json => {
        
        console.log(json)});
}
