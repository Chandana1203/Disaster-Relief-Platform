
function showFlashMessage(message, type) {
    const flashMessage = document.getElementById('flash-message');
    flashMessage.textContent = message;
    flashMessage.className = `flash-message ${type}`;
    flashMessage.style.display = 'block';
    setTimeout(() => {
        flashMessage.style.display = 'none';
    }, 3000);
}

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    if (response.ok) {
        showFlashMessage(result.message, 'success');
    } else {
        showFlashMessage(result.message, 'error');
    }
});

document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const location = document.getElementById('location').value;
    const skills = document.getElementById('skills').value;
    const availability = document.getElementById('availability').value;
    const username = document.getElementById('username-register').value;
    const password = document.getElementById('password-register').value;

    const response = await fetch('/api/volunteers/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, location, skills, availability, username, password })
    });

    const result = await response.json();
    if (response.ok) {
        showFlashMessage(result.message, 'success');
    } else {
        showFlashMessage(result.message, 'error');
    }
});

document.getElementById('incidentForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const contact = document.getElementById('contact').value;
    const location = document.getElementById('location').value;
    const need = document.getElementById('need').value;
    const urgency = document.getElementById('urgency').value;

    const response = await fetch('/api/incidents/incident', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact, location, need, urgency })
    });

    const result = await response.text();
    if (response.ok) {
        showFlashMessage(result, 'success');
    } else {
        showFlashMessage('Error:'+result, 'error');
    }
});
