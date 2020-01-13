function main () {
    let students;
    if(localStorage.getItem('students') === null) {
        students = [];

        let student_counter;
        if (localStorage.getItem('student_counter') === null) {
            student_counter = 1;
        }
        else {
            student_counter = +localStorage.getItem('student_counter');
        }
        function Student(firstName, lastName, dateOfBirth, tuitionFees){
            this.id = student_counter++;
            this.firstName = firstName;
            this.lastName = lastName;
            this.dateOfBirth = dateOfBirth;
            this.tuitionFees = tuitionFees;
        }

        students.push(new Student('Markos', 'Markou', '1992-01-24', 2500));
        students.push(new Student('Kostas', 'Ioannou', '1985-05-10', 2250));
        students.push(new Student('Maria', 'Oikonomou', '1990-02-15', 4500));
        students.push(new Student('Giannis', 'Kotsianis', '1995-02-20', 4500));
        students.push(new Student('Nikos', 'Nikolaou', '1994-01-25', 2500));
        students.push(new Student('Pantelis', 'Koutlas', '1980-08-10', 2500));
        localStorage.setItem('students', JSON.stringify(students));
        localStorage.setItem('student_counter', student_counter);
    }
    else {
        students = JSON.parse(localStorage.getItem('students'));
    }

    let studentsPerCourse;

    if(localStorage.getItem('studentsPerCourse') === null) {
        function StudentPerCourse(courseId, studentId){
            this.courseId = courseId;
            this.studentId = studentId;
        }

        studentsPerCourse = [];

        studentsPerCourse.push(new StudentPerCourse(1, 1));
        studentsPerCourse.push(new StudentPerCourse(2, 2));
        studentsPerCourse.push(new StudentPerCourse(1, 3));
        studentsPerCourse.push(new StudentPerCourse(2, 3));
        studentsPerCourse.push(new StudentPerCourse(3, 5));
        localStorage.setItem('studentsPerCourse', JSON.stringify(studentsPerCourse));
    }
    else {
        studentsPerCourse = JSON.parse(localStorage.getItem('studentsPerCourse'));
    }

    let assignmentsPerStudentPerCourse;

    if(localStorage.getItem('assignmentsPerStudentPerCourse') === null) {
        function AssignmentPerStudentPerCourse(studentId, courseId, assignmentId, studentsOralMark, studentsTotalMark) {
            this.studentId = studentId;
            this.courseId = courseId;
            this.assignmentId = assignmentId;
            this.studentsOralMark = studentsOralMark;
            this.studentsTotalMark = studentsTotalMark;
        }

        assignmentsPerStudentPerCourse = [];

        assignmentsPerStudentPerCourse.push(new AssignmentPerStudentPerCourse(1, 1, 1, 20, 88));
        assignmentsPerStudentPerCourse.push(new AssignmentPerStudentPerCourse(3, 1, 2, 18, 85));
        assignmentsPerStudentPerCourse.push(new AssignmentPerStudentPerCourse(5, 3, 8, 23, 90));
        localStorage.setItem('assignmentsPerStudentPerCourse', JSON.stringify(assignmentsPerStudentPerCourse));
    }
    else {
        assignmentsPerStudentPerCourse = JSON.parse(localStorage.getItem('assignmentsPerStudentPerCourse'));
    }

    const select = document.querySelector('#studentToEdit') ? document.querySelector('#studentToEdit') : document.querySelector('#studentToUpdate');
    const defaultOption = document.createElement('option');
    defaultOption.setAttribute('value', 'default');
    defaultOption.innerText = 'Select a student';
    select.appendChild(defaultOption);

    for (let student of students) {
        const option = document.createElement('option');
        option.setAttribute('value', `${student.id};${student.firstName};${student.lastName};${student.dateOfBirth};${student.tuitionFees}`);
        option.innerText = `Id: ${student.id}, First Name: ${student.firstName}, Last Name: ${student.lastName}, Date of Birth: ${student.dateOfBirth.split('-')[1]}/${student.dateOfBirth.split('-')[2]}/${student.dateOfBirth.split('-')[0]}, Tuition Fees: ${student.tuitionFees}`;
        select.appendChild(option);
    }

    for (let option of select.children) {
        option.removeAttribute('selected');
    }
    select.children[0].setAttribute('selected','');

    function optionSelected(e) {
        const value = e.target.value;
        const form = document.querySelector('form');
        form.reset();
        if (value === 'default'){
            form.style.display = 'none';
        }
        else {
            form.style.display = 'initial';
            const formElements = document.querySelectorAll('.formElement');
            const optionValues = value.split(';');
            for (let i = 0; i < formElements.length ; i++) {
                formElements[i].children[1].setAttribute('value', optionValues[i]);
                if (i === formElements.length - 1) {
                    formElements[i].children[1].style.maxWidth = 'initial';
                }
            }
        }
        toggleButton();
    }

    select.addEventListener('change', optionSelected);

    const form = document.querySelector('form');

    function formSubmitted(e) {
        const id = +e.target[1].value;
        const firstName = e.target[2].value;
        const lastName = e.target[3].value;
        const dateOfBirth = e.target[4].value;
        const tuitionFees = e.target[5].value;

        if (students.findIndex(x => x.id != id && x.firstName === firstName && x.lastName === lastName 
            && x.dateOfBirth === dateOfBirth && x.tuitionFees === +tuitionFees) === -1) {
            let student = students.find(x => x.id === id);
            student.firstName = firstName;
            student.lastName = lastName;
            student.dateOfBirth = dateOfBirth;
            student.tuitionFees = tuitionFees;
            localStorage.setItem('students', JSON.stringify(students));
        }
        else {
            $('#alertModal').modal('show');
            e.preventDefault();
        }
    }
    form.addEventListener('submit',formSubmitted);

    const deleteButton = document.querySelector('.formSubmit button');

    function showDeleteModal(e) {
        e.preventDefault();
        $('#deleteModal').modal('show');
    }
    deleteButton.addEventListener('click', showDeleteModal);

    const modalDeleteButton = document.querySelector('#deleteStudent');

    function deleteStudent() {
        const studentId = +document.querySelector('#studentId').value;
        const index = students.findIndex(x => x.id === studentId);
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        let i = 0;
        while(i < studentsPerCourse.length){
            if (studentsPerCourse[i].studentId === studentId) {
                studentsPerCourse.splice(i,1);
            }
            else {
                i++;
            }
        }
        localStorage.setItem('studentsPerCourse', JSON.stringify(studentsPerCourse));
        i = 0;
        while(i < assignmentsPerStudentPerCourse.length){
            if (assignmentsPerStudentPerCourse[i].studentId === studentId) {
                assignmentsPerStudentPerCourse.splice(i,1);
            }
            else {
                i++;
            }
        }
        localStorage.setItem('assignmentsPerStudentPerCourse', JSON.stringify(assignmentsPerStudentPerCourse));
        window.location.href = '../Students/studentDeletedSuccessfully.html';
    }
    modalDeleteButton.addEventListener('click', deleteStudent);

    // Validation Code    
    const button = document.querySelector('.formSubmit input')
    const firstName = document.querySelector('#firstName');
    const lastName = document.querySelector('#lastName');
    const dateOfBirth = document.querySelector('#dateOfBirth');
    const tuitionFees = document.querySelector('#tuitionFeesAdd');

    const today = new Date();

    dateOfBirth.setAttribute('max', `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`);

    function toggleButton(){
        const regex1 = new RegExp('^[A-Z][a-z]*$');
        const regex2 = new RegExp('^[Α-Ω][α-ωάήίόέύώϊϋΐΰ]*$');
        if((regex1.test(firstName.value) || regex2.test(firstName.value)) && (regex1.test(lastName.value) || regex2.test(lastName.value)) && dateOfBirth.value != '' 
            && dateOfBirth.validity.valid && tuitionFees.value != '' && tuitionFees.value >= 0 && tuitionFees.validity.valid) {
            button.removeAttribute('disabled');
        } 
        else {
            button.setAttribute('disabled', '');
        }
        if (!(regex1.test(firstName.value) || regex2.test(firstName.value))) {
            document.querySelector('#firstNameError').style.display = 'initial';
        }
        else {
            document.querySelector('#firstNameError').style.display = 'none';
        }
        if (!(regex1.test(lastName.value) || regex2.test(lastName.value))) {
            document.querySelector('#lastNameError').style.display = 'initial';
        }
        else {
            document.querySelector('#lastNameError').style.display = 'none';
        }
        if (dateOfBirth.value === '' || !dateOfBirth.validity.valid) {
            document.querySelector('#dateOfBirthError').style.display = 'initial';
        }
        else {
            document.querySelector('#dateOfBirthError').style.display = 'none';
        }
        if (tuitionFees.value === '' || tuitionFees.value < 0 || !tuitionFees.validity.valid) {
            document.querySelector('#tuitionFeesAddError').style.display = 'initial';
            document.querySelector('#tuitionFeesAddError').style.width = '375px';
        }
        else {
            document.querySelector('#tuitionFeesAddError').style.display = 'none';
        }
    }    

    firstName.addEventListener('input', toggleButton);
    lastName.addEventListener('input', toggleButton);
    dateOfBirth.addEventListener('input', toggleButton);
    tuitionFees.addEventListener('input', toggleButton);
}
window.addEventListener('load', main);