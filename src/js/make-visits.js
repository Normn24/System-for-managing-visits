
const header = document.querySelector('header')
const headerGreetings = document.querySelectorAll('.header__greetings')
const headerAppointmentHeading = document.querySelectorAll('.header__appointment-heading')

const btnCreateVisit = document.createElement('button')
btnCreateVisit.classList.add('form__button-create-visit')
btnCreateVisit.innerHTML = 'Створити візит'
class Module {
    constructor() {
        this.btnCloseForm
        this.form
    }

    makeForm() {
        const form = document.createElement('form')
        form.classList.add('header__form')
        form.classList.add('form')
       header.appendChild(form);
        const btnCloseForm = document.createElement('button');
        this.btnCloseForm = btnCloseForm
       btnCloseForm.innerText = 'Закрити'
           btnCloseForm.classList.add('form__button-close-form')


        this.form = form
    }

    closeForm() {
        this.form.appendChild(this.btnCloseForm);
        this.btnCloseForm.addEventListener('click', () => {
            header.removeChild(this.form);
            headerAppointmentHeading.forEach((element)=>{
                element.style.display = 'flex'
            })
            headerGreetings.forEach((element)=>{
                element.style.display = 'flex'
            })
        })
    }
    sendInfo(){
        if(btnCreateVisit){
         btnCreateVisit.addEventListener('click', async () => {
            event.preventDefault();
                const data = new CreateVisit();
                data.getInfo()
            
                try {
             await sendInfo(data)
            
                    data.createCard()
            
                } catch (error) {
                    console.error('Error sending data:', error);
                 
                }
            })
            
        }
    }
}
const selectMenuDoctors = document.createElement('select')
selectMenuDoctors.classList.add('form__selector-doctors')
this.selectedMenuDoctors = selectMenuDoctors
const defaultOption = document.createElement('option')
defaultOption.style.display = 'none'
defaultOption.selected = true;
const therapist = document.createElement('option')
therapist.value = 'Терапевт'
therapist.innerText = "Терапевт"
therapist.classList.add(`form__selector-option`)
const cardiologist = document.createElement('option')
cardiologist.value = 'Кардіолог'
cardiologist.classList.add(`form__selector-option`)
cardiologist.innerText = 'Кардіолог'
const dentist = document.createElement('option')
dentist.classList.add(`form__selector-option`)
dentist.value = 'Стоматолог'
dentist.innerText = 'Стоматолог'
selectMenuDoctors.appendChild(defaultOption)
selectMenuDoctors.appendChild(therapist)
selectMenuDoctors.appendChild(cardiologist)
selectMenuDoctors.appendChild(dentist)
class Visit {
    constructor() {
        this.form 
        this.dontAddElements = true
        this.therapist
    }

    chooseDoctor(form) {
        const chooseDoctors = document.createElement('p');
        chooseDoctors.innerText = 'Оберіть лікаря:'

        form.appendChild(chooseDoctors)
        form.appendChild(selectMenuDoctors)
    }
    makeOptions(form) {
        if (selectMenuDoctors && this.dontAddElements === true) {
            this.dontAddElements = false
    
            const changeHandler = () => {
                const purposeVisitTitle = document.createElement('p')
                purposeVisitTitle.innerText = 'Мета візиту:'
               
                const purposeVisit = document.createElement('input')
                purposeVisit.classList.add('form__purpose')
                const descriptionVisitTitle = document.createElement('p')

                descriptionVisitTitle.innerText = 'Подробиці візиту:'
                const descriptionVisit = document.createElement('input')
                descriptionVisit.classList.add('form__description')
                const urgencyVisitTitle = document.createElement('p')
                urgencyVisitTitle.innerText = 'Терміновість візиту:'
                const urgencyVisit = document.createElement('select')
                urgencyVisit.classList.add('form__selector-urgency')
                const defaultOptionSec = document.createElement('option')
defaultOptionSec.style.display = 'none'
defaultOptionSec.selected = true;
                const urgencyHigh = document.createElement('option')
                urgencyHigh.value = 'Висока'
                urgencyHigh.innerText = 'Висока'
                const urgencyNormal = document.createElement('option')
                urgencyNormal.value = 'Нормальна'
                urgencyNormal.innerText = 'Нормальна'
                const urgencyLow = document.createElement('option')
                urgencyLow.value = 'Низька'
                urgencyLow.innerText = 'Низька'
                const fullNameTitle = document.createElement('p')
                fullNameTitle.innerText = `Введіть своє повне ім'я:`
                const fullName = document.createElement('input')
                fullName.classList.add(('form__patient-name'))
                form.appendChild(purposeVisitTitle)
                form.appendChild(purposeVisit)
                form.appendChild(descriptionVisitTitle)
                form.appendChild(descriptionVisit)
                form.appendChild(urgencyVisitTitle)
                form.appendChild(urgencyVisit)
                urgencyVisit.appendChild(defaultOptionSec)
                urgencyVisit.appendChild(urgencyHigh)
                urgencyVisit.appendChild(urgencyNormal)
                urgencyVisit.appendChild(urgencyLow)
                form.appendChild(fullNameTitle)
                form.appendChild(fullName)
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

    doctorNotes(form, btnClose, btnCreate) {
        const dateLastVisitTitle = document.createElement('p')
        dateLastVisitTitle.innerText = 'Введіть дату останього візиту:'
        const dateLastVisit = document.createElement('input')
        dateLastVisit.classList.add('form__last-visit')
        dateLastVisit.type = 'date';

        if (selectMenuDoctors) {
            selectMenuDoctors.addEventListener('change', () => {
                if (selectMenuDoctors.value === 'Стоматолог') {
                    form.appendChild(dateLastVisitTitle)
                    form.appendChild(dateLastVisit)

                    if (btnClose) {
                        form.removeChild(btnClose)
                        form.appendChild(btnClose)
                    }
                } else {
                    form.removeChild(dateLastVisitTitle);
                    form.removeChild(dateLastVisit);
                }
                form.appendChild(btnCreate);
            });
        }
    }
}

class VisitTherapist extends Visit {
    constructor() {
        super();
    }

    doctorNotes(form, btnClose, btnCreate) {
        const ageTitle = document.createElement('p');
        ageTitle.innerText = 'Введіть свій вік:';
        const age = document.createElement('input');
        age.classList.add('form__age')
        if (selectMenuDoctors) {
            selectMenuDoctors.addEventListener('change', () => {
                if ("Терапевт" === selectMenuDoctors.value) {
                    form.appendChild(ageTitle)
                    form.appendChild(age)

                    if (btnClose) {
                        form.removeChild(btnClose)
                        form.appendChild(btnClose)
                    }
                } else {
                    form.removeChild(ageTitle)
                    form.removeChild(age)
                }

                form.appendChild(btnCreate);
            });
        }
    }
}

class VisitCardiologist extends Visit {
    constructor() {
        super();
    }

    doctorNotes(form, btnClose, btnCreate) {
        const ageTitle = document.createElement('p');
        ageTitle.innerText = 'Введіть свій вік:';
        const age = document.createElement('input');
        age.classList.add('form__age')
        const normalPulseTitle = document.createElement('p');
        normalPulseTitle.innerText = 'Введіть свій тиск у звичайному стані:';
        const normalPulse = document.createElement('input');
        normalPulse.classList.add('form__pulse')
        const bodyMassIndexTitle = document.createElement('p');
        bodyMassIndexTitle.innerText = 'Введіть індекс маси тіла:';
        const bodyMassIndex = document.createElement('input');
        bodyMassIndex.classList.add('form__mass-index')
        const pastDiseaseCardiovascularSystemTitle = document.createElement('p');
        pastDiseaseCardiovascularSystemTitle.innerText = "Впишіть у поле, якщо перенесли захворювання серцево-судинної системи:";
        const pastDiseaseCardiovascularSystem = document.createElement('input');
pastDiseaseCardiovascularSystem.classList.add('form__past-diseases')
        if (selectMenuDoctors) {
            selectMenuDoctors.addEventListener('click', () => {
                if (selectMenuDoctors.value === "Кардіолог") {
                    form.appendChild(ageTitle);
                    form.appendChild(age);
                    form.appendChild(normalPulseTitle);
                    form.appendChild(normalPulse);
                    form.appendChild(bodyMassIndexTitle);
                    form.appendChild(bodyMassIndex);
                    form.appendChild(pastDiseaseCardiovascularSystemTitle);
                    form.appendChild(pastDiseaseCardiovascularSystem);

                    if (btnClose) {
                        form.removeChild(btnClose);
                        form.appendChild(btnClose);
                    }
                } else {
                    form.removeChild(ageTitle);
                    form.removeChild(age);
                    form.removeChild(normalPulseTitle);
                    form.removeChild(normalPulse);
                    form.removeChild(bodyMassIndexTitle);
                    form.removeChild(bodyMassIndex);
                    form.removeChild(pastDiseaseCardiovascularSystemTitle);
                    form.removeChild(pastDiseaseCardiovascularSystem);
                }
                form.appendChild(btnCreate);
            });
        }
    }
}

const btnMakeForm = document.querySelector('.header__btn-make-visit');
btnMakeForm.addEventListener('click', () => {
    headerAppointmentHeading.forEach((Element)=>{
        Element.style.display = 'none';
    });
    headerGreetings.forEach((Element)=>{
        Element.style.display = 'none';
    });
    
    const module = new Module();
    module.makeForm();
    
    const visit = new Visit();
    visit.chooseDoctor(module.form);
    visit.makeOptions(module.form, module.btnCloseForm);
    const visitDentist = new VisitDentist();
    visitDentist.doctorNotes(module.form, module.btnCloseForm, btnCreateVisit);
    
    const visitTherapist = new VisitTherapist();
    visitTherapist.doctorNotes(module.form, module.btnCloseForm, btnCreateVisit);
    
    const visitCardiologist = new VisitCardiologist();
    visitCardiologist.doctorNotes(module.form, module.btnCloseForm, btnCreateVisit);
    module.sendInfo()
    module.closeForm()

});

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
    }
    getInfo(){
        document.querySelectorAll('.form__selector-doctors').forEach((element)=>{
         this.doctor = element.value
        }
        )
        document.querySelectorAll('.form__patient-name').forEach((element)=>{
            this.name = element.value
           })
           document.querySelectorAll(`.form__selector-urgency`).forEach((element)=>{
this.urgency = element.value
           })
           document.querySelectorAll(`.form__purpose`).forEach((element)=>{
            this.purpose = element.value
           })
           document.querySelectorAll('.form__description').forEach((element)=>{
            this.description = element.value
           })
           document.querySelectorAll('.form__last-visit').forEach((element)=>{
            this.lastVisit = element.value
           })
           document.querySelectorAll('.form__age').forEach((element)=>{
            this.age = element.value
           })
           document.querySelectorAll('.form__pulse').forEach((element)=>{
            this.pulse = element.value
           })
           document.querySelectorAll('.form__mass-index').forEach((element)=>{
            this.massIndex = element.value
           })
           document.querySelectorAll('.form__past-diseases').forEach((element)=>{
            this.pastDiseases = element.value
           })
    }
    createCard(){
        const main = document.querySelector('main')
        const card = document.createElement('div')   
        card.classList.add ('card')
const typeDoctor = document.createElement('p')
typeDoctor.innerText = `${this.doctor}`
const namePatient = document.createElement('p')
namePatient.innerText = `${this.name}`
main.appendChild(card)
card.appendChild(typeDoctor)
card.appendChild(namePatient)
const btnMoreInfo = document.createElement('button')
btnMoreInfo.innerText = 'Показати більше'
card.appendChild(btnMoreInfo)
btnMoreInfo.addEventListener('click', ()=>{
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
 statusVisitText.innerText = `Статус візиту: ${statusVisitValue}`
    const ageText = document.createElement('p')
    ageText.innerText = `${age}`
    const urgencyText = document.createElement('p')
    urgencyText.innerText = `Терміновість: ${urgency}`
    const purposeText = document.createElement('p');
    purposeText.innerText = `Ціль візиту: ${purpose}`;
    const lastVisitText = document.createElement('p')
    lastVisitText.innerText = `${lastVisit}`
    const massIndexText = document.createElement('p')
    massIndexText.innerText = `${massIndex}`
    const pastDiseasesText = document.createElement('p')
    pastDiseasesText.innerText = `Інформація про перенесені захворювання серцево-судинної системи: ${pastDiseases}`
    const descriptionText = document.createElement('p')
    descriptionText.innerText = `Нотатки до візиту: ${description}`
    const pulseText = document.createElement('p')
    pulseText.innerText = `Пульс у звичайному стані: ${pulse}`
    if(this.doctor === 'Кардіолог'){
        card.appendChild(ageText)
        card.appendChild(pulseText)
        card.appendChild(massIndexText)
        card.appendChild(pastDiseasesText)
    }
    if(this.doctor === 'Терапевт'){
        card.appendChild(ageText)
    }
    if(this.doctor === 'Стоматолог'){
        card.appendChild(lastVisitText)
    }
    card.appendChild(urgencyText)
    card.appendChild(purposeText);
    card.appendChild(descriptionText)
card.appendChild(statusVisitText)
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
        const responseData = await response.json();
        console.log('Response data:', responseData);
        document.querySelectorAll(`.form input, .form select`).forEach((element)=>{
            element.value = ''
        })
       return responseData; 
    } catch (error) {
        console.error('Error sending data:', error);
        throw new Error(error);
    }
}

