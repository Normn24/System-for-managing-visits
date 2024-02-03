const tokenAPI = 'https://ajax.test-danit.com/api/v2/cards/login';

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
            return response.text();
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
        }
    }
}

login();