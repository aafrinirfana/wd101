// Helper function to calculate age from date of birth
function calculateAge(dob) {
    const birthDate = new Date(dob);
    const diff = Date.now() - birthDate.getTime();
    const age = new Date(diff).getUTCFullYear() - 1970;
    return age;
}

// Load existing users from local storage and display them in the table
function loadUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = '';

    users.forEach((user) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.dob}</td>
            <td>${user.terms ? 'true' : 'false'}</td>
        `;
        userTableBody.appendChild(row);
    });
}

// Handle form submission
document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const terms = document.getElementById('terms').checked;

    const age = calculateAge(dob);

    // Validate the age (18 to 55 years only)
    if (age < 18 || age > 55) {
        alert('Age must be between 18 and 55');
        return;
    }

    const user = { name, email, password, dob, terms };

    // Save the user to local storage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    // Clear the form
    document.getElementById('registrationForm').reset();

    // Reload the users in the table
    loadUsers();
});

// Load users when the page is loaded
window.onload = loadUsers;
