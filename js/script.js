const money = 75000,
    income = 'рукоделие',
    addExpenses = 'интернет, учеба, продукты',
    deposit = true,
    mission = 1000000,
    period = 8,
    budgetDay = money / 30;
console.log(typeof money, income, deposit);
console.log(addExpenses.length);
console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " рублей");
console.log(addExpenses.toLocaleLowerCase().split(', '));

console.log(budgetDay);
