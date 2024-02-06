const tokenAPI = 'https://ajax.test-danit.com/api/v2/cards/login';
let trueToken;
async function getToken(email, password) {
  try {
    const response = await fetch(tokenAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (response.ok) {
      const token = await response.text();
      return token;
    } else {
      throw new Error('User is not registered!');
    }
  } catch (error) {
    alert(error.message);
  }
}

async function showHide() {
  const enterBtn = document.querySelector('.login-button');
  const logoutBtn = document.querySelector('.logout-button');
  const createVisitBtn = document.querySelector('.create-visit-button');
  const filterPage = document.querySelector(".filter__section");
  const header = document.querySelector(".header");

  header.style.background = "none";
  header.style.height = "auto";
  filterPage.style.display = "block";
  enterBtn.classList.add('hidden');
  logoutBtn.classList.remove('hidden');
  createVisitBtn.classList.remove('hidden');
}

async function login() {
  const enterBtn = document.querySelector('.login-button');
  const logoutBtn = document.querySelector('.logout-button');

  if (!sessionStorage.getItem('token')) {
    enterBtn.addEventListener('click', showModal);
  } else {
    showHide();
    await fetchAndDisplayCards();
  }

  logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('token')
    window.location.reload()
  });

  async function showModal() {
    const modalForm = document.querySelector('#authorization-modal');
    modalForm.style.display = 'block';

    const emailForm = modalForm.querySelector('input[type="email"]');
    const passwordForm = modalForm.querySelector('input[type="password"]');
    const btnForm = modalForm.querySelector('.send-button');

    btnForm.addEventListener('click', handleSubmit);

    modalForm.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal') || e.target.classList.contains('btn-close')) {
        modalForm.style.display = 'none';
        emailForm.value = '';
        passwordForm.value = '';
      }
    });

    async function handleSubmit(e) {
      e.preventDefault();
      if (emailForm.value && passwordForm.value) {
        submitForm(modalForm, emailForm.value, passwordForm.value);
      } else {
        alert('Fill in all fields!');
      }
    }

  }

  async function submitForm(form, email, password) {
    const token = await getToken(email, password);
    sessionStorage.token = token;

    if (token) {
      showHide();
      form.style.display = 'none';
      trueToken = token;
      await fetchAndDisplayCards();
    }

    return token;
  }
}

async function fetchAndDisplayCards() {
  const token = sessionStorage.getItem('token');

  if (token) {
    try {
      const response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const cards = await response.json();

        const taskBoard = document.querySelector("#taskBoard");
        taskBoard.innerHTML = "";

        cards.forEach(async (cardData) => {
          await displayCard(cardData);
        });
      } else {
        console.error("Error fetching cards:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  }
}

login();

async function displayCard(cardData) {
  const taskBoard = document.querySelector("#taskBoard");
  const cardContainer = document.createElement("div");

  cardContainer.className = "card";
  cardContainer.setAttribute("data-id", cardData.id);

  cardContainer.innerHTML = `
      <div class="card__text">
      <h4>Name:</h4> <p>${cardData.name}</p>
      <h4>Doctor:</h4> <p>${cardData.doctor}</p>
      <h4>Description:</h4> <p>${cardData.description}</p>
      </div>
      <div class="button__contianer">
      <button onclick="showMore(${cardData.id})">Show more</button>
      <button onclick="openEditModal(${cardData.id})">Edit</button>
      </div>
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

async function deleteCard(cardId) {
  const confirmation = confirm("Are you sure, you want to delete?");
  const token = sessionStorage.getItem('token');

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
  const token = sessionStorage.getItem('token');
  const response = await fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  const cards = await response.json();

  const optionActive = (value, option) => value === option ? "selected" : "";

  const editForm = document.createElement("div");
  editForm.className = "edit__form";
  editForm.innerHTML = `
    <div class="input-group">
      <input required="" type="text" name="text" autocomplete="off" class="input" id="editName" value="${cards.name}">
      <label for="editName" class="user-label">Name</label>
    </div>
    <div class="select select__edit-container">
      <label for="editDoctor" class="select__label">Doctor</label>
      <select id="editDoctor" class="edit__select" onchange="handleDoctorChange()">
        <option value="Cardiologist" ${optionActive(cards.doctor, "Cardiologist")}>Cardiologist</option>
        <option value="Dentist"  ${optionActive(cards.doctor, "Dentist")}>Dentist</option>
        <option value="Therapist"  ${optionActive(cards.doctor, "Therapist")}>Therapist</option>
      </select>
    </div>
    <div class="input-group">
      <input required="" type="text" name="text" autocomplete="off" class="input" id="editDescription" value="${cards.description}">
      <label for="editDescription" class="user-label">Description</label>
    </div>
    
  <div class="select select__edit-container">
  <label for="editStatus" class="select__label">Status</label>
    <select id="editStatus" class="edit__select">
      <option value="" disabled selected>Select status</option>
      <option value="active" ${optionActive(cards.status, "active")}>Active</option>
      <option value="completed" ${optionActive(cards.status, "completed")}>Completed</option>
    </select>
    </div>
    <div class="select select__edit-container">
    <label for="editPriority" class="select__label ">Priority</label>
    <select id="editPriority" class="edit__select">
      <option value="" disabled selected>Select priority</option>
      <option value="low" ${optionActive(cards.priority, "low")}>Low</option>
      <option value="medium" ${optionActive(cards.priority, "medium")}>Medium</option>
      <option value = "high" ${optionActive(cards.priority, "high")}> High</ >
    </select > 
    </div>
    <div class="input-group">
      <input required="" type="text" name="text" autocomplete="off" class="input" id="editComment" value="${cards.comment}">
      <label for="editComment" class="user-label">Comment</label>
    </div>
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
      <div class="input-group">
        <input required=""  name="text" autocomplete="off" class="input" type="number" id="editAge">
        <label for="editAge" class="user-label">Age</label>
      </div>
      <div class="input-group">
        <input required=""  name="text" autocomplete="off" class="input" type="number" id="editPressure">
        <label for="editPressure" class="user-label">Normal pressure</label>
      </div>
      <div class="input-group">
        <input required=""  name="text" autocomplete="off" class="input" type="number" id="editBMI">
        <label for="editBMI" class="user-label">Body mass index</label>
      </div>
      <div class="input-group">
        <input required=""  name="text" autocomplete="off" class="input" type="text" id="editHeartDisease">
        <label for="editHeartDisease" class="user-label">Past diseases</label>
      </div>
    `;
  } else if (selectedDoctor === 'Dentist') {
    additionalFieldsContainer.innerHTML = `
    <div class="input-group">
    <label for="editLastVisitDate" class="select__label">Date of the last visit</label>
      <input required="" name="text" autocomplete="off" class="input edit__date" type="date" id="editLastVisitDate">
    </div>
    `;
  } else if (selectedDoctor === 'Therapist') {
    additionalFieldsContainer.innerHTML = `
    <div class="input-group">
      <input required=""  name="text" autocomplete="off" class="input" type="number" id="editAge">
      <label for="editAge" class="user-label">Age</label>
    </div>
    `;
  }
}

function closeModal() {
  const editModal = document.getElementById("editModal");
  editModal.style.display = "none";
  const editForm = document.querySelector(".edit__form");
  editForm.innerHTML = "";
}

async function saveChanges(cardId) {
  const token = sessionStorage.getItem('token');
  const editForm = document.querySelector(".edit__form")
  const cardContainer = document.querySelector(`.card[data-id= "${cardId}"]`);
  const newName = editForm.querySelector("#editName").value;
  const newDoctor = editForm.querySelector("#editDoctor").value;
  const newDescription = editForm.querySelector("#editDescription").value;
  const newStatus = editForm.querySelector("#editStatus").value;
  const newPriority = editForm.querySelector("#editPriority").value;
  const newComment = editForm.querySelector("#editComment").value;

  const updatedData = {
    name: newName,
    doctor: newDoctor,
    description: newDescription,
    status: newStatus,
    priority: newPriority,
    comment: newComment
  };

  if (newDoctor === "Cardiologist") {
    const newAge = editForm.querySelector("#editAge").value;
    const newPressure = editForm.querySelector("#editPressure").value;
    const newBMi = editForm.querySelector("#editBMI").value;
    const newDesease = editForm.querySelector("#editHeartDisease").value;
    updatedData.age = newAge;
    updatedData.pulse = newPressure;
    updatedData.massIndex = newBMi;
    updatedData.pastDiseases = newDesease;
  } else if (newDoctor === "Dentist") {
    const newDate = editForm.querySelector("#editLastVisitDate").value;
    updatedData.lastVisit = newDate;
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
  <div class="card__text">
  <h4>Name:</h4> <p>${newName}</p>
  <h4>Doctor:</h4> <p>${newDoctor}</p>
  <h4>Description:</h4> <p>${newDescription}</p>
  </div>
  <div class="button__contianer">
  <button onclick="showMore(${cardId})">Show more</button>
  <button onclick="openEditModal(${cardId})">Edit</button>
  </div>
  <span class="delete-icon" onclick="deleteCard(${cardId})">&#10006;</span>
      `;

  closeModal();
}

async function showMore(cardId) {
  const token = sessionStorage.getItem('token');
  const response = await fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  const cardData = await response.json();

  const detailsContainer = document.getElementById("detailsContainer");
  const detailsContent = document.createElement("div");

  detailsContent.className = "details__content";
  const baseInfo = `
    <h4>Name: <span>${cardData.name}</span></h4>
    <h4>Doctor: <span>${cardData.doctor}</span></h4>
    <h4>Description: <span>${cardData.description}</span></h4>
    <h4>Priority: <span>${cardData.priority}</span></h4>
    <h4>Status: <span>${cardData.status}</span></h4>
    <h4>Comment for doctor: <span>${cardData.comment}</span></h4>
  `;

  if (cardData.doctor === 'Cardiologist') {
    detailsContent.innerHTML = `
    ${baseInfo}
      <h4>Normalpressure: <span>${cardData.pulse}</span></h4>
      <h4>Body mass index: <span>${cardData.massIndex}</span></h4>
      <h4>Past diseases: <span>${cardData.pastDiseases}</span></h4>
    `;
  } else if (cardData.doctor === 'Dentist') {
    detailsContent.innerHTML = `
    ${baseInfo}
      <h4>Date of the last visit:</h4> <p> ${cardData.lastVisit}</p>
    `;
  } else if (cardData.doctor === 'Therapist') {
    detailsContent.innerHTML = `
    ${baseInfo}
    <h4>Age: <span>${cardData.age}</span></h4>
    `;
  }

  detailsContainer.innerHTML = "";
  detailsContainer.appendChild(detailsContent);

  const detailsModal = document.getElementById("detailsModal");
  detailsModal.style.display = "block";
}

function closeShowMore() {
  const detailsModal = document.getElementById("detailsModal");
  detailsModal.style.display = "none";
}

async function filterCards() {
  const token = sessionStorage.getItem('token');
  const searchInput = document.getElementById("searchInput").value.toLowerCase();
  const doctorFilter = document.getElementById("doctorFilter").value;
  const statusFilter = document.getElementById("statusFilter").value;
  const priorityFilter = document.getElementById("priorityFilter").value;

  const response = await fetch(`https://ajax.test-danit.com/api/v2/cards`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  const cards = await response.json();

  cards.forEach(card => {
    const cardToRemove = document.querySelector(`.card[data-id="${card.id}"]`);
    const nameElement = card.name;
    const doctorElement = card.doctor;
    const statusElement = card.status;
    const priorityElement = card.priority;

    const name = nameElement ? nameElement.toLowerCase() : "";
    const doctor = doctorElement ? doctorElement : "";
    const status = statusElement ? statusElement.toLowerCase() : "";
    const priority = priorityElement ? priorityElement.toLowerCase() : "";

    const nameMatch = name.includes(searchInput);
    const doctorMatch = (doctorFilter === '' || doctor === doctorFilter);
    const statusMatch = (statusFilter === '' || status === statusFilter);
    const priorityMatch = (priorityFilter === '' || priority === priorityFilter);

    if (nameMatch && statusMatch && priorityMatch && doctorMatch) {
      cardToRemove.style.display = "";
    } else {
      cardToRemove.style.display = "none";
    }
  });
}










