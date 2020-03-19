document.addEventListener('DOMContentLoaded', () => {
  //console.log('DOM Loaded');
  const filterButton = document.querySelector('#good-dog-filter');
  filterButton.addEventListener('click', filterDogs) 

  function filterDogs(event) {
    const dogBar = document.querySelector('#dog-bar');
    dogBar.innerHTML = "";
    const onOrOff = event.target.innerText.split(': ')[1];
    
    if (onOrOff === 'OFF') {
      event.target.innerText = 'Filter good dogs: ON';

      fetchDogs()
        .then(results => results.filter(dog => dog.isGoodDog))
        .then(goodDogs => renderDogBar(goodDogs))

    } else {
      event.target.innerText = 'Filter good dogs: OFF';

      fetchDogs()
        .then(results => results.filter(dog => !dog.isGood))
        .then(badDogs => renderDogBar(badDogs))

    }
   
  };

  fetchDogs()
    .then(results => {
      renderDogBar(results)
    });

});

function fetchDogs() {
  return fetch('http://localhost:3000/pups')
    .then(response => response.json())
};

function renderDogBar(allDogs) {
  allDogs.forEach(dog => {
    addDogToDogBar(dog);
  })
};

function addDogToDogBar(dog) {
  const dogBar = document.querySelector('#dog-bar');
  const span = document.createElement('span');
  span.innerText = dog.name;
  span.setAttribute('data-id', dog.id);
  
  span.addEventListener('click', showDogInfo)
  dogBar.appendChild(span);
};

function showDogInfo(event) {
  const dogId = event.target.dataset.id;
  const dogInfoDiv = document.querySelector('#dog-info');

  fetch(`http://localhost:3000/pups/${dogId}`)
    .then(response => response.json())
    .then(dog => {
      const goodOrBad = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"

      dogInfoDiv.innerHTML = `<img src=${dog.image}>
                              <h2>${dog.name}</h2>
                              <button data-id=${dog.id}>${goodOrBad}</button>`
      
      const button = dogInfoDiv.querySelector('button');
      button.addEventListener('click', toggleDog)                         
    })

};

function toggleDog(event) {
  const dogId = event.target.dataset.id;
  let isGoodOrBad = event.target.innerText;

  if (isGoodOrBad === 'Good Dog!'){
    isGoodOrBad = false;
  }
  if (isGoodOrBad === 'Bad Dog!') {
    isGoodOrBad = true;
  }

  fetch(`http://localhost:3000/pups/${dogId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type" : "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({isGoodDog: isGoodOrBad })
  })
    .then(response => response.json())
  
  if (event.target.innerText === 'Good Dog!'){
    event.target.innerText = 'Bad Dog!';
  } else {
    event.target.innerText = 'Good Dog!';
  }

}




