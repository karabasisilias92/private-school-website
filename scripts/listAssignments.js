function main() {
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

    const tableBody = document.querySelector('#t-body');
    for (let i = 0; i < assignments.length; i++) {
        const tr = document.createElement('tr');
        if (i % 2 === 0) {
            tr.classList.add('tr-even');
        }
        else {
            tr.classList.add('tr-odd');
        }
        const td1 = document.createElement('td');
        td1.innerText = assignments[i].id;
        tr.appendChild(td1);
        const td2 = document.createElement('td');
        td2.innerText = assignments[i].title;
        tr.appendChild(td2);
        const td3 = document.createElement('td');
        td3.innerText = assignments[i].description;
        tr.appendChild(td3);
        const td4 = document.createElement('td');
        td4.innerText = assignments[i].subDate.split('-')[1] + '/' + assignments[i].subDate.split('-')[2] + '/' + assignments[i].subDate.split('-')[0] + ' ' + assignments[i].subTime;
        tr.appendChild(td4);
        const td5 = document.createElement('td');
        td5.innerText = assignments[i].oralMark;
        tr.appendChild(td5);
        const td6 = document.createElement('td');
        td6.innerText = assignments[i].totalMark;
        tr.appendChild(td6);
        tableBody.appendChild(tr);
    }
}
window.addEventListener('load', main);