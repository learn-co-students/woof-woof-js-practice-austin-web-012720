let dogInfo = [];

function changeGoodDogStatus(dog) {
  fetch(`http://localhost:3000/pups/${dog.id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      isGoodDog: dog.isGoodDog
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(resp => resp.json())
    .then(showInfo(dog));
}

function getDogs() {
  dogInfo = [];
  return fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(json => {
      json.forEach(e => {
        dogInfo.push(e);
      });
      renderDogBar(dogInfo);
    });
}

function renderDogBar(dogs) {
  const dogBar = document.getElementById('dog-bar');
  dogBar.innerHTML = '';

  dogs.forEach(dog => {
    const dogButton = document.createElement('span');
    dogButton.innerText = dog.name;
    dogButton.addEventListener('click', function(e) {
      e.preventDefault();
      showInfo(dog);
    });

    dogBar.append(dogButton);
  });
}

function showInfo(dog) {
  const infoBox = document.getElementById('dog-info');
  infoBox.innerHTML = '';

  const dogName = document.createElement('h2');
  dogName.innerText = dog.name;

  const dogImg = document.createElement('img');
  dogImg.src = dog.image;

  const goodDog = document.createElement('button');
  goodDog.innerText = dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!';
  goodDog.addEventListener('click', function(e) {
    e.preventDefault();
    dog.isGoodDog = !dog.isGoodDog;
    changeGoodDogStatus(dog);
  });

  infoBox.append(dogImg);
  infoBox.append(dogName);
  infoBox.append(goodDog);
}

document.addEventListener('DOMContentLoaded', () => {
  getDogs();
});
