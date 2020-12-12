'use strict';
const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    nameInput = document.querySelectorAll('[placeholder="Наименование"]'),
    sumInput = document.querySelectorAll('[placeholder="Сумма"]'),
    salary = document.querySelector('.salary-amount'),
        inputBlocked;
const calculate = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    check = document.querySelector('#deposit-check'),
    button1 = document.getElementsByTagName('button')[0],
    button2 = document.getElementsByTagName('button')[1],
    budget = document.getElementsByClassName('budget_month-value')[0],
    budgetDay = document.getElementsByClassName('budget_day-value')[0],
    depositPercent = document.querySelector('.deposit-percent'),
    depositAmount = document.querySelector('.deposit-amount'),
    expensesMonth = document.getElementsByClassName('expenses_month-value')[0],
    expensesTitle = document.querySelector(".expenses-items > .expenses-title"),
    additionalIncome = document.getElementsByClassName('additional_income-value')[0],
    additionalExpenses = document.getElementsByClassName('additional_expenses-value')[0],
    addExpensesItem = document.querySelector('.additional_expenses-item'),
    incomeItem = document.querySelectorAll('.additional_income-item'),
    incomePeriod = document.getElementsByClassName('income_period-value')[0],
    incomeTitle = document.querySelector('.income-items > .income-title'),
    targetMonth = document.getElementsByClassName('target_month-value')[0],
    target = document.querySelector('.target-amount'),
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
        this.getExpInc();
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
        button2.style.display = 'block';
        button1.style.display = 'block';
        const income = document.querySelector('.income');
        let incomeInputs = income.querySelectorAll('[placeholder="Наименование"]');
        let incomeSum = income.querySelectorAll('[placeholder="Сумма"]');
        const expenses = document.querySelector('.expenses');
        let expensesInputs = expenses.querySelectorAll('[placeholder="Наименование"]');
        let expensesSum = expenses.querySelectorAll('[placeholder="Сумма"]');
        while(incomeInputs.length > 1) {
            let i = 0;
            incomeInputs[i].remove();
            incomeSum[i].remove();
            incomeInputs = income.querySelectorAll('[placeholder="Наименование"]');
            incomeSum = income.querySelectorAll('[placeholder="Сумма"]');
        }
        
        while(expensesInputs.length > 1) {
            let i = 0;
            expensesInputs[i].remove();
            expensesSum[i].remove();
            expensesInputs = expenses.querySelectorAll('[placeholder="Наименование"]');
            expensesSum = expenses.querySelectorAll('[placeholder="Сумма"]');
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
    
    addExpIncBlock(e) {
        const add = item => {
            
            const itemStr = item.className.split('-')[0];
            let itemItems = document.querySelectorAll(`.${itemStr}-items`);
            let cloneItemItem = itemItems[0].cloneNode(true);
            let cloneName = cloneItemItem.querySelector('[placeholder="Наименование"]');
            let cloneSum = cloneItemItem.querySelector('[placeholder="Сумма"]');
            if (cloneSum.value !== '') {
                cloneSum.value = '';
            }
            if(cloneName.value !== ''){
                cloneName.value = '';
            }
            const itemButton = itemItems[0].parentNode.querySelector('.btn_plus');
            itemItems[0].parentNode.insertBefore(cloneItemItem, itemButton);
            itemItems = item.querySelectorAll(`.${itemStr}-items`);

            let nameInput = document.querySelectorAll('[placeholder="Наименование"]');
            let sumInput = document.querySelectorAll('[placeholder="Сумма"]');
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
            itemItems = document.querySelectorAll(`.${itemStr}-items`);
            if(itemItems.length === 3) {
                itemButton.style.display = 'none';
            }
        };

        if (e.currentTarget === button1) {
            incomeItems.forEach(add);
        } else {
            expensesItems.forEach(add);
        }
        
    }

    getRangeValue() {
        periodAmount.innerHTML = this.value;
    }

    getExpInc() {
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if(itemTitle !== '' && itemAmount !== ''){
                this[startStr][itemTitle] = itemAmount;
            }
        };

        incomeItems.forEach(count);
        expensesItems.forEach(count);

        for (const key in this.income) {
            this.incomeMonth += +this.income[key];
        }
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

    // getAddExpInc() {
    //     const count = item => {
    //         const itemStr = item.className.split('-')[0]; //additional_income, additional_expenses
    //         const itemNode = document.querySelectorAll('.${itemStr}=item');
    //     }


    // }
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
        button1.addEventListener('click', this.addExpIncBlock);
        button2.addEventListener('click', this.addExpIncBlock);
        periodSelect.addEventListener('input', this.getRangeValue);
        this.getTargetMonth();
        this.getStatusIncome();
        this.getInfoDeposit();
        this.calcSavedMoney();
    }
}


const appData = new AppData();

appData.eventListeners();




