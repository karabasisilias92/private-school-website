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

    let trainersPerCourse;

    function TrainerPerCourse(courseId, trainerId){
        this.courseId = courseId;
        this.trainerId = trainerId;
    }

    if(localStorage.getItem('trainersPerCourse') === null) {
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

    const trainerSelect = document.querySelector('#trainer');
    const defaultOption2 = document.createElement('option');
    defaultOption2.setAttribute('value', 'default');
    defaultOption2.innerText = 'Select a trainer';
    trainerSelect.appendChild(defaultOption2);

    for (let trainer of trainers) {
        const option2 = document.createElement('option');
        option2.setAttribute('value', `${trainer.id}`);
        option2.innerText = `Id: ${trainer.id}, First Name: ${trainer.firstName}, Last Name: ${trainer.lastName}, Subject: ${trainer.subject}`;
        trainerSelect.appendChild(option2);
    }

    for (let option of trainerSelect.children) {
        option.removeAttribute('selected');
    }
    trainerSelect.children[0].setAttribute('selected','');

    const form = document.querySelector('form');

    function formSubmitted(e) {
        const courseId = +e.target[1].value;
        const trainerId = +e.target[2].value;
        if (trainersPerCourse.findIndex(x => x.courseId === courseId && x.trainerId === trainerId) === -1) {
            trainersPerCourse.push(new TrainerPerCourse(courseId, trainerId));
            localStorage.setItem('trainersPerCourse', JSON.stringify(trainersPerCourse));
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
        if(courseSelect.value != 'default' && trainerSelect.value != 'default') {
            button.removeAttribute('disabled');
        } 
        else {
            button.setAttribute('disabled', '');
        }
    }    

    courseSelect.addEventListener('change', toggleButton);
    trainerSelect.addEventListener('change', toggleButton);
    
    toggleButton();
}
window.addEventListener('load', main);