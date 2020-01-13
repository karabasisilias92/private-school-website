function main () {
    let courses;
    if(localStorage.getItem('courses') === null) {
        courses = [];

        let course_counter;
        if (localStorage.getItem('course_counter') === null) {
            course_counter = 1;
        }
        else {
            course_counter = +localStorage.getItem('course_counter');
        }

        function Course(title, stream, type, startDate, endDate){
            this.id = course_counter++;
            this.title = title;
            this.stream = stream;
            this.type = type;
            this.startDate = startDate;
            this.endDate = endDate;
        }

        courses.push(new Course('Coding Bootcamp 9', 'C#', 'Full-Time', '2019-10-14', '2020-01-22'));
        courses.push(new Course('Coding Bootcamp 9', 'Java', 'Full-Time', '2019-10-15', '2020-01-23'));
        courses.push(new Course('Coding Bootcamp 9', 'C#', 'Part-Time', '2019-10-14', '2020-04-22'));
        courses.push(new Course('Coding Bootcamp 9', 'Java', 'Part-Time', '2019-10-15', '2020-04-23'));
        localStorage.setItem('courses', JSON.stringify(courses));
        localStorage.setItem('course_counter', course_counter);
    }
    else {
        courses = JSON.parse(localStorage.getItem('courses'));
    }

    let trainersPerCourse;

    if(localStorage.getItem('trainersPerCourse') === null) {
        function TrainerPerCourse(courseId, trainerId){
            this.courseId = courseId;
            this.trainerId = trainerId;
        }

        trainersPerCourse = [];

        trainersPerCourse.push(new TrainerPerCourse(1, 1));
        trainersPerCourse.push(new TrainerPerCourse(2, 2));
        trainersPerCourse.push(new TrainerPerCourse(3, 4));
        trainersPerCourse.push(new TrainerPerCourse(4, 3));
        localStorage.setItem('trainersPerCourse', JSON.stringify(trainersPerCourse));
    }
    else {
        trainersPerCourse = JSON.parse(localStorage.getItem('trainersPerCourse'));
    }

    let assignmentsPerCourse;

    if(localStorage.getItem('assignmentsPerCourse') === null) {
        function AssignmentPerCourse(courseId, assignmentId){
            this.courseId = courseId;
            this.assignmentId = assignmentId;
        }

        assignmentsPerCourse = [];

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

    const select = document.querySelector('#courseToEdit') ? document.querySelector('#courseToEdit') : document.querySelector('#courseToUpdate');
    const defaultOption = document.createElement('option');
    defaultOption.setAttribute('value', 'default');
    defaultOption.innerText = 'Select a course';
    select.appendChild(defaultOption);

    for (let course of courses) {
        const option = document.createElement('option');
        option.setAttribute('value', `${course.id};${course.title};${course.stream};${course.type};${course.startDate};${course.endDate}`);
        option.innerText = `Id: ${course.id}, Title: ${course.title}, Stream: ${course.stream}, Type: ${course.type}, Start Date: ${course.startDate.split('-')[1]}/${course.startDate.split('-')[2]}/${course.startDate.split('-')[0]}, End Date: ${course.endDate.split('-')[1]}/${course.endDate.split('-')[2]}/${course.endDate.split('-')[0]}`;
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
                switch(i) {
                    case 0:
                    case 1:
                    case 4:
                    case 5:
                        {
                            formElements[i].children[1].setAttribute('value', optionValues[i]);
                            break;
                        }
                    case 2:
                    case 3:
                        {
                            if (optionValues[i] === 'C#' || optionValues[i] === 'Full-Time') {
                                formElements[i].children[1].children[0].setAttribute('selected', '');
                                formElements[i].children[1].children[1].removeAttribute('selected');
                            }
                            else if (optionValues[i] === 'Java' || optionValues[i] === 'Part-Time') {
                                formElements[i].children[1].children[1].setAttribute('selected', '');
                                formElements[i].children[1].children[0].removeAttribute('selected');
                            }
                            break;
                        }
                }
            }
        }
        startDateSet();
        endDateSet();
        toggleButton();
    }

    select.addEventListener('change', optionSelected);

    const form = document.querySelector('form');

    function formSubmitted(e) {
        const id = +e.target[1].value;
        const title = e.target[2].value;
        const stream = e.target[3].value;
        const type = e.target[4].value;
        const startDate = e.target[5].value;
        const endDate = e.target[6].value;

        if (courses.findIndex(x => x.id != id && x.title === title && x.stream === stream && x.type === type
            && x.startDate === startDate && x.endDate === endDate) === -1) {
            let course = courses.find(x => x.id === id);
            course.title = title;
            course.stream = stream;
            course.type = type;
            course.startDate = startDate;
            course.endDate = endDate;
            localStorage.setItem('courses', JSON.stringify(courses));
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

    const modalDeleteButton = document.querySelector('#deleteCourse');

    function deleteCourse() {
        const courseId = +document.querySelector('#courseId').value;
        const index = courses.findIndex(x => x.id === courseId);
        courses.splice(index, 1);
        localStorage.setItem('courses', JSON.stringify(courses));
        let i = 0;
        while(i < trainersPerCourse.length){
            if (trainersPerCourse[i].courseId === courseId) {
                trainersPerCourse.splice(i,1);
            }
            else {
                i++;
            }
        }
        localStorage.setItem('trainersPerCourse', JSON.stringify(trainersPerCourse));
        i = 0;
        while(i < studentsPerCourse.length){
            if (studentsPerCourse[i].courseId === courseId) {
                studentsPerCourse.splice(i,1);
            }
            else {
                i++;
            }
        }
        localStorage.setItem('studentsPerCourse', JSON.stringify(studentsPerCourse));
        i = 0;
        while(i < assignmentsPerCourse.length){
            if (assignmentsPerCourse[i].courseId === courseId) {
                assignmentsPerCourse.splice(i,1);
            }
            else {
                i++;
            }
        }
        localStorage.setItem('assignmentsPerCourse', JSON.stringify(assignmentsPerCourse));
        i = 0;
        while(i < assignmentsPerStudentPerCourse.length){
            if (assignmentsPerStudentPerCourse[i].courseId === courseId) {
                assignmentsPerStudentPerCourse.splice(i,1);
            }
            else {
                i++;
            }
        }
        localStorage.setItem('assignmentsPerStudentPerCourse', JSON.stringify(assignmentsPerStudentPerCourse));
        window.location.href = '../Courses/courseDeletedSuccessfully.html';
    }

    modalDeleteButton.addEventListener('click', deleteCourse);

    // Validation Code    
    const button = document.querySelector('.formSubmit input')
    const titleInput = document.querySelector('#title');
    const startDateInput = document.querySelector('#startDate');
    const endDateInput = document.querySelector('#endDate');

    function toggleButton(){
        const regex = new RegExp('^[A-ZΑ-Ω].*');
        if(regex.test(titleInput.value) && startDateInput.value != '' && startDateInput.validity.valid && endDateInput.value != '' && endDateInput.validity.valid) {
            button.removeAttribute('disabled');
        } 
        else {
            button.setAttribute('disabled', '');
        }
        if (!regex.test(titleInput.value)) {
            document.querySelector('#titleError').style.display = 'initial';
        }
        else {
            document.querySelector('#titleError').style.display = 'none';
        }
        if (startDateInput.value === '' || !startDateInput.validity.valid) {
            document.querySelector('#startDateError').style.display = 'initial';
        }
        else {
            document.querySelector('#startDateError').style.display = 'none';
        }
        if (endDateInput.value === '' || !endDateInput.validity.valid) {
            document.querySelector('#endDateError').style.display = 'initial';
        }
        else {
            document.querySelector('#endDateError').style.display = 'none';
        }
    }

    function startDateSet() {
        if(startDateInput.value != '') {
            endDateInput.setAttribute('min', `${startDateInput.value}`);
        }
        else {
            endDateInput.removeAttribute('min');
        }
    }

    startDateInput.addEventListener('input', startDateSet);

    function endDateSet() {
        if(endDateInput.value != '') {
            startDateInput.setAttribute('max', `${endDateInput.value}`);
        }
        else {
            startDateInput.removeAttribute('max');
        }
    }

    endDateInput.addEventListener('input', endDateSet);    

    titleInput.addEventListener('input', toggleButton);
    startDateInput.addEventListener('input', toggleButton);
    endDateInput.addEventListener('input', toggleButton);
}
window.addEventListener('load', main);