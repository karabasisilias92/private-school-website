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

    function AssignmentPerCourse(courseId, assignmentId){
        this.courseId = courseId;
        this.assignmentId = assignmentId;
    }

    if(localStorage.getItem('assignmentsPerCourse') === null) {
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

    const select = document.querySelector('#courseToEdit') ? document.querySelector('#courseToEdit') : document.querySelector('#courseToUpdate');
    const defaultOption = document.createElement('option');
    defaultOption.setAttribute('value', 'default');
    defaultOption.innerText = 'Select a course';
    select.appendChild(defaultOption);

    for (let course of courses) {
        const option = document.createElement('option');
        option.setAttribute('value', `${course.id}`);
        option.innerText = `Id: ${course.id}, Title: ${course.title}, Stream: ${course.stream}, Type: ${course.type}, Start Date: ${course.startDate.split('-')[1]}/${course.startDate.split('-')[2]}/${course.startDate.split('-')[0]}, End Date: ${course.endDate.split('-')[1]}/${course.endDate.split('-')[2]}/${course.endDate.split('-')[0]}`;
        select.appendChild(option);
    }

    for (let option of select.children) {
        option.removeAttribute('selected');
    }
    select.children[0].setAttribute('selected','');

    function optionSelected(e) {
        let value = e.target.value;
        const form = document.querySelector('form');
        if (value === 'default'){
            form.style.display = 'none';
        }
        else {
            value = +value;
            form.style.display = 'initial';
            const formElements = document.querySelectorAll('.formElement');
            const option = document.createElement('option');
            option.setAttribute('value', value);
            option.innerText = e.target.selectedOptions[0].innerText;
            if (formElements[0].children[1].childNodes[0]){
                formElements[0].children[1].removeChild(formElements[0].children[1].childNodes[0]);
            }
            formElements[0].children[1].appendChild(option); 
            const checkboxDiv = document.createElement('div');
            for (let assignment of assignments) {
                const checkboxLabel = document.createElement('label');
                checkboxLabel.classList.add('checkboxLabel', 'width');
                checkboxLabel.innerText = `Id: ${assignment.id}, Title: ${assignment.title}, Description: ${assignment.description}, Submission Date & Time: ${assignment.subDate.split('-')[1]}/${assignment.subDate.split('-')[2]}/${assignment.subDate.split('-')[0]} ${assignment.subTime}, Oral Mark: ${assignment.oralMark}, Total Mark: ${assignment.totalMark}`;
                const checkbox = document.createElement('input');
                checkbox.setAttribute('type', 'checkbox');
                checkbox.setAttribute('name', 'assignments');
                checkbox.setAttribute('value', `${assignment.id}`);
                if (assignmentsPerCourse.find(x => x.courseId === value && x.assignmentId === assignment.id )) {
                    checkbox.setAttribute('checked', '');
                }
                const span = document.createElement('span');
                span.classList.add('checkmark');
                checkboxLabel.appendChild(checkbox);
                checkboxLabel.appendChild(span);
                checkboxDiv.appendChild(checkboxLabel);
            }
            formElements[1].removeChild(formElements[1].childNodes[2]);
            formElements[1].appendChild(checkboxDiv);
        }
    }

    select.addEventListener('change', optionSelected);

    const form = document.querySelector('form');

    function formSubmitted(e) {
        const courseId = +e.target[1].selectedOptions[0].value;
        const assignmentsList = document.querySelectorAll('[name=assignments]');
        let submitForm = true;
        let assignmentIds = '';
        for(let i = 0; i < assignmentsList.length; i++) {
            const assignmentId = +assignmentsList[i].value;
            const course = courses.find(x => x.id === courseId);
            const assignment = assignments.find(x => x.id === assignmentId);
            if(assignmentsList[i].checked){
                if (assignment.subDate < course.startDate) {
                    if (assignmentIds === '') {
                        submitForm = false;
                        assignmentIds += assignment.id;
                    }
                    else {
                        assignmentIds += ', ' + assignment.id;
                    }
                }
            }
        }
        if (submitForm) {
            for(let i = 0; i < assignmentsList.length; i++) {
                const assignmentId = +assignmentsList[i].value;
                if(assignmentsList[i].checked){
                    if(!assignmentsPerCourse.find(x => x.courseId === courseId && x.assignmentId === assignmentId)) {
                        assignmentsPerCourse.push(new AssignmentPerCourse(courseId, assignmentId));
                    }
                }
                else {
                    const index = assignmentsPerCourse.findIndex(x => x.courseId === courseId && x.assignmentId === assignmentId);
                    if(index !== -1) {
                        assignmentsPerCourse.splice(index, 1);
                        while(assignmentsPerStudentPerCourse.find(x => x.courseId === courseId && x.assignmentId === assignmentId)) {
                            const index2 = assignmentsPerStudentPerCourse.findIndex(x => x.courseId === courseId && x.assignmentId === assignmentId);
                            assignmentsPerStudentPerCourse.splice(index2, 1);
                        }
                    }
                }
            }
            localStorage.setItem('assignmentsPerCourse', JSON.stringify(assignmentsPerCourse));
            localStorage.setItem('assignmentsPerStudentPerCourse', JSON.stringify(assignmentsPerStudentPerCourse));
        }
        else {
            $('#alertModal2 div.modal-body').text(`The submission date of the assignments with ids ${assignmentIds} is earlier than the start date of the selected course, so they cannot belong to it. Please uncheck them and submit the form again.`);
            $('#alertModal2').modal('show');
            e.preventDefault();
        }
        
    }
    form.addEventListener('submit',formSubmitted);
}
window.addEventListener('load', main);