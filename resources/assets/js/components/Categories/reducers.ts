import createReducer from '../../lib/createReducer';
import { RECEIVE_CATEGORIES } from './constants';
import iCategory from '../../interfaces/iCategory';

export interface iState {
    data: iCategory[],
    isLoaded: boolean,
}

export const initialState: iState = {
    data: [],
    isLoaded: false,
};

export let reducer = createReducer(initialState, {
    [RECEIVE_CATEGORIES]: (state, action) => {
        return {
            data: action.categories,
            isLoaded: true,
        };
    },
});

export const key = `categories`;