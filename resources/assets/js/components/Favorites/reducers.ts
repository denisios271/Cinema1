import createReducer from '../../lib/createReducer';
import * as c from './constants';
import iFavoriteArticle from '../../interfaces/iFavoriteArticle';
import iFavoritePost from '../../interfaces/iFavoritePost';
import iArticle from '../../interfaces/iArticle';

export interface iState {
    /** Favorite articles */
    articles: iArticle[],

    /** Favorite posts */
    posts: iFavoritePost[],

    /** Does request in process? */
    isFetching: boolean,
}

export const initialState = {
    articles: [],
    posts: [],
    isFetching: false,
};

export let reducer = createReducer(initialState, {
    [c.RECEIVE_ARTICLES]: (state, action) => {
        return {
            ...state,
            articles: action.articles,
        };
    },
    [c.RECEIVE_POSTS]: (state, action) => {
        return {
            ...state,
            posts: action.posts,
        };
    },
    [c.SET_FETCHING]: (state, action) => {
        return {
            ...state,
            isFetching: action.isFetching,
        };
    },
});

export const key = 'favorite';