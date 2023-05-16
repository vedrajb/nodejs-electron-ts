const http = require('http');
const jsrandom = require('./random.js');

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
    var num = jsrandom.getRandomNumber(100000);
    console.info(`Info: ${num.value}, ${num.done}`);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write(`Value: ${num.value}, ${num.done}\n`);
    res.end();
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});