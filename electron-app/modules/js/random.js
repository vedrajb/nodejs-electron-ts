exports.getRandomNumber = function (max) {
    var num = random(max).next();
    console.info(`getRandomNumber: ${num.value}`);
    return num;
}

function* random(max) {
    while (true) {
        yield Math.floor(Math.random() * max);
    }
}

exports.somevalue = 100;