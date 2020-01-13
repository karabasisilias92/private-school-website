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

    let trainers;
    if(localStorage.getItem('trainers') === null) {
        trainers = [];

        let trainer_counter;
        if (localStorage.getItem('trainer_counter') === null) {
            trainer_counter = 1;
        }
        else {
            trainer_counter = +localStorage.getItem('trainer_counter');
        }
        function Trainer(firstName, lastName, subject){
            this.id = trainer_counter++;
            this.firstName = firstName;
            this.lastName = lastName;
            this.subject = subject;
        }

        trainers.push(new Trainer('Ilias', 'Karabasis', 'C#'));
        trainers.push(new Trainer('Petros', 'Papadopoulos', 'Java'));
        trainers.push(new Trainer('Giannis', 'Petrou', 'HTML, CSS, Javascript'));
        trainers.push(new Trainer('Kostas', 'Petropoulos', 'C#'));
        trainers.push(new Trainer('Ioanna', 'Konstantinou', 'SQL'));
        localStorage.setItem('trainers', JSON.stringify(trainers));
        localStorage.setItem('trainer_counter', trainer_counter);
    }
    else {
        trainers = JSON.parse(localStorage.getItem('trainers'));
    }

    function TrainerPerCourse(courseId, trainerId){
        this.courseId = courseId;
        this.trainerId = trainerId;
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

    const listMain = document.querySelector('#listMain');
    for (let i = 0; i < courses.length; i++) {
        const div = document.createElement('div');
        const h2 = document.createElement('h2');
        h2.classList.add('zero-tab');
        h2.innerText = 'Course info:';
        div.appendChild(h2);
        const courseTable = createCourseTable(courses[i]);
        div.appendChild(courseTable);
        const courseTrainers = trainersPerCourse.filter(x => x.courseId === courses[i].id);
        if (courseTrainers.length === 0) {
            const h3 = document.createElement('h3');
            h3.classList.add('one-tab');
            h3.innerText = 'No trainers teach in the above course.';
            div.appendChild(h3);
        }
        else {
            const newh2 = document.createElement('h2');
            newh2.classList.add('one-tab');
            newh2.innerText = 'Below you can see the trainers\ info for the above course:';
            div.appendChild(newh2);
            const trainersTable = createTrainersTable(courseTrainers);
            div.appendChild(trainersTable);
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

    function createTrainersTable(courseTrainers) {
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
        th4.innerText = 'Subject';
        tr.appendChild(th4);
        thead.appendChild(tr);
        table.appendChild(thead);
        const tbody = document.createElement('tbody');
        for (let i = 0; i < courseTrainers.length; i++) {
            const trainer = trainers.find(x => x.id === courseTrainers[i].trainerId);
            const tr2 = document.createElement('tr');
            if (i % 2 === 0) {
                tr2.classList.add('tr-even');
            }
            else {
                tr2.classList.add('tr-odd');
            }
            const td1 = document.createElement('td');
            td1.innerText = trainer.id;
            tr2.appendChild(td1);
            const td2 = document.createElement('td');
            td2.innerText = trainer.firstName;
            tr2.appendChild(td2);
            const td3 = document.createElement('td');
            td3.innerText = trainer.lastName;
            tr2.appendChild(td3);
            const td4 = document.createElement('td');
            td4.innerText = trainer.subject;
            tr2.appendChild(td4);
            tbody.appendChild(tr2);
        }
        table.appendChild(tbody);
        return table;
    }
}
window.addEventListener('load', main);