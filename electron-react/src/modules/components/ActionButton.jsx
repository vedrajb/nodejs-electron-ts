import { Component } from "react";

export class ActionButton extends Component {
    // constructor
    constructor(props) {
        super(props);
        this._person = props.person;
        this.state = {
            age: this._person.age,
            name: this._person.name
        }
    }

    render() {
        return (
            <button>Roll!</button>
        )
    }
}
