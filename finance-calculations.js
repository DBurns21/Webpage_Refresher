

const myForm = document.querySelector('#my-form');
const msg = document.querySelector('.msg');
const incomeInput = document.querySelector('#income');
const payFrequency = document.querySelector('#payFreqency');
const userList = document.querySelector('#users');


myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();

    //If any of the fields are empty we can't solve for how to spend/save money
    if(incomeInput.value === '' || payFrequency.value === '') {
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all Fields.';

        //setTimeout(() => msg.remove(), 3000);
        //This is meant for income without debts and whatnot included so you have to start with a positive number
    } else if (incomeInput.value <= 0) {
        msg.classList.add('error');
        msg.innerHTML = 'Income must be greater than 0.';
    } else {
        //These two lines only really matter if there was an incorrect input beforehand
        msg.classList.remove('error');
        msg.innerHTML = '';

        //since most bills are paid on a monthly basis it make the most sense to just convert everything to monthly
        //although I may want to add on the page that this assumes tax has already been accounted for
        let income = 0;
        if (payFrequency.value === 'monthly') {
            income = incomeInput.value;
        } else if (payFrequency.value === 'biweekly') {
            income = incomeInput.value * 2;
        } else if (payFrequency.value === 'weekly') {
            income = incomeInput.value * 4;
        } else {
            income = incomeInput.value * 160;
        }



        //just a temporary list so that I can see if data is being taken in correctly
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${income} : monthly`));

        userList.appendChild(li);
    }
}