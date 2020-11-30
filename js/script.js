'use strict';
const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;

const start = function() {
    do {
        money = prompt("Ваш месячный доход?");
    } while (!isNumber(money));
};

start();

const appData = {
    budget: +money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 8,
    asking: function() {

        if(confirm('Есть ли у вас дополнительный заработок?')){
            let itemIncome;
            let cashIncome;

            do {
                itemIncome = prompt('Какой у вас есть дополнительный заработок?', 'Таксую');
            } while (isNumber(itemIncome));
            do {
                cashIncome = prompt('Сколько вы зарабатываете на этом в месяц?', '10000');
            } while (!isNumber(cashIncome));
            appData.income[itemIncome] = cashIncome;
        }

        const addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
            appData.addExpenses = addExpenses.toLowerCase().split(', ');
            appData.deposit = confirm("Есть ли у вас депозит в банке?");
        let keys = [];
        let values = [];
        for (let i = 0; i < 2; i++) {

        do {
            keys[i] = prompt("Введите обязательную статью расходов?");
        } while(isNumber(keys[i]));
        do {
            values[i] = +prompt("Во сколько это обойдется?");
        } while (Number.isInteger(values[i]) !== true );
        }
        for (let i = 0; i < 2; i++) {
            let key = keys[i];
            let value = values[i];
            appData.expenses[key] = value;
        }
    },
    getExpensesMonth: function() { 
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
    },
    getTargetMonth: function () {
        return (Math.ceil(appData.mission / Number(appData.budgetMonth)));
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
       return appData.budgetMonth * appData.period;
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
appData.getInfoDeposit();
appData.calcSavedMoney();

console.log("Расходы за месяц: " + appData.expensesMonth);
if (appData.getTargetMonth() < 0) {
    console.log("Цель не будет достигнута");
} else {
    console.log("Цель будет достигнута через " + appData.getTargetMonth() + " месяцев");
}
console.log(appData.getStatusIncome());
console.log(appData.addExpenses.join(', ').trim().split(/\s+/).
    map(word => word[0].toUpperCase() + word.substring(1)).join(' '));
console.log('Наша программа включает в себя данные: ');
for (let key in appData) {
	console.log(key + ' : ' + appData[key]);
}
