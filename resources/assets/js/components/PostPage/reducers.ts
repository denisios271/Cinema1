import createReducer from '../../lib/createReducer';
import { RECEIVE_POST, FETCHING_POST, RECEIVE_ERROR, RECEIVE_COMMENTS } from './constants';
import iPost from '../../interfaces/iPost';
import { iReceivePost, iReceiveError, iReceiveComments } from './actions';
import iPaginate from '../../interfaces/iPaginate';
import iPostComment from '../../interfaces/iPostComment';
import { bindActionCreators } from 'redux';

export interface iState {
    data: null|iPost,
    isFetching: boolean,
    error: null|string,
    comments: iPaginate<iPostComment>,
}

const initialState: iState = {
    data: null,
    isFetching: false,
    error: null,
    comments: null,
};

export let reducer = createReducer(initialState, {
    [RECEIVE_POST]: (state, action: iReceivePost) => {
        return {
            data: action.post,
            isFetching: false,
            error: null,
            comments: null,
        };
    },
    [FETCHING_POST]: (state, action) => {
        return {
            ...state,
            isFetching: true,
            error: null,
            data: null,
        };
    },
    [RECEIVE_ERROR]: (state, action: iReceiveError) => {
        return {
            ...state,
            error: action.error,
            isFetching: false,
        };
    },
    [RECEIVE_COMMENTS]: (state, action: iReceiveComments) => {
        return {
            ...state,
            comments: action.comments,
        };
    },
});

export const key = `post`;