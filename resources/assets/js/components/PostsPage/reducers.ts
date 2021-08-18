import createReducer from '../../lib/createReducer';
import { RECEIVE_POSTS, FETCHING_POSTS } from './constants';
import iPost from '../../interfaces/iPost';
import { iReceivePosts } from './actions';
import iPaginate from '../../interfaces/iPaginate';

export interface iState {
    data: iPaginate<iPost>|null,
    isFetching: boolean,
}

export const initialState: iState = {
    data: null,
    isFetching: false,
};

export let reducer = createReducer(initialState, {
    [RECEIVE_POSTS]: (state, action: iReceivePosts) => {
        return {
            data: action.posts,
            isFetching: false,
        };
    },
    [FETCHING_POSTS]: (state, action) => {
        return {
            ...state,
            isFetching: true,
        };
    }
}); 

export const key = `posts`;