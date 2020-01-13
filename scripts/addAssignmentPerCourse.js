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

    const assignmentSelect = document.querySelector('#assignment');
    const defaultOption2 = document.createElement('option');
    defaultOption2.setAttribute('value', 'default');
    defaultOption2.innerText = 'Select an assignment';
    assignmentSelect.appendChild(defaultOption2);

    for (let assignment of assignments) {
        const option2 = document.createElement('option');
        option2.setAttribute('value', `${assignment.id}`);
        option2.innerText = `Id: ${assignment.id}, Title: ${assignment.title}, Description: ${assignment.description.length > 40 ? assignment.description.substr(0, 39) + '...' : assignment.description}, Submission Date & Time: ${assignment.subDate.split('-')[1]}/${assignment.subDate.split('-')[2]}/${assignment.subDate.split('-')[0]} ${assignment.subTime}, Oral Mark: ${assignment.oralMark}, Total Mark: ${assignment.totalMark}`;
        assignmentSelect.appendChild(option2);
    }

    for (let option of assignmentSelect.children) {
        option.removeAttribute('selected');
    }
    assignmentSelect.children[0].setAttribute('selected','');

    const form = document.querySelector('form');

    function formSubmitted(e) {
        const courseId = +e.target[1].value;
        const assignmentId = +e.target[2].value;
        const course = courses.find(x => x.id === courseId);
        const assignment = assignments.find(x => x.id === assignmentId);
        if (assignment.subDate < course.startDate) {
            $('#alertModal2').modal('show');
            e.preventDefault();
        }
        else {            
            if (assignmentsPerCourse.findIndex(x => x.courseId === courseId && x.assignmentId === assignmentId) === -1) {
                assignmentsPerCourse.push(new AssignmentPerCourse(courseId, assignmentId));
                localStorage.setItem('assignmentsPerCourse', JSON.stringify(assignmentsPerCourse));
            }
            else {
                $('#alertModal').modal('show');
                e.preventDefault();
            }
        }
    }
    form.addEventListener('submit',formSubmitted);

    //Validation
    const button = document.querySelector('.formSubmit input')

    function toggleButton(){
        if(courseSelect.value != 'default' && assignmentSelect.value != 'default') {
            button.removeAttribute('disabled');
        } 
        else {
            button.setAttribute('disabled', '');
        }
    }    

    courseSelect.addEventListener('change', toggleButton);
    assignmentSelect.addEventListener('change', toggleButton);
    
    toggleButton();
}
window.addEventListener('load', main);