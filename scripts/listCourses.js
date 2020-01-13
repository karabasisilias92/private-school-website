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

    const tableBody = document.querySelector('#t-body');
    for (let i = 0; i < courses.length; i++) {
        const tr = document.createElement('tr');
        if (i % 2 === 0) {
            tr.classList.add('tr-even');
        }
        else {
            tr.classList.add('tr-odd');
        }
        const td1 = document.createElement('td');
        td1.innerText = courses[i].id;
        tr.appendChild(td1);
        const td2 = document.createElement('td');
        td2.innerText = courses[i].title;
        tr.appendChild(td2);
        const td3 = document.createElement('td');
        td3.innerText = courses[i].stream;
        tr.appendChild(td3);
        const td4 = document.createElement('td');
        td4.innerText = courses[i].type;
        tr.appendChild(td4);
        const td5 = document.createElement('td');
        td5.innerText = courses[i].startDate.split('-')[1] + '/' + courses[i].startDate.split('-')[2] + '/' + courses[i].startDate.split('-')[0]; 
        tr.appendChild(td5);
        const td6 = document.createElement('td');
        td6.innerText = courses[i].endDate.split('-')[1] + '/' + courses[i].endDate.split('-')[2] + '/' + courses[i].endDate.split('-')[0];
        tr.appendChild(td6);
        tableBody.appendChild(tr);
    }
}
window.addEventListener('load', main);