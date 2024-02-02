const token = "6b6edd59-d784-4e87-a1cb-342f6158ace1";

// fetch("https://ajax.test-danit.com/api/v2/cards", {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${token}`
//   },
//   body: JSON.stringify({
//     // name: 'Білий Рома',
//     name: 'Кіндер Андрій',
//     // name: 'Лисак Влад',
//     title: 'Визит к кардиологу',
//     description: 'Плановый визит',
//     doctor: 'Cardiologist',
//     bp: '24',
//     age: 23,
//     weight: 70,
//     // status: "Active",
//     status: "Completed",
//     // priority: "low",
//     priority: "medium",
//     // priority: "high",
//   })
// })
//   .then(response => response.json())
//   .then(response => console.log(response))


async function displayCard(cardData) {
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
      <button onclick="openEditModal(${cardData.id})">Edit</button>
      <span class="delete-icon" onclick="deleteCard(${cardData.id})">&#10006;</span>
    `;

  taskBoard.appendChild(cardContainer);
}

async function getAllCards() {
  const response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  const cards = await response.json();

  cards.forEach(async (cardData) => {
    await displayCard(cardData);
  });
}

getAllCards();

async function deleteCard(cardId) {
  const confirmation = confirm("Are you sure, you want to delete?");

  if (confirmation) {
    const response = await fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const cardToRemove = document.querySelector(`.card[data-id="${cardId}"]`);
      cardToRemove.remove();
    } else {
      console.error("Error to delete:", response.statusText);
    }
  }
}


async function openEditModal(cardId) {
  const response = await fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  const cards = await response.json();

  const optionActive = (value, option) => value === option ? "selected" : "";

  const editForm = document.createElement("div");
  editForm.className = "edit-form";
  editForm.innerHTML = `
    <label for="editName">Name:</label>
    <input type="text" id="editName" value="${cards.name}">
    <label for="editDoctor">Doctor:</label>
    <select id="editDoctor" onchange="handleDoctorChange()">
      <option value="Cardiologist" ${optionActive(cards.doctor, "Cardiologist")}>Cardiologist</option>
      <option value="Dentist"  ${optionActive(cards.doctor, "Dentist")}>Dentist</option>
      <option value="Therapist"  ${optionActive(cards.doctor, "Therapist")}>Therapist</option>
    </select>
    <label for="editDescription">Description:</label>
    <input type="text" id="editDescription" value="${cards.description}">
    <label for="editStatus">Status:</label>
    <select id="editStatus">
      <option value="" disabled selected>Select status</option>
      <option value="active" ${optionActive(cards.status, "active")}>Active</option>
      <option value="completed" ${optionActive(cards.status, "completed")}>Completed</option>
    </select>
    <label for="editPriority">Priority:</label>
    <select id="editPriority">
      <option value="" disabled selected>Select priority</option>
      <option value="low" ${optionActive(cards.priority, "low")}>Low</option>
      <option value="medium" ${optionActive(cards.priority, "medium")}>Medium</option>
      <option value = "high" ${optionActive(cards.priority, "high")}> High</ >
    </select > 
    <div id="additionalFields"></div>
    <button onclick="saveChanges(${cardId})">Save</button>
  `;

  const editFormContainer = document.getElementById("editFormContainer");
  editFormContainer.innerHTML = "";
  editFormContainer.appendChild(editForm);

  const editModal = document.getElementById("editModal");
  editModal.style.display = "block";
  handleDoctorChange(cards);
}

function handleDoctorChange() {
  const selectedDoctor = document.getElementById("editDoctor").value;
  const additionalFieldsContainer = document.getElementById("additionalFields");

  additionalFieldsContainer.innerHTML = "";

  if (selectedDoctor === 'Cardiologist') {
    additionalFieldsContainer.innerHTML = `
      <label for="editAge">Age:</label>
      <input type="text" id="editAge">
      <label for="editPressure">Normal blood pressure:</label>
      <input type="text" id="editPressure" >
      <label for="editBMI">Body mass index</label>
      <input type="text" id="editBMI" >
      <label for="editHeartDisease">Past diseases of the cardiovascular system:</label>
      <input type="text" id="editHeartDisease" >
    `;
  } else if (selectedDoctor === 'Dentist') {
    additionalFieldsContainer.innerHTML = `
      <label for="editLastVisitDate">Date of the last visit:</label>
      <input type="date" id="editLastVisitDate">
    `;
  } else if (selectedDoctor === 'Therapist') {
    additionalFieldsContainer.innerHTML = `
      <label for="editAge">Age:</label>
      <input type="number" id="editAge">
    `;
  }
}

function closeModal() {
  const editModal = document.getElementById("editModal");
  editModal.style.display = "none";
  const editForm = document.querySelector(".edit-form")
  editForm.innerHTML = "";
}

async function saveChanges(cardId) {
  const editForm = document.querySelector(".edit-form")
  const cardContainer = document.querySelector(`.card[data-id= "${cardId}"]`);
  const newName = editForm.querySelector("#editName").value;
  const newDoctor = editForm.querySelector("#editDoctor").value;
  const newDescription = editForm.querySelector("#editDescription").value;
  const newStatus = editForm.querySelector("#editStatus").value;
  const newPriority = editForm.querySelector("#editPriority").value;

  const updatedData = {
    name: newName,
    doctor: newDoctor,
    description: newDescription,
    status: newStatus,
    priority: newPriority
  };

  if (newDoctor === "Cardiologist") {
    const newAge = editForm.querySelector("#editAge").value;
    const newPressure = editForm.querySelector("#editPressure").value;
    const newBMi = editForm.querySelector("#editBMI").value;
    const newDesease = editForm.querySelector("#editHeartDisease").value;
    updatedData.age = newAge;
    updatedData.pressure = newPressure;
    updatedData.bmi = newBMi;
    updatedData.diseases = newDesease;
  } else if (newDoctor === "Dentist") {
    const newDate = editForm.querySelector("#editLastVisitDate").value;
    updatedData.date = newDate;
  } else if (newDoctor === "Therapist") {
    const newAge = editForm.querySelector("#editAge").value;
    updatedData.age = newAge;
  }

  const response = await fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(updatedData)
  });

  cardContainer.innerHTML = `
      <p>Name: ${newName}</p>
      <p>Doctor: ${newDoctor}</p>
      <button onclick="showMore(${cardId})">Show more</button>
      <button onclick="openEditModal(${cardId})">Edit</button>
      <span class="delete-icon" onclick="deleteCard(${cardId})">&#10006;</span>
      `;
  closeModal();
}

async function showMore(cardId) {
  const response = await fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  const cardData = await response.json();

  const detailsContainer = document.getElementById("detailsContainer");
  const detailsContent = document.createElement("div");

  detailsContent.className = "details-content";
  const baseInfo = `
    <p>Name: ${cardData.name}</p>
    <p>Doctor: ${cardData.doctor}</p>
    <p>Description: ${cardData.description}</p>
    <p>Priority: ${cardData.priority}</p>
    <p>Status: ${cardData.status}</p>
  `;

  if (cardData.doctor === 'Cardiologist') {
    detailsContent.innerHTML = `
    ${baseInfo}
      <p>Age: ${cardData.age}</p>
      <p>Normal blood pressure: ${cardData.pressure}</p>
      <p>Body mass index: ${cardData.bmi}</p>
      <p>Past diseases of the cardiovascular system: ${cardData.diseases}</p>
    `;
  } else if (cardData.doctor === 'Dentist') {
    detailsContent.innerHTML = `
    ${baseInfo}
      <p>Date of the last visit: ${cardData.date}</p>
    `;
  } else if (cardData.doctor === 'Therapist') {
    detailsContent.innerHTML = `
    ${baseInfo}
      <p>Age: ${cardData.age}</p>
    `;
  }

  detailsContainer.innerHTML = "";
  detailsContainer.appendChild(detailsContent);

  const detailsModal = document.getElementById("detailsModal");
  detailsModal.style.display = "block";
}

function closeDetailsModal() {
  const detailsModal = document.getElementById("detailsModal");
  detailsModal.style.display = "none";
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

