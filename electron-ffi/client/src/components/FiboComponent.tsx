import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default class FiboComponent extends Component<object, {series: number[]}> {
    id = uuidv4();

    constructor(props: object) {
        super(props);
        this.state = {
            series: []
        };
        this.initFibo = this.initFibo.bind(this);
    }
    
    componentDidMount() {
        this.clear();
    }

    clear() {
        this.setState({ series: [] });
        this.initFibo();
    }

    async initFibo() {
        try {
            const response = await fetch('http://localhost:3001/api/fibo/reset');
            const data = await response.json();
            this.initialise(data);
        } catch (error) {
            console.error(error);
        }
    }

    initialise(data: { current: number }) {
        this.setState({ series: [ data.current ] });
    }

    getNext() {
        this.nextFibo();
    }

    async nextFibo() {
        try {
            const response = await fetch('http://localhost:3001/api/fibo/next');
            const data = await response.json();
            this.next(data);
        } catch (error) {
            console.error(error);
        }
    }

    next(data: { current: number }) {
        let { series } = this.state;
        series.push(data.current);
        this.setState({ series: series });
    }

    render() {
        const { series } = this.state;
        return (
            <div className='fibocomponent'>
                <h3>{ (series.length > 0) ?  series.toString() : "" }</h3>
                <button onClick={ () => this.getNext() }>Next</button>&nbsp;&nbsp;
                <button onClick={ () => this.clear() }>Clear</button>
            </div>
        );
    }
}
