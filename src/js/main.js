// Authorization: `Bearer ${token}`
// Search, Status, priorety, modal window, Edit(Put, Patch) 

const token = "6b6edd59-d784-4e87-a1cb-342f6158ace1";

// fetch("https://ajax.test-danit.com/api/v2/cards", {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${token}`
//   },
//   body: JSON.stringify({
//     // name: 'Білий Рома',
//     // name: 'Кіндер Андрій',
//     name: 'Лисак Влад',
//     title: 'Визит к кардиологу',
//     description: 'Плановый визит',
//     doctor: 'Cardiologist',
//     bp: '24',
//     age: 23,
//     weight: 70,
//     status: "Active",
//     // status: "Completed",
//     // priority: "low",
//     // priority: "medium",
//     priority: "high",
//   })
// })
//   .then(response => response.json())
//   .then(response => console.log(response))

function displayCard(cardData) {
  const taskBoard = document.querySelector("#taskBoard");
  const cardContainer = document.createElement("div");
  cardContainer.className = "card";
  cardContainer.setAttribute("data-id", cardData.id);
  cardContainer.setAttribute('data-status', cardData.status);
  cardContainer.setAttribute('data-priority', cardData.priority);

  cardContainer.innerHTML = `
      <p>Name: ${cardData.name}</p>
      <p>Doctor: ${cardData.doctor}</p>
      <button onclick="showMore(${cardData.id})">Show more</button>
      <button onclick="editCard(${cardData.id})">Edit</button>
      <span class="delete-icon" onclick="deleteCard(${cardData.id})">&#10006;</span>
    `;

  taskBoard.appendChild(cardContainer);
}

function getAllCards() {
  fetch("https://ajax.test-danit.com/api/v2/cards", {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(cards => {
      cards.forEach(cardData => {
        displayCard(cardData);
      });
    })
    .catch(error => console.error("Error:", error));
}

getAllCards();

function deleteCard(cardId) {
  const confirmation = confirm("Are you sure, you want to delete?");

  if (confirmation) {
    fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.ok) {
          const cardToRemove = document.querySelector(`.card[data-id="${cardId}"]`);
          cardToRemove.remove();
        } else {
          console.error("Error to delete:", response.statusText);
        }
      })
      .catch(error => console.error("Error:", error));
  }
}

function editCard(cardId) {
  const cardContainer = document.querySelector(`.card[data-id="${cardId}"]`);

  const name = cardContainer.querySelector('p:first-child').innerText.split(': ')[1];
  const doctor = cardContainer.querySelector('p:nth-child(2)').innerText.split(': ')[1];

  const editForm = document.createElement("div");
  editForm.className = "edit-form";
  editForm.innerHTML = `
    <label for="editName">Name:</label>
    <input type="text" id="editName" value="${name}">
    <label for="editDoctor">Doctor:</label>
    <input type="text" id="editDoctor" value="${doctor}">
    <button onclick="saveChanges(${cardId})">Save</button>
  `;

  cardContainer.innerHTML = "";
  cardContainer.appendChild(editForm);
}

function saveChanges(cardId) {
  const cardContainer = document.querySelector(`.card[data-id="${cardId}"]`);
  const editForm = cardContainer.querySelector('.edit-form');

  const newName = editForm.querySelector('#editName').value;
  const newDoctor = editForm.querySelector('#editDoctor').value;

  const updatedData = {
    name: newName,
    doctor: newDoctor
  };

  fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(updatedData)
  })
    .then(response => response.json())


  cardContainer.innerHTML = `
    <p>Name: ${newName}</p>
    <p>Doctor: ${newDoctor}</p>
    <button onclick="showMore(${cardId})">Show more</button>
    <button onclick="editCard(${cardId})">Edit</button>
    <span class="delete-icon" onclick="deleteCard(${cardId})">&#10006;</span>
  `;
}

function showMore(cardId) {
  const cardContainer = document.querySelector(`.card[data-id="${cardId}"]`);

  fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(cardData => {
      cardContainer.innerHTML += `
        <p>Some text: ${cardData.description}</p>
        <p>Some text: ${cardData.title}</p>
      `;
    })
    .catch(error => console.error("Error:", error));
}


function filterCards() {
  const searchInput = document.getElementById("searchInput").value.toLowerCase();
  const statusFilter = document.getElementById("statusFilter").value;
  const priorityFilter = document.getElementById("priorityFilter").value;
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const nameElement = card.querySelector('p:first-child');
    const statusElement = card.getAttribute('data-status');
    const priorityElement = card.getAttribute('data-priority');

    const name = nameElement ? nameElement.innerText.split(': ')[1].toLowerCase() : "";
    const status = statusElement ? statusElement.toLowerCase() : "";
    const priority = priorityElement ? priorityElement.toLowerCase() : "";

    const nameMatch = name.includes(searchInput);
    const statusMatch = (statusFilter === '' || status === statusFilter);
    const priorityMatch = (priorityFilter === '' || priority === priorityFilter);

    if (nameMatch && statusMatch && priorityMatch) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}
