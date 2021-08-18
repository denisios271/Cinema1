import createReducer from '../../lib/createReducer';
import * as constants from './constants';

interface iTutorial {
    id: number,
    title: string,
    message: string,
    type: string,
}

export interface iState {
    menu: any[],
    tutorials: {
        tutorials: iTutorial[],
        news: iTutorial[],
    },
    error: string|null,
    seriesInfo: {
        types: any[],
        players: any[],
    },
}

export const initialState: iState = {
    menu: [],
    tutorials: {
        tutorials: [],
        news: [],
    },
    error: null,
    seriesInfo: {
        types: [],
        players: [],
    },
};

export let reducer = createReducer(initialState, {
    [constants.RECEIVE_MENU]: (state, action) => {
        return {
            ...state,
            menu: action.menu,
        };
    },
    [constants.RECEIVE_ERROR]: (state, action) => {
        return {
            ...state,
            error: action.error,
        };
    },
    [constants.RECEIVE_TUTORIALS]: (state, action) => {
        return {
            ...state,
            tutorials: {
                tutorials: action.tutorials.filter(v => v.type == 'tutorial'),
                news: action.tutorials.filter(v => v.type == 'news'),
            },
        };
    },
    [constants.RECEIVE_SERIES_INFORMATION]: (state, action) => {
        return {
            ...state,
            seriesInfo: {
                types: action.types,
                players: action.players,
            },
        };
    },
});

export const key = `admin`;