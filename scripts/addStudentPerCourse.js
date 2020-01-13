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

    const courseSelect = document.querySelector('#course');
    const defaultOption = document.createElement('option');
    defaultOption.setAttribute('value', 'default');
    defaultOption.innerText = 'Select a course';
    courseSelect.appendChild(defaultOption);

    for (let course of courses) {
        const option = document.createElement('option');
        option.setAttribute('value', `${course.id}`);
        option.innerText = `Id: ${course.id}, Title: ${course.title}, Stream: ${course.stream}, Type: ${course.type}, Start Date: ${course.startDate.split('-')[1]}/${course.startDate.split('-')[2]}/${course.startDate.split('-')[0]}, End Date: ${course.endDate.split('-')[1]}/${course.endDate.split('-')[2]}/${course.endDate.split('-')[0]}`;
        courseSelect.appendChild(option);
    }

    for (let option of courseSelect.children) {
        option.removeAttribute('selected');
    }
    courseSelect.children[0].setAttribute('selected','');

    const studentSelect = document.querySelector('#student');
    const defaultOption2 = document.createElement('option');
    defaultOption2.setAttribute('value', 'default');
    defaultOption2.innerText = 'Select a student';
    studentSelect.appendChild(defaultOption2);

    for (let student of students) {
        const option2 = document.createElement('option');
        option2.setAttribute('value', `${student.id}`);
        option2.innerText = `Id: ${student.id}, First Name: ${student.firstName}, Last Name: ${student.lastName}, Date of Birth: ${student.dateOfBirth.split('-')[1]}/${student.dateOfBirth.split('-')[2]}/${student.dateOfBirth.split('-')[0]}, Tuition Fees: ${student.tuitionFees}`;
        studentSelect.appendChild(option2);
    }

    for (let option of studentSelect.children) {
        option.removeAttribute('selected');
    }
    studentSelect.children[0].setAttribute('selected','');

    const form = document.querySelector('form');

    function formSubmitted(e) {
        const courseId = +e.target[1].value;
        const studentId = +e.target[2].value;
        if (studentsPerCourse.findIndex(x => x.courseId === courseId && x.studentId === studentId) === -1) {
            studentsPerCourse.push(new StudentPerCourse(courseId, studentId));
            localStorage.setItem('studentsPerCourse', JSON.stringify(studentsPerCourse));
        }
        else {
            $('#alertModal').modal('show');
            e.preventDefault();
        }
    }
    form.addEventListener('submit',formSubmitted);

    //Validation
    const button = document.querySelector('.formSubmit input')

    function toggleButton(){
        if(courseSelect.value != 'default' && studentSelect.value != 'default') {
            button.removeAttribute('disabled');
        } 
        else {
            button.setAttribute('disabled', '');
        }
    }    

    courseSelect.addEventListener('change', toggleButton);
    studentSelect.addEventListener('change', toggleButton);
    
    toggleButton();
}
window.addEventListener('load', main);