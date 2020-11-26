'use strict';
const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let    expenses = [],
    money;
const income = 'рукоделие',
    mission = 1000000,
    period = 8,
    addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую"),
    deposit = confirm("Есть ли у вас депозит в банке?"),
    showTypeOf = function (data) { 
        console.log(data, typeof(data));
    };

let start = function() {
    do {
        money = prompt("Ваш месячный доход?");
    } while (!isNumber(money));
};

start();

const getExpensesMonth = function () { 
    let sum = 0;

    for (let i = 0; i < 2; i++) {

        expenses[i] = prompt("Введите обязательную статью расходов?");
        do {
            sum += +prompt("Во сколько это обойдется?");
        } while (Number.isInteger(sum) !== true );
    }
    return sum;
 };

const expensesAmount = getExpensesMonth(); //считает обязательные расходы
const getAccumulatedMonth = function () {
        return (money - expensesAmount);
    }, //сбережения (доходы - расходы)
    accumulatedMonth = getAccumulatedMonth(),
    budgetDay = accumulatedMonth / 30,
    getTargetMonth = function () {
        return (Math.ceil(Number(mission) / Number(accumulatedMonth)));
    };
const getStatusIncome = function(){
    if (budgetDay >= 1200) {
        return ("У вас высокий уровень дохода");
    } else if (budgetDay >= 600 && budgetDay < 1200) {
        return ("У вас средний уровень дохода");
    } else if (budgetDay <= 0) {
        return ("Что-то пошло не так");
    }
};
const targetMonth = getTargetMonth();
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log(addExpenses.toLowerCase().split(', '));
console.log("Расходы за месяц: " + expensesAmount);
if (targetMonth < 0) {
    console.log("Цель не будет достигнута");
} else {
    console.log("Цель будет достигнута через " + targetMonth + " месяцев");
}
console.log("Бюджет на день " + (Math.floor(budgetDay)));
console.log(getStatusIncome());


