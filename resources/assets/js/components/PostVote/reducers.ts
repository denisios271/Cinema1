import createReducer from '../../lib/createReducer';
import * as c from './constants';
import iPostVote from '../../interfaces/iPostVote';
import { iReceiveVotes } from './actions';

export interface iState {
    votes: iPostVote[],
}

export const initialState: iState = {
    votes: [],
};

export let reducer = createReducer(initialState, {
    [c.RECEIVE_ACTIVE_VOTES]: (state, action: iReceiveVotes) => {
        return {
            ...state,
            votes: action.votes,
        };
    },
});

export const key = `postVotes`;