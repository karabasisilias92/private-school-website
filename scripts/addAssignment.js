function main () {
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
    let assignments;

    if(localStorage.getItem('assignments') === null) {
        assignments = [];

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

    
    const form = document.querySelector('form');

    form.reset();
    
    function formSubmitted(e) {
        if (assignments.findIndex(x => x.title === e.target[1].value && x.description === e.target[2].value && x.subDate === e.target[3].value
            && x.subTime === e.target[4].value && x.oralMark === +e.target[5].value && x.totalMark === +e.target[6].value) === -1) {
            assignments.push(new Assignment(e.target[1].value, e.target[2].value, e.target[3].value, e.target[4].value, +e.target[5].value, +e.target[6].value));
            localStorage.setItem('assignments', JSON.stringify(assignments));
            localStorage.setItem('assignment_counter', assignment_counter);
        }
        else {
            $('#alertModal').modal('show');
            e.preventDefault();
        }
    }
    form.addEventListener('submit',formSubmitted);

    if (navigator.userAgent.toLowerCase().indexOf('edge') > -1) {
        document.querySelector('.formElement #description').cols = '36';
    } 
    else if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
        document.querySelector('.formElement #description').cols = '43';
    }

    // Validation Code    
    const button = document.querySelector('.formSubmit input')
    const titleInput = document.querySelector('#title');
    const descriptionInput = document.querySelector('#description');
    const subDateInput = document.querySelector('#subDate');
    const subTimeInput = document.querySelector('#subTime');
    const oralMarkInput = document.querySelector('#oralMark');
    const totalMarkInput = document.querySelector('#totalMark');

    function toggleButton(){
        const regex = new RegExp('^[A-ZΑ-Ω].*');
        if(regex.test(titleInput.value) && regex.test(descriptionInput.value) && subDateInput.value != '' && subDateInput.validity.valid 
            && subTimeInput.value != '' && oralMarkInput.value != '' && oralMarkInput.value >= 0 && oralMarkInput.validity.valid
            && totalMarkInput.value != '' && totalMarkInput.value >= 0 && totalMarkInput.validity.valid) {
            button.removeAttribute('disabled');
        } 
        else {
            button.setAttribute('disabled', '');
        }
        if (!regex.test(titleInput.value)) {
            document.querySelector('#titleError').style.display = 'initial';
        }
        else {
            document.querySelector('#titleError').style.display = 'none';
        }
        if (!regex.test(descriptionInput.value)) {
            document.querySelector('#descriptionError').style.display = 'initial';
        }
        else {
            document.querySelector('#descriptionError').style.display = 'none';
        }
        if (subDateInput.value === '' || !subDateInput.validity.valid) {
            document.querySelector('#subDateError').style.display = 'initial';
        }
        else {
            document.querySelector('#subDateError').style.display = 'none';
        }
        if (subTimeInput.value === '') {
            document.querySelector('#subTimeError').style.display = 'initial';
        }
        else {
            document.querySelector('#subTimeError').style.display = 'none';
        }
        if (oralMarkInput.value === '' || oralMarkInput.value < 0 || !oralMarkInput.validity.valid) {
            document.querySelector('#oralMarkError').style.display = 'initial';
            document.querySelector('#oralMarkError').style.width = '600px';
        }
        else {
            document.querySelector('#oralMarkError').style.display = 'none';
        }
        if (totalMarkInput.value === '' || totalMarkInput.value < 0 || !totalMarkInput.validity.valid) {
            document.querySelector('#totalMarkError').style.display = 'initial';
            document.querySelector('#totalMarkError').style.width = '600px';
        }
        else {
            document.querySelector('#totalMarkError').style.display = 'none';
        }
    }

    function oralMarkSet() {
        if(oralMarkInput.value != '') {
            totalMarkInput.setAttribute('min', `${oralMarkInput.value}`);
        }
        else {
            totalMarkInput.setAttribute('min', '0');
        }
    }

    oralMarkInput.addEventListener('input', oralMarkSet);

    function totalMarkSet() {
        if(totalMarkInput.value != '') {
            oralMarkInput.setAttribute('max', `${totalMarkInput.value}`);
        }
        else {
            oralMarkInput.removeAttribute('max');
        }
    }

    totalMarkInput.addEventListener('input', totalMarkSet);   

    titleInput.addEventListener('input', toggleButton);
    descriptionInput.addEventListener('input', toggleButton);
    subDateInput.addEventListener('input', toggleButton);
    subTimeInput.addEventListener('input', toggleButton);
    oralMarkInput.addEventListener('input', toggleButton);
    totalMarkInput.addEventListener('input', toggleButton);
    
    toggleButton();
}
window.addEventListener('load', main);