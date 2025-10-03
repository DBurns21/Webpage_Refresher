Chart.register(ChartDataLabels);
        
const ctx = document.getElementById('pie-chart');
const myForm = document.querySelector('#my-form');
const msg = document.querySelector('.msg');
const incomeInput = document.querySelector('#income');
const payFrequency = document.querySelector('#payFreqency');
const userList = document.querySelector('#income-info');
let incomeChart = null; 


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
        let income = determineIncome(incomeInput.value, payFrequency);
        

        let [needsMoney, savings, wantsMoney] = splitIncome(income);

        userList.innerHTML = '';
        addToList(`Your monthly income is $${income} \n`);
        addToList(`$${needsMoney} should be spent on necessities`);
        addToList(`$${savings} should go to savings or debts`);
        addToList(`That leaves you with $${wantsMoney} for anything you may want.`);

        if (incomeChart !== null) {
            incomeChart.destroy();
        } 
        let labels = ['Needs', 'Wants', 'Savings/Debts'];

        incomeChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
            labels: ['Needs', 'Wants', 'Savings/Debts'],
            datasets: [{
                label: '$',
                data: [needsMoney, wantsMoney, savings],
                borderWidth: 1
            }]
            },
            options: {
                plugins: {
                    datalabels: {
                        //this is what is displayed directly on each section of the chart
                        formatter: (value, context) => {
                            return `${labels[context.dataIndex]}: $${value}`; // Display the raw data value
                        },
                        color: 'black', // Color of the text
                        font: {
                            weight: 'bold'
                        }
                    },
                    legend: {
                        //removes the legend from being displayed since it is labeled on the chart
                        display: false
                    }
                }
            }
        });
    }
}

function splitIncome(income) {
    let needsMoney = Math.ceil(income * 0.5);
    let savings = Math.ceil(income * 0.3);
    let wantsMoney = income - needsMoney - savings;

    return [needsMoney, savings, wantsMoney];
}

function determineIncome() {
    if (payFrequency.value === 'monthly') {
            return incomeInput.value;
        } else if (payFrequency.value === 'biweekly') {
            return incomeInput.value * 2;
        } else if (payFrequency.value === 'weekly') {
            return incomeInput.value * 4;
        } else {
            return incomeInput.value * 160;
        }
}

function addToList(string) {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(string));
   userList.appendChild(li);
}