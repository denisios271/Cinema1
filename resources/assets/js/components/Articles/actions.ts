import * as constants from './constants';
import Api from '../../lib/Api';
import LocalStorage from '../../lib/LocalStorage';
import { iState } from './reducers';
import iArticle from '../../interfaces/iArticle';
import iPaginate from '../../interfaces/iPaginate';

export function load() {
    return (dispatch, getState) => {
        const state: iState = getState().articles;
        if (state.isFinished || state.isFetching) {
            return;
        }
        
        dispatch(fetchBegin());
        const localKey = `Articles/Newest/${state.currentPage}`;
        const localData = LocalStorage.load(localKey);
        if (localData) {
            dispatch(receive(localData));
        }
        Api.get<iPaginate<iArticle>>(`article/list/new/${state.currentPage}/12`).then(r => {
            dispatch(receive([...state.articles, ...r.data]));
            dispatch(fetchStop());
            dispatch(increasePage());
            LocalStorage.save(localKey, r.data);
        }).catch(e => {
            dispatch(fetchStop());
            dispatch(finish());
        });
    };
}

export function loadPopular() {
    return (dispatch, getState) => {
        const localKey = `Articles/Popular`;
        const localData = LocalStorage.load(localKey);
        if (localData) {
            dispatch(receivePopular(localData));
        } else {
            dispatch(fetchBegin());
        }

        Api.get<iPaginate<iArticle>>(`article/list/popular/1/3`).then(r => {
            dispatch(receivePopular(r.data));
            dispatch(fetchStop());
            LocalStorage.save(localKey, r.data);
        }).catch(e => {
            dispatch(fetchStop());
        });
    };
}

export function finish() {
    return {
        type: constants.FINISH,
    };
}

export function increasePage() {
    return {
        type: constants.INCREASE_PAGE,
    };
}

export function fetchBegin() {
    return {
        type: constants.FETCHING,
        isFetching: true,
    };
}

export function fetchStop() {
    return {
        type: constants.FETCHING,
        isFetching: false,
    };
}

export function receive(articles: iArticle[]) {
    return {
        type: constants.RECEIVE,
        articles,
    };
}

export function reset() {
    return {
        type: constants.RECEIVE,
        articles: [],
    };
}

export function receivePopular(articles: iArticle[]) {
    return {
        type: constants.RECEIVE_POPULAR,
        articles,
    }
}