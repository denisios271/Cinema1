import * as c from './constants';
import Api, { iError } from '../../lib/Api';
import { key as authReduxKey } from '../Auth/reducers';

export function loadEverything() {
    return dispatch => {
        dispatch(loadArticles(true));
        dispatch(loadPosts(true));
    };
}

export function loadResource(uri, localKey, receiveCallback, withoutAlert = false) {
    return dispatch => {
        dispatch(beginFetching());
        Api.get(uri).then(r => {
            dispatch(receiveCallback(r));
            dispatch(finishFetching());
        }).catch((e: iError) => {
            dispatch(finishFetching());
            if (!withoutAlert) {
                alert(e.error);
            }
        });
    };
}

export function loadArticles(withoutAlert = false) {
    return dispatch => {
        dispatch(loadResource(`article/favorite`, `Favorite/Articles`, receiveArticles, withoutAlert));
    };
}

export function loadPosts(withoutAlert = false) {
    return dispatch => {
        dispatch(loadResource(`post/favorite`, `Favorite/Posts`, receivePosts, withoutAlert));
    };
}

export function addResourceToFavorite(uri, data, loadCallback) {
    return (dispatch, getState) => {
        const auth = getState()[authReduxKey];
        if (!auth.isLogged) {
            alert('Вы должны быть авторизованы');
            return;
        }

        dispatch(beginFetching());
        setTimeout(() => {
            
            Api.post(uri, data).then(r => {
                dispatch(loadCallback(r));
            }).catch((e: iError) => {
                dispatch(finishFetching());
                alert(e.error);
            });
        }, 1000);
    };
}

export function removeResourceFromFavorite(uri, data, loadCallback) {
    return (dispatch, getState) => {
        const auth = getState()[authReduxKey];
        if (!auth.isLogged) {
            alert('Вы должны быть авторизованы');
            return;
        }
        dispatch(beginFetching());
        setTimeout(() => {
            
            Api.delete(uri, data).then(r => {
                dispatch(loadCallback(r));
            }).catch((e: iError) => {
                dispatch(finishFetching());
                alert(e.error);
            });
        }, 1000);
    };
}

export function addArticleToFavorite(article_id) {
    return dispatch => {
        dispatch(addResourceToFavorite(`article/favorite`, { article_id }, loadArticles));
    };
}

export function addPostToFavorite(post_id) {
    return dispatch => {
        dispatch(addResourceToFavorite(`post/favorite`, { post_id }, loadPosts));
    };
}

export function removeArticleFromFavorite(article_id) {
    return dispatch => {
        dispatch(removeResourceFromFavorite(`article/favorite`, { article_id }, loadArticles));
    };
}

export function removePostFromFavorite(post_id) {
    return dispatch => {
        dispatch(removeResourceFromFavorite(`post/favorite`, { post_id }, loadPosts));
    };
}

export function receivePosts(posts) {
    return {
        type: c.RECEIVE_POSTS,
        posts,
    };
}

export function receiveArticles(articles) {
    return {
        type: c.RECEIVE_ARTICLES,
        articles,
    };
}

export function beginFetching() {
    return {
        type: c.SET_FETCHING,
        isFetching: true,
    }
}

export function finishFetching() {
    return {
        type: c.SET_FETCHING,
        isFetching: false,
    }
}