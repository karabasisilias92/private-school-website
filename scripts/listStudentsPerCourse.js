function main() {
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

    const listMain = document.querySelector('#listMain');
    for (let i = 0; i < courses.length; i++) {
        const div = document.createElement('div');
        const h2 = document.createElement('h2');
        h2.classList.add('zero-tab');
        h2.innerText = 'Course info:';
        div.appendChild(h2);
        const courseTable = createCourseTable(courses[i]);
        div.appendChild(courseTable);
        const courseStudents = studentsPerCourse.filter(x => x.courseId === courses[i].id);
        if (courseStudents.length === 0) {
            const h3 = document.createElement('h3');
            h3.classList.add('one-tab');
            h3.innerText = 'No students attend the above course.';
            div.appendChild(h3);
        }
        else {
            const newh2 = document.createElement('h2');
            newh2.classList.add('one-tab');
            newh2.innerText = 'Below you can see the students\' info for the above course:';
            div.appendChild(newh2);
            const studentsTable = createStudentsTable(courseStudents);
            div.appendChild(studentsTable);
        }        
        listMain.appendChild(div);
    }

    function createCourseTable(course) {
        const table = document.createElement('table');
        table.classList.add('table', 'table-responsive', 'table-bordered', 'my-table', 'zero-tab');
        const thead = document.createElement('thead');
        thead.classList.add('my-thead');
        const tr = document.createElement('tr');
        const th1 = document.createElement('th');
        th1.setAttribute('scope', 'col')
        th1.innerText = 'Id'
        tr.appendChild(th1);
        const th2 = document.createElement('th');
        th2.setAttribute('scope', 'col')
        th2.innerText = 'Title';
        tr.appendChild(th2);
        const th3 = document.createElement('th');
        th3.setAttribute('scope', 'col')
        th3.innerText = 'Stream';
        tr.appendChild(th3);
        const th4 = document.createElement('th');
        th4.setAttribute('scope', 'col')
        th4.innerText = 'Type';
        tr.appendChild(th4);
        const th5 = document.createElement('th');
        th5.setAttribute('scope', 'col')
        th5.innerText = 'Start Date';
        tr.appendChild(th5);
        const th6 = document.createElement('th');
        th6.setAttribute('scope', 'col')
        th6.innerText = 'End Date';
        tr.appendChild(th6);
        thead.appendChild(tr);
        table.appendChild(thead);
        const tbody = document.createElement('tbody');
        const tr2 = document.createElement('tr');
        tr2.classList.add('tr-even');
        const td1 = document.createElement('td');
        td1.innerText = course.id;
        tr2.appendChild(td1);
        const td2 = document.createElement('td');
        td2.innerText = course.title;
        tr2.appendChild(td2);
        const td3 = document.createElement('td');
        td3.innerText = course.stream;
        tr2.appendChild(td3);
        const td4 = document.createElement('td');
        td4.innerText = course.type;
        tr2.appendChild(td4);
        const td5 = document.createElement('td');
        td5.innerText = course.startDate.split('-')[1] + '/' + course.startDate.split('-')[2] + '/' + course.startDate.split('-')[0]; 
        tr2.appendChild(td5);
        const td6 = document.createElement('td');
        td6.innerText = course.endDate.split('-')[1] + '/' + course.endDate.split('-')[2] + '/' + course.endDate.split('-')[0];
        tr2.appendChild(td6);
        tbody.appendChild(tr2);
        table.appendChild(tbody);
        return table;
    }

    function createStudentsTable(courseStudents) {
        const table = document.createElement('table');
        table.classList.add('table', 'table-responsive', 'table-bordered', 'my-table', 'one-tab');
        const thead = document.createElement('thead');
        thead.classList.add('my-thead');
        const tr = document.createElement('tr');
        const th1 = document.createElement('th');
        th1.setAttribute('scope', 'col')
        th1.innerText = 'Id'
        tr.appendChild(th1);
        const th2 = document.createElement('th');
        th2.setAttribute('scope', 'col')
        th2.innerText = 'First Name';
        tr.appendChild(th2);
        const th3 = document.createElement('th');
        th3.setAttribute('scope', 'col')
        th3.innerText = 'Last Name';
        tr.appendChild(th3);
        const th4 = document.createElement('th');
        th4.setAttribute('scope', 'col')
        th4.innerText = 'Date of Birth';
        tr.appendChild(th4);
        const th5 = document.createElement('th');
        th5.setAttribute('scope', 'col')
        th5.innerText = 'Tuition Fees';
        tr.appendChild(th5);
        thead.appendChild(tr);
        table.appendChild(thead);
        const tbody = document.createElement('tbody');
        for (let i = 0; i < courseStudents.length; i++) {
            const student = students.find(x => x.id === courseStudents[i].studentId);
            const tr2 = document.createElement('tr');
            if (i % 2 === 0) {
                tr2.classList.add('tr-even');
            }
            else {
                tr2.classList.add('tr-odd');
            }
            const td1 = document.createElement('td');
            td1.innerText = student.id;
            tr2.appendChild(td1);
            const td2 = document.createElement('td');
            td2.innerText = student.firstName;
            tr2.appendChild(td2);
            const td3 = document.createElement('td');
            td3.innerText = student.lastName;
            tr2.appendChild(td3);
            const td4 = document.createElement('td');
            td4.innerText = student.dateOfBirth.split('-')[1] + '/' + student.dateOfBirth.split('-')[2] + '/' + student.dateOfBirth.split('-')[0];
            tr2.appendChild(td4);
            const td5 = document.createElement('td');
            td5.innerText = student.tuitionFees;
            tr2.appendChild(td5);
            tbody.appendChild(tr2);
        }
        table.appendChild(tbody);
        return table;
    }
}
window.addEventListener('load', main);