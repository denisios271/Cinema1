import Api from '../../lib/Api';
import * as HOME_PAGE from './constants';
import LocalStorage from '../../lib/LocalStorage';
import iAction from '../../interfaces/iAction';
import iPost from '../../interfaces/iPost';

export function initialization() {
    return dispatch => {
        dispatch(requestFuturePosts());
        dispatch(requestNewPosts());
        dispatch(requestPopularPosts());
    };
}

function requestPosts(uri: string, localDataKey: string, receiveCallback: (posts: iPost[]) => void) {
    return dispatch => {
        const localData = LocalStorage.load<iPost[]>(localDataKey);
        if (localData) {
            dispatch(receiveCallback(localData));
        }
        Api.get<iPost[]>(uri).then(res => {
            dispatch(receiveCallback(res));
            LocalStorage.save(localDataKey, res);
        }).catch(console.error);
    };
}

export function requestFuturePosts() {
    return requestPosts(`post/future/12`, `Posts/Future`, receiveFuturePosts);
}

export function requestNewPosts() {
    return requestPosts(`post/new/12`, `Posts/New`, receiveNewPosts);
}

export function requestPopularPosts() {
    return requestPosts(`post/popular/12`, `Posts/Popular`, receivePopularPosts);
}

export interface iReceiveFuturePosts extends iAction {
    posts: iPost[],
}
export function receiveFuturePosts(posts: iPost[]): iReceiveFuturePosts {
    return {
        type: HOME_PAGE.RECEIVE_FUTURE_POSTS,
        posts,
    };
}

export interface iReceiveNewPosts extends iAction {
    posts: iPost[],
}
export function receiveNewPosts(posts: iPost[]): iReceiveNewPosts {
    return {
        type: HOME_PAGE.RECEIVE_NEW_POSTS,
        posts,
    };
}

export interface iReceivePopularPosts extends iAction {
    posts: iPost[],
}
export function receivePopularPosts(posts: iPost[]): iReceivePopularPosts {
    return {
        type: HOME_PAGE.RECEIVE_POPULAR_POSTS,
        posts,
    };
}