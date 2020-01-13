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
            for (let trainer of trainers) {
                const checkboxLabel = document.createElement('label');
                checkboxLabel.classList.add('checkboxLabel', 'width');
                checkboxLabel.innerText = `Id: ${trainer.id}, First Name: ${trainer.firstName}, Last Name: ${trainer.lastName}, Subject: ${trainer.subject}`;
                const checkbox = document.createElement('input');
                checkbox.setAttribute('type', 'checkbox');
                checkbox.setAttribute('name', 'trainers');
                checkbox.setAttribute('value', `${trainer.id}`);
                if (trainersPerCourse.find(x => x.courseId === value && x.trainerId === trainer.id )) {
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
        const trainers = document.querySelectorAll('[name=trainers]');
        for(let i = 0; i < trainers.length ; i++) {
            const trainerId = +trainers[i].value;
            if(trainers[i].checked){
                if(!trainersPerCourse.find(x => x.courseId === courseId && x.trainerId === trainerId)) {
                    trainersPerCourse.push(new TrainerPerCourse(courseId, trainerId));
                }
            }
            else {
                const index = trainersPerCourse.findIndex(x => x.courseId === courseId && x.trainerId === trainerId);
                if( index !== -1) {
                    trainersPerCourse.splice(index, 1);
                }
            }
        }
        localStorage.setItem('trainersPerCourse', JSON.stringify(trainersPerCourse));
    }
    form.addEventListener('submit',formSubmitted);
}
window.addEventListener('load', main);