import logo from './logo.svg';
import './App.css';
import './modules/components/PlayerComponent';
import PlayerComponent from './modules/components/PlayerComponent';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
            <div>
            <PlayerComponent Name="one" id="one"/>
            <PlayerComponent Name="two" id="two"/>
            {/* <PlayerComponent Name="three"/> */}
            {/* <PlayerComponent Name="four"/> */}
            </div>
        </div>
    );
}

export default App;
