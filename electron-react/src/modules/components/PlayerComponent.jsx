import { useEffect, useState } from "react";
import { } from "../data/DnDGame.js";
// import { ActionButton } from "./ActionButton.jsx";

export default function PlayerComponent(props) {
    const [_player, setPlayer] = useState({});
    const [_rolls, setRolls] = useState([]);
    const [_isCrit, setIsCrit] = useState(false);
    const [_numDice, setNumDice] = useState(0);

    useEffect(() => {
        async function initPlayer() {
            try {
                const response = await fetch(`http://localhost:3001/dnd-game/player?Name=${props.Name}`);
                let data = await response.json();
                updateData(data);
            } catch (error) {
                console.log(error);
            }
        }

        initPlayer();
    }, [props.Name]);

    const updateData = (data) => {
        // console.log(JSON.stringify(data))
        // let temp = JSON.parse(_data);
        setPlayer(data.player);
    }

    function rollDice () {
        let numDice = Number(document.getElementById(props.id).value);

        async function roll(numDice) {
            try {
                const response = await fetch(`http://localhost:3001/dnd-game/roll?Name=${_player._name}&NumDice=${numDice}`);
                let data = await response.json();
                updateRolls(data);
            } catch (error) {
                console.log(error);
            }
        };

        roll(numDice);
    }

    const updateRolls = (data) => {
        console.log(JSON.stringify(data));
        setIsCrit(data.crit);
        setRolls(data.rolls);
    }

    return (
        <div>
            <div>Player: {_player._name} ➡️ id: {_player._id} </div>
            <div>
                {
                    (_rolls.length > 0) 
                        ? "Rolls: " + _rolls + " | Is Crit: " + _isCrit
                        : ""
                } 
            </div>
            <div>
                Number of Dice: <input id={props.id}></input><button onClick={() => rollDice()}>Roll!</button> 
            </div>
            <hr style={{ width: '50%' }}/>
        </div>
    )
}
