function main() {
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


    const tableBody = document.querySelector('#t-body');
    for (let i = 0; i < students.length; i++) {
        const tr = document.createElement('tr');
        if (i % 2 === 0) {
            tr.classList.add('tr-even');
        }
        else {
            tr.classList.add('tr-odd');
        }
        const td1 = document.createElement('td');
        td1.innerText = students[i].id;
        tr.appendChild(td1);
        const td2 = document.createElement('td');
        td2.innerText = students[i].firstName;
        tr.appendChild(td2);
        const td3 = document.createElement('td');
        td3.innerText = students[i].lastName;
        tr.appendChild(td3);
        const td4 = document.createElement('td');
        td4.innerText = students[i].dateOfBirth.split('-')[1] + '/' + students[i].dateOfBirth.split('-')[2] + '/' + students[i].dateOfBirth.split('-')[0];
        tr.appendChild(td4);
        const td5 = document.createElement('td');
        td5.innerText = students[i].tuitionFees;
        tr.appendChild(td5);
        tableBody.appendChild(tr);
    }
}
window.addEventListener('load', main);