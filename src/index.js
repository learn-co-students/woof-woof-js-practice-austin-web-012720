let dogArray = [];
let dogClicked;

function getDogs() {
  dogArray = [];
  return fetch('http://localhost:3000/pups')
    .then((response) => response.json())
    .then((json) => {
      json.forEach((e) => {
        dogArray.push(e);
      });
      dogBar();
    });
}

function dogBar() {
  const dogBar = document.getElementById('dog-bar');
  dogBar.innerHTML = '';

  dogArray.forEach((dog) => {
    const name = document.createElement('span');
    name.innerText = dog.name;
    name.setAttribute('id', `dog-${dog.id}`);
    name.addEventListener('click', (e) => {
      e.preventDefault();
      const dogContainer = document.getElementById('dog-summary-container');
      dogContainer.innerHTML = '';
      const name = document.createElement('h2');
      name.innerText = dog.name;
      const img = document.createElement('p');
      img.innerHTML = `<img src = ${dog.image} />`;
      const dogBtn = document.createElement('button');
      if (dog.isGoodDog == true) {
        dogBtn.innerText = 'Good Dog';
      } else { dogBtn.innerText = 'Bad Dog'; }
      dogBtn.addEventListener('click', (e) => {
        e.preventDefault();
        dogStatus();
      });
      dogContainer.append(img);
      dogContainer.append(name);
      dogContainer.append(dogBtn);

      dogClicked = dog.id;
    });
    dogBar.append(name);
  });
}

function dogStatus() {
  const changeStatus = {
    method: 'PATCH',
    headers:
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
    body: JSON.stringify({
      isGoodDog: !(dogArray[dogClicked-1].isGoodDog),
    }),
  };
  fetch(`http://localhost:3000/pups/${dogClicked}`, changeStatus)
    .then((response) => response.json())
    .then((json) => {
      getDogs();
    });
}

document.addEventListener('DOMContentLoaded', () => {
  getDogs();
});
