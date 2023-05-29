let playerId = 0;

export class Player {
    constructor(name) {
        this._name = name;
        this._id = `id-${playerId++}`;
    }
}

class DiceRoll {
    Roll(num) {
        let total = 0;
        let dice = [];
        for (let i = 0; i < num; i++) {
            let roll = Math.floor(Math.random() * 6) + 1;
            dice.push(roll);
            total += roll;
        }
        return { "rolls": dice, "crit": (total === this.num * 6) };
    }
}

export class DnDAction {
    Roll(numDice) {
        return new DiceRoll().Roll(numDice);
    }
};
