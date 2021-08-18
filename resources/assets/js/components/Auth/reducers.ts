import createReducer from '../../lib/createReducer';
import * as constants from './constants';
import iUser from '../../interfaces/iUser';

export interface iState {
    userData: iUser|null,
    errorMessage: string|null,
    isLogged: boolean,
    isRegistered: boolean,
    isFetching: boolean,
    sendingRecoveryEmailStatus: boolean|null,
}

export const initialState: iState = {
    userData: null,
    errorMessage: null,
    isLogged: false,
    isRegistered: false,
    isFetching: false,
    sendingRecoveryEmailStatus: null,
};

export let reducer = createReducer(initialState, {
    [constants.LOGIN.SUCCESS]: (state, action) => {
        return {
            ...state,
            userData: action.userData,
            errorMessage: null,
            isLogged: true,
        };
    },
    [constants.LOGIN.FAILED]: (state, action) => {
        return {
            ...state,
            userData: null,
            errorMessage: action.errorMessage,
            isLogged: false,
        };
    },
    [constants.REGISTER.SUCCESS]: (state, action) => {
        return {
            ...state,
            errorMessage: null,
            isRegistered: true,
        };
    },
    [constants.REGISTER.FAILED]: (state, action) => {
        return {
            ...state,
            errorMessage: action.errorMessage,
            isRegistered: false,
        };
    },
    [constants.LOGOUT.SUCCESS]: (state, action) => {
        return {
            ...state,
            errorMessage: null,
            isRegistered: false,
            isLogged: false,
        };
    },
    [constants.LOGOUT.FAILED]: (state, action) => {
        return {
            ...state,
            errorMessage: action.errorMessage,
        };
    },
    [constants.CLEAR_ERROR_MESSAGE]: (state, action) => {
        return {
            ...state,
            errorMessage: null,
        };
    },
    [constants.FETCHING.BEGIN]: (state, action) => {
        return {
            ...state,
            isFetching: true,
        };
    },
    [constants.FETCHING.FINISH]: (state, action) => {
        return {
            ...state,
            isFetching: false,
        };
    },
    [constants.SAVE_ERROR]: (state, action) => {
        return {
            ...state,
            errorMessage: action.error,
        };
    },
    [constants.RESETING.UPDATE_STATUS]: (state, action) => {
        return {
            ...state,
            sendingRecoveryEmailStatus: action.status,
        };
    },
});

export const key = `auth`;