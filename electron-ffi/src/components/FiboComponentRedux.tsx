import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from 'uuid';

type FiboReduxProps = {
    series: number[];
    set: (series: number[]) => void;
    reset: () => void;
}

type FiboReduxState = {
    series: number[];
}

class FiboRedux extends Component<FiboReduxProps, FiboReduxState> {
    static propTypes: object;//{ series: PropTypes.Validator<number[]>; set: PropTypes.Validator<(...args: any[]) => any>; }

    id = uuidv4();
    
    constructor(props: FiboReduxProps) {
        super(props);
        this.state = {
            series: props.series
        };
        this.clear = this.clear.bind(this);
        this.initFibo = this.initFibo.bind(this);
        this.nextFibo = this.nextFibo.bind(this);
        this.getNext = this.getNext.bind(this);
    }

    componentDidMount() {
        this.clear();
    }

    clear() {
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
    
    initialise(data: { current: number, index: number }) {
        this.props.set([ data.current ]);
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

    next(data: { current: number, index: number }) {
        let { series } = this.props;
        this.props.set([...series, data.current]);
    }

    render() {
        const { series } = this.props;
        console.log(series.length);
        return (
            <div className='fibocomponent'>
                <h3>{ (series.length > 0) ?  series.toString() : "" }</h3>
                <button onClick={this.getNext}>Next</button>&nbsp;&nbsp;
                <button onClick={this.clear}>Clear</button>
            </div>
        );
    }
}

function mapStateToProps(state: { series: number[] }) {
    return {
        series: state.series
    };
}

function mapDispatchToProps(dispatch: (action: { type: string, series: number[] }) => void) {
    return {
        set: (series:  number[]) => dispatch({ type: 'SET', series }),
        reset: () => dispatch({ type: 'RESET', series: [0] })
    };
}

FiboRedux.propTypes = {
    series: PropTypes.arrayOf(PropTypes.number).isRequired,
    set: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
};

const FiboComponentRedux = connect(
    mapStateToProps, 
    mapDispatchToProps
)(FiboRedux);

export default FiboComponentRedux;
