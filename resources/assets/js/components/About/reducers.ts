import createReducer from '../../lib/createReducer';
import { RECEIVE_ERROR_MESSAGE, RECEIVE_TEAM_INFO } from './constants';
import iTeamMember from '../../interfaces/iTeamMember';
import { iReceiveTeamInformation, iReceiveError } from './actions';

export interface iState {
    team: iTeamMember[],
    about: string,
    error: string|null,
    isLoaded: boolean,
}

export const initialState: iState = {
    team: [],
    about: '',
    error: null,
    isLoaded: false,
};

export let reducer = createReducer<iState>(initialState, {
    [RECEIVE_TEAM_INFO]: (state, action: iReceiveTeamInformation) => {
        return {
            ...state,
            about: action.aboutMessage,
            team: action.teamArray,
            isLoaded: true,
        };
    },
    [RECEIVE_ERROR_MESSAGE]: (state, action: iReceiveError) => {
        return {
            ...state,
            error: action.errorMessage,
            isLoaded: true,
        };
    },
});

export const key = 'teamInfo';