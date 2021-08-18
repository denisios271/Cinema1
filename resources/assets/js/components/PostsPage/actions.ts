import { RECEIVE_POSTS, FETCHING_POSTS } from './constants';
import Api from '../../lib/Api';
import LocalStorage from '../../lib/LocalStorage';
import iPaginate from '../../interfaces/iPaginate';
import iPost from '../../interfaces/iPost';
import iAction from '../../interfaces/iAction';

export function requestSearch(name: string, field: string, page: number = 1) {
    return dispatch => {
        const localKey = `Search/${field}/${name}/${page}`;
        const localData = LocalStorage.load<iPaginate<iPost>>(localKey);
        if (localData && localData.data && localData.current_page) {
            dispatch(smartPostsReceiving(localData));
        } else {
            dispatch(fetchingPosts());
        }
        Api.get<iPaginate<iPost>>(`search/${field}/${name}/${page}/12`).then(r => {
            if (!r.data.length && page != 1) {
                console.error('Which way you get this?');
            } else {
                dispatch(smartPostsReceiving(r));
                LocalStorage.save(localKey, r);
            }
        }).catch(console.error);
    };
}

export function smartPostsReceiving(posts: iPaginate<iPost>) {
    return dispatch => {
        dispatch(receivePosts(posts));
    };
}

export function fetchingPosts() {
    return {
        type: FETCHING_POSTS,
    };
}

export function requestCategory(name: string, page: number = 1) {
    return requestSearch(name, 'category', page);
}

export function requestPosts(name: string, page: number = 1) {
    return requestSearch(name, 'name', page);
}

export interface iReceivePosts extends iAction {
    posts: iPaginate<iPost>,
}
export function receivePosts(posts: iPaginate<iPost>) {
    return {
        type: RECEIVE_POSTS,
        posts,
    };
}

export function resetPosts() {
    return receivePosts(null);
}