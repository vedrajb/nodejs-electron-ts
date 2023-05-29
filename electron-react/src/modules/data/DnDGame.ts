let playerId = 0;

export default class Game {
    Player = (name: string) => new Player(name);
    
    Action = new DnDAction();
};

export class Player {
    private _id: string = `id-${playerId++}`;
    private _name: string;

    constructor(name: string) {
        this._name = name;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }
}

class DiceRoll {
    private _numDice: number;

    constructor(public num: number) {
        this._numDice = num;
    }

    Roll(): { rolls: number[], crit: boolean } {
        let total = 0;
        let dice = new Array<number>();
        for (let i = 0; i < this._numDice; i++) {
            let roll = Math.floor(Math.random() * 6) + 1;
            dice.push(roll);
            total += roll;
        }
        return { "rolls": dice, "crit": (total === this._numDice * 6) };
    }
}

export class DnDAction {
    Roll(numDice: number): { rolls: number[], crit: boolean } {
        return new DiceRoll(numDice).Roll();
    }
};
