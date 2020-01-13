function main() {
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

    const tableBody = document.querySelector('#t-body');
    for (let i = 0; i < trainers.length; i++) {
        const tr = document.createElement('tr');
        if (i % 2 === 0) {
            tr.classList.add('tr-even');
        }
        else {
            tr.classList.add('tr-odd');
        }
        const td1 = document.createElement('td');
        td1.innerText = trainers[i].id;
        tr.appendChild(td1);
        const td2 = document.createElement('td');
        td2.innerText = trainers[i].firstName;
        tr.appendChild(td2);
        const td3 = document.createElement('td');
        td3.innerText = trainers[i].lastName;
        tr.appendChild(td3);
        const td4 = document.createElement('td');
        td4.innerText = trainers[i].subject;
        tr.appendChild(td4);
        tableBody.appendChild(tr);
    }
}
window.addEventListener('load', main);