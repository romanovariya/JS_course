const money = 75000,
    income = 25000,
    addExpenses = '10000, 5000, 2000',
    deposit = true,
    mission = 1000000,
    period = 8;
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " рублей/долларов/гривен/юани");
addExpenses.toLocaleLowerCase();
console.log(addExpenses.split(' '));

let budgetDay = money / 30;
console.log(budgetDay);
