'use strict';
const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
let expensesItems = document.querySelectorAll('.expenses-items'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    nameInput = document.querySelectorAll('[placeholder="Наименование"]'),
    sumInput = document.querySelectorAll('[placeholder="Сумма"]'),
    salary = document.querySelector('.salary-amount'),
        inputBlocked;
const calculate = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    button1 = document.getElementsByTagName('button')[0],
    button2 = document.getElementsByTagName('button')[1],
    check = document.querySelector('#deposit-check'),
    incomeItem = document.querySelectorAll('.additional_income-item'),
    budget = document.getElementsByClassName('budget_month-value')[0],
    budgetDay = document.getElementsByClassName('budget_day-value')[0],
    expensesMonth = document.getElementsByClassName('expenses_month-value')[0],
    expensesBlock = document.querySelector('.expenses'),
    additionalIncome = document.getElementsByClassName('additional_income-value')[0],
    additionalExpenses = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriod = document.getElementsByClassName('income_period-value')[0],
    targetMonth = document.getElementsByClassName('target_month-value')[0],
    incomeTitle = document.querySelector('.income-items > .income-title'),
    addIncome = document.querySelector('.additional_income-item'),
    expensesTitle = document.querySelector(".expenses-items > .expenses-title"),
    addExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    target = document.querySelector('.target-amount'),
    cloneExpensesItem = expensesItems[0].cloneNode(true),
    cloneIncomeItem = incomeItems[0].cloneNode(true),
    dataDiv = document.querySelector('.data');


class AppData {
    constructor(){
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
    }

    start() {
        if(salary.value.trim() === '') {
            return;
        }
        this.budget = +salary.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();

        this.showResult();
        calculate.style.display = "none";
        cancel.style.display = "block";
        inputBlocked = dataDiv.querySelectorAll('[type=text]');
        for(let i = 0; i < (inputBlocked.length); i++) {
            inputBlocked[i].disabled = true;
        }
        button1.disabled = true;
        button2.disabled = true;
    }

    reset() {
        button1.disabled = false;
        button2.disabled = false;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        budget.value = this.budgetMonth;
        budgetDay.value = this.budgetDay;
        expensesMonth.value = this.expensesMonth;
        additionalExpenses.value = this.addExpenses;
        additionalIncome.value = this.addIncome;
        targetMonth.value = 0;
        incomePeriod.value = 0;
        periodSelect.value = 1;
        periodAmount.innerHTML = 1;
        cancel.style.display = "none";
        calculate.style.display = "block";
        inputBlocked = dataDiv.querySelectorAll('[type=text]');
        for(let i = 0; i < (inputBlocked.length); i++) {
            inputBlocked[i].disabled = false;
            inputBlocked[i].value = '';
        }
        for(let i = 0; i < 1; i++){
            button2.style.display = 'block';
            button1.style.display = 'block';
            const income = document.querySelector('.income');
            const incomeInputs = income.querySelectorAll('[placeholder="Наименование"]');
            const incomeSum = income.querySelectorAll('[placeholder="Сумма"]');
            incomeInputs[i].remove();
            incomeSum[i].remove();
            const expenses = document.querySelector('.expenses');
            const expensesInputs = expenses.querySelectorAll('[placeholder="Наименование"]');
            const expensesSum = expenses.querySelectorAll('[placeholder="Сумма"]');
            expensesInputs[i].remove();
            expensesSum[i].remove();
        }
    }

    showResult() {
        budget.value = this.budgetMonth;
        budgetDay.value = Math.floor(this.budgetDay);
        expensesMonth.value = this.expensesMonth;
        additionalExpenses.value = this.addExpenses.join(', ');
        additionalIncome.value = this.addIncome.join(', ');
        targetMonth.value = this.getTargetMonth();
        incomePeriod.value = this.calcSavedMoney();
        const _this = this;
        periodSelect.addEventListener('input', function(){
            incomePeriod.value = _this.calcSavedMoney();
        });
    }

    addExpensesBlock() {
    
        let newCloneExpensesItem = cloneExpensesItem.cloneNode(true);
        expensesBlock.insertBefore(newCloneExpensesItem, button2);
        expensesItems = document.querySelectorAll('.expenses-items');
        nameInput = document.querySelectorAll('[placeholder="Наименование"]');
        sumInput = document.querySelectorAll('[placeholder="Сумма"]');
        for(let i = 0; i < (nameInput.length); i++) {
            nameInput[i].addEventListener('input',function() {
                nameInput[i].value = nameInput[i].value.replace(/[^а-я ,.]/,'');
            });
        }
        for(let i = 0; i < (sumInput.length); i++) {
            sumInput[i].addEventListener('input',function() {
                sumInput[i].value = sumInput[i].value.replace(/[^0-9]/,'');
            });
        }
        if(expensesItems.length === 3) {
            button2.style.display = 'none';
        }
    }

    addIncomeBlock() {
        let newCloneIncomeItem = cloneIncomeItem.cloneNode(true);
        incomeItems[0].parentNode.insertBefore(newCloneIncomeItem, button1);
        incomeItems = document.querySelectorAll('.income-items');
        nameInput = document.querySelectorAll('[placeholder="Наименование"]');
        sumInput = document.querySelectorAll('[placeholder="Сумма"]');
        for(let i = 0; i < (nameInput.length); i++) {
            nameInput[i].addEventListener('input',function() {
                nameInput[i].value = nameInput[i].value.replace(/[^а-я ,.]/,'');
            });
        }
        for(let i = 0; i < (sumInput.length); i++) {
            sumInput[i].addEventListener('input',function() {
                sumInput[i].value = sumInput[i].value.replace(/[^0-9]/,'');
            });
        }
        if(incomeItems.length === 3) {
            button1.style.display = 'none';
        }
    }

    getRangeValue() {
        periodAmount.innerHTML = this.value;
    }

    getExpenses() {
        const _this = this;
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                _this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }

    getIncome() {
        const _this = this; 
        incomeItems.forEach(function (item) { 
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== ''){
                _this.income[itemIncome] = cashIncome;
                _this.incomeMonth += +cashIncome;
            }
        });
    }

    getAddExpenses() {
        const _this = this;
        let addExpenses = addExpensesItem.value.split(',');
        addExpenses.forEach(function (item) { 
            item = item.trim();
            if (item !== ''){
                _this.addExpenses.push(item);
            }
        });
    }

    getAddIncome() {
        const _this = this; 
        incomeItem.forEach(function (item) { 
            let itemValue = item.value.trim();
            if (item.value !== ''){
                _this.addIncome.push(itemValue);
            }    
        });
    }

    getExpensesMonth() {
            for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    }

    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = this.budgetMonth / 30;
    }

    getTargetMonth() {
        return (Math.ceil(target.value / Number(this.budgetMonth)));
    }

    getStatusIncome() {
        if (this.budgetDay >= 1200) {
            return ("У вас высокий уровень дохода");
        } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
            return ("У вас средний уровень дохода");
        } else if (this.budgetDay <= 0) {
            return ("Что-то пошло не так");
        }
    }

    getInfoDeposit() {
        if(this.deposit){
            do {
                this.percentDeposit = prompt('Какой годовой процент?', '10');
            } while((!isNumber(this.percentDeposit)));
            do {
                this.moneyDeposit = prompt('Какая сумма заложена', '10000');
            } while((!isNumber(this.moneyDeposit)));
        }
    }
    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    }

    eventListeners() {
        for(let i = 0; i < (nameInput.length); i++) {
            nameInput[i].addEventListener('input',function() {
                nameInput[i].value = nameInput[i].value.replace(/[^а-я ,.]/,'');
            });
        }
        for(let i = 0; i < (sumInput.length); i++) {
            sumInput[i].addEventListener('input',function() {
                sumInput[i].value = sumInput[i].value.replace(/[^0-9]/,'');
            });
        }
        const startFunc = this.start.bind(this);
        const resetFunc = this.reset.bind(this);
        calculate.addEventListener('click', startFunc);
        cancel.addEventListener('click', resetFunc);
        button1.addEventListener('click', this.addIncomeBlock);
        button2.addEventListener('click', this.addExpensesBlock);
        periodSelect.addEventListener('input', this.getRangeValue);
        this.getTargetMonth();
        this.getStatusIncome();
        this.getInfoDeposit();
        this.calcSavedMoney();
    }
}


const appData = new AppData();

appData.eventListeners();




