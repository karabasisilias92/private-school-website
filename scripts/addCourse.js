function main () {
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

    let courses;

    if(localStorage.getItem('courses') === null) {
        courses = [];

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

    const form = document.querySelector('form');
    
    form.reset();

    function formSubmitted(e) {
        if (courses.findIndex(x => x.title === e.target[1].value && x.stream === e.target[2].value && x.type === e.target[3].value
                                && x.startDate === e.target[4].value && x.endDate === e.target[5].value) === -1) {
            courses.push(new Course(e.target[1].value, e.target[2].value, e.target[3].value, e.target[4].value, e.target[5].value));
            localStorage.setItem('courses', JSON.stringify(courses));
            localStorage.setItem('course_counter', course_counter);
        }
        else {
            $('#alertModal').modal('show');
            e.preventDefault();
        }
    }
    form.addEventListener('submit',formSubmitted);

    // Validation Code    
    const button = document.querySelector('.formSubmit input')
    const titleInput = document.querySelector('#title');
    const startDateInput = document.querySelector('#startDate');
    const endDateInput = document.querySelector('#endDate');

    function toggleButton(){
        const regex = new RegExp('^[A-ZΑ-Ω].*');
        if(regex.test(titleInput.value) && startDateInput.value != '' && startDateInput.validity.valid && endDateInput.value != '' && endDateInput.validity.valid) {
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
        if (startDateInput.value === '' || !startDateInput.validity.valid) {
            document.querySelector('#startDateError').style.display = 'initial';
        }
        else {
            document.querySelector('#startDateError').style.display = 'none';
        }
        if (endDateInput.value === '' || !endDateInput.validity.valid) {
            document.querySelector('#endDateError').style.display = 'initial';
        }
        else {
            document.querySelector('#endDateError').style.display = 'none';
        }
    }

    function startDateSet() {
        if(startDateInput.value != '') {
            endDateInput.setAttribute('min', `${startDateInput.value}`);
        }
        else {
            endDateInput.removeAttribute('min');
        }
    }

    startDateInput.addEventListener('input', startDateSet);

    function endDateSet() {
        if(endDateInput.value != '') {
            startDateInput.setAttribute('max', `${endDateInput.value}`);
        }
        else {
            startDateInput.removeAttribute('max');
        }
    }

    endDateInput.addEventListener('input', endDateSet);    

    titleInput.addEventListener('input', toggleButton);
    startDateInput.addEventListener('input', toggleButton);
    endDateInput.addEventListener('input', toggleButton);
    
    toggleButton();

}
window.addEventListener('load', main);