
document.addEventListener("DOMContentLoaded", () => {
    const dogBar = document.getElementById("dog-bar")

    fetchDogs().then(renderDogBar)

    // Only fetches dog (pups) array
    function fetchDogs() {
    return fetch("http://localhost:3000/pups")
        .then(response => response.json())
    }

    // Uses all of the dogs and adds them to the dogBar
    function renderDogBar(dogs) {
        dogs.forEach(addDogToDogBar)
    }

    // Only adds one dog to the dogBar
    function addDogToDogBar(dog) {
       const span = document.createElement("span")
       span.innerText = dog.name
       span.setAttribute("data-id", dog.id)
       span.addEventListener("click", showDogInfo)
       dogBar.append(span)
    }
})
    // When dog name is clicked, one dog appears on the page
    function showDogInfo(event) {
        const dogId = event.target.dataset.id
        const dogInfoDiv = document.querySelector('#dog-info')
        fetch(`http://localhost:3000/pups/${dogId}`)
        .then(response => response.json())
        .then(dog => {
            const goodOrBad = dog.isGoodDog ? "Good dog!" : "Bad dog!"
            dogInfoDiv.innerHTML = `
            <img src= ${dog.image}>
            <h2>${dog.name}</h2>
            <button data-id=${dog.id}>${goodOrBad}</button>
            `
            const button = dogInfoDiv.querySelector("button")
            button.addEventListener("click", toggleDog)
        })
    }

    function toggleDog(event) {
        const goodOrBad = event.target.innerText.slice(0,-5)
        const isGoodDog = goodOrBad === "Good" ? true : false
        const newStatus = isGoodDog ? "Bad dog!" : "Good dog!"
        const dogId = event.target.dataset.id

        fetch(`http://localhost:3000/pups/${dogId}`, {
            method: "PATCH",
            body: JSON.stringify({isGoodDog: !isGoodDog}),
            headers: {"Content-Type": "application/json"}
        })
        .then(response => response.json())
        .then(() => event.target.innerText = newStatus)
    }