function main () {
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

    let students;

    if(localStorage.getItem('students') === null) {
        students = [];

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
    
    const form = document.querySelector('form');

    form.reset();
    
    function formSubmitted(e) {
        if (students.findIndex(x => x.firstName === e.target[1].value && x.lastName === e.target[2].value 
            && x.dateOfBirth === e.target[3].value && x.tuitionFees === +e.target[4].value) === -1) {
            students.push(new Student(e.target[1].value, e.target[2].value, e.target[3].value, +e.target[4].value));
            localStorage.setItem('students', JSON.stringify(students));
            localStorage.setItem('student_counter', student_counter);
        }
        else {
            $('#alertModal').modal('show');
            e.preventDefault();
        }
    }
    form.addEventListener('submit',formSubmitted);

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
    
    toggleButton();
}
window.addEventListener('load', main);