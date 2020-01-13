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

    function StudentPerCourse(courseId, studentId){
        this.courseId = courseId;
        this.studentId = studentId;
    }

    let studentsPerCourse;

    if(localStorage.getItem('studentsPerCourse') === null) {
        

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
            for (let student of students) {
                const checkboxLabel = document.createElement('label');
                checkboxLabel.classList.add('checkboxLabel', 'width');
                checkboxLabel.innerText = `Id: ${student.id}, First Name: ${student.firstName}, Last Name: ${student.lastName}, Date of Birth: ${student.dateOfBirth.split('-')[1]}/${student.dateOfBirth.split('-')[2]}/${student.dateOfBirth.split('-')[0]}, Tuition Fees: ${student.tuitionFees}`;
                const checkbox = document.createElement('input');
                checkbox.setAttribute('type', 'checkbox');
                checkbox.setAttribute('name', 'students');
                checkbox.setAttribute('value', `${student.id}`);
                if (studentsPerCourse.find(x => x.courseId === value && x.studentId === student.id )) {
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
        const students = document.querySelectorAll('[name=students]');
        for(let i = 0; i < students.length ; i++) {
            const studentId = +students[i].value;
            if(students[i].checked){
                if(!studentsPerCourse.find(x => x.courseId === courseId && x.studentId === studentId)) {
                    studentsPerCourse.push(new StudentPerCourse(courseId, studentId));
                }
            }
            else {
                const index = studentsPerCourse.findIndex(x => x.courseId === courseId && x.studentId === studentId);
                if( index !== -1) {
                    studentsPerCourse.splice(index, 1);
                    while(assignmentsPerStudentPerCourse.find(x => x.courseId === courseId && x.studentId === studentId)) {
                        const index2 = assignmentsPerStudentPerCourse.findIndex(x => x.courseId === courseId && x.studentId === studentId);
                        assignmentsPerStudentPerCourse.splice(index2, 1);
                    }
                }
            }
        }
        localStorage.setItem('studentsPerCourse', JSON.stringify(studentsPerCourse));
        localStorage.setItem('assignmentsPerStudentPerCourse', JSON.stringify(assignmentsPerStudentPerCourse));
    }
    form.addEventListener('submit',formSubmitted);
}
window.addEventListener('load', main);