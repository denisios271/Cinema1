import createReducer from '../../lib/createReducer';
import * as constants from './constants';
import iPost from '../../interfaces/iPost';
import { iReceivePosts } from './actions';

export interface iState {
    [index: number]: iPost,
}

export const initialState: iState = [];

export let reducer = createReducer(initialState, {
    [constants.RECEIVE_POSTS]: (state, action: iReceivePosts) => {
        return action.posts;
    }
}); 

export const key = `QSF`;