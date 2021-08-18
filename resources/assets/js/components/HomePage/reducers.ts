import createReducer from '../../lib/createReducer';
import * as HOME_PAGE from './constants';
import iPost from '../../interfaces/iPost';
import { iReceiveFuturePosts, iReceiveNewPosts, iReceivePopularPosts } from './actions';

export interface iState {
    futurePosts: iPost[],
    newPosts: iPost[],
    popularPosts: iPost[],
}

export const initialState = {
    futurePosts: [],
    newPosts: [],
    popularPosts: [],
};

export let reducer = createReducer(initialState, {
    [HOME_PAGE.RECEIVE_FUTURE_POSTS]: (state, action: iReceiveFuturePosts) => {
        return {
            ...state,
            futurePosts: action.posts,
        };
    },
    [HOME_PAGE.RECEIVE_NEW_POSTS]: (state, action: iReceiveNewPosts) => {
        return {
            ...state,
            newPosts: action.posts,
        };
    },
    [HOME_PAGE.RECEIVE_POPULAR_POSTS]: (state, action: iReceivePopularPosts) => {
        return {
            ...state,
            popularPosts: action.posts,
        };
    },
});

export const key = `latestPosts`;