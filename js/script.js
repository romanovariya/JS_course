'use strict';
let showTypeOf = function (data) { 
    console.log(data, typeof(data));
};
function getExpensesMonth(a, b) { 
    return (Number(a) + Number(b));
}
function getTargetMonth(accum, goal) {
    return (Math.ceil(Number(goal) / Number(accum)));
}
function getAccumulatedMonth(income, costs) {
        return (income - costs);
}
const income = 'рукоделие',
    mission = 1000000,
    period = 8,
    money = prompt("Ваш месячный доход?"),
    addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую"),
    deposit = confirm("Есть ли у вас депозит в банке?"),
    expenses1 = prompt("Введите обязательную статью расходов?"),
    amount1 = prompt("Во сколько это обойдется?"),
    expenses2 = prompt("Введите обязательную статью расходов?"),
    amount2 = prompt("Во сколько это обойдется?"),
    expenses = getExpensesMonth(amount1, amount2),
    accumulatedMonth = getAccumulatedMonth(+money, expenses),
    budgetDay = accumulatedMonth / 30;

let getStatusIncome = function(){
    if (budgetDay >= 1200) {
        return ("У вас высокий уровень дохода");
    } else if (budgetDay >= 600 && budgetDay < 1200) {
        return ("У вас средний уровень дохода");
    } else if (budgetDay <= 0) {
        return ("Что-то пошло не так");
    }
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log(expenses);
console.log(addExpenses.split(', '));
console.log(expenses);
console.log(getTargetMonth(accumulatedMonth, mission));
console.log((Math.floor(budgetDay)));
console.log(getStatusIncome());


