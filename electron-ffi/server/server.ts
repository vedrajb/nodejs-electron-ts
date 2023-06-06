import express from 'express';
import cors from 'cors';
import http from 'http';

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

server.listen(3001, () => {
    console.log('Server started on port 3001');
});

app.get('/api/ping', (req, res) => {
    console.log('ping');
    res.send("echo: " + req.url);
});

app.get('/api/pong', (req, res) => {
    console.log('pong');
    res.send("echo: " + req.url);
});

import { fibo_ffi } from './modules/fibo-ffi.ts';

const fibo = new fibo_ffi();
fibo.init();

app.get('/api/fibo/reset', (req, res) => {
    console.log(req.url);
    fibo.init();
    res.json({ 
        current: fibo.current(),
        index: fibo.index()
    });
});

app.get('/api/fibo/next', (req, res) => {
    console.log(req.url);
    if (fibo.next()) {
        res.json({ 
            current: fibo.current(),
            index: fibo.index()
        });
    } else {
        res.send("Fibonacci sequence at end");
    }
});
