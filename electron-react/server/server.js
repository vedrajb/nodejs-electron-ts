import { Player, DnDAction } from "../src/modules/data/DnDGame.js"
import express from "express";
import cors from "cors";
import http from "http";

const app = express();
const server = http.createServer(app);

let game = {};

app.use(cors());
app.use(express.json());
app.get('/dnd-game/player', (req, res) => {
    if (game[`${req.query.Name}`] === undefined) {
        game[`${req.query.Name}`] = {
            "player": new Player(req.query.Name),
            "action": new DnDAction()
        };
        console.log(req.query.Name);
    }
    res.send(game[req.query.Name]);
});

app.get('/dnd-game/roll', (req, res) => {
    let rolls = {};
    if (game[`${req.query.Name}`] !== undefined) {
        rolls = game[`${req.query.Name}`].action.Roll(req.query.NumDice);
        console.log(req.query.Name + " + " + req.query.NumDice + ": " + JSON.stringify(rolls));
    }
    res.send(rolls);
});

server.listen(3001, () => {
    console.log('Server started on port 3001');
});
