import createReducer from '../../lib/createReducer';
import { RECEIVE_RANDOM_RELEASE } from './constants';
import iPost from '../../interfaces/iPost';
import { iReceiveRandomRelease } from './actions';

export interface iState {
    data: null|iPost,
    isLoaded: boolean,
};

export const initialState: iState = {
    data: null,
    isLoaded: false,
};

export let reducer = createReducer(initialState, {
    [RECEIVE_RANDOM_RELEASE]: (state, action: iReceiveRandomRelease) => {
        return {
            data: action.release,
            isLoaded: true,
        };
    }
}); 

export const key = `randomRelease`;