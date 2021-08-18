import createReducer from '../../lib/createReducer';
import { RECEIVE_FRIENDS } from './constants';
import iFriendsBlock from '../../interfaces/iFriendsBlock';
import { iReceiveFriends } from './actions';

export interface iState {
    data: iFriendsBlock[],
    isLoaded: boolean,
}

export const initialState = {
    data: [],
    isLoaded: false,
};

export let reducer = createReducer(initialState, {
    [RECEIVE_FRIENDS]: (state, action: iReceiveFriends) => {
        return {
            data: action.friends,
            isLoaded: true,
        };
    },
});

export const key = `friends`;