import { createStore } from 'redux';

const initialState = {
    series: []
};

function reducer(state: { series: number[] } = initialState, action: { type: string, series: number[] }) {
    switch (action.type) {
        case 'SET':
            return {
                // ...state,
                series: action.series
            };
        case 'RESET':
            return {
                // ...state,
                series: []
            };
        default:
            return state;
    }
}

export const store = createStore(reducer);
