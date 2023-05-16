class Creature {
    private _alive: boolean;

    constructor() {
        this._alive = true;
    }

    isAlive() {
        return this._alive;
    }
};

class Human extends Creature {
    _name: string;
    _legs: number;

    constructor(name: string) {
        super();

        this._name = name;
        this._legs = 2;
    }
}

export var vedraj = new Human('Vedraj');
console.log(`Vedraj is ${(vedraj.isAlive()) ? 'alive' : 'dead'}`);
