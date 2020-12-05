'use strict';
const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
let expensesItems = document.querySelectorAll('.expenses-items'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    nameInput = document.querySelectorAll('[placeholder = "Наименование"]');
const calculate = document.getElementById('start'),
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
    salary = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-items > .income-title'),
    addIncome = document.querySelector('.additional_income-item'),
    expensesTitle = document.querySelector(".expenses-items > .expenses-title"),
    addExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    target = document.querySelector('.target-amount'),
    cloneExpensesItem = expensesItems[0].cloneNode(true),
    cloneIncomeItem = incomeItems[0].cloneNode(true);



const appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    start: function() {
        salary.addEventListener('oninput', function(){
            if (salary.value.length > 0){
                calculate.disabled = false;
            } else {
                calculate.disabled = true;
                return;
            }
        });
        appData.budget = +salary.value;
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();
    },
    showResult: function(){
        budget.value = appData.budgetMonth;
        budgetDay.value = Math.floor(appData.budgetDay);
        expensesMonth.value = appData.expensesMonth;
        additionalExpenses.value = appData.addExpenses.join(', ');
        additionalIncome.value = appData.addIncome.join(', ');
        targetMonth.value = appData.getTargetMonth();
        incomePeriod.value = appData.calcSavedMoney();
        periodSelect.addEventListener('change', function(){
            incomePeriod.value = appData.calcSavedMoney();
        });
    },
    addExpensesBlock: function() {
        
        let newCloneExpensesItem = cloneExpensesItem.cloneNode(true);
        expensesBlock.insertBefore(newCloneExpensesItem, button2);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3) {
            button2.style.display = 'none';
        }
    },
    addIncomeBlock: function () { 

        let newCloneIncomeItem = cloneIncomeItem.cloneNode(true);
        incomeItems[0].parentNode.insertBefore(newCloneIncomeItem, button1);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3) {
            button1.style.display = 'none';
        }
    },
    getRangeValue: function () { 
        periodAmount.innerHTML = this.value;
    },
    getExpenses: function() {
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getIncome: function () { 
        incomeItems.forEach(function (item) { 
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== ''){
                appData.income[itemIncome] = cashIncome;
                appData.incomeMonth += +cashIncome;
            }
        });
    },
    getAddExpenses: function(){
        let addExpenses = addExpensesItem.value.split(',');
        addExpenses.forEach(function (item) { 
            item = item.trim();
            if (item !== ''){
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome : function () { 
        incomeItem.forEach(function (item) { 
            let itemValue = item.value.trim();
            if (item.value !== ''){
                appData.addIncome.push(itemValue);
            }    
         });
    },
    getExpensesMonth: function() { 
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
    },
    getTargetMonth: function () {
        return (Math.ceil(target.value / Number(appData.budgetMonth)));
    },
    getStatusIncome: function(){
        if (appData.budgetDay >= 1200) {
            return ("У вас высокий уровень дохода");
        } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
            return ("У вас средний уровень дохода");
        } else if (appData.budgetDay <= 0) {
            return ("Что-то пошло не так");
        }
    },
    getInfoDeposit: function(){
        if(appData.deposit){
            do {
                appData.percentDeposit = prompt('Какой годовой процент?', '10');
            } while((!isNumber(appData.percentDeposit)));
            do {
                appData.moneyDeposit = prompt('Какая сумма заложена', '10000');
            } while((!isNumber(appData.moneyDeposit)));
        }
    },
    calcSavedMoney: function(){
       return appData.budgetMonth * periodSelect.value;
    }
};

calculate.addEventListener('click', appData.start);
button1.addEventListener('click', appData.addIncomeBlock);
button2.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('input', appData.getRangeValue);
appData.getTargetMonth();
appData.getStatusIncome();
appData.getInfoDeposit();
appData.calcSavedMoney();

