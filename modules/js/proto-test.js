function Creature() {
    this.alive = true;
    this.isAlive = () => alive;
}

function Human(name) {
    this.name = name;
    this.__proto__ = Creature;
    this.legs = 2;
}

var a = 10;
console.log(11 == a); //false
console.log(a = 11); //11

console.log('trying something here');

Vedraj = new Human("Vedraj");
