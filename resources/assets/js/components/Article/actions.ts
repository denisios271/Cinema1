import iArticle from '../../interfaces/iArticle';
import * as c from './constants';

export function receive(article: iArticle) {
    return {
        type: c.RECEIVE,
        article,
    }
}

export function beginFetching() {
    return {
        type: c.FETCH,
        isFetching: true,
    }
}

export function stopFetching() {
    return {
        type: c.FETCH,
        isFetching: false,
    }
}

export function receiveError(error: string) {
    return {
        type: c.RECEIVE_ERROR,
        error,
    };
}