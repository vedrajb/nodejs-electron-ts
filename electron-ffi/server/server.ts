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

const fiboffi = new fibo_ffi();

app.get('/api/fibo/reset', (req, res) => {
    console.log(req.url);

    let id = req.query.id?.toString();
    
    // invalid parameter
    if (id === undefined) {
        res.send("No id provided");
        return;
    }

    // ok
    fiboffi.init(id);
    res.json({ 
        current: fiboffi.current(id),
        index: fiboffi.index(id)
    });
});

app.get('/api/fibo/next', (req, res) => {
    console.log(req.url);

    let id = req.query.id?.toString();

    // invalid parameter
    if (id === undefined) {
        res.send("No id provided");
        return;
    }
    
    // ok
    if (fiboffi.next(id)) {
        res.json({ 
            current: fiboffi.current(id),
            index: fiboffi.index(id)
        });
    } else {
        res.send("Fibonacci sequence at end");
    }
});

app.post('/api/fibo/reset', (req, res) => {

    let id = req.body.id?.toString();

    // invalid parameter
    if (id === undefined) {
        res.send("No id provided");
        return;
    }

    // ok
    fiboffi.init(id);
    res.json({ 
        current: fiboffi.current(id),
        index: fiboffi.index(id)
    });
});

app.post('/api/fibo/next', (req, res) => {

    let id = req.body.id?.toString();

    // invalid parameter
    if (id === undefined) {
        res.send("No id provided");
        return;
    }
    
    // ok
    if (fiboffi.next(id)) {
        res.json({ 
            current: fiboffi.current(id),
            index: fiboffi.index(id)
        });
    } else {
        res.send("Fibonacci sequence at end");
    }
});
