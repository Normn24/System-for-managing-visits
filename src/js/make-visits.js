const main = document.querySelector('main');

const btnMakeForm = document.querySelector('.header__btn-make-visit');
const form = document.querySelector('.header__form');

const createModal = document.getElementById("createModal");
const inputCreateName = document.querySelector("#create__inputName")
const purpose = document.querySelector('#create__inputPurpose')
const age = document.querySelector('#create__inputAge')
const pulse = document.querySelector('#create__inputPressure')
const massIndex = document.querySelector('#create__inputBMI')
const description = document.querySelector('#create__inputDescription')
const pastDiseases = document.querySelector('#create__inputDisease')
const lastVisit = document.querySelector('#create__inputLastVisit')
const comment = document.querySelector('#create__inputComment')
const error = document.querySelector('.form__error')
const btnCloseForm = document.querySelector('.form__button-close-form')
const selectMenuDoctors = document.querySelector('.form__selector-doctors')
const selectPriorityContainer = document.querySelector("#create__selectPriority")
// const selectUrgency = document.querySelector('.form__selector-urgency')
const btnCreateVisit = document.querySelector('.form__button-create-visit')
let elementsForm = document.querySelectorAll('.form input, .form select')
let formData = []
class Module {
    constructor() {

    }

    closeForm() {
        btnCloseForm.addEventListener('click', (event) => {
            event.preventDefault()
            form.style.display = 'none';
            // modalForm.style.display = "none";
            createModal.style.display = "none"; 
        elementsForm.forEach((element)=>{
            element.value = ''
        })})

document.addEventListener('click', (event)=>{
    if(event.target === createModal){
form.style.display = `none`
createModal.style.display = 'none'
elementsForm.forEach((element)=>{
    element.value = ''
})
    }
})
       


    }
    sendInfo() {

        btnCreateVisit.addEventListener('click', async (event) => {
            event.preventDefault();
            const fields = Array.from(document.querySelectorAll('.form div')).filter((divElement) => {
                return window.getComputedStyle(divElement).display !== 'none' && divElement.id !== 'create__inputComment'
            }).some((divElement) => {
                const elements = Array.from(divElement.querySelectorAll('input, select'))
                return elements.some((inputElement) => inputElement.value === '')
                
            });
            
            if (fields) {
                error.style.display = 'block';
                return;
            } if (age.style.display !== 'none') {

                if (parseFloat(document.querySelector('#createAge').value) >= 150 || parseFloat(document.querySelector('#createAge').value) <= 0) {
                    error.textContent = 'Incorrect value! Enter your real age';
                    error.style.display = 'block';
                    return;
                }
            }
            if (pulse.style.display !== 'none') {

                const pressureValue = parseFloat(document.querySelector('#createPressure').value);
                if (isNaN(pressureValue) || pressureValue >= 170 || pressureValue <= 50) {
                    error.textContent = 'Incorrect value! Enter your real pulse';
                    error.style.display = 'block';
                    return;
                }
            }
            if (massIndex.style.display !== 'none') {

                const massValue = parseFloat(document.querySelector('#createBMI').value);
                if (isNaN(massValue) || massValue >= 700 || massValue <= 0) {
                    error.textContent = 'Incorrect value! Enter your real mass index';
                    error.style.display = 'block';
                    return;
                }}      
                const createNameValue = document.querySelector('#createName').value;
                if (!isNaN(parseFloat(createNameValue))) {
                    error.textContent = 'Incorrect value! Enter your real name';
                    error.style.display = 'block';
                    return;
                }
                if (lastVisit.style.display !== 'none') {
                    const minimalVisit= new Date('1950-01-01')
                    const maxVisit= new Date()
                    const lastVisitValue =  document.querySelector('#createLastVisitDate')
                    const convertValue = new Date(lastVisitValue.value)
                    if (convertValue <= minimalVisit || convertValue >= maxVisit) {
                        error.textContent = 'Incorrect value! Enter correct data';
                        error.style.display = 'block';
                        return;
                    }}   
            error.style.display = 'none'
            const data = new CreateVisit()
            console.log(data);
            // data.getInfo();
            form.style.display = 'none'
            createModal.style.display = "none"
            // btnMakeForm.style.display = 'block'
            try {
                await sendInfo(data);
                await fetchAndDisplayCards()
                // data.createCard();
                // data.deleteCard();
                // saveCards.saveToLocalStorage(data);
            } catch (error) {
                console.error('Error sending data:', error)
            }
        })}}

class Visit {
    constructor() {

        this.dontAddElements = true

    }

    makeOptions() {
        if (selectMenuDoctors && this.dontAddElements === true) {
            this.dontAddElements = false

            const changeHandler = () => {
                // paragraphPurpose.style.display = 'block'
                purpose.style.display = 'block'
                // paragraphDescription.style.display = 'block'
                description.style.display = 'block'
                // paragraphUrgency.style.display = 'block'

                inputCreateName.style.display = "block";

                selectPriorityContainer.style.display = 'flex';
                // paragraphName.style.display = 'block'
                // fullName.style.display = 'block'
                btnCreateVisit.style.display = 'block'
                // paragraphComment.style.display = 'block'
                comment.style.display = 'block'
                // header.style.height = '1000px'
                selectMenuDoctors.removeEventListener('change', changeHandler);


            };

            selectMenuDoctors.addEventListener('change', changeHandler)
        }
    }

}

class VisitDentist extends Visit {
    constructor() {
        super();
    }

    doctorNotes() {
        if (selectMenuDoctors) {
            selectMenuDoctors.addEventListener('change', () => {
                if (selectMenuDoctors.value === 'Dentist') {
                    // paragraphLastVisit.style.display = 'block'
                    lastVisit.style.display = 'block'


                } else {
                    // paragraphLastVisit.style.display = 'none'
                    lastVisit.style.display = 'none'
                }

            })
        }
    }
}
class VisitTherapist extends Visit {
    constructor() {
        super();
    }

    doctorNotes() {
        if (selectMenuDoctors) {
            selectMenuDoctors.addEventListener('change', () => {
                if (selectMenuDoctors.value === 'Cardiologist' || selectMenuDoctors.value === "Therapist") {
                    // paragraphAge.style.display = 'block'
                    age.style.display = 'block'
                } else {
                    // paragraphAge.style.display = 'none'
                    age.style.display = 'none'
                }
            });
        }
    }
}
class VisitCardiologist extends Visit {
    constructor() {
        super();
    }

    doctorNotes() {
        if (selectMenuDoctors) {
            selectMenuDoctors.addEventListener('change', () => {
                if (selectMenuDoctors.value === "Cardiologist") {
                    // paragraphPastDiseases.style.display = 'block'
                    pulse.style.display = 'block'
                    // paragraphMassIndex.style.display = 'block'
                    massIndex.style.display = 'block'
                    // paragraphPastDiseases.style.display = 'block'
                    pastDiseases.style.display = 'block'

                } else {
                    // paragraphPastDiseases.style.display = 'none'
                    pastDiseases.style.display = 'none'
                    // paragraphMassIndex.style.display = 'none'
                    massIndex.style.display = 'none'
                    // paragraphPastDiseases.style.display = 'none'
                    pulse.style.display = 'none'
                }

            });
        }
    }
}

function openModalWindow() {
    createModal.style.display = "block";
    form.style.display = `flex`
}

const module = new Module()

const visit = new Visit()
visit.makeOptions()
const visitDentist = new VisitDentist()
visitDentist.doctorNotes()

const visitTherapist = new VisitTherapist()
visitTherapist.doctorNotes()
const visitCardiologist = new VisitCardiologist()
visitCardiologist.doctorNotes()
module.sendInfo()
module.closeForm()



class CreateVisit {
    constructor() {
        this.doctor = form.querySelector('.form__selector-doctors').value
        this.name = form.querySelector('.form__patient-name').value
        this.priority = form.querySelector('.form__selector-urgency').value
        this.purpose = form.querySelector('.form__purpose').value
        this.description = form.querySelector('.form__description').value
        this.lastVisit = form.querySelector('.form__last-visit').value
        this.age = form.querySelector('.form__age').value
        this.pulse = form.querySelector('.form__pulse').value
        this.massIndex = form.querySelector('.form__mass-index').value
        this.pastDiseases = form.querySelector('.form__past-diseases').value
        this.comment = form.querySelector('.form__comment').value
        this.status = "active"
    }
    // getInfo() {
    //     this.doctor = form.querySelector('.form__selector-doctors').value
    //     this.name = form.querySelector('.form__patient-name').value
    //     this.priority = form.querySelector('.form__selector-urgency').value
    //     this.purpose = form.querySelector('.form__purpose').value
    //     this.description = form.querySelector('.form__description').value
    //     this.lastVisit = form.querySelector('.form__last-visit').value
    //     this.age = form.querySelector('.form__age').value
    //     this.pulse = form.querySelector('.form__pulse').value
    //     this.massIndex = form.querySelector('.form__mass-index').value
    //     this.pastDiseases = form.querySelector('.form__past-diseases').value
    //     this.error = form.querySelector('.form__comment').value
    //     this.status = "active"
    // }
}



async function sendInfo(data) {
    const token = sessionStorage.getItem('token');

    try {
        const response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json()
        console.log('Response data:', responseData)
        console.log(responseData)
        data.id = responseData.id
        return responseData

    }
    catch (error) {
        console.error('Error sending data:', error)
        throw new Error(error)
    }
}
// async function deleteCards(id) {
//     const token = sessionStorage.getItem('token');

//     console.log(id);
//     try {
//         const response = await fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             },
//         });

//     } catch (error) {
//         console.error('Error sending data:', error)
//         throw new Error(error)
//     }
// }

// class LS {
//     constructor() {
//         this.retrieveStoredCards()
//     }

//     saveToLocalStorage(data) {
//         let cardsData = JSON.parse(localStorage.getItem('storedCards')) || []
//         cardsData.push(data)
//         localStorage.setItem('storedCards', JSON.stringify(cardsData))
//     }

//     retrieveStoredCards() {
//         const cardsData = JSON.parse(localStorage.getItem('storedCards')) || []

//         cardsData.forEach(cardData => {
//             const card = new CreateVisit()
//             Object.assign(card, cardData)
//             card.id = cardData.id;
//             card.createCard()
//             card.deleteCard()
//         });
//     }
//     deleteCard(id) {
//         console.log(id);
//         let cardsData = JSON.parse(localStorage.getItem('storedCards')) || []
//         const index = cardsData.findIndex(cardData => cardData.id === id)
//         if (index !== -1) {
//             cardsData.splice(index, 1)
//             localStorage.setItem('storedCards', JSON.stringify(cardsData))
//         } else {
//             console.log('карточка не знайдена')
//         }
//     }
// }

// const saveCards = new LS()
