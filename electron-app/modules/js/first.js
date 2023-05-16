const { getRandomNumber } = require ('../trials/random.js');

function foo() {
    console.log(`foo(): ${getRandomNumber(100000)}`);
};

window.temp = foo;

window.a = 10;