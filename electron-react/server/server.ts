import Game, { Player, DnDAction } from "../src/modules/data/DnDGame.js";
import Express from "express";
import cors from "cors";
import http from "http";

const app = Express();
const server = http.createServer(app);

var game: { [ player: string ]: {player: Player, action: DnDAction } } = {};

app.use(cors());
app.use(Express.json());

app.get('/dnd-game/player', (req, res) => {
    if (game[`${req.query.Name}`] === undefined) {
        let newGame = new Game();
        game[`${req.query.Name}`] = {
            player: newGame.Player(req.query.Name.toString()),
            action: newGame.Action
        };
    }
    let temp = game[`${req.query.Name}`];
    console.log(`${temp.player.name} has joined the game. Test roll: ${JSON.stringify(temp.action.Roll(1))}`);
    res.send(game[`${req.query.Name}`]);
});

app.get('/dnd-game/roll', (req, res) => {
    let rolls = {};
    if (game[`${req.query.Name}`] !== undefined) {
        rolls = game[`${req.query.Name}`].action.Roll(Number.parseInt(req.query.NumDice.toString()));
        console.log("Player: " + req.query.Name + " rolling " + req.query.NumDice + " dice: " + JSON.stringify(rolls));
    }
    res.send(rolls);
});

server.listen(3001, () => {
    console.log('Server started on port 3001');
});
