import * as constants from './constants';
import * as adminActions from '../Admin/actions';
import Api from '../../lib/Api';
import LocalStorage from '../../lib/LocalStorage';
import iUser from '../../interfaces/iUser';

declare let VK: any;
declare let ga: (
    type: string,
    targetType: string,
    eventCategory?: string,
    eventAction?: string,
    eventLabel?: string,
    eventValue?: string,
    fieldsObject?: any,
) => void;

//________________________________________
// General funcs
export function saveError(error: string) {
    return {
        type: constants.SAVE_ERROR,
        error,
    };
}

export function clearErrorMessage() {
    return {
        type: constants.CLEAR_ERROR_MESSAGE,
    };
}

export function saveToken(token: { access_token: string, }) {
    LocalStorage.save('access_token', token.access_token);
}

export function fetchingBegin() {
    return {
        type: constants.FETCHING.BEGIN,
    }
}

export function fetchingFinish() {
    return {
        type: constants.FETCHING.FINISH,
    }
}

//________________________________________
// Getting user funcs
export function getUser(shouldSaveError: boolean = true, shouldRefreshToken: boolean = false) {
    return dispatch => {
        Api.post<iUser>(`auth/me`).then(r => {
            dispatch(loginSuccess(r));
            dispatch(fetchingFinish());
            dispatch(adminActions.initialLoading());
            if (shouldRefreshToken) {
                // so if we're checking in the background it - we should refresh token
                Api.post<iToken>(`auth/refresh`).then(r => {
                    saveToken(r);
                }).catch(console.error);
            }
        }).catch(e => {
            let saveError = () => {
                // no, there is no auth's user...
                // so just save error!
                const message = shouldSaveError ? e.error : null;
                dispatch(loginFailed(message));
                dispatch(fetchingFinish());
            }

            if (shouldRefreshToken) {
                // okey, well, mb user's token just expired?
                Api.post<iToken>(`auth/refresh`).then(r => {
                    // good! we refreshed token!
                    // now we should save token & get user one more time
                    saveToken(r);
                    dispatch(getUser(shouldSaveError, false));
                }).catch(() => {
                    saveError();
                });
            } else {
                saveError();
            }
        });
    }
}

//________________________________________
// Reseting account funcs
export function sendRecoveryEmail(email: string) {
    return dispatch => {
        dispatch(fetchingBegin());
        Api.post(`auth/password/email`, {
            email,
        }).then(r => {
            dispatch(clearErrorMessage());
            dispatch(updateRecoveryEmailStatus(true));
            dispatch(fetchingFinish());
        }).catch(e => {
            if (e.status == 422) {
                dispatch(saveError(e.data.email.join(' ')));
            } else {
                dispatch(saveError(e.error));
            }
            dispatch(updateRecoveryEmailStatus(false));
            dispatch(fetchingFinish());
        });
    };
}

export function updateRecoveryEmailStatus(isSuccess = true) {
    return {
        type: constants.RESETING.UPDATE_STATUS,
        status: !!isSuccess,
    };
}

export function resetRecoveryEmailStatus() {
    return {
        type: constants.RESETING.UPDATE_STATUS,
        status: null,
    };
}

//________________________________________
// Register funcs
export function register(name: string, email: string, password: string) {
    return dispatch => {
        dispatch(fetchingBegin());
        Api.post<iToken>('auth/register', { name, email, password, }).then(r => {
            dispatch(registerSuccess());
            saveToken(r);
            dispatch(getUser());
            ga('send', 'event', 'Auth', 'Register', 'Email', email);
        }).catch(e => {
            dispatch(fetchingFinish());
            dispatch(registerFailed(e.error));
        });
    }
}

export function registerSuccess() {
    return {
        type: constants.REGISTER.SUCCESS,
    };
}

export function registerFailed(errorMessage: string) {
    return {
        type: constants.REGISTER.FAILED,
        errorMessage,
    };
}

//________________________________________
// Login funcs
export interface iToken {
    /** Unique string for accessing to website's data */
    access_token: string,
    
    /** How long it can be used (in mins) */
    expires_in: number,

    /** Just a token's type. By default is bearer */
    token_type: string,
}

export function login(email: string, password: string) {
    return dispatch => {
        dispatch(fetchingBegin());
        Api.post<iToken>('auth/login', {
            email,
            password,
        }).then(r => {
            saveToken(r);
            dispatch(getUser());
            ga('send', 'event', 'Auth', 'Log in', 'Email', email);
        }).catch(e => {
            dispatch(fetchingFinish());
            dispatch(loginFailed(e.error));
        });
    }
}

export function loginSuccess(userData: iUser) {
    return {
        type: constants.LOGIN.SUCCESS,
        userData,
    };
}

export function loginFailed(errorMessage: string) {
    return {
        type: constants.LOGIN.FAILED,
        errorMessage,
    };
}

export function hiddenCheckLogin() {
    return dispatch => {
        dispatch(fetchingBegin());
        dispatch(getUser(false, true));
    }
}

export function checkLogin() {
    return dispatch => {
        dispatch(fetchingBegin());
        dispatch(getUser());
    }
}

export function loginViaSocial(networkType: string, data) {
    return dispatch => {
        dispatch(fetchingBegin());
        Api.post<iToken>(`auth/login/${networkType}`, {
            data,
        }).then(r => {
            saveToken(r);
            dispatch(getUser());
        }).catch(e => {
            dispatch(fetchingFinish());
            dispatch(loginFailed(e.error));
        });
    }
}

export function loginViaVk() {
    return dispatch => {
        dispatch(fetchingBegin());
        VK.Auth.login(r => {
            if (r.session) {
                dispatch(loginViaSocial('vk', r.session));
            } else {
                dispatch(loginFailed(r.error ? r.error : 'Произошло что-то странненькое.'));
                dispatch(fetchingFinish());
            }
        }, 1 + 4194304);
    }
}

//________________________________________
// Logout funcs
export function logout() {
    return dispatch => {
        dispatch(fetchingBegin());
        Api.post('auth/logout').then(r => {
            LocalStorage.remove('access_token');
            dispatch(logoutSuccess());
            dispatch(fetchingFinish());
        }).catch(e => {
            dispatch(logoutFailed(e.error));
            dispatch(fetchingFinish());
        });
    }
}

export function logoutSuccess() {
    return {
        type: constants.LOGOUT.SUCCESS,
    };
}

export function logoutFailed(errorMessage: string) {
    return {
        type: constants.LOGOUT.FAILED,
        errorMessage,
    };
}