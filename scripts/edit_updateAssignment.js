function main () {
    let assignments;

    if(localStorage.getItem('assignments') === null) {
        assignments = [];

        let assignment_counter;
        if (localStorage.getItem('assignment_counter') === null) {
            assignment_counter = 1;
        }
        else {
            assignment_counter = +localStorage.getItem('assignment_counter');
        }

        function Assignment(title, description, subDate, subTime, oralMark, totalMark){
            this.id = assignment_counter++;
            this.title = title;
            this.description = description;
            this.subDate = subDate;
            this.subTime = subTime;
            this.oralMark = oralMark;
            this.totalMark = totalMark;
        }

        assignments.push(new Assignment('C# Console App', 'In this assignment you need to create a console app in C#.', '2019-12-12', '23:59:59', 25, 100));
        assignments.push(new Assignment('C# Console App 2', 'In this assignment you need to create another console app in C#.', '2019-12-22', '23:59:59', 25, 100));
        assignments.push(new Assignment('Java Console App', 'In this assignment you need to create a console app in Java.', '2020-03-10', '23:59:59', 25, 100));
        assignments.push(new Assignment('Java Console App 2', 'In this assignment you need to create another console app in Java.', '2020-03-21', '23:59:59', 25, 100));
        assignments.push(new Assignment('Website', 'In this assignment you need to create a website using HTML, CSS and Javascript.', '2020-01-13', '23:59:59', 25, 100));
        assignments.push(new Assignment('Website 2', 'In this assignment you need to create a website using HTML, CSS and Javascript.', '2019-12-13', '23:59:59', 25, 100));
        assignments.push(new Assignment('C# Console App 3', 'In this assignment you need to create a console app in C#.', '2020-01-08', '23:59:59', 25, 100));
        assignments.push(new Assignment('SQL Assignment', 'In this assignment you need to create a database and make queries to it', '2020-02-21', '23:59:59', 25, 100));
        localStorage.setItem('assignments', JSON.stringify(assignments));
        localStorage.setItem('assignment_counter', assignment_counter);
    }
    else {
        assignments = JSON.parse(localStorage.getItem('assignments'));
    }

    let assignmentsPerCourse;

    if(localStorage.getItem('assignmentsPerCourse') === null) {
        assignmentsPerCourse = [];

        function AssignmentPerCourse(courseId, assignmentId){
            this.courseId = courseId;
            this.assignmentId = assignmentId;
        }

        assignmentsPerCourse.push(new AssignmentPerCourse(1, 1));
        assignmentsPerCourse.push(new AssignmentPerCourse(1, 2));
        assignmentsPerCourse.push(new AssignmentPerCourse(2, 3));
        assignmentsPerCourse.push(new AssignmentPerCourse(3, 7));
        assignmentsPerCourse.push(new AssignmentPerCourse(4, 8));
        localStorage.setItem('assignmentsPerCourse', JSON.stringify(assignmentsPerCourse));
    }
    else {
        assignmentsPerCourse = JSON.parse(localStorage.getItem('assignmentsPerCourse'));
    }

    let assignmentsPerStudentPerCourse;

    if(localStorage.getItem('assignmentsPerStudentPerCourse') === null) {
        assignmentsPerStudentPerCourse = [];

        function AssignmentPerStudentPerCourse(studentId, courseId, assignmentId, studentsOralMark, studentsTotalMark) {
            this.studentId = studentId;
            this.courseId = courseId;
            this.assignmentId = assignmentId;
            this.studentsOralMark = studentsOralMark;
            this.studentsTotalMark = studentsTotalMark;
        }

        assignmentsPerStudentPerCourse.push(new AssignmentPerStudentPerCourse(1, 1, 1, 20, 88));
        assignmentsPerStudentPerCourse.push(new AssignmentPerStudentPerCourse(3, 1, 2, 18, 85));
        assignmentsPerStudentPerCourse.push(new AssignmentPerStudentPerCourse(5, 3, 8, 23, 90));
        localStorage.setItem('assignmentsPerStudentPerCourse', JSON.stringify(assignmentsPerStudentPerCourse));
    }
    else {
        assignmentsPerStudentPerCourse = JSON.parse(localStorage.getItem('assignmentsPerStudentPerCourse'));
    }

    const select = document.querySelector('#assignmentToEdit') ? document.querySelector('#assignmentToEdit') : document.querySelector('#assignmentToUpdate');
    const defaultOption = document.createElement('option');
    defaultOption.setAttribute('value', 'default');
    defaultOption.innerText = 'Select an assignment';
    select.appendChild(defaultOption);

    for (let assignment of assignments) {
        const option = document.createElement('option');
        option.setAttribute('value', `${assignment.id};${assignment.title};${assignment.description};${assignment.subDate};${assignment.subTime};${assignment.oralMark};${assignment.totalMark}`);
        option.innerText = `Id: ${assignment.id}, Title: ${assignment.title}, Description: ${assignment.description.length > 40 ? assignment.description.substr(0, 39) + '...' : assignment.description}, Submission Date & Time: ${assignment.subDate.split('-')[1]}/${assignment.subDate.split('-')[2]}/${assignment.subDate.split('-')[0]} ${assignment.subTime}, Oral Mark: ${assignment.oralMark}, Total Mark: ${assignment.totalMark}`;

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
                if (i === 2){
                    formElements[i].children[1].innerHTML = optionValues[i];
                } else {
                    formElements[i].children[1].setAttribute('value', optionValues[i]);
                }
            }
        }
        oralMarkSet();
        totalMarkSet();
        toggleButton();
    }

    select.addEventListener('change', optionSelected);

    const form = document.querySelector('form');

    function formSubmitted(e) {
        const id = +e.target[1].value;
        const title = e.target[2].value;
        const description = e.target[3].value;
        const subDate = e.target[4].value;
        const subTime = e.target[5].value;
        const oralMark = +e.target[6].value;
        const totalMark = +e.target[7].value;

        if (assignments.findIndex(x => x.id != id && x.title === title && x.description === description && x.subDate === subDate
            && x.subTime === subTime && x.oralMark === oralMark && x.totalMark === totalMark) === -1) {
            let assignment = assignments.find(x => x.id === id);
            assignment.title = title;
            assignment.description = description;
            assignment.subDate = subDate;
            assignment.subTime = subTime;
            assignment.oralMark = oralMark;
            assignment.totalMark = totalMark;
            localStorage.setItem('assignments', JSON.stringify(assignments));
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

    const modalDeleteButton = document.querySelector('#deleteAssignment');

    function deleteAssignment() {
        const assignmentId = +document.querySelector('#assignmentId').value;
        const index = assignments.findIndex(x => x.id === assignmentId);
        assignments.splice(index, 1);
        localStorage.setItem('assignments', JSON.stringify(assignments));
        let i = 0;
        while(i < assignmentsPerCourse.length){
            if (assignmentsPerCourse[i].assignmentId === assignmentId) {
                assignmentsPerCourse.splice(i,1);
            }
            else {
                i++;
            }
        }
        localStorage.setItem('assignmentsPerCourse', JSON.stringify(assignmentsPerCourse));
        i = 0;
        while(i < assignmentsPerStudentPerCourse.length){
            if (assignmentsPerStudentPerCourse[i].assignmentId === assignmentId) {
                assignmentsPerStudentPerCourse.splice(i,1);
            }
            else {
                i++;
            }
        }
        localStorage.setItem('assignmentsPerStudentPerCourse', JSON.stringify(assignmentsPerStudentPerCourse));
        window.location.href = '../Assignments/assignmentDeletedSuccessfully.html';
    }
    modalDeleteButton.addEventListener('click', deleteAssignment);

    if (navigator.userAgent.toLowerCase().indexOf('edge') > -1) {
        document.querySelector('.formElement #description').cols = '36';
    } 
    else if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
        document.querySelector('.formElement #description').cols = '43';
    }

    // Validation Code    
    const button = document.querySelector('.formSubmit input')
    const titleInput = document.querySelector('#title');
    const descriptionInput = document.querySelector('#description');
    const subDateInput = document.querySelector('#subDate');
    const subTimeInput = document.querySelector('#subTime');
    const oralMarkInput = document.querySelector('#oralMark');
    const totalMarkInput = document.querySelector('#totalMark');

    function toggleButton(){
        if(titleInput.value.trim() != '' && descriptionInput.value.trim() != '' && subDateInput.value != '' && subDateInput.validity.valid 
            && subTimeInput.value != '' && oralMarkInput.value != '' && oralMarkInput.value >= 0 && oralMarkInput.validity.valid
            && totalMarkInput.value != '' && totalMarkInput.value >= 0 && totalMarkInput.validity.valid) {
            button.removeAttribute('disabled');
        } 
        else {
            button.setAttribute('disabled', '');
        }
        if (titleInput.value.trim() === '') {
            document.querySelector('#titleError').style.display = 'initial';
        }
        else {
            document.querySelector('#titleError').style.display = 'none';
        }
        if (descriptionInput.value.trim() === '') {
            document.querySelector('#descriptionError').style.display = 'initial';
        }
        else {
            document.querySelector('#descriptionError').style.display = 'none';
        }
        if (subDateInput.value === '' || !subDateInput.validity.valid) {
            document.querySelector('#subDateError').style.display = 'initial';
        }
        else {
            document.querySelector('#subDateError').style.display = 'none';
        }
        if (subTimeInput.value === '') {
            document.querySelector('#subTimeError').style.display = 'initial';
        }
        else {
            document.querySelector('#subTimeError').style.display = 'none';
        }
        if (oralMarkInput.value === '' || oralMarkInput.value < 0 || !oralMarkInput.validity.valid) {
            document.querySelector('#oralMarkError').style.display = 'initial';
            document.querySelector('#oralMarkError').style.width = '600px';
        }
        else {
            document.querySelector('#oralMarkError').style.display = 'none';
        }
        if (totalMarkInput.value === '' || totalMarkInput.value < 0 || !totalMarkInput.validity.valid) {
            document.querySelector('#totalMarkError').style.display = 'initial';
            document.querySelector('#totalMarkError').style.width = '600px';
        }
        else {
            document.querySelector('#totalMarkError').style.display = 'none';
        }
    }

    function oralMarkSet() {
        if(oralMarkInput.value != '') {
            totalMarkInput.setAttribute('min', `${oralMarkInput.value}`);
        }
        else {
            totalMarkInput.setAttribute('min', '0');
        }
    }

    oralMarkInput.addEventListener('input', oralMarkSet);

    function totalMarkSet() {
        if(totalMarkInput.value != '') {
            oralMarkInput.setAttribute('max', `${totalMarkInput.value}`);
        }
        else {
            oralMarkInput.removeAttribute('max');
        }
    }

    totalMarkInput.addEventListener('input', totalMarkSet);   

    titleInput.addEventListener('input', toggleButton);
    descriptionInput.addEventListener('input', toggleButton);
    subDateInput.addEventListener('input', toggleButton);
    subTimeInput.addEventListener('input', toggleButton);
    oralMarkInput.addEventListener('input', toggleButton);
    totalMarkInput.addEventListener('input', toggleButton);
}
window.addEventListener('load', main);