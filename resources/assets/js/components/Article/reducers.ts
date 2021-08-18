import createReducer from '../../lib/createReducer';
import * as c from './constants';
import iArticle from '../../interfaces/iArticle';

export interface iState {
    article: iArticle|null,
    isFetching: boolean,
    error: null|string,
}

export const initialState: iState = {
    article: null,
    isFetching: false,
    error: null,
};

export let reducer = createReducer(initialState, {
    [c.FETCH]: (state: iState, action): iState => {
        return {
            ...state,
            isFetching: action.isFetching,
        };
    },
    [c.RECEIVE]: (state: iState, action): iState => {
        return {
            ...state,
            article: action.article,
            isFetching: false,
        };
    },
    [c.RECEIVE_ERROR]: (state: iState, action): iState => {
        return {
            ...state,
            error: action.error,
            isFetching: false,
        };
    },
});

export const key = `article`;