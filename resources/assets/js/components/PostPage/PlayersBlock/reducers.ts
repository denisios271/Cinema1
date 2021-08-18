import createReducer from '../../../lib/createReducer';
import { SERIES } from './constants';
import { iChangeSeriesType, iChangeSeriesNumber, iChangeSeriesPlayer } from './actions';

export interface iState {
    activeType: null|number,
    activeNumber: number,
    activePlayer: number,
}

export const initialState: iState = {
    activeType: null,
    activeNumber: 0,
    activePlayer: 0,
};

export let reducer = createReducer(initialState, {
    [SERIES.CHANGE_TYPE]: (state, action: iChangeSeriesType) => {
        return {
            ...state,
            activeType: action.activeType,
            activeNumber: 0,
        };
    },
    [SERIES.CHANGE_SERIA]: (state, action: iChangeSeriesNumber) => {
        return {
            ...state,
            activeNumber: action.activeNumber,
        };
    },
    [SERIES.CHANGE_PLAYER]: (state, action: iChangeSeriesPlayer) => {
        return {
            ...state,
            activePlayer: action.activePlayer,
        };
    },
});

export const key = `series`;