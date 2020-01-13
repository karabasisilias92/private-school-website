function main () {
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

    const select = document.querySelector('#trainerToEdit') ? document.querySelector('#trainerToEdit') : document.querySelector('#trainerToUpdate');
    const defaultOption = document.createElement('option');
    defaultOption.setAttribute('value', 'default');
    defaultOption.innerText = 'Select a trainer';
    select.appendChild(defaultOption);

    for (let trainer of trainers) {
        const option = document.createElement('option');
        option.setAttribute('value', `${trainer.id};${trainer.firstName};${trainer.lastName};${trainer.subject}`);
        option.innerText = `Id: ${trainer.id}, First Name: ${trainer.firstName}, Last Name: ${trainer.lastName}, Subject: ${trainer.subject}`;

        select.appendChild(option);
    }

    for (let option of select.children) {
        option.removeAttribute('selected');
    }
    select.children[0].setAttribute('selected','');

    function optionSelected(e) {
        const value = e.target.value;
        const form = document.querySelector('form');
        form.reset();
        if (value === 'default'){
            form.style.display = 'none';
        }
        else {
            form.style.display = 'initial';
            const formElements = document.querySelectorAll('.formElement');
            const optionValues = value.split(';');
            for (let i = 0; i < formElements.length ; i++) {
                formElements[i].children[1].setAttribute('value', optionValues[i]);
            }
        }
        toggleButton();
    }

    select.addEventListener('change', optionSelected);

    const form = document.querySelector('form');

    form.reset();

    function formSubmitted(e) {
        const id = +e.target[1].value;
        const firstName = e.target[2].value;
        const lastName = e.target[3].value;
        const subject = e.target[4].value;

        if (trainers.findIndex(x => x.id != id && x.firstName === firstName && x.lastName === lastName && x.subject === subject) === -1) {
            let trainer = trainers.find(x => x.id === id);
            trainer.firstName = firstName;
            trainer.lastName = lastName;
            trainer.subject = subject;
            localStorage.setItem('trainers', JSON.stringify(trainers));
        }
        else {
            $('#alertModal').modal('show');
            e.preventDefault();
        }
    }
    form.addEventListener('submit',formSubmitted);

    const deleteButton = document.querySelector('.formSubmit button');

    function showDeleteModal(e) {
        e.preventDefault();
        $('#deleteModal').modal('show');
    }
    deleteButton.addEventListener('click', showDeleteModal);

    const modalDeleteButton = document.querySelector('#deleteTrainer');

    function deleteTrainer() {
        const trainerId = +document.querySelector('#trainerId').value;
        const index = trainers.findIndex(x => x.id === trainerId);
        trainers.splice(index, 1);
        localStorage.setItem('trainers', JSON.stringify(trainers));
        let i = 0;
        while(i < trainersPerCourse.length){
            if (trainersPerCourse[i].trainerId === trainerId) {
                trainersPerCourse.splice(i,1);
            }
            else {
                i++;
            }
        }
        localStorage.setItem('trainersPerCourse', JSON.stringify(trainersPerCourse));
        window.location.href = '../Trainers/trainerDeletedSuccessfully.html';
    }
    modalDeleteButton.addEventListener('click', deleteTrainer);

    // Validation Code    
    const button = document.querySelector('.formSubmit input')
    const firstName = document.querySelector('#firstName');
    const lastName = document.querySelector('#lastName');
    const subject = document.querySelector('#subject');

    function toggleButton(){
        const regex1 = new RegExp('^[A-Z][a-z]*$');
        const regex3 = new RegExp('^[Α-Ω][α-ωάήίόέύώϊϋΐΰ]*$');
        const regex2 = new RegExp('^[A-ZΑ-Ω].*');
        if((regex1.test(firstName.value) || regex3.test(firstName.value)) && (regex1.test(lastName.value) || regex3.test(lastName.value)) && regex2.test(subject.value)) {
            button.removeAttribute('disabled');
        } 
        else {
            button.setAttribute('disabled', '');
        }
        if (!(regex1.test(firstName.value) || regex3.test(firstName.value))) {
            document.querySelector('#firstNameError').style.display = 'initial';
        }
        else {
            document.querySelector('#firstNameError').style.display = 'none';
        }
        if (!(regex1.test(lastName.value) || regex3.test(lastName.value))) {
            document.querySelector('#lastNameError').style.display = 'initial';
        }
        else {
            document.querySelector('#lastNameError').style.display = 'none';
        }
        if (!regex2.test(subject.value)) {
            document.querySelector('#subjectError').style.display = 'initial';
        }
        else {
            document.querySelector('#subjectError').style.display = 'none';
        }
    }        

    firstName.addEventListener('input', toggleButton);
    lastName.addEventListener('input', toggleButton);
    subject.addEventListener('input', toggleButton);    
}
window.addEventListener('load', main);