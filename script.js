let students = [];
let isEditing = false;
let editingIndex = -1;

const addStudentForm = document.getElementById('addStudentForm');
const studentTable = document.getElementById('studentTable');
const editStudentForm = document.getElementById('editStudentForm');

// Load data from local storage if available
const storedStudents = JSON.parse(localStorage.getItem('students'));
if (storedStudents) {
    students = storedStudents;
    renderStudentTable();
}

function renderStudentTable() {
    const tbody = studentTable.querySelector('tbody');
    tbody.innerHTML = '';

    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Save data to local storage
    localStorage.setItem('students', JSON.stringify(students));
}

function addStudent(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;

    if (isEditing) {
        students[editingIndex] = { name, age };
        isEditing = false;
        editingIndex = -1;
    } else {
        students.push({ name, age });
    }

    renderStudentTable();
    addStudentForm.reset();
}

function editStudent(index) {
    isEditing = true;
    editingIndex = index;
    const student = students[index];
    document.getElementById('name').value = student.name;
    document.getElementById('age').value = student.age;
}

function deleteStudent(index) {
    students.splice(index, 1);
    renderStudentTable();
}

addStudentForm.addEventListener('submit', addStudent);

// Initial rendering of the student table
renderStudentTable();
