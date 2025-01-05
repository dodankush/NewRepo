// Register user
document.getElementById('register-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        alert('Registration successful');
        window.location.href = 'login.html';
    } else {
        alert('Registration failed');
    }
});

// Login user
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        window.location.href = 'employees.html';
        loadEmployees() 
        
    } else {
        alert('Login failed');
    }
});


async function loadEmployees() {
    const response = await fetch('/api/employee', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
    const emplpoyees = await response.json();
    const tableBody = document.querySelector('tbody'); // Reference the <tbody> element
    tableBody.innerHTML = ''; // Clear existing rows

    emplpoyees.forEach((emplpoyee, index) => {
        const row = document.createElement('tr'); // Create a new table row

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${emplpoyee.name}</td>
            <td>${emplpoyee.designation}</td>
            <td>${new Date(emplpoyee.dateOfBirth).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/\s/g, '-')}</td>
            <td>${new Date(emplpoyee.dateOfJoining).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/\s/g, '-')}</td>             
             <td>${emplpoyee.contactNo}</td>
             <td>${emplpoyee.skillSet}</td>
         
            <td>
                <a href="#" class="view" title="View" data-toggle="tooltip" onclick="viewEmployee(${emplpoyee.id})">
                    <i class="material-icons">&#xE417;</i>
                </a>
                <a href="#" class="edit" title="Edit" data-toggle="tooltip" onclick="navigateToUpdateEmployee(${emplpoyee.id})">
                    <i class="material-icons">&#xE254;</i>
                </a>
                <a href="#" class="delete" title="Delete" data-toggle="tooltip" onclick="deleteEmployee(${emplpoyee.id})">
                    <i class="material-icons">&#xE872;</i>
                </a>
            </td>
        `;

        tableBody.appendChild(row); // Append the row to the table body
    });
}



// Navigate to add employee page
function navigateToAddEmployee() {
    window.location.href = 'createEmployee.html';
}

// Navigate to update employee page
function navigateToUpdateEmployee(id) {
    window.location.href = `employeedetail.html?id=${id}`;
}
// Navigate to  employee detail page
function viewEmployee(id) {
    window.location.href = `viewEmployee.html?id=${id}`;
}


// Add or update employee
document.getElementById('add-employee')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const designation = document.getElementById('Designation').value;
    const dateOfBirth = document.getElementById('DateOfBirth').value;  
    const dateOfJoining = document.getElementById('DateOfJoining').value;
    const contactNo = document.getElementById('ContactNo').value;
    const skillSet = document.getElementById('SkillSet').value;
  

    const response = await fetch('/api/employee', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({ name, designation, dateOfBirth , dateOfJoining , contactNo , skillSet  })
    });

    if (response.ok) {
        alert('Employee saved successfully');
        window.location.href = 'employees.html';
    } else {
        alert('Failed to save employee');
    }
});

document.getElementById('employeedetail')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const designation = document.getElementById('Designation').value;
    const dateOfBirth = document.getElementById('DateOfBirth').value;
    const dateOfJoining = document.getElementById('DateOfJoining').value;
    const contactNo = document.getElementById('ContactNo').value;
    const skillSet = document.getElementById('SkillSet').value;

    const id = new URLSearchParams(window.location.search).get('id');
    const url = `/api/employee/${id}` 
    const response = await fetch(url,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({ id, name, designation, dateOfBirth, dateOfJoining, contactNo, skillSet })
    });

    if (response.ok) {
        alert('Employee saved successfully');
        window.location.href = 'employees.html';
    } else {
        alert('Failed to save ewwwmployee');
    }
});
document.getElementById('viewemployeedetail')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const designation = document.getElementById('Designation').value;
    const dateOfBirth = document.getElementById('DateOfBirth').value;
    const dateOfJoining = document.getElementById('DateOfJoining').value;
    const contactNo = document.getElementById('ContactNo').value;
    const skillSet = document.getElementById('SkillSet').value;

    const id = new URLSearchParams(window.location.search).get('id');
    const url = `/api/employee/${id}`
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({ id, name, designation, dateOfBirth, dateOfJoining, contactNo, skillSet })
    });

    if (response.ok) {
        alert('Employee saved successfully');
        window.location.href = 'employees.html';
    } else {
        alert('Failed to save ewwwmployee');
    }
});
// Delete employeeasync function deleteEmployee(id) {
    const userConfirmed = confirm("Are you sure you want to delete this employee?");

    if (userConfirmed) {
        const response = await fetch(`/api/employee/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });

        if (response.ok) {
            alert('Employee deleted successfully');
            loadEmployees();
        } else {
            alert('Failed to delete employee');
        }
    } else {
        alert('Employee not deleted');
    }
}

// Load employee details for update
document.addEventListener('DOMContentLoaded', async () => {
    const id = new URLSearchParams(window.location.search).get('id');
    if (id) {
        const response = await fetch(`/api/employee/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        const employee = await response.json();
        document.getElementById('name').value = employee.name;        
        document.getElementById('Designation').value = employee.designation;
        document.getElementById('DateOfBirth').value = employee.dateOfBirth;
        document.getElementById('DateOfJoining').value = employee.dateOfJoining;
        document.getElementById('ContactNo').value = employee.contactNo;
        document.getElementById('SkillSet').value = employee.skillSet;
        
    }
});

