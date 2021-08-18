import createReducer from '../../lib/createReducer';
import * as constants from './constants';
import iArticle from '../../interfaces/iArticle';

export interface iState {
    articles: iArticle[],
    popularArticles: iArticle[],
    isFetching: boolean,
    currentPage: number,
    isFinished: boolean,
}

export const initialState: iState = {
    articles: [],
    popularArticles: [],
    isFetching: false,
    currentPage: 1,
    isFinished: false,
};

export let reducer = createReducer(initialState, {
    [constants.FETCHING]: (state: iState, action): iState => {
        return {
            ...state,
            isFetching: action.isFetching,
        };
    },
    [constants.RECEIVE]: (state: iState, action): iState => {
        return {
            ...state,
            articles: action.articles,
        };
    },
    [constants.FINISH]: (state: iState, action): iState => {
        return {
            ...state,
            isFinished: true,
        };
    },
    [constants.INCREASE_PAGE]: (state: iState, action) : iState => {
        return {
            ...state,
            currentPage: state.currentPage + 1,
        };
    },
    [constants.RECEIVE_POPULAR]: (state: iState, action) : iState => {
        return {
            ...state,
            popularArticles: action.articles,
        };
    },
});

export const key = `articles`;