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

    const studentToEdit = document.querySelector('#studentToEdit');
    const defaultOption = document.createElement('option');
    defaultOption.setAttribute('value', 'default');
    defaultOption.innerText = 'Select a student';
    studentToEdit.appendChild(defaultOption);

    for (let student of students) {
        const option = document.createElement('option');
        option.setAttribute('value', `${student.id}`);
        option.innerText = `Id: ${student.id}, First Name: ${student.firstName}, Last Name: ${student.lastName}, Date of Birth: ${student.dateOfBirth.split('-')[1]}/${student.dateOfBirth.split('-')[2]}/${student.dateOfBirth.split('-')[0]}, Tuition Fees: ${student.tuitionFees}`;
        studentToEdit.appendChild(option);
    }

    for (let option of studentToEdit.children) {
        option.removeAttribute('selected');
    }
    studentToEdit.children[0].setAttribute('selected','');

    function studentToEditSelected(e) {
        const value = e.target.value;
        const form = document.querySelector('form');
        const courseToEdit = document.querySelector('#courseToEdit');
        const assignmentToEdit = document.querySelector('#assignmentToEdit');
        const studentSelect = document.querySelector('#student');
        const courseSelect = document.querySelector('#course');
        const assignmentSelect = document.querySelector('#assignment');
        const studentsOralMark = document.querySelector('#studentsOralMark');
        const studentsTotalMark = document.querySelector('#studentsTotalMark');

        while(courseToEdit.childNodes.length > 0) {
            courseToEdit.removeChild(courseToEdit.childNodes[0]);
        }
        courseToEdit.style.display = 'none';
        while(assignmentToEdit.childNodes.length > 0) {
            assignmentToEdit.removeChild(assignmentToEdit.childNodes[0]);
        }
        assignmentToEdit.style.display = 'none';
        while(studentSelect.childNodes.length > 0) {
            studentSelect.removeChild(studentSelect.childNodes[0]);
        }
        while(courseSelect.childNodes.length > 0) {
            courseSelect.removeChild(courseSelect.childNodes[0]);
        }
        courseSelect.setAttribute('disabled', '');
        while(assignmentSelect.childNodes.length > 0) {
            assignmentSelect.removeChild(assignmentSelect.childNodes[0]);
        }
        assignmentSelect.setAttribute('disabled', '');
        studentsOralMark.setAttribute('disabled', '');
        studentsOralMark.value = 0;
        studentsOralMark.removeAttribute('max');
        studentsTotalMark.setAttribute('min', '0')
        studentsTotalMark.setAttribute('disabled', '');
        studentsTotalMark.removeAttribute('max');
        studentsTotalMark.value = 0;
        form.style.display = 'none';

        if (value != 'default'){
            let studentCourses = studentsPerCourse.filter(x => x.studentId === +value);
            if (studentCourses.length === 0) {
                $('#alertModal1').modal('show');
                return;
            }
            const defaultOption1 = document.createElement('option');
            defaultOption1.setAttribute('value', 'default');
            defaultOption1.innerText = 'Select a course';
            courseToEdit.appendChild(defaultOption1);
            for (let course of courses) {
                if (studentCourses.findIndex(x => x.courseId === course.id) != -1) {
                    const option = document.createElement('option');
                    option.setAttribute('value', `${course.id}`);
                    option.innerText = `Id: ${course.id}, Title: ${course.title}, Stream: ${course.stream}, Type: ${course.type}, Start Date: ${course.startDate.split('-')[1]}/${course.startDate.split('-')[2]}/${course.startDate.split('-')[0]}, End Date: ${course.endDate.split('-')[1]}/${course.endDate.split('-')[2]}/${course.endDate.split('-')[0]}`;
                    courseToEdit.appendChild(option);
                }
            }
        
            for (let option of courseToEdit.children) {
                option.removeAttribute('selected');
            }
            courseToEdit.children[0].setAttribute('selected','');
            courseToEdit.style.display = 'initial';
        }
    }

    studentToEdit.addEventListener('change', studentToEditSelected);

    function courseToEditSelected(e) {
        const value = e.target.value;
        const form = document.querySelector('form');
        const assignmentToEdit = document.querySelector('#assignmentToEdit');
        const courseSelect = document.querySelector('#course');
        const assignmentSelect = document.querySelector('#assignment');
        const studentsOralMark = document.querySelector('#studentsOralMark');
        const studentsTotalMark = document.querySelector('#studentsTotalMark');

        while(assignmentToEdit.childNodes.length > 0) {
            assignmentToEdit.removeChild(assignmentToEdit.childNodes[0]);
        }
        assignmentToEdit.style.display = 'none';
        while(courseSelect.childNodes.length > 0) {
            courseSelect.removeChild(courseSelect.childNodes[0]);
        }
        courseSelect.setAttribute('disabled', '');
        while(assignmentSelect.childNodes.length > 0) {
            assignmentSelect.removeChild(assignmentSelect.childNodes[0]);
        }
        assignmentSelect.setAttribute('disabled', '');
        studentsOralMark.setAttribute('disabled', '');
        studentsOralMark.value = 0;
        studentsOralMark.removeAttribute('max');
        studentsTotalMark.setAttribute('min', '0')
        studentsTotalMark.setAttribute('disabled', '');
        studentsTotalMark.removeAttribute('max');
        studentsTotalMark.value = 0;
        form.style.display = 'none';

        if (value != 'default'){
            let courseAssignments = assignmentsPerCourse.filter(x => x.courseId === +value);
            if (courseAssignments.length === 0) {
                $('#alertModal2').modal('show');
                return;
            }
            const defaultOption1 = document.createElement('option');
            defaultOption1.setAttribute('value', 'default');
            defaultOption1.innerText = 'Select an assignment';
            assignmentToEdit.appendChild(defaultOption1);
            for (let assignment of assignments) {
                if (courseAssignments.findIndex(x => x.assignmentId === assignment.id) != -1) {
                    const option = document.createElement('option');
                    option.setAttribute('value', `${assignment.id}`);
                    option.innerText = `Id: ${assignment.id}, Title: ${assignment.title}, Description: ${assignment.description.length > 40 ? assignment.description.substr(0, 39) + '...' : assignment.description}, Submission Date & Time: ${assignment.subDate.split('-')[1]}/${assignment.subDate.split('-')[2]}/${assignment.subDate.split('-')[0]} ${assignment.subTime}, Oral Mark: ${assignment.oralMark}, Total Mark: ${assignment.totalMark}`;
                    assignmentToEdit.appendChild(option);
                }
            }            
        
            for (let option of assignmentToEdit.children) {
                option.removeAttribute('selected');
            }
            assignmentToEdit.children[0].setAttribute('selected','');
            assignmentToEdit.style.display = 'initial';
        }
    }

    courseToEdit.addEventListener('change', courseToEditSelected);

    function assignmentToEditSelected(e) {
        const value = e.target.value;
        const form = document.querySelector('form');
        const studentSelect = document.querySelector('#student');
        const courseSelect = document.querySelector('#course');
        const assignmentSelect = document.querySelector('#assignment');
        const studentsOralMark = document.querySelector('#studentsOralMark');
        const studentsTotalMark = document.querySelector('#studentsTotalMark');

        while(studentSelect.childNodes.length > 0) {
            studentSelect.removeChild(studentSelect.childNodes[0]);
        }
        while(courseSelect.childNodes.length > 0) {
            courseSelect.removeChild(courseSelect.childNodes[0]);
        }
        courseSelect.setAttribute('disabled', '');
        while(assignmentSelect.childNodes.length > 0) {
            assignmentSelect.removeChild(assignmentSelect.childNodes[0]);
        }
        assignmentSelect.setAttribute('disabled', '');
        studentsOralMark.setAttribute('disabled', '');
        studentsOralMark.value = 0;
        studentsOralMark.removeAttribute('max');
        studentsTotalMark.setAttribute('min', '0')
        studentsTotalMark.setAttribute('disabled', '');
        studentsTotalMark.removeAttribute('max');
        studentsTotalMark.value = 0;
        form.style.display = 'none';

        if (value != 'default'){
            let defaultOption = document.createElement('option');
            defaultOption.setAttribute('value', 'default');
            defaultOption.innerText = 'Select a student';
            studentSelect.appendChild(defaultOption);

            for (let student of students) {
                const option = document.createElement('option');
                option.setAttribute('value', `${student.id}`);
                option.innerText = `Id: ${student.id}, First Name: ${student.firstName}, Last Name: ${student.lastName}, Date of Birth: ${student.dateOfBirth.split('-')[1]}/${student.dateOfBirth.split('-')[2]}/${student.dateOfBirth.split('-')[0]}, Tuition Fees: ${student.tuitionFees}`;
                studentSelect.appendChild(option);
            }

            for (let option of studentSelect.children) {
                option.removeAttribute('selected');
                if (option.value === document.querySelector('#studentToEdit').value) {
                    option.setAttribute('selected', '');
                }
            }
            studentSelect.removeAttribute('disabled');

            defaultOption = document.createElement('option');
            defaultOption.setAttribute('value', 'default');
            defaultOption.innerText = 'Select a course';
            courseSelect.appendChild(defaultOption);

            const studentCourses = studentsPerCourse.filter(x => x.studentId === +document.querySelector('#studentToEdit').value);
            for (let course of courses) {
                if (studentCourses.findIndex(x => x.courseId === course.id) != -1) {
                    const option = document.createElement('option');
                    option.setAttribute('value', `${course.id}`);
                    option.innerText = `Id: ${course.id}, Title: ${course.title}, Stream: ${course.stream}, Type: ${course.type}, Start Date: ${course.startDate.split('-')[1]}/${course.startDate.split('-')[2]}/${course.startDate.split('-')[0]}, End Date: ${course.endDate.split('-')[1]}/${course.endDate.split('-')[2]}/${course.endDate.split('-')[0]}`;
                    courseSelect.appendChild(option);
                }
            }

            for (let option of courseSelect.children) {
                option.removeAttribute('selected');
                if (option.value === document.querySelector('#courseToEdit').value) {
                    option.setAttribute('selected', '');
                }
            }
            courseSelect.removeAttribute('disabled');

            defaultOption = document.createElement('option');
            defaultOption.setAttribute('value', 'default');
            defaultOption.innerText = 'Select an assignment';
            assignmentSelect.appendChild(defaultOption);

            const courseAssignments = assignmentsPerCourse.filter(x => x.courseId === +document.querySelector('#courseToEdit').value);
            for (let assignment of assignments) {
                if (courseAssignments.findIndex(x => x.assignmentId === assignment.id) != -1) {
                    const option = document.createElement('option');
                    option.setAttribute('value', `${assignment.id}`);
                    option.innerText = `Id: ${assignment.id}, Title: ${assignment.title}, Description: ${assignment.description.length > 40 ? assignment.description.substr(0, 39) + '...' : assignment.description}, Submission Date & Time: ${assignment.subDate.split('-')[1]}/${assignment.subDate.split('-')[2]}/${assignment.subDate.split('-')[0]} ${assignment.subTime}, Oral Mark: ${assignment.oralMark}, Total Mark: ${assignment.totalMark}`;
                    assignmentSelect.appendChild(option);
                }
            }

            for (let option of assignmentSelect.children) {
                option.removeAttribute('selected');
                if (option.value === value) {
                    option.setAttribute('selected', '');
                }
            }
            assignmentSelect.removeAttribute('disabled');

            const currentAssignment = assignmentsPerStudentPerCourse.find(x => x.studentId === +document.querySelector('#studentToEdit').value
                                                                                && x.courseId === +document.querySelector('#courseToEdit').value
                                                                               && x.assignmentId === +value);

            if (currentAssignment) {
                const assignment = assignments.find(x => x.id === +value);
                const studentsOralMarkError = document.querySelector('#studentsOralMarkError');
                const studentsTotalMarkError = document.querySelector('#studentsTotalMarkError');
                studentsOralMark.value = currentAssignment.studentsOralMark;
                studentsOralMark.removeAttribute('disabled');
                studentsOralMark.setAttribute('max', `${assignment.oralMark}`);
                studentsOralMarkError.innerHTML = `<small>*Student's oral mark must be a number, cannot be negative and must be equal or less than assignment's maximum oral mark: ${assignment.oralMark}</small>`;
                studentsTotalMark.value = currentAssignment.studentsTotalMark;
                studentsTotalMark.removeAttribute('disabled');
                const maxTotalMark = assignment.totalMark - (assignment.oralMark - studentsOralMark.value);
                studentsTotalMark.setAttribute('max', `${maxTotalMark}`);
                studentsTotalMark.setAttribute('min', `${studentsOralMark.value}`)
                studentsTotalMarkError.innerHTML = `<small>*Student's total mark must be a number, cannot be negative and for the above oral mark and assignment's maximum total mark must be equal or greater than ${studentsTotalMark.getAttribute('min')} and equal or less than ${studentsTotalMark.getAttribute('max')}</small>`
                form.style.display = 'initial';
            }
            else {
                $('#alertModal3').modal('show');
            }
        }
        toggleButton();
    }

    assignmentToEdit.addEventListener('change', assignmentToEditSelected);

    function studentSelected(e) {
        let value = e.target.value;
        const courseSelect = document.querySelector('#course');
        const assignmentSelect = document.querySelector('#assignment');
        if (studentsPerCourse.findIndex(x => x.courseId === +courseSelect.value && x.studentId === +value) != -1) {
            const selectedOptionValue = courseSelect.selectedOptions[0].value;
            while(1 < courseSelect.childNodes.length) {
                courseSelect.removeChild(courseSelect.childNodes[1]);
            }
            let studentCourses = studentsPerCourse.filter(x => x.studentId === +value);
            for (let course of courses) {
                if (studentCourses.findIndex(x => x.courseId === course.id) != -1) {
                    const option = document.createElement('option');
                    option.setAttribute('value', `${course.id}`);
                    option.innerText = `Id: ${course.id}, Title: ${course.title}, Stream: ${course.stream}, Type: ${course.type}, Start Date: ${course.startDate.split('-')[1]}/${course.startDate.split('-')[2]}/${course.startDate.split('-')[0]}, End Date: ${course.endDate.split('-')[1]}/${course.endDate.split('-')[2]}/${course.endDate.split('-')[0]}`;
                    courseSelect.appendChild(option);
                }
            }
        
            for (let option of courseSelect.children) {
                option.removeAttribute('selected');
                if (option.value === selectedOptionValue) {
                    option.setAttribute('selected','');
                }
            }
        }
        else {
            const courseSelected = courseSelect.value;
            while(1 < courseSelect.childNodes.length) {
                courseSelect.removeChild(courseSelect.childNodes[1]);
            }
            while(1 < assignmentSelect.childNodes.length) {
                assignmentSelect.removeChild(assignmentSelect.childNodes[1]);
            }
            courseSelect.setAttribute('disabled', '');
            courseSelect.children[0].setAttribute('selected','');
            assignmentSelect.setAttribute('disabled', '');
            assignmentSelect.children[0].setAttribute('selected','');
            studentsOralMark.setAttribute('disabled', '');
            studentsOralMark.value = 0;
            studentsOralMark.removeAttribute('max');
            studentsTotalMark.setAttribute('min', '0')
            studentsTotalMark.setAttribute('disabled', '');
            studentsTotalMark.removeAttribute('max');
            studentsTotalMark.value = 0;
            let studentCourses;
            if (value != 'default'){
                value = +value;
                studentCourses = studentsPerCourse.filter(x => x.studentId === value);
                if (studentCourses.length === 0) {
                    $('#alertModal6').modal('show');
                    return;
                }
            } 
            if (courseSelected != 'default') {
                if (value != 'default') {
                    $('#alertModal4').modal('show');
                }
                else {
                    $('#alertModal5').modal('show');
                }
            }
            if (value != 'default'){
                for (let course of courses) {
                    if (studentCourses.findIndex(x => x.courseId === course.id) != -1) {
                        const option = document.createElement('option');
                        option.setAttribute('value', `${course.id}`);
                        option.innerText = `Id: ${course.id}, Title: ${course.title}, Stream: ${course.stream}, Type: ${course.type}, Start Date: ${course.startDate.split('-')[1]}/${course.startDate.split('-')[2]}/${course.startDate.split('-')[0]}, End Date: ${course.endDate.split('-')[1]}/${course.endDate.split('-')[2]}/${course.endDate.split('-')[0]}`;
                        courseSelect.appendChild(option);
                    }
                }
            
                for (let option of courseSelect.children) {
                    option.removeAttribute('selected');
                }
                courseSelect.children[0].setAttribute('selected','');
                courseSelect.removeAttribute('disabled');
            }
        }
    }

    const studentSelect = document.querySelector('#student');

    studentSelect.addEventListener('change', studentSelected);

    function courseSelected(e) {
        let value = e.target.value;
        const assignmentSelect = document.querySelector('#assignment');
        if (assignmentsPerCourse.findIndex(x => x.assignmentId === +assignmentSelect.value && x.courseId === +value) != -1) {
            const selectedOptionValue = assignmentSelect.selectedOptions[0].value;
            while(1 < assignmentSelect.childNodes.length) {
                assignmentSelect.removeChild(assignmentSelect.childNodes[1]);
            }
            let courseAssignments = assignmentsPerCourse.filter(x => x.courseId === +value);
            for (let assignment of assignments) {
                if (courseAssignments.findIndex(x => x.assignmentId === assignment.id) != -1) {
                    const option = document.createElement('option');
                    option.setAttribute('value', `${assignment.id}`);
                    option.innerText = `Id: ${assignment.id}, Title: ${assignment.title}, Description: ${assignment.description.length > 40 ? assignment.description.substr(0, 39) + '...' : assignment.description}, Submission Date & Time: ${assignment.subDate.split('-')[1]}/${assignment.subDate.split('-')[2]}/${assignment.subDate.split('-')[0]} ${assignment.subTime}, Oral Mark: ${assignment.oralMark}, Total Mark: ${assignment.totalMark}`;
                    assignmentSelect.appendChild(option);
                }
            }
        
            for (let option of assignmentSelect.children) {
                option.removeAttribute('selected');
                if (option.value === selectedOptionValue) {
                    option.setAttribute('selected','');
                }
            }
        }
        else {
            const assignmentSelected = assignmentSelect.value;
            while(1 < assignmentSelect.childNodes.length) {
                assignmentSelect.removeChild(assignmentSelect.childNodes[1]);
            }
            assignmentSelect.setAttribute('disabled', '');
            assignmentSelect.children[0].setAttribute('selected','');
            studentsOralMark.setAttribute('disabled', '');
            studentsOralMark.value = 0;
            studentsOralMark.removeAttribute('max');
            studentsTotalMark.setAttribute('min', '0')
            studentsTotalMark.setAttribute('disabled', '');
            studentsTotalMark.removeAttribute('max');
            studentsTotalMark.value = 0;
            let courseAssignments;
            if (value != 'default'){
                value = +value;
                courseAssignments = assignmentsPerCourse.filter(x => x.courseId === value);
                if (courseAssignments.length === 0) {
                    $('#alertModal9').modal('show');
                    return;
                }
            }
            if (assignmentSelected != 'default') {
                if (value != 'default') {
                    $('#alertModal7').modal('show');
                }
                else {
                    $('#alertModal8').modal('show');
                }
            }
            if (value != 'default'){
                for (let assignment of assignments) {
                    if (courseAssignments.findIndex(x => x.assignmentId === assignment.id) != -1) {
                        const option = document.createElement('option');
                        option.setAttribute('value', `${assignment.id}`);
                        option.innerText = `Id: ${assignment.id}, Title: ${assignment.title}, Description: ${assignment.description.length > 40 ? assignment.description.substr(0, 39) + '...' : assignment.description}, Submission Date & Time: ${assignment.subDate.split('-')[1]}/${assignment.subDate.split('-')[2]}/${assignment.subDate.split('-')[0]} ${assignment.subTime}, Oral Mark: ${assignment.oralMark}, Total Mark: ${assignment.totalMark}`;
                        assignmentSelect.appendChild(option);
                    }
                }
            
                for (let option of assignmentSelect.children) {
                    option.removeAttribute('selected');
                }
                assignmentSelect.children[0].setAttribute('selected','');
                assignmentSelect.removeAttribute('disabled');
            }
        }
    }

    const courseSelect = document.querySelector('#course');

    courseSelect.addEventListener('change', courseSelected);

    function assignmentSelected(e) {
        let value = e.target.value;
        const studentsOralMark = document.querySelector('#studentsOralMark');
        const studentsTotalMark = document.querySelector('#studentsTotalMark');
        if (value != 'default'){
            const assignment = assignments.find(x => x.id === +value);
            const studentsOralMarkError = document.querySelector('#studentsOralMarkError');
            const studentsTotalMarkError = document.querySelector('#studentsTotalMarkError');
            studentsOralMark.removeAttribute('disabled');
            studentsOralMark.setAttribute('max', `${assignment.oralMark}`);
            studentsTotalMark.removeAttribute('disabled');
            studentsOralMarkError.innerHTML = `<small>*Student's oral mark must be a number, cannot be negative and must be equal or less than assignment's maximum oral mark: ${assignment.oralMark}</small>`;
            const maxTotalMark = assignment.totalMark - (assignment.oralMark - studentsOralMark.value);
            studentsTotalMark.setAttribute('max', `${maxTotalMark}`);
            studentsTotalMark.setAttribute('min', `${studentsOralMark.value}`)
            studentsTotalMarkError.innerHTML = `<small>*Student's total mark must be a number, cannot be negative and for the above oral mark and assignment's maximum total mark must be equal or greater than ${studentsTotalMark.getAttribute('min')} and equal or less than ${studentsTotalMark.getAttribute('max')}</small>`
        }
        else {
            $('#alertModal10').modal('show');
            studentsOralMark.setAttribute('disabled', '');
            studentsOralMark.value = 0;
            studentsOralMark.removeAttribute('max');
            studentsTotalMark.setAttribute('min', '0')
            studentsTotalMark.setAttribute('disabled', '');
            studentsTotalMark.removeAttribute('max');
            studentsTotalMark.value = 0;
        }
    }

    const assignmentSelect = document.querySelector('#assignment');

    assignmentSelect.addEventListener('change', assignmentSelected);

    const form = document.querySelector('form');

    function formSubmitted(e) {
        const studentToEditId = +document.querySelector('#studentToEdit').value;
        const courseToEditId = +document.querySelector('#courseToEdit').value;
        const assignmentToEditId = +document.querySelector('#assignmentToEdit').value;
        const studentId = +e.target[1].value;
        const courseId = +e.target[2].value;
        const assignmentId = +e.target[3].value;
        const studentsOralMark = +e.target[4].value;
        const studentsTotalMark = +e.target[5].value;

        if (assignmentsPerStudentPerCourse.findIndex(x => x.studentId === studentId && x.courseId === courseId && x.assignmentId === assignmentId) === -1
            || studentToEditId === studentId && courseToEditId === courseId && assignmentToEditId === assignmentId) {
            let assignment = assignmentsPerStudentPerCourse.find(x => x.studentId === studentToEditId && x.courseId === courseToEditId && x.assignmentId === assignmentToEditId);
            assignment.studentId = studentId;
            assignment.courseId = courseId;
            assignment.assignmentId = assignmentId;
            assignment.studentsOralMark = studentsOralMark;
            assignment.studentsTotalMark = studentsTotalMark;
        }
        else {
            $('#alertModal11').modal('show');
            e.preventDefault();
        }
        
        localStorage.setItem('assignmentsPerStudentPerCourse', JSON.stringify(assignmentsPerStudentPerCourse));
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
        const studentId = +document.querySelector('#studentToEdit').value;
        const courseId = +document.querySelector('#courseToEdit').value;
        const assignmentId = +document.querySelector('#assignmentToEdit').value;
        const index = assignmentsPerStudentPerCourse.findIndex(x => x.assignmentId === assignmentId && x.studentId === studentId && x.courseId === courseId);
        assignmentsPerStudentPerCourse.splice(index, 1);
        localStorage.setItem('assignmentsPerStudentPerCourse', JSON.stringify(assignmentsPerStudentPerCourse));
        window.location.href = '../AssignmentsPerStudentPerCourse/assignmentsPerStudentPerCourseDeletedSuccessfully.html';
    }
    modalDeleteButton.addEventListener('click', deleteAssignment);

    //Validation
    const button = document.querySelector('.formSubmit input')

    function toggleButton(){
        const studentsOralMark = document.querySelector('#studentsOralMark');
        const studentsTotalMark = document.querySelector('#studentsTotalMark');
        if(studentSelect.value != 'default' && courseSelect.value != 'default' && assignmentSelect.value != 'default'
            && studentsOralMark.value != '' && studentsOralMark.value >= 0 && studentsOralMark.validity.valid
            && studentsTotalMark.value != '' && studentsTotalMark.value >= 0 && studentsTotalMark.validity.valid) {
            button.removeAttribute('disabled');
        } 
        else {
            button.setAttribute('disabled', '');
        }
        if (studentsOralMark.value === '' || studentsOralMark.value < 0 || !studentsOralMark.validity.valid) {
            document.querySelector('#studentsOralMarkError').style.display = 'initial';
            document.querySelector('#studentsOralMarkError').style.width = '760px';
        }
        else {
            document.querySelector('#studentsOralMarkError').style.display = 'none';
        }
        if (studentsTotalMark.value === '' || studentsTotalMark.value < 0 || !studentsTotalMark.validity.valid) {
            document.querySelector('#studentsTotalMarkError').style.display = 'initial';
            if (studentsOralMark.value === '' || studentsOralMark.value < 0 || !studentsOralMark.validity.valid) {
                document.querySelector('#studentsTotalMarkError').style.width = '1050px';
            }
            else {
                document.querySelector('#studentsTotalMarkError').style.width = '1100px';
            }
        }
        else {
            document.querySelector('#studentsTotalMarkError').style.display = 'none';
        }
    }

    function setMaxTotalMark(e) {
        const assignment = assignments.find(x => x.id === +assignmentSelect.value);
        if (e.target.value != '' && e.target.value >=0 && e.target.validity.valid) {
            const value = +e.target.value;
            const studentsTotalMark = document.querySelector('#studentsTotalMark');
            const studentsTotalMarkError = document.querySelector('#studentsTotalMarkError');
            const maxTotalMark = assignment.totalMark - (assignment.oralMark - value);
            studentsTotalMark.setAttribute('max', `${maxTotalMark}`);
            studentsTotalMarkError.innerHTML = `<small>*Student's total mark must be a number, cannot be negative and for the above oral mark and assignment's maximum total mark must be equal or greater than ${studentsTotalMark.getAttribute('min')} and equal or less than ${studentsTotalMark.getAttribute('max')}</small>`;
        }
        else {
            studentsTotalMark.setAttribute('max', `${assignment.totalMark}`);
            studentsTotalMarkError.innerHTML = `<small>*Student's total mark must be a number, cannot be negative and since oral mark above is not set, according to assignment's maximum total mark must be equal or greater than ${studentsTotalMark.getAttribute('min')} and equal or less than ${studentsTotalMark.getAttribute('max')}</small>`;
        }
    }

    function setMinTotalMark(e) {
        const studentsTotalMark = document.querySelector('#studentsTotalMark');
        const studentsTotalMarkError = document.querySelector('#studentsTotalMarkError');
        if (e.target.value != '' && e.target.value >=0 && e.target.validity.valid) {
            const value = +e.target.value;
            const minTotalMark = +value;
            studentsTotalMark.setAttribute('min', `${minTotalMark}`);
            studentsTotalMarkError.innerHTML = `<small>*Student's total mark must be a number, cannot be negative and for the above oral mark and assignment's maximum total mark must be equal or greater than ${studentsTotalMark.getAttribute('min')} and equal or less than ${studentsTotalMark.getAttribute('max')}</small>`;
        }
        else {
            studentsTotalMark.setAttribute('min', '0');
            studentsTotalMarkError.innerHTML = `<small>*Student's total mark must be a number, cannot be negative and since oral mark above is not set, according to assignment's maximum total mark must be equal or greater than ${studentsTotalMark.getAttribute('min')} and equal or less than ${studentsTotalMark.getAttribute('max')}</small>`;
        }
    }

    const studentsOralMark = document.querySelector('#studentsOralMark');
    studentsOralMark.addEventListener('input', setMinTotalMark);
    studentsOralMark.addEventListener('input', setMaxTotalMark);

    studentSelect.addEventListener('change', toggleButton);
    courseSelect.addEventListener('change', toggleButton);
    assignmentSelect.addEventListener('change', toggleButton);
    studentsOralMark.addEventListener('input', toggleButton);
    studentsTotalMark.addEventListener('input', toggleButton);    
}
window.addEventListener('load', main);