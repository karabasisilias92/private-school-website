function main () {
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

    let trainers;

    if(localStorage.getItem('trainers') === null) {
        trainers = [];

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
    
    const form = document.querySelector('form');

    form.reset();

    function formSubmitted(e) {
        if (trainers.findIndex(x => x.firstName === e.target[1].value && x.lastName === e.target[2].value && x.subject === e.target[3].value) === -1) {
            trainers.push(new Trainer(e.target[1].value, e.target[2].value, e.target[3].value));
            localStorage.setItem('trainers', JSON.stringify(trainers));
            localStorage.setItem('trainer_counter', trainer_counter);
        }
        else {
            $('#alertModal').modal('show');
            e.preventDefault();
        }
    }
    form.addEventListener('submit',formSubmitted);

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
    
    toggleButton();
}
window.addEventListener('load', main);