

const btnMakeForm = document.querySelector('.header__btn-make-visit')
const header = document.querySelector('header')
const headerGreetings = document.querySelectorAll('.header__greetings')
const headerAppointmentHeading = document.querySelectorAll('.header__appointment-heading')
const main = document.querySelector('main')

const form = document.querySelector('.header__form')
const btnCloseForm = document.querySelector('.form__button-close-form')
const selectMenuDoctors = document.querySelector('.form__selector-doctors')
const purpose = document.querySelector('.form__purpose')
const description = document.querySelector('.form__description')
const selectUrgency = document.querySelector('.form__selector-urgency')
const fullName = document.querySelector('.form__patient-name')
const lastVisit = document.querySelector('.form__last-visit')
const age = document.querySelector('.form__age')
const pulse = document.querySelector('.form__pulse')
const massIndex = document.querySelector('.form__mass-index')
const pastDiseases = document.querySelector('.form__past-diseases')
const btnCreateVisit = document.querySelector('.form__button-create-visit')
const paragraphChooseDoctor = document.querySelector('.form__paragraph-choose-doctor')
const paragraphPurpose = document.querySelector('.form__paragraph-purpose')
const paragraphDescription = document.querySelector('.form__paragraph-description')
const paragraphUrgency = document.querySelector('.form__paragraph-urgency')
const paragraphName = document.querySelector('.form__paragraph-name')
const paragraphLastVisit = document.querySelector('.form__paragraph-last-visit')
const paragraphAge = document.querySelector('.form__paragraph-age')
const paragraphPulse = document.querySelector('.form__paragraph-pulse')
const paragraphMassIndex = document.querySelector('.form__paragraph-mass-index')
const paragraphPastDiseases = document.querySelector('.form__paragraph-past-diseases')
const paragraphError = document.querySelector('.form__error')
const paragraphComment = document.querySelector('.form__paragraph-comment')
const comment = document.querySelector('.form__comment')
btnMakeForm.addEventListener('click', () => {
    form.style.display = `flex`
    btnMakeForm.style.display = 'none'
});
let formData = []
class Module {
    constructor() {

    }


    closeForm() {
        const btn = document.getElementsByTagName('button')[0]
        header.addEventListener('click', (event) => { 
            if (form.style.display === 'flex') { 
                if (event.target !== form  && event.target !== btn && !form.contains(event.target)) {
                    form.style.display = 'none';
                    btnMakeForm.style.display = 'block'
                }
            }
        })
       btnCloseForm.addEventListener('click', () => {
        event.preventDefault()
            btnMakeForm.style.display = 'inline-block'
            form.style.display = 'none'
            headerGreetings.forEach((element)=>{
                element.style.display = 'flex'
            })
        })
       
    }
    sendInfo() {

        btnCreateVisit.addEventListener('click', async (event) => {
            event.preventDefault();
            const fields = Array.from(document.querySelectorAll('.form input, .form select')).some((element) => {
                if (window.getComputedStyle(element).display === 'none') {
                    return false; 
                }
                if (element.value === '' && element.getAttribute('placeholder') !== 'Введіть коментарій') {
                    const textError = element.getAttribute('placeholder') || element.getAttribute('name');
                    paragraphError.innerText = `*${textError}`;
                    paragraphError.style.display = 'block';
                    return true; 
                }
                return false; 
            });
    
            if (fields) {
               
                return;
            }
            paragraphError.style.display = 'none';
            const data = new CreateVisit();
            data.getInfo();
    form.style.display = 'none'
    btnMakeForm.style.display = 'block'
            try {
                await sendInfo(data);
                data.createCard();
                data.deleteCard();
                saveCards.saveToLocalStorage(data);
            } catch (error) {
                console.error('Error sending data:', error);
            }
        });
    }
 saveForm() {
        localStorage.setItem('formState', form.style.display);
        }
    
    
  getForm() {
        const savedState = localStorage.getItem('formState');
        if (savedState) {
            form.style.display = savedState;
        }}
        

}
  

class Visit {
    constructor() {

        this.dontAddElements = true

    }

    makeOptions() {
        if (selectMenuDoctors && this.dontAddElements === true) {
            this.dontAddElements = false
    
            const changeHandler = () => {
                paragraphPurpose.style.display = 'block'
                purpose.style.display = 'inline-block'
                paragraphDescription.style.display = 'block'
                description.style.display = 'block'
                paragraphUrgency.style.display = 'block'
                selectUrgency.style.display = 'block'
               paragraphName.style.display = 'block'
               fullName.style.display = 'block'
                btnCreateVisit.style.display = 'block'
                paragraphComment.style.display = 'block'
                    comment.style.display = 'block'
                header.style.height = '1000px'
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
                    paragraphLastVisit.style.display = 'block'
                    lastVisit.style.display = 'block'


                } else {
                    paragraphLastVisit.style.display = 'none'
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
                if (selectMenuDoctors.value === 'Терапевт' || selectMenuDoctors.value === "Therapist") {
                    paragraphAge.style.display = 'block'
                    age.style.display = 'block'
                } else {
                    paragraphAge.style.display = 'none'
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
                   paragraphPastDiseases.style.display = 'block'
                  pastDiseases.style.display = 'bloke'
                  paragraphMassIndex.style.display = 'block'
                  massIndex.style.display = 'block'
                    paragraphPastDiseases.style.display =  'block'
                    pastDiseases.style.display = 'block'

                } else {
                   paragraphPastDiseases.style.display = 'none'
                  pastDiseases.style.display = 'none'
                  paragraphMassIndex.style.display = 'none'
                  massIndex.style.display = 'none'
                    paragraphPastDiseases.style.display =  'none'
                    pastDiseases.style.display = 'none'
                }

            });
        }
    }
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
    constructor(){
this.doctor
this.name
this.urgency
this.purpose
this.lastVisit
this.age
this.pulse
this.massIndex
this.pastDiseases
this.statusVisit
this.card 
this.id
this.btnDelete
this.comment
    }
    getInfo(){
        this.doctor = form.querySelector('.form__selector-doctors').value
        this.name = form.querySelector('.form__patient-name').value
        this.urgency = form.querySelector('.form__selector-urgency').value
        this.purpose = form.querySelector('.form__purpose').value
        this.description = form.querySelector('.form__description').value
        this.lastVisit = form.querySelector('.form__last-visit').value
        this.age = form.querySelector('.form__age').value
        this.pulse = form.querySelector('.form__pulse').value
        this.massIndex = form.querySelector('.form__mass-index').value
        this.pastDiseases = form.querySelector('.form__past-diseases').value
        this.error = form.querySelector('.form__comment').value
    }
    createCard(){
        const card = document.createElement('div')   
        this.card = card
        const btnDelete = document.createElement('div')
        btnDelete.classList.add('card__delete-card')
        this.btnDelete = btnDelete
        this.card.appendChild(btnDelete)
        card.classList.add ('card')
const typeDoctor = document.createElement('p')
typeDoctor.innerText = `Visit to ${this.doctor}а`
const namePatient = document.createElement('p')
namePatient.innerText = `${this.name}`
main.appendChild(card)
card.appendChild(typeDoctor)
card.appendChild(namePatient)
const btnMoreInfo = document.createElement('button')
btnMoreInfo.innerText = 'Show more'
btnMoreInfo.classList.add('card__btn-more-info')
card.appendChild(btnMoreInfo)
btnMoreInfo.addEventListener('click', ()=>{
    btnMoreInfo.style.display = 'none'
    const age = this.age
    const purpose = this.purpose; 
    const lastVisit = this.lastVisit
    const urgency = this.urgency
    const massIndex = this.massIndex
    const description = this.description
    const pulse = this.pulse
const pastDiseases = this.pastDiseases
const statusVisit = document.createElement('select')
const statusOpen = document.createElement('option')
const statusDone = document.createElement('option')
statusOpen.value = 'Open';
statusOpen.innerText = 'Open';
statusDone.value = 'Done';
statusDone.innerText = 'Done';
statusOpen.selected = true
statusVisit.appendChild(statusOpen)
statusVisit.appendChild(statusDone)
this.statusVisit = statusVisit.value
const statusVisitValue = this.statusVisit
const statusVisitText = document.createElement('p')
 statusVisitText.innerText = `Status of the visit: ${statusVisitValue}`
    const ageText = document.createElement('p')
    ageText.innerText = `${age}`
    const urgencyText = document.createElement('p')
    urgencyText.innerText = `Urgency: ${urgency}`
    const purposeText = document.createElement('p');
    purposeText.innerText = `Purpose: ${purpose}`;
    const lastVisitText = document.createElement('p')
    lastVisitText.innerText = `${lastVisit}`
    const massIndexText = document.createElement('p')
    massIndexText.innerText = `${massIndex}`
    const pastDiseasesText = document.createElement('p')
    pastDiseasesText.innerText = `Information about previous diseases of the cardiovascular system: ${pastDiseases}`
    const descriptionText = document.createElement('p')
    descriptionText.innerText = `Notes for the visit: ${description}`
    const pulseText = document.createElement('p')
    pulseText.innerText = `The pulse is normal: ${pulse}`
    const comment = this.comment
    const commentText = document.createElement('p')
    commentText.innerText = `Comment: ${comment}`
    if(this.doctor === 'Cardiologist'){
        card.appendChild(ageText)
        card.appendChild(pulseText)
        card.appendChild(massIndexText)
        card.appendChild(pastDiseasesText)
    }
    if(this.doctor === 'Therapist'){
        card.appendChild(ageText)
    }
    if(this.doctor === 'Dentist'){
        card.appendChild(lastVisitText)
    }
    card.appendChild(urgencyText)
    card.appendChild(purposeText)
    card.appendChild(descriptionText)
card.appendChild(statusVisitText)
card.appendChild(commentText)
})}

deleteCard(){
this.btnDelete.addEventListener('click', async ()=>{

    try {
 await deleteCards(this.id)
saveCards.deleteCard(this.id)
main.removeChild(this.card)
    } catch (error) {
        console.error('Error sending data:', error)
     
    }
})
}

        }
    
async function sendInfo(data) {

    try {
        const response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 93d2380e-85c6-455b-bdc8-9c60e32adeec`
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
async function deleteCards(id){
    console.log(id);
    try {
        const response = await fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 93d2380e-85c6-455b-bdc8-9c60e32adeec`
            },
        });

    } catch (error) {
        console.error('Error sending data:', error)
        throw new Error(error)
    }
}

class LS{
    constructor(){
        this.retrieveStoredCards()
    }
    
saveToLocalStorage(data) {
    let cardsData = JSON.parse(localStorage.getItem('storedCards')) || []
    cardsData.push(data)
    localStorage.setItem('storedCards', JSON.stringify(cardsData))
}

retrieveStoredCards() {
    const cardsData = JSON.parse(localStorage.getItem('storedCards')) || []
 
    cardsData.forEach(cardData => {
        const card = new CreateVisit()
        Object.assign(card, cardData)
        card.id = cardData.id; 
        card.createCard()
        card.deleteCard()
    });}
        deleteCard(id) {
            console.log(id);
            let cardsData = JSON.parse(localStorage.getItem('storedCards')) || []
            const index = cardsData.findIndex(cardData => cardData.id === id)
            if (index !== -1) {
                cardsData.splice(index, 1)
                localStorage.setItem('storedCards', JSON.stringify(cardsData))
            } else {
                console.log('карточка не знайдена')
            }
        }
    }

const saveCards = new LS()
