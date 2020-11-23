let money,
    income = 'рукоделие',
    addExpenses,
    deposit,
    mission = 1000000,
    period = 8,
    budgetMonth,
    budgetDay,
    expenses1,
    expenses2,
    amount1,
    amount2;
money = prompt("Ваш месячный доход?");
addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
deposit = prompt("Есть ли у вас депозит в банке?")
if (deposit === "да") {
    deposit = true;
} else {
    deposit = false;
}
expenses1 = prompt("Введите обязательную статью расходов?");
amount1 = prompt("Во сколько это обойдется?");
expenses2 = prompt("Введите обязательную статью расходов?");
amount2 = prompt("Во сколько это обойдется?");
budgetMonth = money - amount1 - amount2;
console.log(budgetMonth);
console.log(Math.ceil(mission/budgetMonth));

console.log(typeof money, typeof income, typeof deposit);
console.log(addExpenses.length);
console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " рублей");
console.log(addExpenses.toLowerCase().split(', '));
budgetDay = budgetMonth / 30;
console.log((Math.floor(budgetDay)));
if (budgetDay >= 1200) {
    console.log("У вас высокий уровень дохода");
} else if (budgetDay >= 600 && budgetDay < 1200) {
    console.log("У вас средний уровень дохода");
} else if (budgetDay <= 0) {
    console.log("Что-то пошло не так");
}

