import * as constants from './constants';
import Api from '../../lib/Api';

export function initialLoading() {
    return dispatch => {
        dispatch(loadMenu());
        dispatch(loadTutorials());
        dispatch(loadSeriesInformation());
    }
}

export function loadMenu() {
    return dispatch => {
        Api.get(`admin/menu`).then(response => {
            dispatch(receiveMenu(response));
        }).catch(error => {
            dispatch(receiveError(error.error));
        });
    };
}

export function loadTutorials() {
    return dispatch => {
        Api.get(`admin/tutorials`).then(response => {
            dispatch(receiveTutorials(response));
        }).catch(error => {
            dispatch(receiveError(error.error));
        });
    };
}

export function loadSeriesInformation() {
    return dispatch => {
        Api.get('admin/series-information').then(res => {
            dispatch(receiveSeriesInformation(res.types, res.players));
        }).catch(err => {
            dispatch(receiveSeriesInformation([], []));
        });
    };
}

export function receiveSeriesInformation(types, players) {
    return {
        type: constants.RECEIVE_SERIES_INFORMATION,
        types,
        players,
    };
}

export function receiveMenu(menu) {
    return {
        type: constants.RECEIVE_MENU,
        menu,
    };
}

export function receiveTutorials(tutorials) {
    return {
        type: constants.RECEIVE_TUTORIALS,
        tutorials,
    };
}

export function receiveError(error) {
    return {
        type: constants.RECEIVE_ERROR,
        error,
    };
}

export function clearError() {
    return {
        type: constants.RECEIVE_ERROR,
        error: null,
    };
}