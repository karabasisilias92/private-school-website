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

    const listMain = document.querySelector('#listMain');
    for (let i = 0; i < courses.length; i++) {
        const div = document.createElement('div');
        const h2 = document.createElement('h2');
        h2.classList.add('zero-tab');
        h2.innerText = 'Course info:';
        div.appendChild(h2);
        const courseTable = createCourseTable(courses[i]);
        div.appendChild(courseTable);
        const courseAssignments = assignmentsPerCourse.filter(x => x.courseId === courses[i].id);
        if (courseAssignments.length === 0) {
            const h3 = document.createElement('h3');
            h3.classList.add('one-tab');
            h3.innerText = 'No assignments belong to the above course.';
            div.appendChild(h3);
        }
        else {
            const newh2 = document.createElement('h2');
            newh2.classList.add('one-tab');
            newh2.innerText = 'Below you can see the assignments\' info for the above course:';
            div.appendChild(newh2);
            const assignmentsTable = createAssignmentsTable(courseAssignments);
            div.appendChild(assignmentsTable);
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

    function createAssignmentsTable(courseAssignments) {
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
        th2.innerText = 'Title';
        tr.appendChild(th2);
        const th3 = document.createElement('th');
        th3.setAttribute('scope', 'col')
        th3.innerText = 'Description';
        tr.appendChild(th3);
        const th4 = document.createElement('th');
        th4.setAttribute('scope', 'col')
        th4.innerText = 'Submission Date & Time';
        tr.appendChild(th4);
        const th5 = document.createElement('th');
        th5.setAttribute('scope', 'col')
        th5.innerText = 'Oral Mark';
        tr.appendChild(th5);
        const th6 = document.createElement('th');
        th6.setAttribute('scope', 'col')
        th6.innerText = 'Total Mark';
        tr.appendChild(th6);
        thead.appendChild(tr);
        table.appendChild(thead);
        const tbody = document.createElement('tbody');
        for (let i = 0; i < courseAssignments.length; i++) {
            const assignment = assignments.find(x => x.id === courseAssignments[i].assignmentId);
            const tr2 = document.createElement('tr');
            if (i % 2 === 0) {
                tr2.classList.add('tr-even');
            }
            else {
                tr2.classList.add('tr-odd');
            }
            const td1 = document.createElement('td');
            td1.innerText = assignment.id;
            tr2.appendChild(td1);
            const td2 = document.createElement('td');
            td2.innerText = assignment.title;
            tr2.appendChild(td2);
            const td3 = document.createElement('td');
            td3.innerText = assignment.description;
            tr2.appendChild(td3);
            const td4 = document.createElement('td');
            td4.innerText = assignment.subDate.split('-')[1] + '/' + assignment.subDate.split('-')[2] + '/' + assignment.subDate.split('-')[0] + ' ' + assignment.subTime;
            tr2.appendChild(td4);
            const td5 = document.createElement('td');
            td5.innerText = assignment.oralMark;
            tr2.appendChild(td5);
            const td6 = document.createElement('td');
            td6.innerText = assignment.totalMark;
            tr2.appendChild(td6);
            tbody.appendChild(tr2);
        }
        table.appendChild(tbody);
        return table;
    }
}
window.addEventListener('load', main);