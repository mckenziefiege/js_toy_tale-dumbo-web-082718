document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector('#new-toy-btn');
  const toyForm = document.querySelector('.container');

  let addToy = false;

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = 'block';
      // submit listener here
      toyForm.addEventListener('submit', createToy)
    } else {
      toyForm.style.display = 'none';
    }
  });

  fetchToys();
});

function fetchToys () {
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => toys.forEach(addToyToPage));
}

function addToyToPage (toy) {
  const toyCollection = document.querySelector('#toy-collection')
  const singleToy = document.createElement('div')
  singleToy.className = 'card'
  const h2 = document.createElement('h2')
  h2.innerText = toy.name
  const img = document.createElement('img')
  img.className = 'toy-avatar'
  img.src = toy.image
  const p = document.createElement('p')
  p.innerText = `${toy.likes} likes`
  const button = document.createElement('button')
  button.className = 'like-btn'
  button.innerText = `Like <3`
  button.id = `${toy.id}`
  button.addEventListener('click', addLikesButton)
  singleToy.append(h2, img, p, button)
  toyCollection.append(singleToy)
}

function createToy (event) {
  event.preventDefault();
  const name = event.target.name.value
  const image = event.target.image.value
  let likes = 0
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name, image, likes
    })
  }).then(resp => resp.json())
    .then(toy => addToyToPage(toy))
}

function addLikesButton (event) {
  event.preventDefault()
  let likeshtml = event.target.parentNode.querySelector('p')
  let likesArray = likeshtml.innerText.split(" ")
  let likes = parseInt(likesArray[0])
  let plusOneLikes = likes + 1
  fetch(`http://localhost:3000/toys/${event.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": plusOneLikes
    })
  })
likeshtml.innerText = `${plusOneLikes} likes`
}
